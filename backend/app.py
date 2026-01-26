from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
import sys
import re
import random
import time
from datetime import datetime
from typing import Dict, List, Tuple, Optional, Any

app = Flask(__name__)
CORS(app)

def camel_to_snake(name):
    """Convert camelCase to snake_case"""
    name = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', name).lower()

def normalize_user_prefs(user_prefs):
    """Normalize camelCase keys to snake_case for internal processing"""
    normalized = {}
    for key, value in user_prefs.items():
        snake_key = camel_to_snake(key)
        normalized[snake_key] = value
    return normalized

def format_response_keys(response_data):
    """Convert snake_case keys back to camelCase for frontend"""
    if isinstance(response_data, dict):
        formatted = {}
        for key, value in response_data.items():
            parts = key.split('_')
            camel_key = parts[0] + ''.join(p.capitalize() for p in parts[1:])
            formatted[camel_key] = format_response_keys(value)
        return formatted
    elif isinstance(response_data, list):
        return [format_response_keys(item) for item in response_data]
    else:
        return response_data

# Import properties from properties.py
try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(current_dir, 'data')
    sys.path.append(data_dir)
    from properties import properties
    print(f"✓ Imported {len(properties)} properties from properties.py")
except ImportError as e:
    print(f"✗ Error importing properties: {e}")
    # Fallback minimal properties if import fails
    properties = [
        {
            "id": 1,
            "name": "IT Park Shared Dorm",
            "type": "Shared",
            "location": "IT Park, Cebu City",
            "price": 3500,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "shared bathroom", "study area"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 3.9,
            "furnished": True,
            "area_sqm": 12,
            "floor": 3,
            "distance_to_it_park_km": 0.3,
            "available_date": "Immediate",
            "image_url": "https://images.unsplash.com/photo-1555854876-bf365c7c5de3?auto=format&fit=crop&w=800",
            "description": "Shared dormitory in the heart of IT Park",
            "fiber_optic": True,
            "parking_available": False,
            "noise_level": "medium",
            "kitchen_type": "basic",
            "ac_temperature_min": 18,
            "ac_temperature_max": 24,
            "view_type": "city",
            "ventilation": "basic"
        }
    ]

properties_df = pd.DataFrame(properties)

