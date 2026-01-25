from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
import sys
import time
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

def camel_to_snake(name):
    """Convert camelCase to snake_case"""
    import re
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
            # Convert snake_case to camelCase
            parts = key.split('_')
            camel_key = parts[0] + ''.join(p.capitalize() for p in parts[1:])
            formatted[camel_key] = format_response_keys(value)
        return formatted
    elif isinstance(response_data, list):
        return [format_response_keys(item) for item in response_data]
    else:
        return response_data

# Import properties
try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(current_dir, 'data')
    sys.path.append(data_dir)
    from properties import properties
    print(f"✓ Imported {len(properties)} properties")
except ImportError:
    # Enhanced properties with budget-friendly options
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
            "fiber_available": True
        },
        {
            "id": 2,
            "name": "Lahug Student Room",
            "type": "Shared",
            "location": "Lahug, Cebu City",
            "price": 2800,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "fan", "shared kitchen"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 3.5,
            "furnished": True,
            "parking_available": False,
            "distance_to_it_park_km": 1.5,
            "noise_level": "low",
            "kitchen_type": "shared",
            "commute_type": "jeepney",
            "fiber_available": False
        },
        {
            "id": 3,
            "name": "Talamban Budget Unit",
            "type": "Apartment",
            "location": "Talamban, Cebu City",
            "price": 4500,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 4.0,
            "furnished": False,
            "parking_available": False,
            "distance_to_it_park_km": 4.0,
            "noise_level": "low",
            "kitchen_type": "induction",
            "commute_type": "jeepney",
            "fiber_available": True
        },
        {
            "id": 4,
            "name": "Mabolo Studio",
            "type": "Apartment",
            "location": "Mabolo, Cebu City",
            "price": 5000,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom", "security"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 4.2,
            "furnished": True,
            "parking_available": False,
            "distance_to_it_park_km": 2.5,
            "noise_level": "medium",
            "kitchen_type": "induction",
            "commute_type": "jeepney",
            "fiber_available": True
        },
        {
            "id": 5,
            "name": "Cebu City Dormitory",
            "type": "Dormitory",
            "location": "Cebu City Proper",
            "price": 2500,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "fan", "shared bathroom", "laundry"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 3.7,
            "furnished": True,
            "parking_available": False,
            "distance_to_it_park_km": 3.0,
            "noise_level": "high",
            "kitchen_type": "shared",
            "commute_type": "jeepney",
            "fiber_available": False
        },
        {
            "id": 6,
            "name": "IT Park Premium Studio",
            "type": "Apartment",
            "location": "IT Park, Cebu City",
            "price": 8000,
            "bedrooms": 1,
            "bathrooms": 1,
            "amenities": ["wifi", "aircon", "private bathroom", "gym", "pool"],
            "pet_friendly": False,
            "lease_duration": "short-term",
            "rating": 4.5,
            "furnished": True,
            "parking_available": False,
            "distance_to_it_park_km": 0.2,
            "noise_level": "medium",
            "kitchen_type": "induction",
            "commute_type": "walking",
            "fiber_available": True
        }
    ]
    print("⚠ Using budget-friendly properties dataset")

properties_df = pd.DataFrame(properties)

