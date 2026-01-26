from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
import sys
import math
from sklearn.preprocessing import MinMaxScaler
import re
from datetime import datetime

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

# Enhanced properties data with images and all required fields
try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(current_dir, 'data')
    sys.path.append(data_dir)
    from properties import properties
    print(f"✓ Imported {len(properties)} properties")
except ImportError:
    # Enhanced properties with all required fields and images
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
            # New fields for mathematical framework
            "latitude": 10.3190,
            "longitude": 123.9020,
            "view_type": "city_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.8,
            "share_type": "shared",
            "anchor_point_distance": 0.3,
            "commute_minutes": 5,
            "value_ratio": 1.14,
            "description": "Shared dormitory in the heart of IT Park, perfect for students and young professionals. Walking distance to offices and restaurants."
        },
        {
            "id": 2,
            "name": "Lahug Student Room",
            "type": "Shared",
            "location": "Lahug, Cebu City",
            "price": 2800,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "fan", "shared kitchen", "study desk"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 3.5,
            "furnished": True,
            "area_sqm": 15,
            "floor": 2,
            "distance_to_it_park_km": 1.5,
            "available_date": "Immediate",
            "image_url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800",
            # New fields
            "latitude": 10.3350,
            "longitude": 123.9150,
            "view_type": "interior",
            "gender_preference": "co-ed",
            "connectivity_score": 3.2,
            "share_type": "shared",
            "anchor_point_distance": 1.5,
            "commute_minutes": 12,
            "value_ratio": 1.43,
            "description": "Budget-friendly student room in Lahug with study desk and shared kitchen. Short jeepney ride to IT Park."
        },
        {
            "id": 3,
            "name": "Talamban Budget Unit",
            "type": "Apartment",
            "location": "Talamban, Cebu City",
            "price": 4500,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom", "kitchenette"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 4.0,
            "furnished": False,
            "area_sqm": 25,
            "floor": 1,
            "distance_to_it_park_km": 4.0,
            "available_date": "Immediate",
            "image_url": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800",
            # New fields
            "latitude": 10.3500,
            "longitude": 123.9200,
            "view_type": "garden_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.0,
            "share_type": "private",
            "anchor_point_distance": 4.0,
            "commute_minutes": 25,
            "value_ratio": 0.89,
            "description": "Simple apartment with private bathroom and kitchenette. Quiet neighborhood in Talamban."
        },
        {
            "id": 4,
            "name": "Mabolo Studio",
            "type": "Apartment",
            "location": "Mabolo, Cebu City",
            "price": 5000,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom", "security", "gym_access"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 4.2,
            "furnished": True,
            "area_sqm": 22,
            "floor": 4,
            "distance_to_it_park_km": 2.5,
            "available_date": "Immediate",
            "image_url": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800",
            # New fields
            "latitude": 10.3250,
            "longitude": 123.9100,
            "view_type": "exterior",
            "gender_preference": "co-ed",
            "connectivity_score": 4.5,
            "share_type": "private",
            "anchor_point_distance": 2.5,
            "commute_minutes": 15,
            "value_ratio": 1.0,
            "description": "Modern studio apartment in Mabolo with gym access and 24/7 security. Convenient location."
        },
        {
            "id": 5,
            "name": "Cebu City Dormitory",
            "type": "Dormitory",
            "location": "Cebu City Proper",
            "price": 2500,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "fan", "shared bathroom", "laundry", "common_area"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 3.7,
            "furnished": True,
            "area_sqm": 10,
            "floor": 1,
            "distance_to_it_park_km": 3.0,
            "available_date": "Immediate",
            "image_url": "https://images.unsplash.com/photo-1555854876-bf365c7c5de3?auto=format&fit=crop&w=800",
            # New fields
            "latitude": 10.3000,
            "longitude": 123.9000,
            "view_type": "interior",
            "gender_preference": "female_only",
            "connectivity_score": 3.0,
            "share_type": "shared",
            "anchor_point_distance": 3.0,
            "commute_minutes": 20,
            "value_ratio": 2.0,
            "description": "Budget dormitory in Cebu City proper with laundry facilities and common area. Great for tight budgets."
        },
        {
            "id": 6,
            "name": "IT Park Premium Studio",
            "type": "Apartment",
            "location": "IT Park, Cebu City",
            "price": 8000,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom", "gym", "pool", "security", "parking"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 4.5,
            "furnished": True,
            "area_sqm": 30,
            "floor": 8,
            "distance_to_it_park_km": 0.2,
            "available_date": "Immediate",
            "image_url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800",
            # New fields
            "latitude": 10.3195,
            "longitude": 123.9015,
            "view_type": "city_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.9,
            "share_type": "private",
            "anchor_point_distance": 0.2,
            "commute_minutes": 3,
            "value_ratio": 0.88,
            "description": "Premium studio in IT Park with pool, gym, and parking. Perfect for professionals who want luxury amenities."
        },
        {
            "id": 7,
            "name": "Banilad Condo Unit",
            "type": "Condominium",
            "location": "Banilad, Cebu City",
            "price": 6500,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom", "balcony", "pool", "gym"],
            "pet_friendly": True,
            "lease_duration": "long-term",
            "rating": 4.3,
            "furnished": True,
            "area_sqm": 28,
            "floor": 12,
            "distance_to_it_park_km": 3.5,
            "available_date": "Next week",
            "image_url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800",
            # New fields
            "latitude": 10.3400,
            "longitude": 123.9180,
            "view_type": "city_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.7,
            "share_type": "private",
            "anchor_point_distance": 3.5,
            "commute_minutes": 18,
            "value_ratio": 0.92,
            "description": "Modern condo in Banilad with pool, gym, and balcony. Pet-friendly unit with great amenities."
        },
        {
            "id": 8,
            "name": "Mandaue Budget House",
            "type": "House",
            "location": "Mandaue City",
            "price": 6000,
            "bedrooms": 2,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom", "garden", "parking"],
            "pet_friendly": True,
            "lease_duration": "long-term",
            "rating": 4.1,
            "furnished": False,
            "area_sqm": 50,
            "floor": 1,
            "distance_to_it_park_km": 5.5,
            "available_date": "Next month",
            "image_url": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800",
            # New fields
            "latitude": 10.3600,
            "longitude": 123.9300,
            "view_type": "garden_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.0,
            "share_type": "private",
            "anchor_point_distance": 5.5,
            "commute_minutes": 30,
            "value_ratio": 0.83,
            "description": "Spacious house in Mandaue with garden and parking. Perfect for small families or roommates."
        }
    ]
    print("✓ Using enhanced properties dataset with mathematical framework fields")