class EnhancedProfiler:
    """Enhanced tenant profiler with lifestyle and habit matching"""
    
    def __init__(self):
        # Define weight categories for comprehensive matching
        self.weights = {
            'dealbreaker': 0.40,     # Hard constraints that must be met
            'lifestyle': 0.35,       # Daily habits and preferences
            'quality': 0.25          # Amenities and property features
        }
    
    def normalize_budget(self, budget_str):
        """Convert budget string to integer, handle various formats"""
        if isinstance(budget_str, (int, float)):
            return int(budget_str)
        
        if not isinstance(budget_str, str):
            return 0
        
        # Remove currency symbols, commas, and whitespace
        cleaned = str(budget_str).replace('₱', '').replace(',', '').strip()
        
        try:
            return int(float(cleaned))
        except:
            return 0
    
    def check_dealbreaker_filters(self, property_data, user_prefs):
        """Apply HARD filters that properties MUST pass (dealbreakers)"""
        results = {
            'passed': True,
            'failed_reasons': [],
            'warnings': []
        }
        
        property_id = property_data.get('id', 'unknown')
        
        # 1. STRICT BUDGET FILTER - Non-negotiable
        property_price = property_data.get('price', 0)
        min_budget = self.normalize_budget(user_prefs.get('min_budget', 0))
        max_budget = self.normalize_budget(user_prefs.get('max_budget', 999999))
        
        if property_price < min_budget:
            # Property is cheaper than min budget - this is acceptable
            pass
        elif property_price > max_budget * 1.3:  # Allow 30% buffer for potential value
            results['passed'] = False
            results['failed_reasons'].append(f"Exceeds budget by ₱{(property_price - max_budget):,}")
            return results
        
        # 2. TRAFFIC TOLERANCE FILTER - Based on commute preference
        transportation = user_prefs.get('transportation', '').lower()
        distance = property_data.get('distance_to_it_park_km', 10)
        
        if transportation == 'walk' and distance > 1.5:
            results['passed'] = False
            results['failed_reasons'].append(f"Too far ({distance}km) for walking commute")
            return results
        elif transportation == 'private car' and not property_data.get('parking_available', False):
            results['passed'] = False
            results['failed_reasons'].append("No parking available (required for car commute)")
            return results
        
        # 3. PET POLICY FILTER - Detailed pet matching
        has_pets = user_prefs.get('has_pets', False)
        pet_type = user_prefs.get('pet_type', '').lower()
        pet_friendly = property_data.get('pet_friendly', False)
        
        if has_pets and not pet_friendly:
            results['passed'] = False
            results['failed_reasons'].append("Property not pet-friendly")
            return results
        elif has_pets and pet_friendly:
            # Check for pet size restrictions if specified
            if pet_type == 'dog >15kg' and not property_data.get('allows_large_dogs', True):
                results['passed'] = False
                results['failed_reasons'].append("Does not allow large dogs (>15kg)")
                return results
        
        # 4. CONNECTIVITY FILTER - For WFH users
        wfh_preference = user_prefs.get('wfh_frequency', '').lower()
        if wfh_preference in ['daily', 'frequent']:
            if not property_data.get('fiber_optic', False):
                results['warnings'].append("No fiber optic internet (important for WFH)")
        
        # 5. MUST-HAVE FEATURES FILTER - Non-negotiable requirements
        must_haves = user_prefs.get('must_have_features', [])
        if must_haves:
            property_amenities = [str(a).lower() for a in property_data.get('amenities', [])]
            user_must_haves = [str(m).lower() for m in must_haves]
            
            missing_features = []
            for feature in user_must_haves:
                found = False
                for amenity in property_amenities:
                    if feature in amenity:
                        found = True
                        break
                if not found:
                    missing_features.append(feature)
            
            if missing_features:
                results['failed_reasons'].append(f"Missing must-have features: {', '.join(missing_features[:3])}")
        
        # 6. NOISE SENSITIVITY FILTER
        light_sleeper = user_prefs.get('light_sleeper', False)
        if light_sleeper:
            noise_level = property_data.get('noise_level', 'unknown').lower()
            if noise_level in ['high', 'very high']:
                results['warnings'].append("High noise area - may affect light sleepers")
        
        # 7. KITCHEN HABITS FILTER
        cooking_frequency = user_prefs.get('cooking_frequency', '').lower()
        if cooking_frequency in ['daily', 'heavy']:
            kitchen_type = property_data.get('kitchen_type', 'basic').lower()
            if kitchen_type == 'basic' and property_data.get('type', '').lower() == 'studio':
                results['warnings'].append("Basic kitchen - may not suit heavy cooking")
        
        return results
    
    def calculate_dealbreaker_score(self, property_data, user_prefs):
        """Calculate score for dealbreaker requirements"""
        score = 1.0
        explanations = []
        
        # Budget compliance (weighted heavily)
        property_price = property_data.get('price', 0)
        max_budget = self.normalize_budget(user_prefs.get('max_budget', 999999))
        
        if property_price <= max_budget:
            budget_percentage = (max_budget - property_price) / max_budget * 100
            if budget_percentage > 20:
                score = 1.0
                explanations.append("💰 Excellent value - well below budget")
            else:
                score = 0.9
                explanations.append("✅ Within budget")
        elif property_price <= max_budget * 1.1:
            score = 0.7
            explanations.append("⚠️ Slightly above budget (10% over)")
        else:
            score = 0.5
            explanations.append("⚠️ Above budget but exceptional value")
        
        # Location proximity (if destination specified)
        primary_destination = user_prefs.get('primary_destination', '').lower()
        distance = property_data.get('distance_to_it_park_km', 10)
        
        if primary_destination and 'it park' in primary_destination:
            if distance <= 1:
                score *= 1.0
                explanations.append("📍 Prime IT Park location")
            elif distance <= 3:
                score *= 0.9
                explanations.append("📍 Good proximity to IT Park")
            elif distance <= 5:
                score *= 0.8
                explanations.append("📍 Moderate commute to IT Park")
            else:
                score *= 0.6
                explanations.append("📍 Further from IT Park")
        
        return min(1.0, score), explanations
    
    def calculate_lifestyle_score(self, property_data, user_prefs):
        """Calculate lifestyle compatibility score"""
        score = 0.0
        explanations = []
        
        # 1. Daily rhythm compatibility
        daily_rhythm = user_prefs.get('daily_rhythm', '').lower()
        property_type = property_data.get('type', '').lower()
        
        if daily_rhythm == 'night owl':
            # Night owls need 24/7 access and sound insulation
            if property_data.get('sound_insulation', False):
                score += 0.3
                explanations.append("🦉 Good sound insulation for night owls")
            if property_data.get('twenty_four_seven_access', False):
                score += 0.2
                explanations.append("🔓 24/7 access")
        elif daily_rhythm == 'early bird':
            # Early birds need natural light and morning amenities
            if property_data.get('view_type', '').lower() in ['garden', 'pool', 'east']:
                score += 0.3
                explanations.append("🌅 East-facing for morning light")
            if property_data.get('floor', 0) > 3:
                score += 0.2
                explanations.append("🏢 High floor for better light")
        else:  # flexible
            score += 0.2
            explanations.append("🔄 Flexible schedule compatible")
        
        # 2. Noise sensitivity matching
        light_sleeper = user_prefs.get('light_sleeper', False)
        noise_level = property_data.get('noise_level', 'medium').lower()
        floor = property_data.get('floor', 1)
        
        if light_sleeper:
            if floor >= 5 and noise_level == 'low':
                score += 0.3
                explanations.append("🔇 Quiet high-floor for light sleepers")
            elif noise_level == 'low':
                score += 0.2
                explanations.append("🔇 Quiet location")
        else:
            if noise_level == 'medium':
                score += 0.1
                explanations.append("🎵 Normal noise level")
        
        # 3. Cooking habits compatibility
        cooking_frequency = user_prefs.get('cooking_frequency', '').lower()
        kitchen_type = property_data.get('kitchen_type', 'basic').lower()
        ventilation = property_data.get('ventilation', 'basic').lower()
        
        if cooking_frequency in ['daily', 'heavy']:
            if kitchen_type == 'full' and ventilation == 'good':
                score += 0.3
                explanations.append("👨‍🍳 Full kitchen with good ventilation")
            elif kitchen_type == 'full':
                score += 0.2
                explanations.append("👨‍🍳 Full kitchen available")
        elif cooking_frequency == 'occasional':
            score += 0.1
            explanations.append("🍽️ Suitable for occasional cooking")
        else:  # rarely/never
            score += 0.1
            explanations.append("☕ Basic kitchen sufficient")
        
        # 4. AC temperature preference (for roommate matching)
        ac_pref = user_prefs.get('ac_temperature_pref', 22)  # Default 22°C
        ac_min = property_data.get('ac_temperature_min', 18)
        ac_max = property_data.get('ac_temperature_max', 26)
        
        if ac_min <= ac_pref <= ac_max:
            score += 0.2
            explanations.append("🌡️ AC temperature compatible")
        else:
            explanations.append("🌡️ AC temperature may require adjustment")
        
        # 5. Shift/work schedule compatibility (for roommates)
        shift_type = user_prefs.get('shift_type', '').lower()
        if shift_type in ['night', 'graveyard']:
            if property_data.get('blackout_curtains', False):
                score += 0.2
                explanations.append("🌙 Blackout curtains for night shift")
        
        return min(1.0, score), explanations
    
    def calculate_quality_score(self, property_data, user_prefs):
        """Calculate quality and amenities score"""
        score = 0.0
        explanations = []
        
        # 1. Rating and reviews
        rating = property_data.get('rating', 0)
        if rating >= 4.5:
            score += 0.4
            explanations.append("⭐⭐⭐⭐⭐ Excellent reviews")
        elif rating >= 4.0:
            score += 0.3
            explanations.append("⭐⭐⭐⭐ Very good reviews")
        elif rating >= 3.5:
            score += 0.2
            explanations.append("⭐⭐⭐ Good reviews")
        elif rating >= 3.0:
            score += 0.1
            explanations.append("⭐⭐ Average reviews")
        
        # 2. Amenities quality and match
        amenities = property_data.get('amenities', [])
        preferred_amenities = user_prefs.get('preferred_amenities', [])
        
        amenity_count = len(amenities)
        if amenity_count >= 8:
            score += 0.3
            explanations.append("🏆 Premium amenities package")
        elif amenity_count >= 5:
            score += 0.2
            explanations.append("✅ Good range of amenities")
        elif amenity_count >= 3:
            score += 0.1
            explanations.append("📝 Basic amenities included")
        
        # Match preferred amenities
        matched_amenities = []
        for pref in preferred_amenities:
            pref_lower = str(pref).lower()
            for amenity in amenities:
                if pref_lower in str(amenity).lower():
                    matched_amenities.append(pref)
                    break
        
        if matched_amenities:
            match_ratio = len(matched_amenities) / len(preferred_amenities) if preferred_amenities else 0
            score += match_ratio * 0.3
            explanations.append(f"🎯 {len(matched_amenities)} preferred amenities matched")
        
        # 3. Property condition and features
        if property_data.get('furnished', False):
            score += 0.2
            explanations.append("🛋️ Fully furnished")
        
        if property_data.get('new_renovation', False):
            score += 0.1
            explanations.append("🆕 Recently renovated")
        
        if property_data.get('balcony', False):
            score += 0.1
            explanations.append("🌿 Private balcony")
        
        return min(1.0, score), explanations
    
    def calculate_total_match_score(self, property_data, user_prefs):
        """Calculate total match score with comprehensive profiling"""
        
        # First check dealbreaker filters
        filter_check = self.check_dealbreaker_filters(property_data, user_prefs)
        
        if not filter_check['passed']:
            return 0.0, filter_check['failed_reasons'], filter_check['warnings'], {}
        
        # Calculate component scores
        dealbreaker_score, dealbreaker_explanations = self.calculate_dealbreaker_score(property_data, user_prefs)
        lifestyle_score, lifestyle_explanations = self.calculate_lifestyle_score(property_data, user_prefs)
        quality_score, quality_explanations = self.calculate_quality_score(property_data, user_prefs)
        
        # Apply weightings
        total_score = (
            self.weights['dealbreaker'] * dealbreaker_score +
            self.weights['lifestyle'] * lifestyle_score +
            self.weights['quality'] * quality_score
        )
        
        # Convert to percentage
        total_score_percent = round(total_score * 100, 1)
        
        # Combine all explanations
        all_explanations = dealbreaker_explanations + lifestyle_explanations + quality_explanations
        warnings = filter_check['warnings']
        
        # Component scores for transparency
        component_scores = {
            'dealbreaker': round(dealbreaker_score * 100, 1),
            'lifestyle': round(lifestyle_score * 100, 1),
            'quality': round(quality_score * 100, 1)
        }
        
        return total_score_percent, all_explanations, warnings, component_scores

