from flask import Flask, request, jsonify
from sklearn.feature_extraction import DictVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

app = Flask(__name__)

# Mock property data
properties = [
    {
        "id": 1,
        "name": "Lahug Modern Apartment",
        "type": "Apartment",
        "location": "Lahug, Cebu City",
        "price": 15000,
        "bedrooms": 2,
        "bathrooms": 1,
        "amenities": ["wifi", "parking", "gym"],
        "pet_friendly": True,
        "lease_duration": "long-term",
        "rating": 4.5,
    },
    {
        "id": 2,
        "name": "Banilad Cozy Condo",
        "type": "Condominium",
        "location": "Banilad, Cebu City",
        "price": 12000,
        "bedrooms": 1,
        "bathrooms": 1,
        "amenities": ["wifi", "pool", "security"],
        "pet_friendly": False,
        "lease_duration": "short-term",
        "rating": 4.2,
    },
    {
        "id": 3,
        "name": "Mandaue Family House",
        "type": "House",
        "location": "Mandaue City",
        "price": 25000,
        "bedrooms": 3,
        "bathrooms": 2,
        "amenities": ["garden", "parking", "wifi"],
        "pet_friendly": True,
        "lease_duration": "long-term",
        "rating": 4.7,
    },
    {
        "id": 4,
        "name": "IT Park Shared Unit",
        "type": "Shared",
        "location": "IT Park, Cebu City",
        "price": 8000,
        "bedrooms": 1,
        "bathrooms": 1,
        "amenities": ["wifi", "gym", "pool", "cafeteria"],
        "pet_friendly": False,
        "lease_duration": "short-term",
        "rating": 4.0,
    },
    {
        "id": 5,
        "name": "Cebu Business Park Studio",
        "type": "Condominium",
        "location": "Cebu Business Park",
        "price": 18000,
        "bedrooms": 0,
        "bathrooms": 1,
        "amenities": ["wifi", "pool", "gym", "security"],
        "pet_friendly": True,
        "lease_duration": "long-term",
        "rating": 4.8,
    },
    {
        "id": 6,
        "name": "Talamban Family Home",
        "type": "House",
        "location": "Talamban, Cebu City",
        "price": 20000,
        "bedrooms": 3,
        "bathrooms": 2,
        "amenities": ["parking", "garden"],
        "pet_friendly": True,
        "lease_duration": "long-term",
        "rating": 4.6,
    },
    {
        "id": 7,
        "name": "Mabolo Studio Unit",
        "type": "Apartment",
        "location": "Mabolo, Cebu City",
        "price": 10000,
        "bedrooms": 0,
        "bathrooms": 1,
        "amenities": ["wifi", "security"],
        "pet_friendly": False,
        "lease_duration": "flexible",
        "rating": 4.1,
    }
]

# Convert to DataFrame
properties_df = pd.DataFrame(properties)

def preprocess_for_vectorization(df):
    """Prepares the property data for vectorization."""
    vectorization_data = []
    
    for _, row in df.iterrows():
        row_dict = {}
        
        # Add categorical features
        row_dict['location'] = row['location']
        row_dict['type'] = row['type']
        row_dict['lease_duration'] = row['lease_duration']
        row_dict['pet_friendly'] = row['pet_friendly']
        
        # Add numerical features (normalize)
        row_dict['price'] = row['price'] / 10000
        row_dict['rating'] = row['rating'] / 5.0
        row_dict['bedrooms'] = row['bedrooms'] / 4.0
        
        # Handle amenities
        if 'amenities' in row and isinstance(row['amenities'], list):
            for amenity in row['amenities']:
                amenity_key = f"amenity_{amenity.lower().replace(' ', '_')}"
                row_dict[amenity_key] = 1
        
        vectorization_data.append(row_dict)
    
    return vectorization_data

# Prepare vectorizer
vectorizer = DictVectorizer(sparse=False)
properties_vectorized = vectorizer.fit_transform(preprocess_for_vectorization(properties_df))