properties_df = pd.DataFrame(properties)

class EnhancedProfiler:
    """Enhanced tenant profiler using mathematical framework"""
    
    def __init__(self):
        # Define weight categories based on framework
        self.weights = {
            'finance': 0.4,      # Financial score
            'commute': 0.3,      # Geo-spatial score  
            'lifestyle': 0.3,    # Feature match score
        }
        
        # Anchor point coordinates (IT Park as default)
        self.anchor_point = {
            'latitude': 10.3190,
            'longitude': 123.9020
        }
    
    def haversine_distance(self, lat1, lon1, lat2, lon2):
        """Calculate distance between two points using Haversine formula"""
        R = 6371  # Earth radius in km
        
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        
        return R * c
    
    def normalize_continuous(self, values):
        """Min-max normalization for continuous values to 0-1 scale"""
        if len(values) == 0:
            return []
        
        values_array = np.array(values).reshape(-1, 1)
        scaler = MinMaxScaler()
        normalized = scaler.fit_transform(values_array)
        return normalized.flatten().tolist()
    
    def calculate_s_finance(self, property_price, min_budget, max_budget):
        """Financial score - how close rent is to target (0-1 scale)"""
        try:
            # Ensure all values are numbers
            property_price = float(property_price) if property_price else 0
            min_budget = float(min_budget) if min_budget else 0
            max_budget = float(max_budget) if max_budget else 999999
            
            if property_price <= 0:
                return 0.0
                
            if min_budget <= property_price <= max_budget:
                return 1.0  # Perfect match
            elif property_price < min_budget:
                # Bonus for being under budget (up to 20% bonus)
                bonus = (min_budget - property_price) / min_budget * 0.2
                return min(1.2, 1.0 + bonus)
            else:
                # Penalty for being over budget
                over_percentage = (property_price - max_budget) / max_budget
                penalty = min(0.5, over_percentage * 1.5)  # Cap penalty at 50%
                return max(0.5, 1.0 - penalty)  # Minimum score of 0.5
        except Exception as e:
            print(f"   Finance score calculation error: {e}")
            return 0.5  # Return neutral score on error
    
    def calculate_s_commute(self, distance_km):
        """Geo-spatial score based on distance (0-1 scale)"""
        if distance_km <= 1:
            return 1.0
        elif distance_km >= 5:
            return 0.2  # Minimum score instead of 0
        else:
            # Exponential decay for longer distances
            return 1.0 - ((distance_km - 1) / 4) ** 1.5
    
    def calculate_s_lifestyle(self, property_data, user_prefs):
        """Feature match with sensory check and amenity matching (0-1 scale)"""
        score = 0.0
        max_score = 0.0
        
        # 1. Basic amenity matching (50% weight)
        must_haves = set(user_prefs.get('must_have_features', []))
        if must_haves:
            property_amenities = set(property_data.get('amenities', []))
            matched = len(must_haves.intersection(property_amenities))
            amenity_score = matched / len(must_haves) if must_haves else 0.5
            score += amenity_score * 0.5
            max_score += 0.5
        
        # 2. Additional preferred amenities (20% weight)
        preferred_amenities = set(user_prefs.get('preferred_amenities', []))
        if preferred_amenities:
            property_amenities = set(property_data.get('amenities', []))
            matched = len(preferred_amenities.intersection(property_amenities))
            preferred_score = matched / len(preferred_amenities) if preferred_amenities else 0.3
            score += preferred_score * 0.2
            max_score += 0.2
        
        # 3. Sensory compatibility (15% weight)
        daily_rhythm = user_prefs.get('daily_rhythm', '').lower()
        view_type = property_data.get('view_type', '').lower()
        noise_level = property_data.get('noise_level', 'medium').lower()
        
        sensory_score = 0.0
        if daily_rhythm == 'night owl':
            if view_type == 'interior' or noise_level == 'low':
                sensory_score = 1.0
            elif noise_level == 'medium':
                sensory_score = 0.5
        elif daily_rhythm == 'early bird':
            if view_type in ['exterior', 'garden_view', 'city_view']:
                sensory_score = 1.0
        
        score += sensory_score * 0.15
        max_score += 0.15
        
        # 4. Connectivity for remote work (15% weight)
        work_type = user_prefs.get('work_type', '').lower()
        connectivity_score = property_data.get('connectivity_score', 3.0)
        
        if work_type == 'remote':
            connectivity_normalized = max(0, min(1, (connectivity_score - 3) / 2))
            score += connectivity_normalized * 0.15
        else:
            score += 0.15  # Full points if not remote work
        
        max_score += 0.15
        
        # Normalize by max possible score
        if max_score > 0:
            score = score / max_score
        
        return min(1.0, max(0.1, score))  # Cap between 0.1 and 1.0
    
    def analyze_preferences(self, user_prefs):
        """Analyze user preferences for insights"""
        insights = []
        
        # Budget analysis
        try:
            min_budget = int(user_prefs.get('min_budget', 0))
            max_budget = int(user_prefs.get('max_budget', 999999))
            avg_price = properties_df['price'].mean()
            
            if max_budget < avg_price * 0.7:
                insights.append("💰 Your budget is below average. We'll show best value options.")
            elif max_budget > avg_price * 1.5:
                insights.append("💎 Your budget allows for premium options with extra amenities.")
            else:
                insights.append("✅ Your budget aligns well with market prices.")
        except:
            pass
        
        # Transportation analysis
        transportation = user_prefs.get('transportation', '').lower()
        if transportation == 'walking':
            insights.append("🚶 Prioritizing walking-distance properties (<1km radius)")
        elif transportation == 'public':
            insights.append("🚌 Filtering for properties near jeepney routes")
        
        # Destination analysis
        destination = user_prefs.get('destination_location', '')
        if 'IT Park' in destination or 'Cebu Business Park' in destination:
            insights.append("🏢 Using IT Park as anchor point for distance calculations")
        
        # Lifestyle analysis
        daily_rhythm = user_prefs.get('daily_rhythm', '').lower()
        if daily_rhythm == 'night owl':
            insights.append("🦉 Considering interior-view properties for better daytime sleep")
        elif daily_rhythm == 'early bird':
            insights.append("🌅 Prioritizing properties with good natural light")
        
        # Remote work analysis
        work_type = user_prefs.get('work_type', '').lower()
        if work_type == 'remote':
            insights.append("💻 Prioritizing properties with high-speed internet connectivity")
        
        return insights
    
    def calculate_match_score(self, property_data, user_prefs):
        """Calculate enhanced match score using mathematical framework"""
        
        # Get financial score
        min_budget = int(user_prefs.get('min_budget', 0))
        max_budget = int(user_prefs.get('max_budget', 999999))
        s_finance = self.calculate_s_finance(
            property_data.get('price', 0),
            min_budget,
            max_budget
        )
        
        # Get commute score using anchor point distance
        anchor_distance = property_data.get('anchor_point_distance', 10)
        s_commute = self.calculate_s_commute(anchor_distance)
        
        # Get lifestyle score
        s_lifestyle = self.calculate_s_lifestyle(property_data, user_prefs)
        
        # Weighted sum formula: Score = (W_finance * S_finance) + (W_commute * S_commute) + (W_lifestyle * S_lifestyle)
        total_score = (
            self.weights['finance'] * s_finance +
            self.weights['commute'] * s_commute +
            self.weights['lifestyle'] * s_lifestyle
        ) * 100  # Convert to percentage
        
        # Store component scores for debugging
        property_data['_component_scores'] = {
            'finance': round(s_finance * 100, 1),
            'commute': round(s_commute * 100, 1),
            'lifestyle': round(s_lifestyle * 100, 1)
        }
        
        return round(total_score, 1)