class TenantProfiler:
    """Handles tenant lifestyle profiling"""
    
    def analyze_preferences(self, user_prefs):
        """Analyze user preferences in camelCase format"""
        insights = []
        
        # Transportation analysis
        transportation = user_prefs.get('transportation', '').lower()
        if transportation == 'walking':
            insights.append("🚶 Smart choice! You'll save 400+ hours of commute time per year.")
        elif transportation == 'public':
            insights.append("🚌 We'll prioritize properties near jeepney routes.")
        
        # Destination analysis
        destination = user_prefs.get('destination_location', '')
        if 'IT Park' in destination:
            insights.append("🏢 Focusing on IT Park area with short commute options.")
        
        # Budget analysis
        try:
            min_budget = int(user_prefs.get('min_budget', 0))
            max_budget = int(user_prefs.get('max_budget', 999999))
            if max_budget < 5000:
                insights.append("💰 Budget-friendly mode activated. Showing best value options.")
        except:
            pass
        
        return insights
    
    def calculate_match_score(self, property_row, user_prefs):
        """Calculate match score using snake_case keys"""
        score = 0
        max_score = 100
        
        # 1. Budget match (40 points)
        try:
            min_budget = int(user_prefs.get('min_budget', 0))
            max_budget = int(user_prefs.get('max_budget', 999999))
            price = property_row.get('price', 0)
            
            if min_budget <= price <= max_budget:
                score += 40  # Perfect match
            elif price < min_budget:
                score += 30  # Below budget - still good
            elif price <= max_budget * 1.5:  # Within 50% over budget
                over_percentage = (price - max_budget) / max_budget
                score += max(0, 40 - (over_percentage * 40))
        except:
            pass
        
        # 2. Location match (30 points)
        area_preferences = user_prefs.get('area_preferences', [])
        property_location = property_row.get('location', '').lower()
        
        if area_preferences:
            location_match = False
            for area in area_preferences:
                area_lower = area.lower()
                # Handle "IT Park / Lahug" format
                if '/' in area_lower:
                    sub_areas = [a.strip() for a in area_lower.split('/')]
                    for sub_area in sub_areas:
                        if sub_area in property_location:
                            location_match = True
                            break
                elif area_lower in property_location:
                    location_match = True
                    break
            
            if location_match:
                score += 30  # Perfect location match
            else:
                # Check distance to destination
                destination = user_prefs.get('destination_location', '').lower()
                if 'it park' in destination and property_row.get('distance_to_it_park_km', 10) <= 5:
                    score += 20  # Close to destination
                else:
                    score += 10  # Not in preferred area
        
        # 3. Must-have features (20 points)
        must_haves = user_prefs.get('must_have_features', [])
        property_amenities = property_row.get('amenities', [])
        
        if must_haves:
            matched = 0
            for feature in must_haves:
                feature_lower = feature.lower()
                
                # Check aircon
                if feature_lower in ['aircon', 'air conditioning']:
                    if any('aircon' in str(a).lower() or 'air conditioning' in str(a).lower() 
                          for a in property_amenities):
                        matched += 1
                
                # Check wifi
                elif feature_lower in ['wifi', 'internet']:
                    if any('wifi' in str(a).lower() or 'internet' in str(a).lower() 
                          for a in property_amenities):
                        matched += 1
                
                # Check private bathroom
                elif feature_lower in ['private-bathroom', 'private bathroom', 'private']:
                    if any('private bathroom' in str(a).lower() for a in property_amenities):
                        matched += 1
                    elif property_row.get('bathrooms', 0) > 0:
                        # Assuming private if not shared type
                        if property_row.get('type', '').lower() != 'shared':
                            matched += 1
                
                # General check
                elif any(feature_lower in str(a).lower() for a in property_amenities):
                    matched += 1
            
            score += (matched / len(must_haves)) * 20 if must_haves else 20
        
        # 4. Housing type (10 points)
        housing_type = user_prefs.get('housing_type', '').lower()
        property_type = property_row.get('type', '').lower()
        
        if housing_type:
            if housing_type == property_type:
                score += 10
            elif housing_type == 'apartment' and property_type in ['studio', 'condo']:
                score += 8  # Close match
            else:
                score += 3  # Somewhat related
        
        return min(100, score)

profiler = TenantProfiler()

def check_must_haves(amenities, must_haves_list, property_type):
    """Check if property has all must-have features - FIXED VERSION"""
    if not isinstance(amenities, list):
        return False
    
    amenities_lower = [str(a).lower() for a in amenities]
    
    for feature in must_haves_list:
        feature_lower = feature.lower()
        
        # Aircon check
        if feature_lower in ['aircon', 'air conditioning']:
            if not any('aircon' in a or 'air conditioning' in a for a in amenities_lower):
                return False
        
        # Wifi check
        elif feature_lower in ['wifi', 'internet']:
            if not any('wifi' in a or 'internet' in a for a in amenities_lower):
                return False
        
        # Private bathroom check
        elif feature_lower in ['private-bathroom', 'private bathroom']:
            # Check if it's mentioned in amenities
            if not any('private' in a and 'bathroom' in a for a in amenities_lower):
                # Check property type
                if property_type.lower() == 'shared':
                    return False
    
    return True

