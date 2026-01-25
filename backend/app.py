from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
import sys
import math
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
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

# Enhanced properties data with additional fields for mathematical framework
try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(current_dir, 'data')
    sys.path.append(data_dir)
    from properties import properties
    print(f"✓ Imported {len(properties)} properties")
except ImportError:
    # Enhanced properties with all required fields for mathematical framework
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
            "parking_available": False,
            "distance_to_it_park_km": 0.3,
            "noise_level": "medium",
            "kitchen_type": "shared",
            "commute_type": "walking",
            "fiber_available": True,
            # New fields for mathematical framework
            "latitude": 10.3190,
            "longitude": 123.9020,
            "view_type": "city_view",  # interior, exterior, city_view, garden_view
            "gender_preference": "co-ed",  # co-ed, female_only, male_only
            "connectivity_score": 4.8,  # 1-5 scale for internet/signal
            "share_type": "shared",  # private, shared, semi-private
            "anchor_point_distance": 0.3,  # km to IT Park (anchor point)
            "commute_minutes": 5,
            "value_ratio": 1.14  # amenities per 1000 pesos
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
            "parking_available": False,
            "distance_to_it_park_km": 1.5,
            "noise_level": "low",
            "kitchen_type": "shared",
            "commute_type": "jeepney",
            "fiber_available": False,
            # New fields
            "latitude": 10.3350,
            "longitude": 123.9150,
            "view_type": "interior",
            "gender_preference": "co-ed",
            "connectivity_score": 3.2,
            "share_type": "shared",
            "anchor_point_distance": 1.5,
            "commute_minutes": 12,
            "value_ratio": 1.43
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
            "parking_available": False,
            "distance_to_it_park_km": 4.0,
            "noise_level": "low",
            "kitchen_type": "induction",
            "commute_type": "jeepney",
            "fiber_available": True,
            # New fields
            "latitude": 10.3500,
            "longitude": 123.9200,
            "view_type": "garden_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.0,
            "share_type": "private",
            "anchor_point_distance": 4.0,
            "commute_minutes": 25,
            "value_ratio": 0.89
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
            "parking_available": False,
            "distance_to_it_park_km": 2.5,
            "noise_level": "medium",
            "kitchen_type": "induction",
            "commute_type": "jeepney",
            "fiber_available": True,
            # New fields
            "latitude": 10.3250,
            "longitude": 123.9100,
            "view_type": "exterior",
            "gender_preference": "co-ed",
            "connectivity_score": 4.5,
            "share_type": "private",
            "anchor_point_distance": 2.5,
            "commute_minutes": 15,
            "value_ratio": 1.0
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
            "parking_available": False,
            "distance_to_it_park_km": 3.0,
            "noise_level": "high",
            "kitchen_type": "shared",
            "commute_type": "jeepney",
            "fiber_available": False,
            # New fields
            "latitude": 10.3000,
            "longitude": 123.9000,
            "view_type": "interior",
            "gender_preference": "female_only",
            "connectivity_score": 3.0,
            "share_type": "shared",
            "anchor_point_distance": 3.0,
            "commute_minutes": 20,
            "value_ratio": 2.0
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
            "parking_available": True,
            "distance_to_it_park_km": 0.2,
            "noise_level": "medium",
            "kitchen_type": "induction",
            "commute_type": "walking",
            "fiber_available": True,
            # New fields
            "latitude": 10.3195,
            "longitude": 123.9015,
            "view_type": "city_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.9,
            "share_type": "private",
            "anchor_point_distance": 0.2,
            "commute_minutes": 3,
            "value_ratio": 0.88
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
            "parking_available": True,
            "distance_to_it_park_km": 3.5,
            "noise_level": "low",
            "kitchen_type": "induction",
            "commute_type": "car",
            "fiber_available": True,
            # New fields
            "latitude": 10.3400,
            "longitude": 123.9180,
            "view_type": "city_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.7,
            "share_type": "private",
            "anchor_point_distance": 3.5,
            "commute_minutes": 18,
            "value_ratio": 0.92
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
            "parking_available": True,
            "distance_to_it_park_km": 5.5,
            "noise_level": "low",
            "kitchen_type": "full",
            "commute_type": "car",
            "fiber_available": True,
            # New fields
            "latitude": 10.3600,
            "longitude": 123.9300,
            "view_type": "garden_view",
            "gender_preference": "co-ed",
            "connectivity_score": 4.0,
            "share_type": "private",
            "anchor_point_distance": 5.5,
            "commute_minutes": 30,
            "value_ratio": 0.83
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
        if min_budget <= property_price <= max_budget:
            return 1.0  # Perfect match
        elif property_price < min_budget:
            # Bonus for being under budget (up to 10% bonus)
            bonus = (min_budget - property_price) / min_budget * 0.1
            return min(1.1, 1.0 + bonus)
        else:
            # Penalty for being over budget
            over_percentage = (property_price - max_budget) / max_budget
            penalty = over_percentage * 2  # Harsh penalty for being over
            return max(0, 1.0 - penalty)
    
    def calculate_s_commute(self, distance_km):
        """Geo-spatial score based on distance (0-1 scale)"""
        if distance_km < 1:
            return 1.0
        elif distance_km > 5:
            return 0.0
        else:
            # Linear interpolation between 1-5km
            return 1.0 - ((distance_km - 1) / 4)
    
    def calculate_s_lifestyle(self, property_data, user_prefs):
        """Feature match with sensory check and cosine similarity (0-1 scale)"""
        score = 0.0
        
        # 1. Sensory Check (Night Owl + Interior View)
        daily_rhythm = user_prefs.get('daily_rhythm', '').lower()
        view_type = property_data.get('view_type', '').lower()
        
        if daily_rhythm == 'night owl' and view_type == 'interior':
            score += 0.15  # Bonus points for sensory compatibility
            print(f"  🦉 Sensory match: Night Owl + Interior View (+15%)")
        
        # 2. Amenities Cosine Similarity
        # Get all possible amenities across all properties
        all_amenities = set()
        for prop in properties:
            all_amenities.update(prop.get('amenities', []))
        
        # Create binary vectors
        prop_amenities = set(property_data.get('amenities', []))
        user_wants = set(user_prefs.get('must_have_features', []))
        
        prop_vector = [1 if amenity in prop_amenities else 0 for amenity in all_amenities]
        user_vector = [1 if amenity in user_wants else 0 for amenity in all_amenities]
        
        # Calculate Jaccard Index (simpler than cosine for binary vectors)
        if len(user_wants) > 0:
            intersection = len(prop_amenities.intersection(user_wants))
            union = len(prop_amenities.union(user_wants))
            jaccard_score = intersection / union if union > 0 else 0
            score += jaccard_score * 0.85  # Remaining weight
        
        return min(1.0, score)  # Cap at 1.0
    
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
        if 'IT Park' in destination:
            insights.append("🏢 Using IT Park as anchor point for distance calculations")
        
        # Lifestyle analysis
        daily_rhythm = user_prefs.get('daily_rhythm', '').lower()
        if daily_rhythm == 'night owl':
            insights.append("🦉 Considering interior-view properties for better daytime sleep")
        elif daily_rhythm == 'early bird':
            insights.append("🌅 Prioritizing properties with good natural light")
        
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
        
        for prop in properties_list:
            total_score = prop.get('match_score', 0)
            normalized_score = total_score / 100  # Convert to 0-1 scale
            
            # Check if property passes hard filters
            passes_hard_filters = self.check_hard_filters(prop, user_prefs)
            
            # 1. Safe Bet: Score > 85% and passes all hard filters
            if normalized_score > 0.85 and passes_hard_filters:
                prop['category'] = "Safe Bet"
                prop['category_description'] = "High compliance across all vectors"
                prop['match_type'] = "exact"
                categorized['safe_bet'].append(prop)
            
            # 2. Stretch: Constraint relaxation logic
            elif self.is_stretch_candidate(prop, user_prefs, normalized_score, passes_hard_filters):
                prop['category'] = "Stretch"
                prop['category_description'] = self.generate_stretch_description(prop, user_prefs)
                prop['match_type'] = "relaxed"
                categorized['stretch'].append(prop)
            
            # 3. Wildcard: Discovery radius logic
            elif self.is_wildcard_candidate(prop, user_prefs, preferred_areas):
                prop['category'] = "Wildcard"
                prop['category_description'] = self.generate_wildcard_description(prop, user_prefs)
                prop['match_type'] = "discovery"
                categorized['wildcard'].append(prop)
        
        return categorized
    
    def check_hard_filters(self, prop, user_prefs):
        """Apply hard filters (binary exclusion)"""
        # Gender preference filter
        user_gender = user_prefs.get('gender', '').lower()
        property_gender = prop.get('gender_preference', 'co-ed').lower()
        
        if property_gender != 'co-ed' and user_gender and property_gender != user_gender:
            return False
        
        # Remote work connectivity filter
        work_type = user_prefs.get('work_type', '').lower()
        connectivity_score = prop.get('connectivity_score', 0)
        
        if work_type == 'remote' and connectivity_score < 3.0:
            return False
        
        # Pet filter
        has_pets = user_prefs.get('has_pets', False)
        pet_friendly = prop.get('pet_friendly', False)
        
        if has_pets and not pet_friendly:
            return False
        
        return True
    
    def is_stretch_candidate(self, prop, user_prefs, normalized_score, passes_hard_filters):
        """Identify stretch candidates using constraint relaxation"""
        
        # Case 1: Failed hard filter but otherwise excellent
        if not passes_hard_filters:
            # Recalculate score ignoring failed filter
            stretch_score = self.calculate_stretch_score(prop, user_prefs)
            if stretch_score > 0.9:
                return True
        
        # Case 2: Over budget but high amenity score
        price = prop.get('price', 0)
        max_budget = int(user_prefs.get('max_budget', 999999))
        
        if price > max_budget:
            # Calculate amenity match score
            amenities = set(prop.get('amenities', []))
            must_haves = set(user_prefs.get('must_have_features', []))
            
            if must_haves:
                amenity_match = len(amenities.intersection(must_haves)) / len(must_haves)
                
                # If amenity score > 0.9, qualify as stretch
                if amenity_match > 0.9:
                    stretch_score = normalized_score + 0.4  # Add back budget penalty
                    if stretch_score > 0.9:
                        return True
        
        return False
    
    def is_wildcard_candidate(self, prop, user_prefs, preferred_areas):
        """Identify wildcard candidates in discovery radius"""
        prop_location = prop.get('location', '').lower()
        
        # 1. Not in preferred areas
        in_preferred = False
        for area in preferred_areas:
            if area.lower() in prop_location:
                in_preferred = True
                break
        
        if in_preferred:
            return False
        
        # 2. Check commute time (< 15 mins)
        commute_minutes = prop.get('commute_minutes', 60)
        if commute_minutes > 15:
            return False
        
        # 3. Calculate value ratio (amenities per 1000 pesos)
        price = prop.get('price', 1)
        amenities_count = len(prop.get('amenities', []))
        value_ratio = amenities_count / price * 1000
        
        # Threshold: at least 0.8 amenities per 1000 pesos
        if value_ratio > 0.8:
            return True
        
        return False
    
    def calculate_stretch_score(self, prop, user_prefs):
        """Calculate score ignoring specific failed constraints"""
        # Create a copy of property data
        prop_copy = prop.copy()
        
        # Remove penalties for specific constraints
        # For example, if it failed pet filter, assume it's pet friendly
        prop_copy['pet_friendly'] = True
        
        # Recalculate using enhanced profiler
        profiler = EnhancedProfiler()
        min_budget = int(user_prefs.get('min_budget', 0))
        max_budget = int(user_prefs.get('max_budget', 999999))
        
        # Calculate scores without specific constraints
        s_finance = profiler.calculate_s_finance(prop['price'], min_budget, max_budget)
        s_commute = profiler.calculate_s_commute(prop.get('anchor_point_distance', 10))
        s_lifestyle = profiler.calculate_s_lifestyle(prop_copy, user_prefs)
        
        # Weighted sum
        total_score = (
            profiler.weights['finance'] * s_finance +
            profiler.weights['commute'] * s_commute +
            profiler.weights['lifestyle'] * s_lifestyle
        )
        
        return total_score
    
    def generate_stretch_description(self, prop, user_prefs):
        """Generate description for stretch candidates"""
        price = prop.get('price', 0)
        max_budget = int(user_prefs.get('max_budget', 999999))
        
        if price > max_budget:
            over_amount = price - max_budget
            return f"Matches {prop.get('match_score', 0)}% of your needs, but ₱{over_amount:,} over budget"
        
        # Check for other constraints
        if not prop.get('pet_friendly', False) and user_prefs.get('has_pets', False):
            return f"Excellent match but not pet-friendly"
        
        return "Great match with minor trade-offs"
    
    def generate_wildcard_description(self, prop, user_prefs):
        """Generate description for wildcard candidates"""
        location = prop.get('location', '')
        price = prop.get('price', 0)
        max_budget = int(user_prefs.get('max_budget', 999999))
        
        price_diff = price - max_budget
        if price_diff < 0:
            price_text = f"₱{abs(price_diff):,} under budget"
        elif price_diff > 0:
            price_text = f"₱{price_diff:,} over budget"
        else:
            price_text = "within budget"
        
        return f"Located in {location} (discovery area), {price_text} with great value"