class ConciergeRecommendationEngine:
    """Concierge-style recommendation engine with strategic presentation"""
    
    def __init__(self):
        self.profiler = EnhancedProfiler()
        self.work_animations = [
            "Scanning Flood Hazard Maps (MGB Data)...",
            "Verifying Fiber Optic Availability with PLDT...",
            "Filtering out 'Ghost Listings'...",
            "Checking Commute Times during Rush Hour...",
            "Analyzing Noise Pollution Levels...",
            "Cross-referencing with Verified Reviews...",
            "Calculating True Cost of Commute...",
            "Checking Building Safety Certifications...",
            "Verifying Landlord Response Rates...",
            "Analyzing Micro-climate Data for Ventilation..."
        ]
    
    def generate_concierge_recommendations(self, user_prefs, simulate_delay=True):
        """Generate curated recommendations with concierge experience"""
        
        print(f"\n🔍 CONCIERGE SERVICE ACTIVATED")
        print(f"   Budget: ₱{self.profiler.normalize_budget(user_prefs.get('min_budget', 0)):,} - ₱{self.profiler.normalize_budget(user_prefs.get('max_budget', 999999)):,}")
        print(f"   Lifestyle: {user_prefs.get('daily_rhythm', 'Unknown')}, {user_prefs.get('transportation', 'Unknown')}")
        print(f"   Dealbreakers: {user_prefs.get('must_have_features', [])}")
        
        # Simulate concierge work (Labor Illusion)
        if simulate_delay:
            print("\n🤔 Curating your perfect matches...")
            for i in range(3):  # Show 3 animations
                animation = random.choice(self.work_animations)
                print(f"   {animation}")
                time.sleep(0.5)
        
        all_scored_properties = []
        
        # Score all properties
        for prop in properties:
            prop_dict = prop.copy()
            
            # Calculate comprehensive match score
            match_score, explanations, warnings, component_scores = self.profiler.calculate_total_match_score(
                prop_dict, user_prefs
            )
            
            if match_score > 0:  # Include all properties that pass dealbreakers
                # Prepare enhanced property data
                property_data = self.prepare_property_response(prop_dict, match_score, user_prefs)
                property_data.update({
                    'explanations': explanations[:4],  # Top 4 explanations
                    'warnings': warnings,
                    'componentScores': component_scores,
                    'tenantProfileMatch': self.generate_tenant_profile_match(prop_dict, user_prefs)
                })
                
                all_scored_properties.append(property_data)
        
        # Sort by match score
        all_scored_properties.sort(key=lambda x: x['matchScore'], reverse=True)
        
        # Generate strategic recommendations
        curated_recommendations = self.curate_strategic_recommendations(all_scored_properties, user_prefs)
        
        # Generate tenant profile for landlords
        tenant_profile = self.generate_tenant_resume(user_prefs)
        
        return curated_recommendations, tenant_profile
    
    def prepare_property_response(self, prop, match_score, user_prefs):
        """Prepare comprehensive property response"""
        return {
            'id': prop['id'],
            'name': prop['name'],
            'type': prop['type'],
            'location': prop['location'],
            'price': float(prop['price']),
            'bedrooms': int(prop.get('bedrooms', 1)),
            'bathrooms': int(prop.get('bathrooms', 1)),
            'amenities': prop.get('amenities', []),
            'petFriendly': bool(prop.get('pet_friendly', False)),
            'leaseDuration': prop.get('lease_duration', 'short-term'),
            'rating': float(prop.get('rating', 0)),
            'furnished': prop.get('furnished', False),
            'areaSqm': prop.get('area_sqm', 0),
            'floor': prop.get('floor', 0),
            'distanceToItParkKm': prop.get('distance_to_it_park_km', 0),
            'availableDate': prop.get('available_date', 'Immediate'),
            'imageUrl': prop.get('image_url', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'),
            'description': prop.get('description', 'Modern property with great amenities.'),
            'matchScore': match_score,
            'matchPercentage': f"{match_score}%",
            'keyFeatures': self.extract_key_features(prop, user_prefs),
            'commuteAnalysis': self.generate_commute_analysis(prop, user_prefs),
            'lifestyleCompatibility': self.assess_lifestyle_compatibility(prop, user_prefs),
            'valueProposition': self.calculate_value_proposition(prop, user_prefs)
        }
    
    def curate_strategic_recommendations(self, scored_properties, user_prefs):
        """Curate strategic recommendations using decoy effect"""
        
        if not scored_properties:
            return {
                'safeBet': None,
                'stretchOption': None,
                'wildcard': None,
                'allMatches': []
            }
        
        # Group properties by match score ranges
        safe_bets = [p for p in scored_properties if p['matchScore'] >= 85]
        strong_matches = [p for p in scored_properties if 70 <= p['matchScore'] < 85]
        good_options = [p for p in scored_properties if 50 <= p['matchScore'] < 70]
        considerations = [p for p in scored_properties if p['matchScore'] < 50]
        
        # STRATEGY 1: The Decoy Effect Implementation
        # We'll select properties strategically to guide user decision
        
        curated = {}
        
        # Safe Bet (Target) - The best overall match
        if safe_bets:
            # Pick the safe bet based on comprehensive scoring
            safe_bet = max(safe_bets, key=lambda x: (
                x['matchScore'] * 0.4 +
                (1 - x['price'] / self.profiler.normalize_budget(user_prefs.get('max_budget', 999999))) * 0.3 +
                x['rating'] / 5 * 0.3
            ))
            curated['safeBet'] = self.enhance_for_presentation(safe_bet, 'safe_bet')
        else:
            # If no safe bet, use best strong match
            if strong_matches:
                curated['safeBet'] = self.enhance_for_presentation(strong_matches[0], 'safe_bet')
        
        # Stretch Option (Decoy) - Slightly worse but similar price
        if curated.get('safeBet'):
            # Find a property that's similar but slightly worse to make safe bet look better
            safe_bet_price = curated['safeBet']['price']
            similar_priced = [p for p in scored_properties 
                            if p['id'] != curated['safeBet']['id'] 
                            and abs(p['price'] - safe_bet_price) / safe_bet_price < 0.2]
            
            if similar_priced:
                # Pick one with lower score but similar price
                stretch = min(similar_priced, key=lambda x: x['matchScore'])
                curated['stretchOption'] = self.enhance_for_presentation(stretch, 'stretch')
        
        # Wildcard - Different value proposition
        if good_options or considerations:
            # Look for properties that offer different value (cheaper but further, or more amenities)
            max_budget = self.profiler.normalize_budget(user_prefs.get('max_budget', 999999))
            
            # Find properties that are significantly cheaper or offer unique value
            wildcard_candidates = []
            for prop in scored_properties:
                if prop.get('id') in [curated.get('safeBet', {}).get('id'), curated.get('stretchOption', {}).get('id')]:
                    continue
                
                # Value proposition: either much cheaper or much better amenities
                price_ratio = prop['price'] / max_budget
                if price_ratio < 0.7 or len(prop.get('amenities', [])) >= 8:
                    wildcard_candidates.append(prop)
            
            if wildcard_candidates:
                # Pick the wildcard with best value proposition
                wildcard = max(wildcard_candidates, key=lambda x: (
                    (1 - x['price'] / max_budget) * 0.6 +
                    len(x.get('amenities', [])) / 10 * 0.4
                ))
                curated['wildcard'] = self.enhance_for_presentation(wildcard, 'wildcard')
        
        # Ensure we have at least one recommendation
        if not curated and scored_properties:
            curated['safeBet'] = self.enhance_for_presentation(scored_properties[0], 'safe_bet')
        
        curated['allMatches'] = scored_properties[:10]  # Top 10 matches for browsing
        
        return curated
    
    def enhance_for_presentation(self, property_data, category):
        """Add presentation enhancements for each category"""
        enhanced = property_data.copy()
        
        if category == 'safe_bet':
            enhanced['presentationTitle'] = "The Safe Bet 🏆"
            enhanced['presentationSubtitle'] = "Excellent match across all criteria"
            enhanced['presentationHighlights'] = [
                "✓ Meets all your dealbreakers",
                "✓ Strong lifestyle compatibility",
                "✓ Great value for money",
                "✓ Highly rated by previous tenants"
            ]
            enhanced['recommendationReason'] = "This property aligns perfectly with your preferences and represents the best overall value."
            
        elif category == 'stretch':
            enhanced['presentationTitle'] = "The Stretch Option ⚖️"
            enhanced['presentationSubtitle'] = "Good match with some trade-offs"
            enhanced['presentationHighlights'] = [
                "✓ Meets most requirements",
                "⚠️ Some compromises needed",
                "💰 Similar price point",
                "📍 Alternative location"
            ]
            enhanced['recommendationReason'] = "Consider this if you're flexible on some preferences or want to compare options."
            
        elif category == 'wildcard':
            enhanced['presentationTitle'] = "The Wildcard 💎"
            enhanced['presentationSubtitle'] = "Different approach, exceptional value"
            enhanced['presentationHighlights'] = [
                "🎯 Excels in specific areas",
                "💰 Better value proposition",
                "📍 Different neighborhood",
                "🏆 Unique features"
            ]
            enhanced['recommendationReason'] = "This option offers outstanding value or features that might outweigh location or other factors."
        
        return enhanced
    
    def extract_key_features(self, property_data, user_prefs):
        """Extract key features based on user preferences"""
        features = []
        
        # Budget features
        price = property_data.get('price', 0)
        max_budget = self.profiler.normalize_budget(user_prefs.get('max_budget', 999999))
        
        if price <= max_budget * 0.7:
            features.append("💰 Exceptional value (30%+ under budget)")
        elif price <= max_budget:
            features.append("✅ Within budget")
        
        # Location features
        distance = property_data.get('distance_to_it_park_km', 10)
        transportation = user_prefs.get('transportation', '')
        
        if transportation == 'walk' and distance <= 1:
            features.append("🚶 Walking distance to IT Park")
        elif transportation == 'private car' and property_data.get('parking_available', False):
            features.append("🚗 Dedicated parking included")
        elif distance <= 2:
            features.append("📍 Prime location")
        
        # Lifestyle features
        if property_data.get('fiber_optic', False):
            features.append("💻 Fiber optic ready (Great for WFH)")
        
        if property_data.get('sound_insulation', False):
            features.append("🔇 Sound insulated")
        
        if property_data.get('blackout_curtains', False):
            features.append("🌙 Shift-worker friendly")
        
        # Property features
        if property_data.get('furnished', False):
            features.append("🛋️ Move-in ready")
        
        if property_data.get('balcony', False):
            features.append("🌿 Private outdoor space")
        
        if property_data.get('gym', False):
            features.append("💪 On-site gym")
        
        return features[:6]
    
    def generate_commute_analysis(self, property_data, user_prefs):
        """Generate detailed commute analysis"""
        distance = property_data.get('distance_to_it_park_km', 10)
        transportation = user_prefs.get('transportation', '').lower()
        
        analysis = {
            'distanceKm': distance,
            'estimatedCommuteTime': self.calculate_commute_time(distance, transportation),
            'transportationOptions': self.get_transportation_options(property_data),
            'rushHourImpact': self.assess_rush_hour_impact(distance, transportation),
            'monthlyCommuteCost': self.estimate_commute_cost(distance, transportation)
        }
        
        return analysis
    
    def calculate_commute_time(self, distance, transportation):
        """Calculate estimated commute time"""
        if transportation == 'walk':
            return f"{int(distance * 15)}-{int(distance * 20)} minutes"
        elif transportation == 'private car':
            base_time = distance * 3  # 3 minutes per km without traffic
            rush_hour = base_time * 2
            return f"{int(base_time)}-{int(rush_hour)} minutes"
        elif transportation == 'jeepney':
            base_time = distance * 5  # 5 minutes per km
            rush_hour = base_time * 2.5
            return f"{int(base_time)}-{int(rush_hour)} minutes"
        else:
            return f"{int(distance * 4)}-{int(distance * 8)} minutes"
    
    def get_transportation_options(self, property_data):
        """Get available transportation options"""
        options = []
        location = property_data.get('location', '').lower()
        
        if 'it park' in location or 'cebu business park' in location:
            options.append('Jeepney routes: 01K, 12L, 17B')
            options.append('Angkas/Move It available')
            options.append('GrabCar frequently available')
        
        if property_data.get('near_lrt_station', False):
            options.append('Walking distance to LRT station')
        
        if property_data.get('parking_available', False):
            options.append('Private parking available')
        
        return options[:3]
    
    def assess_rush_hour_impact(self, distance, transportation):
        """Assess rush hour impact on commute"""
        if distance <= 2:
            return "Minimal impact - short distance"
        elif transportation == 'private car':
            return "Moderate traffic during rush hour (6-9AM, 5-8PM)"
        elif transportation == 'jeepney':
            return "Heavier congestion during peak hours"
        else:
            return "Variable depending on route"
    
    def estimate_commute_cost(self, distance, transportation):
        """Estimate monthly commute cost"""
        if transportation == 'walk':
            return 0
        elif transportation == 'private car':
            # Fuel + parking + maintenance
            daily_cost = distance * 2 * 10  # 10 pesos per km
            return int(daily_cost * 22)  # 22 working days
        elif transportation == 'jeepney':
            # Jeepney fare: 10 pesos minimum
            daily_cost = 10 * 2  # To and from
            return int(daily_cost * 22)
        else:
            return int(distance * 15 * 22)  # Rough estimate
    
    def assess_lifestyle_compatibility(self, property_data, user_prefs):
        """Assess lifestyle compatibility score"""
        compatibility = {
            'overallScore': 0,
            'categories': {}
        }
        
        # Noise compatibility
        light_sleeper = user_prefs.get('light_sleeper', False)
        noise_level = property_data.get('noise_level', 'medium')
        
        if light_sleeper and noise_level == 'low':
            compatibility['categories']['noise'] = 'Excellent'
            compatibility['overallScore'] += 25
        elif not light_sleeper and noise_level in ['medium', 'low']:
            compatibility['categories']['noise'] = 'Good'
            compatibility['overallScore'] += 20
        else:
            compatibility['categories']['noise'] = 'Fair'
            compatibility['overallScore'] += 10
        
        # Kitchen compatibility
        cooking_frequency = user_prefs.get('cooking_frequency', 'occasional')
        kitchen_type = property_data.get('kitchen_type', 'basic')
        
        if cooking_frequency in ['daily', 'heavy'] and kitchen_type == 'full':
            compatibility['categories']['kitchen'] = 'Excellent'
            compatibility['overallScore'] += 25
        elif cooking_frequency == 'occasional' and kitchen_type in ['basic', 'full']:
            compatibility['categories']['kitchen'] = 'Good'
            compatibility['overallScore'] += 20
        else:
            compatibility['categories']['kitchen'] = 'Fair'
            compatibility['overallScore'] += 10
        
        # Work-from-home compatibility
        wfh_frequency = user_prefs.get('wfh_frequency', '')
        fiber_optic = property_data.get('fiber_optic', False)
        
        if wfh_frequency in ['daily', 'frequent'] and fiber_optic:
            compatibility['categories']['wfh'] = 'Excellent'
            compatibility['overallScore'] += 25
        elif wfh_frequency and fiber_optic:
            compatibility['categories']['wfh'] = 'Good'
            compatibility['overallScore'] += 20
        else:
            compatibility['categories']['wfh'] = 'Fair'
            compatibility['overallScore'] += 10
        
        # AC temperature compatibility (for roommates)
        ac_pref = user_prefs.get('ac_temperature_pref', 22)
        ac_min = property_data.get('ac_temperature_min', 18)
        ac_max = property_data.get('ac_temperature_max', 26)
        
        if ac_min <= ac_pref <= ac_max:
            compatibility['categories']['temperature'] = 'Compatible'
            compatibility['overallScore'] += 25
        else:
            compatibility['categories']['temperature'] = 'May need adjustment'
            compatibility['overallScore'] += 15
        
        compatibility['overallScore'] = min(100, compatibility['overallScore'])
        
        return compatibility
    
    def calculate_value_proposition(self, property_data, user_prefs):
        """Calculate value proposition score"""
        price = property_data.get('price', 0)
        max_budget = self.profiler.normalize_budget(user_prefs.get('max_budget', 999999))
        area = property_data.get('area_sqm', 20)
        amenities = len(property_data.get('amenities', []))
        
        # Price per square meter
        price_per_sqm = price / area if area > 0 else 0
        
        # Amenity score
        amenity_score = min(amenities / 10 * 100, 100)
        
        # Budget utilization
        budget_utilization = (max_budget - price) / max_budget * 100 if max_budget > 0 else 0
        
        # Overall value score
        value_score = (
            (100 - min(price_per_sqm * 10, 100)) * 0.4 +  # Lower price per sqm is better
            amenity_score * 0.4 +                         # More amenities is better
            max(budget_utilization, 0) * 0.2              # More budget leftover is better
        )
        
        return {
            'pricePerSqm': round(price_per_sqm, 2),
            'amenityScore': round(amenity_score, 1),
            'budgetUtilization': round(budget_utilization, 1),
            'overallValueScore': round(value_score, 1),
            'valueCategory': 'Premium' if value_score >= 80 else 'Good' if value_score >= 60 else 'Fair'
        }
    
    def generate_tenant_profile_match(self, property_data, user_prefs):
        """Generate tenant profile match for landlords"""
        match_areas = []
        
        # Budget match
        price = property_data.get('price', 0)
        max_budget = self.profiler.normalize_budget(user_prefs.get('max_budget', 999999))
        if price <= max_budget:
            match_areas.append("✅ Budget aligned")
        
        # Pet policy match
        has_pets = user_prefs.get('has_pets', False)
        pet_friendly = property_data.get('pet_friendly', False)
        if not has_pets or (has_pets and pet_friendly):
            match_areas.append("✅ Pet policy compatible")
        
        # Location preference match
        preferred_areas = user_prefs.get('area_preferences', [])
        location = property_data.get('location', '').lower()
        if any(area.lower() in location for area in preferred_areas if area):
            match_areas.append("✅ Preferred location")
        
        # Lifestyle compatibility
        wfh_frequency = user_prefs.get('wfh_frequency', '')
        if wfh_frequency and property_data.get('fiber_optic', False):
            match_areas.append("✅ WFH ready")
        
        return match_areas
    
    def generate_tenant_resume(self, user_prefs):
        """Generate tenant resume for landlords"""
        # Map user preferences to readable profile
        transportation_map = {
            'walk': 'Walks to work',
            'private_car': 'Drives to work',
            'jeepney': 'Takes public transport',
            'motorcycle': 'Rides motorcycle'
        }
        
        cooking_map = {
            'daily': 'Cooks daily',
            'heavy': 'Enjoys cooking',
            'occasional': 'Cooks occasionally',
            'rarely': 'Eats out often',
            'never': 'Does not cook'
        }
        
        rhythm_map = {
            'early_bird': 'Early riser',
            'night_owl': 'Night owl',
            'flexible': 'Flexible schedule'
        }
        
        # Build tenant resume
        resume = {
            'tenantType': self.determine_tenant_type(user_prefs),
            'stabilityIndicator': self.assess_stability(user_prefs),
            'lifestyleBrief': self.generate_lifestyle_brief(user_prefs),
            'dealbreakerSummary': user_prefs.get('must_have_features', []),
            'preferredMoveIn': user_prefs.get('move_in_plan', 'Flexible'),
            'leasePreference': user_prefs.get('lease_duration', '12 months').replace('-', ' ').title(),
            'incomeStability': self.assess_income_stability(user_prefs),
            'communicationStyle': 'Responsive & Professional',
            'viewingAvailability': 'Weekdays after 5PM or Weekends',
            'decisionTimeline': 'Within 1 week if match is good',
            'compatibilityNotes': self.generate_compatibility_notes(user_prefs)
        }
        
        # Add urgency badge (psychology lever)
        resume['urgencyBadge'] = {
            'text': 'High Intent Tenant',
            'expiry': '48 hours',
            'currentlyViewing': '2 other properties this week'
        }
        
        return resume
    
    def determine_tenant_type(self, user_prefs):
        """Determine tenant type based on preferences"""
        wfh_frequency = user_prefs.get('wfh_frequency', '')
        daily_rhythm = user_prefs.get('daily_rhythm', '')
        
        if wfh_frequency in ['daily', 'frequent']:
            return 'Digital Nomad / Remote Worker'
        elif daily_rhythm == 'night_owl':
            return 'Night Shift Professional'
        elif daily_rhythm == 'early_bird':
            return 'Corporate Professional'
        else:
            return 'General Tenant'
    
    def assess_stability(self, user_prefs):
        """Assess tenant stability"""
        lease_pref = user_prefs.get('lease_duration', '')
        move_in_plan = user_prefs.get('move_in_plan', '')
        
        if 'long' in lease_pref.lower() and 'immediate' in move_in_plan.lower():
            return 'High Stability - Long term, ready to move'
        elif 'long' in lease_pref.lower():
            return 'Stable - Prefers long term lease'
        else:
            return 'Flexible - Open to various arrangements'
    
    def generate_lifestyle_brief(self, user_prefs):
        """Generate lifestyle brief"""
        brief_parts = []
        
        transportation = user_prefs.get('transportation', '')
        if transportation:
            brief_parts.append(f"Commutes by {transportation.replace('_', ' ')}")
        
        cooking = user_prefs.get('cooking_frequency', '')
        if cooking:
            brief_parts.append(f"Cooks {cooking}")
        
        pets = user_prefs.get('has_pets', False)
        if pets:
            pet_type = user_prefs.get('pet_type', 'pet')
            brief_parts.append(f"Has a {pet_type}")
        
        wfh = user_prefs.get('wfh_frequency', '')
        if wfh in ['daily', 'frequent']:
            brief_parts.append("Works from home frequently")
        
        return "; ".join(brief_parts)
    
    def assess_income_stability(self, user_prefs):
        """Assess income stability based on preferences"""
        max_budget = self.profiler.normalize_budget(user_prefs.get('max_budget', 0))
        
        if max_budget >= 30000:
            return 'High Income / Executive Level'
        elif max_budget >= 15000:
            return 'Stable Professional Income'
        elif max_budget >= 8000:
            return 'Entry Level / Student Budget'
        else:
            return 'Budget Conscious'
    
    def generate_compatibility_notes(self, user_prefs):
        """Generate compatibility notes for landlords"""
        notes = []
        
        if not user_prefs.get('has_pets', False):
            notes.append("No pets - low maintenance")
        
        if not user_prefs.get('smoking', True):
            notes.append("Non-smoker - keeps property fresh")
        
        if user_prefs.get('lease_duration', '').lower() == 'long-term':
            notes.append("Seeks long-term tenancy - low turnover")
        
        if user_prefs.get('move_in_plan', '').lower() == 'immediate':
            notes.append("Ready to move immediately - no gap")
        
        return notes

@app.route('/recommend', methods=['POST'])
def recommend():
    """Main recommendation endpoint with concierge service"""
    try:
        # Get raw camelCase data from frontend
        raw_user_prefs = request.get_json()
        
        if not raw_user_prefs:
            return jsonify(format_response_keys({
                "error": "No preferences provided",
                "curatedMatches": {},
                "tenantResume": {},
                "totalMatches": 0,
                "conciergeNotes": []
            })), 400
        
        print(f"\n📝 CONCIERGE SERVICE REQUEST:")
        print(f"   Tenant Type: {raw_user_prefs.get('dailyRhythm', 'Unknown')}")
        print(f"   Budget: ₱{raw_user_prefs.get('minBudget', 0):,} - ₱{raw_user_prefs.get('maxBudget', 0):,}")
        print(f"   Commute: {raw_user_prefs.get('transportation', 'Unknown')}")
        print(f"   Lifestyle: {raw_user_prefs.get('cookingFrequency', 'Unknown')}")
        
        # Normalize to snake_case for processing
        user_prefs = normalize_user_prefs(raw_user_prefs)
        
        # Initialize concierge engine
        engine = ConciergeRecommendationEngine()
        
        # Generate curated recommendations with concierge experience
        curated_recommendations, tenant_resume = engine.generate_concierge_recommendations(user_prefs)
        
        # Generate concierge notes
        concierge_notes = [
            "🎯 Curated using strategic matchmaking algorithm",
            "🤝 Tenant resume generated for landlord engagement",
            "💰 Value analysis included for each property",
            "🚗 Commute impact calculated based on your preferences",
            "🏠 Lifestyle compatibility assessed in detail"
        ]
        
        # Count total matches
        all_matches = curated_recommendations.get('allMatches', [])
        total_matches = len(all_matches)
        
        # Build comprehensive response
        response = {
            "conciergeService": "Livora Concierge Matchmaking",
            "curatedMatches": curated_recommendations,
            "tenantResume": tenant_resume,
            "totalMatches": total_matches,
            "matchBreakdown": {
                "safeBet": 1 if curated_recommendations.get('safeBet') else 0,
                "stretchOption": 1 if curated_recommendations.get('stretchOption') else 0,
                "wildcard": 1 if curated_recommendations.get('wildcard') else 0,
                "otherMatches": max(0, total_matches - 3)
            },
            "conciergeNotes": concierge_notes,
            "matchingStrategy": {
                "approach": "Decoy Effect + Value Proposition",
                "presentation": "Safe Bet | Stretch Option | Wildcard",
                "tenantFocus": "Lifestyle Compatibility Profiling",
                "landlordFocus": "Qualified Lead Generation"
            },
            "tenantProfile": {
                "tenantType": tenant_resume.get('tenantType', 'General Tenant'),
                "stability": tenant_resume.get('stabilityIndicator', 'Flexible'),
                "lifestyle": tenant_resume.get('lifestyleBrief', ''),
                "dealbreakers": user_prefs.get('must_have_features', []),
                "urgencyStatus": tenant_resume.get('urgencyBadge', {})
            },
            "nextSteps": [
                "Review your curated matches below",
                "Compare Safe Bet vs Stretch Option vs Wildcard",
                "Use Tenant Resume when contacting landlords",
                "Schedule viewings for top 2-3 properties"
            ]
        }
        
        print(f"\n✅ CONCIERGE SERVICE COMPLETE:")
        print(f"   Total properties analyzed: {len(properties)}")
        print(f"   Matches found: {total_matches}")
        print(f"   Curated presentation: 3 strategic options")
        print(f"   Tenant resume: Generated with urgency badge")
        
        # Convert snake_case keys back to camelCase for frontend
        return jsonify(format_response_keys(response))
        
    except Exception as e:
        print(f"❌ Concierge Service Error: {e}")
        import traceback
        traceback.print_exc()
        
        return jsonify(format_response_keys({
            "error": str(e),
            "curatedMatches": {},
            "tenantResume": {},
            "totalMatches": 0,
            "message": "An error occurred in the concierge service"
        })), 500

@app.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties"""
    try:
        limit = int(request.args.get('limit', 20))
        offset = int(request.args.get('offset', 0))
        
        # Apply pagination
        end_idx = min(offset + limit, len(properties))
        properties_list = properties[offset:end_idx]
        
        # Ensure all properties have image_url
        for prop in properties_list:
            if 'image_url' not in prop or not prop['image_url']:
                prop['image_url'] = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800"
        
        response_data = {
            "total": len(properties),
            "limit": limit,
            "offset": offset,
            "hasMore": end_idx < len(properties),
            "properties": properties_list
        }
        
        return jsonify(format_response_keys(response_data))
    except Exception as e:
        return jsonify(format_response_keys({"error": str(e)})), 500

@app.route('/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get a single property by ID"""
    try:
        property_data = next((p for p in properties if p['id'] == property_id), None)
        
        if not property_data:
            return jsonify(format_response_keys({
                "error": f"Property with ID {property_id} not found"
            })), 404
        
        # Ensure image_url exists
        if 'image_url' not in property_data or not property_data['image_url']:
            property_data['image_url'] = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800"
        
        return jsonify(format_response_keys(property_data))
    except Exception as e:
        return jsonify(format_response_keys({"error": str(e)})), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify(format_response_keys({
        "status": "healthy",
        "service": "Livora Concierge Matchmaking API",
        "propertiesLoaded": len(properties),
        "matchingEngine": "Enhanced Profiler with Lifestyle Compatibility",
        "presentationStrategy": "Decoy Effect (Safe Bet | Stretch | Wildcard)",
        "tenantProfiling": "Comprehensive Lifestyle Assessment",
        "landlordTools": "Tenant Resume with Urgency Badge"
    }))

@app.route('/concierge/explain', methods=['GET'])
def explain_concierge():
    """Explain the concierge matchmaking framework"""
    explanation = {
        "title": "Livora Concierge Matchmaking Framework",
        "description": "Psychology-driven property matching with strategic presentation",
        "corePrinciples": [
            "Shift from search engine to concierge service",
            "Address paradox of choice through curation",
            "Solve landlord lead fatigue through qualified leads"
        ],
        "tenantProfilingLayers": [
            {
                "layer": "Dealbreaker Layer",
                "description": "Hard filters that must be satisfied",
                "components": [
                    "Traffic Tolerance Check: Filters based on commute preference",
                    "Pet Policy Nuance: Detailed pet type matching",
                    "Connectivity Check: Fiber optic for WFH users",
                    "Must-Have Features: Non-negotiable requirements"
                ]
            },
            {
                "layer": "Lifestyle Layer",
                "description": "Soft matches for daily living compatibility",
                "components": [
                    "Noise Sensitivity: Matches property noise levels with sleep patterns",
                    "Kitchen Habits: Aligns cooking frequency with kitchen facilities",
                    "Daily Rhythm: Accommodates night owls vs early birds",
                    "Temperature Preferences: AC compatibility for roommates"
                ]
            },
            {
                "layer": "Quality Layer",
                "description": "Amenities and property features assessment",
                "components": [
                    "Rating & Reviews: Verified tenant feedback",
                    "Amenity Match: Preferred vs available amenities",
                    "Property Condition: Furnishing, renovations, maintenance"
                ]
            }
        ],
        "strategicPresentation": {
            "strategy": "Decoy Effect (Asymmetric Dominance)",
            "presentation": "Three curated options to guide decision-making",
            "options": [
                {
                    "option": "The Safe Bet",
                    "role": "Target choice",
                    "characteristics": "Best overall match, excellent value, meets all criteria"
                },
                {
                    "option": "The Stretch Option",
                    "role": "Decoy choice",
                    "characteristics": "Similar price but slightly worse to make Safe Bet look better"
                },
                {
                    "option": "The Wildcard",
                    "role": "Alternative value proposition",
                    "characteristics": "Different approach (cheaper/further or premium/expensive)"
                }
            ]
        },
        "landlordTools": {
            "tenantResume": "Snapshot of tenant profile for qualified leads",
            "urgencyBadge": "48-hour expiry to encourage prompt response",
            "compatibilityNotes": "Highlights tenant-property alignment"
        },
        "psychologicalElements": [
            "Labor Illusion: Shows work being done to increase perceived value",
            "Endowed Progress Effect: Gamified profiling with tenant 'leveling up'",
            "Loss Aversion: Urgency badges to prevent landlord procrastination",
            "Barnum Effect: Personalized feedback during profiling"
        ]
    }
    return jsonify(format_response_keys(explanation))

@app.route('/concierge/simulate-work', methods=['GET'])
def simulate_concierge_work():
    """Simulate concierge work animation"""
    engine = ConciergeRecommendationEngine()
    animations = random.sample(engine.work_animations, 5)
    
    return jsonify(format_response_keys({
        "conciergeWork": animations,
        "estimatedTime": "5-10 seconds",
        "purpose": "Labor illusion to increase perceived value"
    }))

if __name__ == '__main__':
    print("\n" + "="*80)
    print("🏠 LIVORA CONCIERGE MATCHMAKING API")
    print("   Psychology-Driven Property Matching with Strategic Presentation")
    print("="*80)
    print("\n🎯 CORE INNOVATIONS:")
    print("   ✓ Shift from search engine to concierge model")
    print("   ✓ Psychology-driven presentation (Decoy Effect)")
    print("   ✓ Comprehensive lifestyle profiling")
    print("   ✓ Tenant resume for qualified landlord leads")
    
    print(f"\n📊 DATA SUMMARY:")
    print(f"   Properties loaded from properties.py: {len(properties)}")
    if len(properties_df) > 0:
        print(f"   Price Range: ₱{properties_df['price'].min():,} - ₱{properties_df['price'].max():,}")
        print(f"   Average Price: ₱{properties_df['price'].mean():,.0f}")
        print(f"   Property Types: {', '.join(properties_df['type'].unique())}")
    
    print("\n🧠 PSYCHOLOGY ELEMENTS:")
    print("   Labor Illusion: Showing work to increase perceived value")
    print("   Decoy Effect: Strategic option presentation")
    print("   Urgency Badges: 48-hour tenant profile expiry")
    print("   Tenant RPG: Gamified profiling experience")
    
    print("\n📡 ENDPOINTS:")
    print("  POST /recommend               - Get concierge-curated recommendations")
    print("  GET  /properties              - List all properties")
    print("  GET  /properties/<id>         - Get single property details")
    print("  GET  /health                  - Health check")
    print("  GET  /concierge/explain       - Explain the concierge framework")
    print("  GET  /concierge/simulate-work - See concierge work animation")
    
    print("\n🎯 RESPONSE FEATURES:")
    print("   ✓ Curated presentation (Safe Bet | Stretch | Wildcard)")
    print("   ✓ Comprehensive lifestyle compatibility assessment")
    print("   ✓ Detailed commute analysis and cost calculations")
    print("   ✓ Tenant resume with urgency badge for landlords")
    print("   ✓ Value proposition scoring for each property")
    print("="*80)
    
    app.run(debug=True, port=5000, host='0.0.0.0')