def calculate_matching_probability(property_row, user_prefs, similarity_score):
    """
    Calculate a matching probability score (0-100%) for a property.
    Combines hard filter compliance and cosine similarity.
    """
    score_components = []
    weights = {
        'budget': 25,
        'pet_friendly': 20,
        'housing_type': 15,
        'lease_duration': 10,
        'amenities': 15,
        'similarity': 15
    }
    
    total_weight = sum(weights.values())
    
    # 1. Budget matching (0-100%)
    min_budget = int(user_prefs.get('minBudget') or 0)
    max_budget = int(user_prefs.get('maxBudget') or 999999999)
    price = property_row['price']
    
    if min_budget <= price <= max_budget:
        # Perfect match
        budget_score = 100
    elif price < min_budget:
        # Too cheap - still acceptable but lower score
        budget_score = 80
    elif price > max_budget:
        # Too expensive - calculate how much over
        over_percentage = (price - max_budget) / max_budget
        budget_score = max(0, 100 - (over_percentage * 100))
    else:
        budget_score = 0
    
    score_components.append((budget_score * weights['budget']) / 100)
    
    # 2. Pet-friendly matching
    has_pets = user_prefs.get('hasPets', False)
    is_pet_friendly = property_row['pet_friendly']
    
    if not has_pets:
        pet_score = 100  # User doesn't have pets, so pet-friendliness doesn't matter
    elif is_pet_friendly:
        pet_score = 100  # Perfect match
    else:
        pet_score = 0  # User has pets but property isn't pet-friendly
    
    score_components.append((pet_score * weights['pet_friendly']) / 100)
    
    # 3. Housing type matching
    user_housing_type = user_prefs.get('housingType', '').lower()
    property_type = property_row['type'].lower()
    
    if not user_housing_type:
        type_score = 50  # User didn't specify, neutral score
    elif user_housing_type == property_type:
        type_score = 100  # Exact match
    elif user_housing_type == 'condominium' and property_type == 'condo':
        type_score = 100  # Synonym match
    else:
        type_score = 0  # Mismatch
    
    score_components.append((type_score * weights['housing_type']) / 100)
    
    # 4. Lease duration matching
    user_lease = user_prefs.get('leaseDuration', '').lower()
    property_lease = property_row['lease_duration'].lower()
    
    if not user_lease:
        lease_score = 50  # User didn't specify
    elif user_lease == property_lease:
        lease_score = 100  # Exact match
    elif user_lease == 'long-term' and property_lease == 'flexible':
        lease_score = 80  # Flexible can accommodate long-term
    elif user_lease == 'short-term' and property_lease == 'flexible':
        lease_score = 80  # Flexible can accommodate short-term
    else:
        lease_score = 0  # Mismatch
    
    score_components.append((lease_score * weights['lease_duration']) / 100)
    
    # 5. Amenities matching
    user_must_haves = user_prefs.get('mustHaveFeatures', [])
    user_preferred = user_prefs.get('preferredAmenities', [])
    property_amenities = property_row['amenities']
    
    if not isinstance(property_amenities, list):
        property_amenities = []
    
    # Convert all to lowercase for comparison
    property_amenities_lower = [str(a).lower() for a in property_amenities]
    
    # Check must-have amenities
    must_have_score = 0
    if user_must_haves:
        matched_must_haves = 0
        for must_have in user_must_haves:
            must_have_lower = str(must_have).lower()
            # Skip pet-friendly as it's already handled separately
            if must_have_lower in ['pet friendly', 'pet-friendly', 'pets', 'pet_friendly']:
                matched_must_haves += 1
            elif any(must_have_lower in amenity for amenity in property_amenities_lower):
                matched_must_haves += 1
            elif must_have_lower == 'air conditioning' and any('ac' in amenity or 'air' in amenity for amenity in property_amenities_lower):
                matched_must_haves += 1
        
        must_have_score = (matched_must_haves / len(user_must_haves)) * 100 if user_must_haves else 100
    
    # Check preferred amenities
    preferred_score = 0
    if user_preferred:
        matched_preferred = 0
        for preferred in user_preferred:
            preferred_lower = str(preferred).lower()
            if any(preferred_lower in amenity for amenity in property_amenities_lower):
                matched_preferred += 1
        
        preferred_score = (matched_preferred / len(user_preferred)) * 100 if user_preferred else 100
    
    # Combine must-have and preferred scores (weighted average)
    if user_must_haves and user_preferred:
        amenities_score = (must_have_score * 0.7) + (preferred_score * 0.3)
    elif user_must_haves:
        amenities_score = must_have_score
    elif user_preferred:
        amenities_score = preferred_score
    else:
        amenities_score = 100  # No amenities specified
    
    score_components.append((amenities_score * weights['amenities']) / 100)
    
    # 6. Similarity score (cosine similarity scaled to 0-100)
    similarity_score_scaled = max(0, min(100, similarity_score * 100))
    score_components.append((similarity_score_scaled * weights['similarity']) / 100)
    
    # Calculate final probability
    weighted_score = sum(score_components)
    final_probability = (weighted_score / total_weight)
    
    # Ensure probability is between 0 and 100
    return max(0, min(100, final_probability))