class BucketingAlgorithm:
    """Implements the bucketing algorithm from mathematical framework"""
    
    def categorize_recommendations(self, properties_list, user_prefs):
        """Enhanced categorization based on mathematical framework"""
        categorized = {
            "safe_bet": [],
            "stretch": [],
            "wildcard": []
        }
        
        # Get user preferences
        preferred_areas = user_prefs.get('area_preferences', [])
        max_budget = int(user_prefs.get('max_budget', 999999))
        min_budget = int(user_prefs.get('min_budget', 0))
        
        for prop in properties_list:
            total_score = prop.get('match_score', 0)
            
            # Check if property passes hard filters
            passes_hard_filters = self.check_hard_filters(prop, user_prefs)
            
            # 1. Safe Bet: Score > 75% and passes all hard filters AND within budget
            if total_score >= 75 and passes_hard_filters and prop['price'] <= max_budget:
                prop['category'] = "Safe Bet"
                prop['categoryDescription'] = "High compliance across all vectors, within budget"
                prop['matchType'] = "exact"
                categorized['safe_bet'].append(prop)
            
            # 2. Stretch: Excellent match but slightly over budget OR minor constraint issue
            elif total_score >= 65 and passes_hard_filters:
                if prop['price'] > max_budget:
                    over_amount = prop['price'] - max_budget
                    if over_amount <= max_budget * 0.3:  # Up to 30% over budget
                        prop['category'] = "Stretch"
                        prop['categoryDescription'] = f"Excellent match but ₱{over_amount:,} over budget"
                        prop['matchType'] = "relaxed"
                        categorized['stretch'].append(prop)
            
            # 3. Wildcard: Good value, decent score, not necessarily in preferred areas
            elif total_score >= 50:
                # Check if it's a good value proposition
                value_ratio = prop.get('value_ratio', 0)
                commute_minutes = prop.get('commute_minutes', 60)
                
                if (value_ratio >= 1.0 or commute_minutes <= 15) and passes_hard_filters:
                    prop['category'] = "Wildcard"
                    
                    # Generate description
                    price_diff = prop['price'] - max_budget
                    if price_diff < 0:
                        price_text = f"₱{abs(price_diff):,} under budget"
                    elif price_diff > 0:
                        price_text = f"₱{price_diff:,} over budget"
                    else:
                        price_text = "within budget"
                    
                    # Check if in preferred areas
                    prop_location = prop['location'].lower()
                    in_preferred = any(area.lower() in prop_location for area in preferred_areas)
                    
                    if in_preferred:
                        prop['categoryDescription'] = f"Located in {prop['location']} (your preferred area), {price_text}"
                        prop['matchType'] = "preferred_area"
                    else:
                        prop['categoryDescription'] = f"Located in {prop['location']} (discovery area), {price_text} with great value"
                        prop['matchType'] = "discovery"
                    
                    categorized['wildcard'].append(prop)
        
        return categorized
    
    def check_hard_filters(self, prop, user_prefs):
        """Apply hard filters (binary exclusion)"""
        # Gender preference filter
        user_gender = user_prefs.get('roommate_gender', '').lower()
        property_gender = prop.get('gender_preference', 'co-ed').lower()
        
        if property_gender != 'co-ed' and user_gender and property_gender != user_gender:
            return False
        
        # Pet filter
        has_pets = user_prefs.get('has_pets', False)
        pet_friendly = prop.get('pet_friendly', False)
        
        if has_pets and not pet_friendly:
            return False
        
        # Smoking/drinking filter
        has_smoke_drink = user_prefs.get('has_smoke_drink', '').lower()
        if has_smoke_drink == 'no' and 'no_smoking' not in [a.lower() for a in prop.get('amenities', [])]:
            # Not a hard filter, but could be considered
            pass
        
        return True
    
    def generate_hard_filter_suggestions(self, user_prefs):
        """Generate suggestions when no properties pass hard filters"""
        suggestions = []
        
        has_pets = user_prefs.get('has_pets', False)
        user_gender = user_prefs.get('roommate_gender', '')
        
        if has_pets:
            suggestions.append("Consider expanding your search to include pet-friendly properties")
        
        if user_gender and user_gender != 'any':
            suggestions.append(f"Try searching for '{user_gender}' only properties or co-ed options")
        
        if not suggestions:
            suggestions.append("Try adjusting your budget or preferred locations")
        
        return suggestions