def extract_key_features(prop):
    """Extract key features for display"""
    features = []
    
    # Budget indicator
    price = prop.get('price', 0)
    if price <= 3500:
        features.append("💰 Budget-friendly")
    elif price <= 6000:
        features.append("💰 Good value")
    
    # Location features
    location = prop.get('location', '')
    if 'IT Park' in location:
        features.append("📍 IT Park area")
    if prop.get('distance_to_it_park_km', 10) <= 1:
        features.append("🚶 Walking distance")
    
    # Amenity highlights
    amenities = prop.get('amenities', [])
    if any('aircon' in str(a).lower() for a in amenities):
        features.append("❄️ Air conditioned")
    if any('private' in str(a).lower() and 'bathroom' in str(a).lower() for a in amenities):
        features.append("🚿 Private bathroom")
    if any('wifi' in str(a).lower() for a in amenities):
        features.append("📶 WiFi included")
    
    return features[:4]  # Limit to 4 features

def categorize_recommendations(properties_list):
    """Categorize recommendations"""
    categorized = {
        "safe_bet": [],
        "stretch": [],
        "wildcard": []
    }
    
    for prop in properties_list:
        score = prop.get('match_score', 0)
        
        if score >= 70:
            prop['category'] = "Safe Bet"
            prop['category_description'] = "Hits most of your criteria"
            categorized['safe_bet'].append(prop)
        elif score >= 50:
            prop['category'] = "Stretch"
            prop['category_description'] = "Good match with some trade-offs"
            categorized['stretch'].append(prop)
        else:
            prop['category'] = "Wildcard"
            prop['category_description'] = "Different approach but great value"
            categorized['wildcard'].append(prop)
    
    return categorized