@app.route('/recommend', methods=['POST'])
def recommend():
    user_prefs = request.get_json()
    print(f"Received user preferences: {user_prefs}")  # Debug log
    
    # --- 1. Hard Filters ---
    filtered_df = properties_df.copy()
    print(f"Initial properties: {len(filtered_df)}")  # Debug log
    
    # Budget filter
    min_budget = int(user_prefs.get('minBudget') or 0)
    max_budget = int(user_prefs.get('maxBudget') or 999999999)
    filtered_df = filtered_df[(filtered_df['price'] >= min_budget) & 
                              (filtered_df['price'] <= max_budget)]
    print(f"After budget filter ({min_budget}-{max_budget}): {len(filtered_df)}")  # Debug log
    
    # Must-have features filter
    must_haves = user_prefs.get('mustHaveFeatures', [])
    if must_haves:
        print(f"Must-have features: {must_haves}")  # Debug log
        for feature in must_haves:
            feature_lower = feature.lower().strip()
            if feature_lower in ['pet friendly', 'pet-friendly', 'pets', 'pet_friendly']:
                # Handle pet-friendly
                if 'pet_friendly' in filtered_df.columns:
                    filtered_df = filtered_df[filtered_df['pet_friendly'] == True]
                    print(f"After pet-friendly filter: {len(filtered_df)}")  # Debug log
            elif feature_lower == 'air conditioning':
                # Check for air conditioning in amenities (not in our data, so skip)
                print("Air conditioning filter skipped (not in data)")
                continue
            else:
                # Check in amenities
                if 'amenities' in filtered_df.columns:
                    filtered_df = filtered_df[filtered_df['amenities'].apply(
                        lambda x: any(feature_lower in str(amenity).lower() 
                                    for amenity in x) if isinstance(x, list) else False
                    )]
                    print(f"After {feature} filter: {len(filtered_df)}")  # Debug log
    
    # Explicit pet-friendly filter (from hasPets field)
    if user_prefs.get('hasPets'):
        print("User has pets, applying pet-friendly filter")  # Debug log
        if 'pet_friendly' in filtered_df.columns:
            filtered_df = filtered_df[filtered_df['pet_friendly'] == True]
            print(f"After explicit pet filter: {len(filtered_df)}")  # Debug log
    
    # Housing type filter
    housing_type = user_prefs.get('housingType', '').lower()
    if housing_type:
        print(f"Housing type preference: {housing_type}")  # Debug log
        type_mapping = {
            'condominium': ['condominium'],
            'apartment': ['apartment'],
            'house': ['house'],
            'shared': ['shared']
        }
        
        if housing_type in type_mapping:
            filtered_df = filtered_df[filtered_df['type'].str.lower().isin(type_mapping[housing_type])]
            print(f"After type filter: {len(filtered_df)}")  # Debug log
    
    print(f"Final filtered count: {len(filtered_df)}")  # Debug log
    
    if filtered_df.empty:
        return jsonify({
            "recommended_ids": [], 
            "message": "No properties match your essential criteria.",
            "total_matches": 0
        })
    
    # --- 2. Soft-preference Ranking ---
    
    # Create user preference vector
    user_vector_dict = {}
    
    # Location preferences
    area_prefs = user_prefs.get('areaPreferences', [])
    if area_prefs:
        user_vector_dict['location'] = ' '.join(area_prefs)
    
    # Lease duration
    lease_duration = user_prefs.get('leaseDuration', '')
    if lease_duration:
        user_vector_dict['lease_duration'] = lease_duration
    
    # Pet friendly
    user_vector_dict['pet_friendly'] = bool(user_prefs.get('hasPets', False))
    
    # Type preference
    housing_type = user_prefs.get('housingType', '')
    if housing_type:
        user_vector_dict['type'] = housing_type
    
    # Rating preference
    user_vector_dict['rating'] = 0.9
    
    # Price preference
    user_budget_avg = (min_budget + max_budget) / 2
    user_vector_dict['price'] = user_budget_avg / 10000
    
    # Bedrooms preference
    household_size = user_prefs.get('householdSize', 'solo').lower()
    bedroom_mapping = {
        'solo': 0.25,
        'couple': 0.5,
        'small family': 1.0,
        'large family': 1.5,
        'shared': 0.25
    }
    user_vector_dict['bedrooms'] = bedroom_mapping.get(household_size, 0.5)
    
    # Amenities
    preferred_amenities = user_prefs.get('preferredAmenities', [])
    all_preferred_features = preferred_amenities + must_haves
    
    for amenity in all_preferred_features:
        amenity_lower = amenity.lower().strip()
        if amenity_lower not in ['pet friendly', 'pet-friendly', 'pets', 'pet_friendly']:
            amenity_key = f"amenity_{amenity_lower.replace(' ', '_')}"
            user_vector_dict[amenity_key] = 1
    
    # Align user vector with vectorizer features
    feature_names = vectorizer.feature_names_
    aligned_user_vector_dict = {}
    
    for key in feature_names:
        if '=' in key:
            feature_name, value = key.split('=', 1)
            
            if feature_name in ['location', 'type', 'lease_duration']:
                if feature_name in user_vector_dict:
                    user_pref_value = str(user_vector_dict[feature_name])
                    if value.lower() in user_pref_value.lower():
                        aligned_user_vector_dict[key] = 1
                    else:
                        aligned_user_vector_dict[key] = 0
                else:
                    aligned_user_vector_dict[key] = 0
            elif feature_name.startswith('amenity_'):
                if feature_name in user_vector_dict:
                    aligned_user_vector_dict[key] = user_vector_dict[feature_name]
                else:
                    aligned_user_vector_dict[key] = 0
            else:
                aligned_user_vector_dict[key] = 0
        else:
            aligned_user_vector_dict[key] = user_vector_dict.get(key, 0)
    
    # Transform user vector
    user_vector = vectorizer.transform([aligned_user_vector_dict])
    
    # Get vectorized data for filtered properties
    filtered_indices = filtered_df.index.tolist()
    filtered_properties_vectorized = properties_vectorized[filtered_indices]
    
    # Calculate similarity
    similarities = cosine_similarity(user_vector, filtered_properties_vectorized)
    
    # Rank properties
    ranked_indices = np.argsort(similarities[0])[::-1]
    
    # Get recommended IDs
    recommended_ids = filtered_df.iloc[ranked_indices]['id'].tolist()
    
    # Prepare property details with matching probability
    property_details = []
    for idx in ranked_indices[:10]:  # Top 10
        prop_row = filtered_df.iloc[idx]
        similarity_score = similarities[0][idx]
        
        # Calculate matching probability
        matching_probability = calculate_matching_probability(
            prop_row.to_dict(), 
            user_prefs, 
            similarity_score
        )
        
        prop_data = {
            'id': int(prop_row['id']),
            'name': prop_row['name'],
            'type': prop_row['type'],
            'location': prop_row['location'],
            'price': float(prop_row['price']),
            'bedrooms': int(prop_row['bedrooms']),
            'bathrooms': int(prop_row['bathrooms']),
            'amenities': prop_row['amenities'],
            'pet_friendly': bool(prop_row['pet_friendly']),
            'lease_duration': prop_row['lease_duration'],
            'rating': float(prop_row['rating']),
            'similarity_score': float(similarity_score),
            'matching_probability': round(matching_probability, 2)  # Added probability
        }
        property_details.append(prop_data)
    
    return jsonify({
        "recommended_ids": recommended_ids,
        "properties": property_details,
        "total_matches": len(filtered_df),
        "message": f"Found {len(filtered_df)} properties matching your criteria"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)