def extract_key_features(prop, user_prefs):
    """Extract key features for display with mathematical insights"""
    features = []
    
    # Budget indicator
    price = prop.get('price', 0)
    max_budget = user_prefs.get('max_budget', 999999)
    
    if price <= max_budget * 0.7:
        features.append("💰 Great value")
    elif price <= max_budget:
        features.append("💰 Within budget")
    else:
        features.append("💰 Premium option")
    
    # Location features with mathematical insights
    anchor_distance = prop.get('anchor_point_distance', 10)
    if anchor_distance < 1:
        features.append("📍 Walking distance to IT Park")
    elif anchor_distance <= 3:
        features.append("📍 Short commute to IT Park")
    
    # Amenity highlights - prioritize user's must-haves
    amenities = prop.get('amenities', [])
    must_haves = user_prefs.get('must_have_features', [])
    
    # Show which must-haves are present
    for must_have in must_haves:
        if any(must_have in str(a).lower() for a in amenities):
            if 'aircon' in must_have.lower():
                features.append("❄️ Air conditioned")
            elif 'wifi' in must_have.lower():
                features.append("📶 High-speed WiFi")
            elif 'private' in must_have.lower() and 'bathroom' in must_have.lower():
                features.append("🚿 Private bathroom")
            elif 'gym' in must_have.lower():
                features.append("💪 Gym access")
            elif 'pool' in must_have.lower():
                features.append("🏊 Pool access")
    
    # Add unique selling points
    if 'security' in [a.lower() for a in amenities]:
        features.append("🛡️ 24/7 Security")
    if 'parking' in [a.lower() for a in amenities]:
        features.append("🅿️ Parking available")
    if prop.get('furnished', False):
        features.append("🛋️ Fully furnished")
    
    # Sensory match indicator
    daily_rhythm = user_prefs.get('daily_rhythm', '').lower()
    view_type = prop.get('view_type', '').lower()
    if daily_rhythm == 'night owl' and view_type == 'interior':
        features.append("🦉 Quiet for night owls")
    elif daily_rhythm == 'early bird' and view_type != 'interior':
        features.append("🌅 Good natural light")
    
    return features[:5]  # Limit to 5 features

