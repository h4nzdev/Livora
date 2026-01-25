
from flask import Flask, request, jsonify
from sklearn.feature_extraction import DictVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

app = Flask(__name__)

# Mock property data - In a real application, this would come from a database.
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
        "bedrooms": 0, # Studio
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
        "bedrooms": 0, # Studio
        "bathrooms": 1,
        "amenities": ["wifi", "security"],
        "pet_friendly": False,
        "lease_duration": "flexible",
        "rating": 4.1,
    }
]

# Convert to DataFrame for easier manipulation
properties_df = pd.DataFrame(properties)

def preprocess_data(df):
    """Prepares the property data for vectorization."""
    # Explode amenities into a format that can be vectorized
    df_copy = df.copy()
    # Convert list-like amenities into a string format for vectorization
    df_copy['amenities'] = df_copy['amenities'].apply(lambda x: ' '.join(x) if isinstance(x, list) else '')
    return df_copy.to_dict('records')

# Prepare the data for scikit-learn
vectorizer = DictVectorizer(sparse=False)
properties_vectorized = vectorizer.fit_transform(preprocess_data(properties_df))


@app.route('/recommend', methods=['POST'])
def recommend():
    user_prefs = request.get_json()

    # --- 1. Hard Filters ---
    filtered_df = properties_df.copy()

    # Budget filter
    min_budget = int(user_prefs.get('minBudget') or 0)
    max_budget = int(user_prefs.get('maxBudget') or float('inf'))
    filtered_df = filtered_df[(filtered_df['price'] >= min_budget) & (filtered_df['price'] <= max_budget)]

    # Must-have features filter
    must_haves = user_prefs.get('mustHaveFeatures', [])
    if must_haves:
        for feature in must_haves:
            # Assumes amenities are stored as a list of strings
            filtered_df = filtered_df[filtered_df['amenities'].apply(lambda x: feature in x)]

    # Pet-friendly filter
    if user_prefs.get('hasPets'):
        filtered_df = filtered_df[filtered_df['pet_friendly'] == True]

    if filtered_df.empty:
        return jsonify({"recommended_ids": [], "message": "No properties match your essential criteria."})

    # --- 2. Soft-preference Ranking (Cosine Similarity) ---

    # Create a user preference vector
    user_vector_dict = {
        'location': ' '.join(user_prefs.get('areaPreferences', [])),
        'lease_duration': user_prefs.get('leaseDuration', ''),
        'pet_friendly': user_prefs.get('hasPets', False),
        'amenities': ' '.join(user_prefs.get('preferredAmenities', []) + must_haves),
        'rating': 4.5, # Assume user wants a highly-rated place
    }
    
    # Get the feature names from the fitted vectorizer to ensure consistency
    feature_names = vectorizer.feature_names_
    
    # Align the user vector with the property vectors
    aligned_user_vector_dict = {}
    for key in feature_names:
        # The key might be `location=Lahug, Cebu City` or `amenities=wifi`
        if '=' in key:
            k, v = key.split('=', 1)
            # Check if this feature is in the user's preference string
            if k in user_vector_dict and v in user_vector_dict[k]:
                aligned_user_vector_dict[key] = 1
            else:
                 aligned_user_vector_dict[key] = 0
        else:
            # For numerical or boolean features that don't get split
            aligned_user_vector_dict[key] = user_vector_dict.get(key, 0)
            
    # Now transform this single aligned dictionary
    user_vector = vectorizer.transform([aligned_user_vector_dict])

    # Get the vectorized data for the *filtered* properties
    filtered_indices = filtered_df.index
    filtered_properties_vectorized = properties_vectorized[filtered_indices]

    # Calculate cosine similarity
    similarities = cosine_similarity(user_vector, filtered_properties_vectorized)

    # Get sorted list of property indices
    ranked_indices = np.argsort(similarities[0])[::-1]
    
    # Get the original indices from the filtered dataframe
    final_ranked_indices = filtered_df.iloc[ranked_indices].index

    # Get the IDs of the ranked properties
    recommended_ids = properties_df.loc[final_ranked_indices]['id'].tolist()

    return jsonify({"recommended_ids": recommended_ids})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