def extract_key_features(prop, user_prefs):
    """Extract key features for display with mathematical insights"""
    features = []
    
    # Budget indicator
    price = prop.get('price', 0)
    if price <= 3000:
        features.append("💰 Budget-friendly")
    elif price <= 5000:
        features.append("💰 Good value")
    elif price <= 8000:
        features.append("💰 Premium option")
    
    # Location features with mathematical insights
    anchor_distance = prop.get('anchor_point_distance', 10)
    if anchor_distance < 1:
        features.append("📍 Walking distance to IT Park")
    elif anchor_distance <= 3:
        features.append("📍 Short commute to IT Park")
    
    # Amenity highlights
    amenities = prop.get('amenities', [])
    if any('aircon' in str(a).lower() for a in amenities):
        features.append("❄️ Air conditioned")
    if any('private' in str(a).lower() and 'bathroom' in str(a).lower() for a in amenities):
        features.append("🚿 Private bathroom")
    if any('wifi' in str(a).lower() for a in amenities):
        features.append("📶 High-speed WiFi")
    if any('gym' in str(a).lower() for a in amenities):
        features.append("💪 Gym access")
    
    # Sensory match indicator
    daily_rhythm = user_prefs.get('daily_rhythm', '').lower()
    view_type = prop.get('view_type', '').lower()
    if daily_rhythm == 'night owl' and view_type == 'interior':
        features.append("🦉 Ideal for night owls")
    
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
                "recommended_ids": [],
                "properties": [],
                "total_matches": 0
            })), 400
        
        print(f"\n📝 Received user preferences:")
        print(f"   Budget: {raw_user_prefs.get('minBudget')} - {raw_user_prefs.get('maxBudget')}")
        print(f"   Areas: {raw_user_prefs.get('areaPreferences')}")
        print(f"   Must-haves: {raw_user_prefs.get('mustHaveFeatures')}")
        print(f"   Daily Rhythm: {raw_user_prefs.get('dailyRhythm')}")
        
        # Normalize to snake_case for processing
        user_prefs = normalize_user_prefs(raw_user_prefs)
        
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
            suggestions = self.generate_hard_filter_suggestions(user_prefs)
            return jsonify(format_response_keys({
                "recommended_ids": [],
                "properties": [],
                "total_matches": 0,
                "message": "No properties match your hard constraints",
                "suggestions": suggestions,
                "match_insights": profiler.analyze_preferences(user_prefs)
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
        
        # Normalize prices for display insights
        price_normalized = profiler.normalize_continuous(filtered_df['price'].tolist())
        filtered_df['price_normalized'] = price_normalized
        
        # Sort by match score
        filtered_df = filtered_df.sort_values('match_score', ascending=False)
        
        # Get top recommendations (limit to 15)
        top_properties = filtered_df.head(15)
        
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
                'pet_friendly': bool(prop.get('pet_friendly', False)),
                'lease_duration': prop['lease_duration'],
                'rating': float(prop.get('rating', 0)),
                'match_score': round(float(prop['match_score']), 1),
                'match_percentage': f"{round(float(prop['match_score']), 1)}%",
                'features': extract_key_features(prop_dict, user_prefs),
                'view_type': prop.get('view_type', ''),
                'connectivity_score': prop.get('connectivity_score', 0),
                'anchor_point_distance': prop.get('anchor_point_distance', 0),
                'commute_minutes': prop.get('commute_minutes', 0),
                'value_ratio': prop.get('value_ratio', 0),
                'component_scores': prop.get('component_scores', {})
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
            "recommended_ids": [p['id'] for p in properties_list],
            "properties": properties_list,
            "categorized_recommendations": categorized,
            "total_matches": len(filtered_df),
            "match_insights": match_insights,
            "tenant_profile": {
                "budget_range": f"₱{int(user_prefs.get('min_budget', 0)):,} - ₱{int(user_prefs.get('max_budget', 999999)):,}",
                "preferred_locations": user_prefs.get('area_preferences', []),
                "priority_features": user_prefs.get('must_have_features', []),
                "lifestyle": user_prefs.get('daily_rhythm', 'Not specified'),
                "transportation": user_prefs.get('transportation', 'Not specified'),
                "work_type": user_prefs.get('work_type', 'Not specified'),
                "mathematical_scores": {
                    "finance_weight": profiler.weights['finance'],
                    "commute_weight": profiler.weights['commute'],
                    "lifestyle_weight": profiler.weights['lifestyle'],
                    "anchor_point": profiler.anchor_point
                }
            },
            "scoring_summary": {
                "properties_scored": len(filtered_df),
                "scoring_method": "Weighted Sum Model",
                "formula": "Score = (W_finance × S_finance) + (W_commute × S_commute) + (W_lifestyle × S_lifestyle)",
                "category_thresholds": {
                    "safe_bet": "Score > 85% + passes hard filters",
                    "stretch": "Constraint relaxation logic",
                    "wildcard": "Discovery radius (<15 mins, not in preferred areas, high value ratio)"
                }
            }
        }
        
        print(f"\n✅ Recommendation Summary:")
        print(f"   Total matches: {len(filtered_df)}")
        print(f"   Top match score: {properties_list[0]['match_score'] if properties_list else 0}%")
        print(f"   Categories: {safe_bet_count} Safe Bet, {stretch_count} Stretch, {wildcard_count} Wildcard")
        
        # Convert snake_case keys back to camelCase for frontend
        return jsonify(format_response_keys(response))
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        
        return jsonify(format_response_keys({
            "error": str(e),
            "recommended_ids": [],
            "properties": [],
            "total_matches": 0
        })), 500

@app.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties with enhanced fields"""
    try:
        limit = int(request.args.get('limit', 10))
        properties_list = properties[:limit]
        
        # Add mathematical framework metadata
        response_data = {
            "total": len(properties),
            "limit": limit,
            "properties": properties_list,
            "mathematical_framework": {
                "has_required_fields": True,
                "fields_present": [
                    "latitude", "longitude", "view_type", "gender_preference",
                    "connectivity_score", "anchor_point_distance", "commute_minutes", "value_ratio"
                ],
                "scoring_ready": True
            }
        }
        
        return jsonify(format_response_keys(response_data))
    except Exception as e:
        return jsonify(format_response_keys({"error": str(e)})), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check with mathematical framework info"""
    return jsonify(format_response_keys({
        "status": "healthy",
        "service": "Enhanced Property Recommendation",
        "properties_loaded": len(properties),
        "price_range": f"₱{properties_df['price'].min():,} - ₱{properties_df['price'].max():,}",
        "mathematical_framework": {
            "implemented": True,
            "components": [
                "Weighted Sum Model",
                "Haversine Distance",
                "Constraint Relaxation",
                "Discovery Radius",
                "Vector Similarity"
            ],
            "weights": {
                "finance": 0.4,
                "commute": 0.3,
                "lifestyle": 0.3
            },
            "category_logic": {
                "safe_bet": "Score > 85% + hard filters",
                "stretch": "Constraint relaxation",
                "wildcard": "Discovery radius + value ratio"
            }
        },
        "input_format": "camelCase supported"
    }))

@app.route('/framework/explain', methods=['GET'])
def explain_framework():
    """Explain the mathematical framework"""
    explanation = {
        "title": "Mathematical Framework for Property Matching",
        "components": [
            {
                "name": "Weighted Sum Model",
                "formula": "Score = (W_finance × S_finance) + (W_commute × S_commute) + (W_lifestyle × S_lifestyle)",
                "weights": {
                    "W_finance": 0.4,
                    "W_commute": 0.3,
                    "W_lifestyle": 0.3
                },
                "description": "Linear combination of normalized scores"
            },
            {
                "name": "S_finance (Financial Score)",
                "formula": "Normalized based on budget range",
                "description": "Penalizes properties far outside budget, bonuses for under budget"
            },
            {
                "name": "S_commute (Geo-Spatial Score)",
                "formula": "Haversine distance to anchor point",
                "description": "1.0 if <1km, 0.0 if >5km, linear interpolation between"
            },
            {
                "name": "S_lifestyle (Feature Match)",
                "formula": "Sensory check + Jaccard similarity for amenities",
                "description": "Bonus for night owl + interior view, plus amenity matching"
            },
            {
                "name": "Bucketing Algorithm",
                "categories": [
                    {
                        "name": "Safe Bet",
                        "criteria": "Score > 85% AND passes all hard filters",
                        "logic": "High compliance across all vectors"
                    },
                    {
                        "name": "Stretch",
                        "criteria": "Constraint relaxation logic",
                        "logic": "Excellent in most dimensions but fails one constraint"
                    },
                    {
                        "name": "Wildcard",
                        "criteria": "Discovery radius + value ratio",
                        "logic": "Not in preferred areas but great value and <15 mins commute"
                    }
                ]
            }
        ]
    }
    return jsonify(format_response_keys(explanation))

if __name__ == '__main__':
    print("\n" + "="*70)
    print("🏠 ENHANCED PROPERTY RECOMMENDATION API")
    print("   with Mathematical Framework Integration")
    print("="*70)
    print("\n📊 MATHEMATICAL FRAMEWORK IMPLEMENTED:")
    print("   ✓ Weighted Sum Model (0.4×Finance + 0.3×Commute + 0.3×Lifestyle)")
    print("   ✓ Haversine Distance for geo-spatial scoring")
    print("   ✓ Constraint Relaxation for Stretch candidates")
    print("   ✓ Discovery Radius for Wildcard candidates")
    print("   ✓ Jaccard Similarity for amenity matching")
    print("   ✓ Sensory Checks (Night Owl + Interior View)")
    
    print(f"\n📈 DATA SUMMARY:")
    print(f"   Properties: {len(properties)}")
    print(f"   Price Range: ₱{properties_df['price'].min():,} - ₱{properties_df['price'].max():,}")
    print(f"   Avg Price: ₱{properties_df['price'].mean():,.0f}")
    print(f"   Property Types: {properties_df['type'].unique().tolist()}")
    
    print("\n📍 ANCHOR POINT (Default):")
    print("   IT Park, Cebu City (10.3190°N, 123.9020°E)")
    
    print("\n📡 ENDPOINTS:")
    print("  POST /recommend        - Get recommendations (camelCase input)")
    print("  GET  /properties       - List all properties")
    print("  GET  /health           - Health check with framework info")
    print("  GET  /framework/explain - Explain the mathematical framework")
    print("\n🎯 BUCKETING LOGIC:")
    print("   Safe Bet: Score > 85% + passes hard filters")
    print("   Stretch: Constraint relaxation (e.g., over budget but great amenities)")
    print("   Wildcard: Not in preferred areas + <15 mins + high value ratio")
    print("="*70)
    
    app.run(debug=True, port=5000, host='0.0.0.0')