@app.route('/recommend', methods=['POST'])
def recommend():
    """Main recommendation endpoint - accepts camelCase input"""
    try:
        # Get raw camelCase data from frontend
        raw_user_prefs = request.get_json()
        
        if not raw_user_prefs:
            return jsonify({
                "error": "No preferences provided",
                "recommendedIds": [],
                "properties": [],
                "totalMatches": 0
            }), 400
        
        print(f"\n📝 Received user preferences (camelCase):")
        print(f"   Budget: {raw_user_prefs.get('minBudget')} - {raw_user_prefs.get('maxBudget')}")
        print(f"   Location: {raw_user_prefs.get('areaPreferences')}")
        print(f"   Must-haves: {raw_user_prefs.get('mustHaveFeatures')}")
        
        # Normalize to snake_case for processing
        user_prefs = normalize_user_prefs(raw_user_prefs)
        
        # --- Filtering Phase ---
        filtered_df = properties_df.copy()
        print(f"\n🔍 Initial properties: {len(filtered_df)}")
        
        # Budget filter (handle string to int conversion)
        try:
            min_budget = int(user_prefs.get('min_budget', 0))
            max_budget = int(user_prefs.get('max_budget', 999999))
        except (ValueError, TypeError):
            min_budget = 0
            max_budget = 999999
        
        print(f"   User budget: ₱{min_budget:,} - ₱{max_budget:,}")
        print(f"   Available prices: ₱{filtered_df['price'].min():,} - ₱{filtered_df['price'].max():,}")
        
        # If user budget is too low, show closest matches
        if max_budget < filtered_df['price'].min():
            print(f"⚠ Budget too low. Showing closest matches.")
            # Sort by price (closest to max_budget)
            filtered_df['price_diff'] = abs(filtered_df['price'] - max_budget)
            filtered_df = filtered_df.sort_values('price_diff')
        else:
            # Apply budget filter
            budget_mask = (filtered_df['price'] >= min_budget) & (filtered_df['price'] <= max_budget)
            filtered_df = filtered_df[budget_mask]
        
        print(f"💰 After budget consideration: {len(filtered_df)} properties")
        
        # Must-have features filter - FIXED VERSION
        must_haves = user_prefs.get('must_have_features', [])
        if must_haves and len(filtered_df) > 0:
            print(f"🎯 Filtering for must-haves: {must_haves}")
            
            # Apply filter row by row
            mask = []
            for idx, row in filtered_df.iterrows():
                has_all = check_must_haves(
                    row['amenities'], 
                    must_haves, 
                    row['type']
                )
                mask.append(has_all)
            
            filtered_df = filtered_df[mask]
            print(f"✅ After must-have filter: {len(filtered_df)} properties")
        
        # Housing type filter
        housing_type = user_prefs.get('housing_type', '').lower()
        if housing_type and len(filtered_df) > 0:
            type_mapping = {
                'apartment': ['apartment', 'studio', 'condo', 'condominium'],
                'shared': ['shared', 'dormitory', 'dorm'],
                'house': ['house', 'villa'],
                'condominium': ['condominium', 'condo']
            }
            
            if housing_type in type_mapping:
                type_mask = filtered_df['type'].str.lower().isin(type_mapping[housing_type])
                filtered_df = filtered_df[type_mask]
                print(f"🏠 After type filter: {len(filtered_df)} properties")
        
        # Lease duration filter
        lease_duration = user_prefs.get('lease_duration', '').lower()
        if lease_duration and len(filtered_df) > 0:
            if lease_duration == 'short-term':
                lease_mask = filtered_df['lease_duration'].str.lower().isin(['short-term', 'flexible'])
                filtered_df = filtered_df[lease_mask]
            elif lease_duration == 'long-term':
                lease_mask = filtered_df['lease_duration'].str.lower().isin(['long-term', 'flexible'])
                filtered_df = filtered_df[lease_mask]
            print(f"📅 After lease filter: {len(filtered_df)} properties")
        
        print(f"📊 Final properties to rank: {len(filtered_df)}")
        
        if len(filtered_df) == 0:
            # Return empty but with suggestions
            return jsonify(format_response_keys({
                "recommended_ids": [],
                "properties": [],
                "total_matches": 0,
                "message": "No exact matches found. Try increasing your budget or adjusting requirements.",
                "suggestions": [
                    "Increase budget to ₱3,500+ for more options",
                    "Consider shared accommodations for lower prices",
                    "Expand your location preferences"
                ],
                "match_insights": profiler.analyze_preferences(user_prefs)
            }))
        
        # --- Ranking Phase ---
        # Calculate match scores
        match_scores = []
        for _, prop in filtered_df.iterrows():
            score = profiler.calculate_match_score(prop.to_dict(), user_prefs)
            match_scores.append(score)
        
        # Add scores to dataframe
        filtered_df['match_score'] = match_scores
        
        # Sort by match score
        filtered_df = filtered_df.sort_values('match_score', ascending=False)
        
        # Get top recommendations
        top_properties = filtered_df.head(10)
        
        # Prepare response
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
                'features': extract_key_features(prop_dict)
            }
            properties_list.append(prop_data)
        
        # Categorize into Safe Bet, Stretch, Wildcard
        categorized = categorize_recommendations(properties_list)
        
        response = {
            "recommended_ids": [p['id'] for p in properties_list],
            "properties": properties_list,
            "categorized_recommendations": categorized,
            "total_matches": len(filtered_df),
            "match_insights": profiler.analyze_preferences(user_prefs),
            "tenant_profile": {
                "budget_range": f"₱{min_budget:,} - ₱{max_budget:,}",
                "preferred_locations": user_prefs.get('area_preferences', []),
                "priority_features": user_prefs.get('must_have_features', []),
                "lifestyle": user_prefs.get('daily_rhythm', 'Not specified'),
                "transportation": user_prefs.get('transportation', 'Not specified')
            }
        }
        
        print(f"✅ Generated {len(properties_list)} recommendations")
        print(f"📈 Match scores: {[p['match_score'] for p in properties_list]}")
        
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
    """Get all properties"""
    try:
        limit = int(request.args.get('limit', 10))
        properties_list = properties[:limit]
        
        return jsonify(format_response_keys({
            "total": len(properties),
            "limit": limit,
            "properties": properties_list
        }))
    except Exception as e:
        return jsonify(format_response_keys({"error": str(e)})), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify(format_response_keys({
        "status": "healthy",
        "service": "Property Recommendation",
        "properties_loaded": len(properties),
        "price_range": f"₱{properties_df['price'].min():,} - ₱{properties_df['price'].max():,}",
        "input_format": "camelCase supported"
    }))

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🏠 PROPERTY RECOMMENDATION API")
    print("="*60)
    print("📝 Input Format: camelCase")
    print("   • areaPreferences (not area_preferences)")
    print("   • dailyRhythm (not daily_rhythm)")
    print("   • hasPets (not has_pets)")
    print("   • etc.")
    print(f"\n💰 Budget Range in Data: ₱{properties_df['price'].min():,} - ₱{properties_df['price'].max():,}")
    print(f"🏠 Property Types: {properties_df['type'].unique().tolist()}")
    print("\n📡 Endpoints:")
    print("  POST /recommend  - Get recommendations (accepts camelCase)")
    print("  GET  /properties - List properties")
    print("  GET  /health     - Health check")
    print("="*60)
    
    app.run(debug=True, port=5000, host='0.0.0.0')