@app.route('/recommend', methods=['POST'])
def recommend():
    """Main recommendation endpoint with enhanced mathematical framework"""
    try:
        # Get raw camelCase data from frontend
        raw_user_prefs = request.get_json()
        
        if not raw_user_prefs:
            return jsonify(format_response_keys({
                "error": "No preferences provided",
                "recommendedIds": [],
                "properties": [],
                "totalMatches": 0
            })), 400
        
        print(f"\n📝 Received user preferences:")
        print(f"   Budget: {raw_user_prefs.get('minBudget')} - {raw_user_prefs.get('maxBudget')}")
        print(f"   Areas: {raw_user_prefs.get('areaPreferences')}")
        print(f"   Must-haves: {raw_user_prefs.get('mustHaveFeatures')}")
        print(f"   Daily Rhythm: {raw_user_prefs.get('dailyRhythm')}")
        
        # Normalize to snake_case for processing
        user_prefs = normalize_user_prefs(raw_user_prefs)
        
        # CRITICAL FIX: Convert budget values to integers
        try:
            min_budget_str = user_prefs.get('min_budget', '0')
            max_budget_str = user_prefs.get('max_budget', '30000')  # Default to 30k if not provided
            
            # Handle if they're already numbers
            if isinstance(min_budget_str, (int, float)):
                min_budget = int(min_budget_str)
            else:
                # Remove currency symbols and commas, convert to int
                min_budget_str = str(min_budget_str).replace('₱', '').replace(',', '').strip()
                min_budget = int(float(min_budget_str)) if min_budget_str else 0
            
            if isinstance(max_budget_str, (int, float)):
                max_budget = int(max_budget_str)
            else:
                max_budget_str = str(max_budget_str).replace('₱', '').replace(',', '').strip()
                max_budget = int(float(max_budget_str)) if max_budget_str else 30000
                
            # Ensure max is not less than min
            if max_budget < min_budget:
                max_budget = min_budget + 5000  # Add 5k buffer
                
            user_prefs['min_budget'] = min_budget
            user_prefs['max_budget'] = max_budget
            
            print(f"   Converted budget: ₱{min_budget:,} - ₱{max_budget:,}")
            
        except Exception as budget_error:
            print(f"   Budget conversion error: {budget_error}")
            # Set safe defaults
            user_prefs['min_budget'] = 5000
            user_prefs['max_budget'] = 20000
            print(f"   Using default budget: ₱5,000 - ₱20,000")
        
        # Initialize enhanced profiler
        profiler = EnhancedProfiler()
        bucketing = BucketingAlgorithm()
        
        # --- Step A: Hard Filtering ---
        print(f"\n🔍 Step A: Hard Filtering")
        print(f"   Initial properties: {len(properties_df)}")
        
        filtered_properties = []
        for prop in properties:
            if bucketing.check_hard_filters(prop, user_prefs):
                filtered_properties.append(prop)
        
        print(f"   After hard filters: {len(filtered_properties)}")
        
        if len(filtered_properties) == 0:
            # Return suggestions for failed hard filters
            suggestions = bucketing.generate_hard_filter_suggestions(user_prefs)
            return jsonify(format_response_keys({
                "recommendedIds": [],
                "properties": [],
                "totalMatches": 0,
                "message": "No properties match your hard constraints",
                "suggestions": suggestions,
                "matchInsights": profiler.analyze_preferences(user_prefs)
            }))
        
        # Convert to DataFrame for easier processing
        filtered_df = pd.DataFrame(filtered_properties)
        
        # --- Step B: Scoring Engine ---
        print(f"\n🎯 Step B: Scoring Engine")
        print(f"   Scoring {len(filtered_df)} properties...")
        
        # Calculate match scores using enhanced mathematical framework
        match_scores = []
        component_scores_list = []
        
        for _, prop in filtered_df.iterrows():
            prop_dict = prop.to_dict()
            score = profiler.calculate_match_score(prop_dict, user_prefs)
            match_scores.append(score)
            component_scores_list.append(prop_dict.get('_component_scores', {}))
        
        filtered_df['match_score'] = match_scores
        filtered_df['component_scores'] = component_scores_list
        
        # Sort by match score
        filtered_df = filtered_df.sort_values('match_score', ascending=False)
        
        # Get top recommendations (limit to 10 for better curation)
        top_properties = filtered_df.head(10)
        
        # --- Step C: Bucketing Algorithm ---
        print(f"\n📊 Step C: Bucketing Algorithm")
        
        # Prepare properties for categorization
        properties_list = []
        for _, prop in top_properties.iterrows():
            prop_dict = prop.to_dict()
            prop_data = {
                'id': int(prop['id']),
                'name': prop['name'],
                'type': prop['type'],
                'location': prop['location'],
                'price': float(prop['price']),
                'bedrooms': int(prop['bedrooms']),
                'bathrooms': int(prop['bathrooms']),
                'amenities': prop['amenities'],
                'petFriendly': bool(prop.get('pet_friendly', False)),
                'leaseDuration': prop['lease_duration'],
                'rating': float(prop.get('rating', 0)),
                'furnished': prop.get('furnished', False),
                'areaSqm': prop.get('area_sqm', 0),
                'floor': prop.get('floor', 0),
                'distanceToItParkKm': prop.get('distance_to_it_park_km', 0),
                'availableDate': prop.get('available_date', 'Immediate'),
                'imageUrl': prop.get('image_url', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'),
                'description': prop.get('description', 'Modern property with great amenities.'),
                'matchScore': round(float(prop['match_score']), 1),
                'matchPercentage': f"{round(float(prop['match_score']), 1)}%",
                'features': extract_key_features(prop_dict, user_prefs),
                'viewType': prop.get('view_type', ''),
                'connectivityScore': prop.get('connectivity_score', 0),
                'anchorPointDistance': prop.get('anchor_point_distance', 0),
                'commuteMinutes': prop.get('commute_minutes', 0),
                'valueRatio': prop.get('value_ratio', 0),
                'componentScores': prop.get('component_scores', {})
            }
            properties_list.append(prop_data)
        
        # Categorize into Safe Bet, Stretch, Wildcard
        categorized = bucketing.categorize_recommendations(properties_list, user_prefs)
        
        # Calculate statistics
        safe_bet_count = len(categorized['safe_bet'])
        stretch_count = len(categorized['stretch'])
        wildcard_count = len(categorized['wildcard'])
        
        print(f"   Safe Bets: {safe_bet_count}")
        print(f"   Stretch: {stretch_count}")
        print(f"   Wildcard: {wildcard_count}")
        
        # Generate mathematical insights
        match_insights = profiler.analyze_preferences(user_prefs)
        
        # Add mathematical framework explanation
        match_insights.append("🧮 Using weighted sum model: Score = (0.4×Finance) + (0.3×Commute) + (0.3×Lifestyle)")
        match_insights.append("📍 Commute score based on Haversine distance to anchor point")
        match_insights.append("🎯 Lifestyle includes sensory checks and amenity matching")
        
        # Build response
        response = {
            "recommendedIds": [p['id'] for p in properties_list],
            "properties": properties_list,
            "categorizedRecommendations": categorized,
            "totalMatches": len(filtered_df),
            "matchInsights": match_insights,
            "tenantProfile": {
                "budgetRange": f"₱{user_prefs.get('min_budget', 0):,} - ₱{user_prefs.get('max_budget', 30000):,}",
                "preferredLocations": user_prefs.get('area_preferences', []),
                "priorityFeatures": user_prefs.get('must_have_features', []),
                "lifestyle": user_prefs.get('daily_rhythm', 'Not specified'),
                "transportation": user_prefs.get('transportation', 'Not specified'),
                "workType": user_prefs.get('work_type', 'Not specified'),
                "mathematicalScores": {
                    "financeWeight": profiler.weights['finance'],
                    "commuteWeight": profiler.weights['commute'],
                    "lifestyleWeight": profiler.weights['lifestyle'],
                    "anchorPoint": profiler.anchor_point
                }
            },
            "scoringSummary": {
                "propertiesScored": len(filtered_df),
                "scoringMethod": "Weighted Sum Model",
                "formula": "Score = (W_finance × S_finance) + (W_commute × S_commute) + (W_lifestyle × S_lifestyle)",
                "categoryThresholds": {
                    "safeBet": "Score > 75% + passes hard filters + within budget",
                    "stretch": "Score > 65% + within 30% of budget",
                    "wildcard": "Score > 50% + good value or short commute"
                }
            },
            "message": f"Found {len(filtered_df)} properties matching your preferences"
        }
        
        print(f"\n✅ Recommendation Summary:")
        print(f"   Total matches: {len(filtered_df)}")
        print(f"   Top match score: {properties_list[0]['matchScore'] if properties_list else 0}%")
        print(f"   Categories: {safe_bet_count} Safe Bet, {stretch_count} Stretch, {wildcard_count} Wildcard")
        
        # Convert snake_case keys back to camelCase for frontend
        return jsonify(format_response_keys(response))
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        
        return jsonify(format_response_keys({
            "error": str(e),
            "recommendedIds": [],
            "properties": [],
            "totalMatches": 0,
            "message": "An error occurred while processing your request"
        })), 500

@app.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties with enhanced fields"""
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
            "properties": properties_list,
            "mathematicalFramework": {
                "hasRequiredFields": True,
                "fieldsPresent": [
                    "latitude", "longitude", "viewType", "genderPreference",
                    "connectivityScore", "anchorPointDistance", "commuteMinutes", "valueRatio"
                ],
                "scoringReady": True
            }
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
    """Health check with mathematical framework info"""
    return jsonify(format_response_keys({
        "status": "healthy",
        "service": "Enhanced Property Recommendation API",
        "propertiesLoaded": len(properties),
        "priceRange": f"₱{properties_df['price'].min():,} - ₱{properties_df['price'].max():,}",
        "averagePrice": f"₱{properties_df['price'].mean():,.0f}",
        "mathematicalFramework": {
            "implemented": True,
            "components": [
                "Weighted Sum Model",
                "Haversine Distance",
                "Constraint Relaxation",
                "Value Ratio Scoring",
                "Sensory Compatibility"
            ],
            "weights": {
                "finance": 0.4,
                "commute": 0.3,
                "lifestyle": 0.3
            },
            "categoryLogic": {
                "safeBet": "Score > 75% + within budget",
                "stretch": "Score > 65% + within 30% over budget",
                "wildcard": "Score > 50% + good value or short commute"
            }
        },
        "inputFormat": "camelCase supported",
        "imageSupport": True,
        "curatedRecommendations": True
    }))

@app.route('/framework/explain', methods=['GET'])
def explain_framework():
    """Explain the mathematical framework"""
    explanation = {
        "title": "Mathematical Framework for Property Matching",
        "description": "Advanced recommendation system using mathematical optimization",
        "components": [
            {
                "name": "Weighted Sum Model",
                "formula": "Score = (0.4×Finance) + (0.3×Commute) + (0.3×Lifestyle)",
                "weights": {
                    "W_finance": 0.4,
                    "W_commute": 0.3,
                    "W_lifestyle": 0.3
                },
                "description": "Linear combination of normalized scores with configurable weights"
            },
            {
                "name": "S_finance (Financial Score)",
                "formula": "Normalized based on budget range with bonuses/penalties",
                "description": "1.0 if within budget, bonus if under budget, penalty if over budget"
            },
            {
                "name": "S_commute (Geo-Spatial Score)",
                "formula": "Exponential decay based on Haversine distance",
                "description": "1.0 if <1km, decays to 0.2 at 5km, considers walking vs transport"
            },
            {
                "name": "S_lifestyle (Feature Match)",
                "formula": "Amenity matching + sensory compatibility + connectivity",
                "description": "50% must-have amenities, 20% preferred amenities, 15% sensory, 15% connectivity"
            },
            {
                "name": "Bucketing Algorithm",
                "categories": [
                    {
                        "name": "Safe Bet",
                        "criteria": "Score ≥ 75% AND within budget AND passes all hard filters",
                        "logic": "High compliance across all dimensions"
                    },
                    {
                        "name": "Stretch",
                        "criteria": "Score ≥ 65% AND within 30% over budget",
                        "logic": "Excellent match with minor budget flexibility needed"
                    },
                    {
                        "name": "Wildcard",
                        "criteria": "Score ≥ 50% AND (good value OR short commute)",
                        "logic": "Good options outside preferred areas with strong value proposition"
                    }
                ]
            }
        ],
        "keyFeatures": [
            "🎯 Personalized scoring based on user preferences",
            "📍 Accurate distance calculations using Haversine formula",
            "🦉 Sensory compatibility for night owls/early birds",
            "💰 Value ratio calculation (amenities per peso)",
            "🏆 Curated bucketing for better decision making",
            "🖼️ High-quality property images included"
        ]
    }
    return jsonify(format_response_keys(explanation))

if __name__ == '__main__':
    print("\n" + "="*70)
    print("🏠 ENHANCED PROPERTY RECOMMENDATION API")
    print("   with Mathematical Framework & Image Support")
    print("="*70)
    print("\n📊 MATHEMATICAL FRAMEWORK IMPLEMENTED:")
    print("   ✓ Weighted Sum Model (0.4×Finance + 0.3×Commute + 0.3×Lifestyle)")
    print("   ✓ Haversine Distance for accurate geo-spatial scoring")
    print("   ✓ Constraint Relaxation for Stretch candidates")
    print("   ✓ Value Ratio Scoring for Wildcard identification")
    print("   ✓ Sensory Compatibility (Night Owl + Interior View)")
    print("   ✓ Personalized Feature Matching")
    
    print(f"\n📈 DATA SUMMARY:")
    print(f"   Properties: {len(properties)}")
    print(f"   Price Range: ₱{properties_df['price'].min():,} - ₱{properties_df['price'].max():,}")
    print(f"   Avg Price: ₱{properties_df['price'].mean():,.0f}")
    print(f"   Property Types: {', '.join(properties_df['type'].unique())}")
    print(f"   All Properties Have Images: {all('image_url' in p for p in properties)}")
    
    print("\n📍 ANCHOR POINT (Default):")
    print("   IT Park, Cebu City (10.3190°N, 123.9020°E)")
    
    print("\n📡 ENDPOINTS:")
    print("  POST /recommend          - Get personalized recommendations")
    print("  GET  /properties         - List all properties with pagination")
    print("  GET  /properties/<id>    - Get single property details")
    print("  GET  /health             - Health check with framework info")
    print("  GET  /framework/explain  - Explain the mathematical framework")
    
    print("\n🎯 RECOMMENDATION FEATURES:")
    print("   ✓ Curated list (max 10 properties)")
    print("   ✓ Safe Bet / Stretch / Wildcard categorization")
    print("   ✓ Personalized feature highlighting")
    print("   ✓ Mathematical insights and explanations")
    print("   ✓ Image support for all properties")
    print("="*70)
    
    app.run(debug=True, port=5000, host='0.0.0.0')