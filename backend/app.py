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

# Scikit-learn imports
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import NearestNeighbors
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import joblib

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

class MLPropertyRecommender:
    """Machine Learning-based property recommender using scikit-learn"""
    
    def __init__(self):
        self.properties_df = pd.DataFrame(properties)
        self.feature_columns = None
        self.scaler = StandardScaler()
        self.knn_model = NearestNeighbors(n_neighbors=10, metric='cosine')
        self.similarity_matrix = None
        self.property_features = None
        self.clustering_model = None
        
        # Initialize encoders
        self.label_encoders = {}
        self.onehot_encoder = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
        self.tfidf_vectorizer = TfidfVectorizer(max_features=50, stop_words='english')
        
        # Random Forest for value scoring
        self.value_model = RandomForestRegressor(n_estimators=100, random_state=42)
        
        self.initialize_models()
    
    def initialize_models(self):
        """Initialize and train ML models"""
        print("🔬 Initializing ML models...")
        
        # Prepare features for ML
        self.prepare_features()
        
        # Train KNN for similarity matching
        self.train_similarity_model()
        
        # Train clustering for property segmentation
        self.train_clustering_model()
        
        # Train value prediction model
        self.train_value_model()
    
    def prepare_features(self):
        """Prepare features for machine learning"""
        df = self.properties_df.copy()
        
        # Numerical features
        numerical_features = ['price', 'area_sqm', 'floor', 'distance_to_it_park_km', 
                             'rating', 'bedrooms', 'bathrooms', 'ac_temperature_min', 
                             'ac_temperature_max']
        
        # Categorical features
        categorical_features = ['type', 'location', 'lease_duration', 'noise_level', 
                               'kitchen_type', 'view_type', 'ventilation']
        
        # Boolean features
        boolean_features = ['pet_friendly', 'furnished', 'fiber_optic', 'parking_available']
        
        # Handle missing values
        for col in numerical_features:
            if col in df.columns:
                df[col] = df[col].fillna(df[col].median())
        
        for col in categorical_features + boolean_features:
            if col in df.columns:
                df[col] = df[col].fillna('unknown')
        
        # Encode amenities as text
        df['amenities_text'] = df['amenities'].apply(lambda x: ' '.join(x) if isinstance(x, list) else '')
        
        # TF-IDF on amenities
        if len(df) > 0:
            amenities_tfidf = self.tfidf_vectorizer.fit_transform(df['amenities_text'])
            amenities_df = pd.DataFrame(amenities_tfidf.toarray(), 
                                       columns=self.tfidf_vectorizer.get_feature_names_out())
            
            # One-hot encode categorical features
            if len(categorical_features) > 0:
                categorical_data = df[categorical_features]
                onehot_encoded = self.onehot_encoder.fit_transform(categorical_data)
                onehot_df = pd.DataFrame(onehot_encoded, 
                                        columns=self.onehot_encoder.get_feature_names_out(categorical_features))
            else:
                onehot_df = pd.DataFrame()
            
            # Convert boolean features to numeric
            boolean_df = df[boolean_features].astype(int)
            
            # Combine all features
            numerical_df = df[numerical_features].reset_index(drop=True)
            
            # Combine all features
            self.property_features = pd.concat([
                numerical_df.reset_index(drop=True),
                boolean_df.reset_index(drop=True),
                onehot_df.reset_index(drop=True),
                amenities_df.reset_index(drop=True)
            ], axis=1)
            
            # Fill any NaN values
            self.property_features = self.property_features.fillna(0)
            
            # Scale features
            self.property_features_scaled = self.scaler.fit_transform(self.property_features)
            
            print(f"✅ Prepared {self.property_features.shape[1]} features for ML")
    
    def train_similarity_model(self):
        """Train KNN model for property similarity"""
        if self.property_features_scaled is not None and len(self.property_features_scaled) > 0:
            self.knn_model.fit(self.property_features_scaled)
            
            # Precompute similarity matrix
            self.similarity_matrix = cosine_similarity(self.property_features_scaled)
            print("✅ Trained similarity model")
    
    def train_clustering_model(self):
        """Train K-means clustering for property segmentation"""
        if self.property_features_scaled is not None and len(self.property_features_scaled) > 0:
            # Use optimal number of clusters (max 5 for small datasets)
            n_clusters = min(5, len(self.property_features_scaled))
            self.clustering_model = KMeans(n_clusters=n_clusters, random_state=42)
            self.clustering_model.fit(self.property_features_scaled)
            
            # Add cluster labels to properties
            cluster_labels = self.clustering_model.predict(self.property_features_scaled)
            self.properties_df['cluster'] = cluster_labels
            
            print(f"✅ Trained clustering model with {n_clusters} clusters")
    
    def train_value_model(self):
        """Train Random Forest model for value prediction"""
        if self.property_features is not None and len(self.property_features) > 0:
            # Create value score based on price per square meter and rating
            self.properties_df['value_score'] = (
                (self.properties_df['rating'] * 20) -  # Rating contribution
                (self.properties_df['price'] / self.properties_df['area_sqm'].clip(lower=1)) / 100  # Price per sqm penalty
            )
            
            # Normalize value score
            self.properties_df['value_score'] = (
                (self.properties_df['value_score'] - self.properties_df['value_score'].min()) /
                (self.properties_df['value_score'].max() - self.properties_df['value_score'].min())
            ) * 100
            
            # Train model
            X = self.property_features
            y = self.properties_df['value_score']
            
            if len(X) > 10:  # Need enough data for training
                self.value_model.fit(X, y)
                print("✅ Trained value prediction model")
    
    def user_prefs_to_features(self, user_prefs):
        """Convert user preferences to feature vector"""
        if self.property_features is None:
            return None
        
        # Create a feature vector matching the property features
        user_vector = np.zeros(self.property_features.shape[1])
        
        # Get feature names
        feature_names = list(self.property_features.columns)
        
        # Map user preferences to features
        pref_mapping = {
            'price': ('price', user_prefs.get('max_budget', 0)),
            'area_sqm': ('area_sqm', user_prefs.get('min_area', 20)),
            'bedrooms': ('bedrooms', user_prefs.get('bedrooms', 1)),
            'bathrooms': ('bathrooms', user_prefs.get('bathrooms', 1)),
            'pet_friendly': ('pet_friendly', 1 if user_prefs.get('has_pets', False) else 0),
            'furnished': ('furnished', 1 if user_prefs.get('furnished', True) else 0),
            'fiber_optic': ('fiber_optic', 1 if user_prefs.get('wfh_frequency', '') in ['daily', 'frequent'] else 0),
            'distance_to_it_park_km': ('distance_to_it_park_km', 
                                     0.5 if user_prefs.get('transportation', '') == 'walk' else 5),
            'noise_level': ('noise_level', 'low' if user_prefs.get('light_sleeper', False) else 'medium'),
            'kitchen_type': ('kitchen_type', 'full' if user_prefs.get('cooking_frequency', '') in ['daily', 'heavy'] else 'basic')
        }
        
        # Set numerical and boolean features
        for pref_name, (feature_name, value) in pref_mapping.items():
            if feature_name in feature_names:
                idx = feature_names.index(feature_name)
                user_vector[idx] = value
        
        # Handle categorical features via one-hot encoding
        for feature in ['type', 'lease_duration']:
            if feature in user_prefs:
                pref_value = user_prefs[feature]
                # Find one-hot encoded column
                for col in feature_names:
                    if f"{feature}_{pref_value}" in col.lower():
                        idx = feature_names.index(col)
                        user_vector[idx] = 1
        
        # Scale the user vector
        user_vector_scaled = self.scaler.transform([user_vector])
        
        return user_vector_scaled[0]
    
    def calculate_ml_similarity(self, user_prefs):
        """Calculate ML-based similarity scores for all properties"""
        user_vector = self.user_prefs_to_features(user_prefs)
        
        if user_vector is None or self.similarity_matrix is None:
            return {}
        
        # Calculate cosine similarity between user vector and all properties
        similarities = cosine_similarity([user_vector], self.property_features_scaled)[0]
        
        # Apply dealbreaker filters
        filtered_scores = {}
        for idx, similarity in enumerate(similarities):
            property_data = self.properties_df.iloc[idx].to_dict()
            
            # Check dealbreakers
            if self.check_ml_dealbreakers(property_data, user_prefs):
                # Combine ML similarity with rule-based adjustments
                ml_score = similarity * 100  # Convert to percentage
                
                # Apply rule-based adjustments
                adjusted_score = self.adjust_score_with_rules(property_data, user_prefs, ml_score)
                
                filtered_scores[idx] = {
                    'property': property_data,
                    'ml_similarity': ml_score,
                    'adjusted_score': adjusted_score,
                    'explanations': self.generate_ml_explanations(property_data, user_prefs, ml_score)
                }
        
        return filtered_scores
    
    def check_ml_dealbreakers(self, property_data, user_prefs):
        """ML-enhanced dealbreaker checking"""
        # Hard budget constraint
        property_price = property_data.get('price', 0)
        max_budget = self.normalize_budget(user_prefs.get('max_budget', 999999))
        
        if property_price > max_budget * 1.3:  # 30% buffer
            return False
        
        # Pet policy
        has_pets = user_prefs.get('has_pets', False)
        pet_friendly = property_data.get('pet_friendly', False)
        if has_pets and not pet_friendly:
            return False
        
        # Walking distance constraint
        transportation = user_prefs.get('transportation', '').lower()
        distance = property_data.get('distance_to_it_park_km', 10)
        if transportation == 'walk' and distance > 1.5:
            return False
        
        # Parking for car users
        if transportation == 'private car' and not property_data.get('parking_available', False):
            return False
        
        return True
    
    def normalize_budget(self, budget_str):
        """Convert budget string to integer"""
        if isinstance(budget_str, (int, float)):
            return int(budget_str)
        
        if not isinstance(budget_str, str):
            return 0
        
        cleaned = str(budget_str).replace('₱', '').replace(',', '').strip()
        
        try:
            return int(float(cleaned))
        except:
            return 0
    
    def adjust_score_with_rules(self, property_data, user_prefs, ml_score):
        """Adjust ML score with rule-based factors"""
        adjusted_score = ml_score
        
        # Budget factor
        property_price = property_data.get('price', 0)
        max_budget = self.normalize_budget(user_prefs.get('max_budget', 999999))
        
        if property_price <= max_budget:
            budget_factor = (max_budget - property_price) / max_budget * 20
            adjusted_score += budget_factor
        else:
            penalty = (property_price - max_budget) / max_budget * 30
            adjusted_score -= min(penalty, 50)
        
        # Location proximity bonus
        transportation = user_prefs.get('transportation', '').lower()
        distance = property_data.get('distance_to_it_park_km', 10)
        
        if transportation == 'walk' and distance <= 1:
            adjusted_score += 15
        elif transportation == 'walk' and distance <= 1.5:
            adjusted_score += 10
        
        # Amenities match bonus
        amenities = property_data.get('amenities', [])
        preferred_amenities = user_prefs.get('preferred_amenities', [])
        
        if preferred_amenities:
            matched = sum(1 for pref in preferred_amenities 
                         if any(pref.lower() in str(a).lower() for a in amenities))
            match_percentage = matched / len(preferred_amenities) * 15
            adjusted_score += match_percentage
        
        # Rating bonus
        rating = property_data.get('rating', 0)
        if rating >= 4.0:
            adjusted_score += 10
        elif rating >= 3.5:
            adjusted_score += 5
        
        return min(100, max(0, adjusted_score))
    
    def generate_ml_explanations(self, property_data, user_prefs, ml_score):
        """Generate explanations based on ML features"""
        explanations = []
        
        # Feature importance explanations
        important_features = self.get_important_features(property_data, user_prefs)
        
        for feature, importance in important_features[:3]:
            if importance > 0.1:
                if feature == 'price':
                    explanations.append("💰 Good budget match")
                elif feature == 'distance_to_it_park_km':
                    explanations.append("📍 Location compatibility")
                elif feature == 'amenities':
                    explanations.append("🎯 Amenities alignment")
                elif 'pet' in feature:
                    explanations.append("🐾 Pet policy match")
                elif 'fiber' in feature:
                    explanations.append("💻 WFH ready")
        
        # Cluster-based explanation
        cluster = property_data.get('cluster', -1)
        if cluster != -1:
            cluster_props = self.properties_df[self.properties_df['cluster'] == cluster]
            cluster_desc = self.describe_cluster(cluster_props)
            explanations.append(f"🏘️ Similar to {cluster_desc} properties")
        
        # Value prediction explanation
        if hasattr(self, 'value_model'):
            value_score = self.predict_property_value(property_data)
            if value_score > 70:
                explanations.append("🏆 High value proposition")
            elif value_score > 50:
                explanations.append("✅ Good value for money")
        
        return explanations[:3]
    
    def get_important_features(self, property_data, user_prefs):
        """Get important features for this match"""
        # Simplified feature importance based on property characteristics
        feature_importance = []
        
        # Budget importance
        property_price = property_data.get('price', 0)
        max_budget = self.normalize_budget(user_prefs.get('max_budget', 999999))
        budget_ratio = 1 - min(property_price / max_budget, 1.5) / 1.5
        feature_importance.append(('price', budget_ratio))
        
        # Location importance
        distance = property_data.get('distance_to_it_park_km', 10)
        location_importance = max(0, 1 - distance / 10)
        feature_importance.append(('distance_to_it_park_km', location_importance))
        
        # Amenities importance
        amenities = property_data.get('amenities', [])
        amenity_importance = min(len(amenities) / 10, 1.0)
        feature_importance.append(('amenities', amenity_importance))
        
        return sorted(feature_importance, key=lambda x: x[1], reverse=True)
    
    def describe_cluster(self, cluster_df):
        """Describe a cluster of properties"""
        if len(cluster_df) == 0:
            return "similar"
        
        avg_price = cluster_df['price'].mean()
        avg_rating = cluster_df['rating'].mean()
        
        if avg_price < 5000:
            price_desc = "budget"
        elif avg_price < 10000:
            price_desc = "mid-range"
        else:
            price_desc = "premium"
        
        if avg_rating >= 4.0:
            rating_desc = "highly-rated"
        elif avg_rating >= 3.0:
            rating_desc = "well-rated"
        else:
            rating_desc = "average"
        
        return f"{price_desc} {rating_desc}"
    
    def predict_property_value(self, property_data):
        """Predict value score for a property"""
        if not hasattr(self, 'value_model') or self.property_features is None:
            return 50  # Default score
        
        try:
            # Convert property to feature vector
            prop_idx = self.properties_df[self.properties_df['id'] == property_data['id']].index
            if len(prop_idx) > 0:
                features = self.property_features.iloc[prop_idx[0]]
                value_score = self.value_model.predict([features])[0]
                return max(0, min(100, value_score))
        except:
            pass
        
        return 50
    
    def find_similar_properties(self, property_id, n=5):
        """Find similar properties using KNN"""
        if self.knn_model is None or self.property_features_scaled is None:
            return []
        
        # Find property index
        prop_idx = self.properties_df[self.properties_df['id'] == property_id].index
        if len(prop_idx) == 0:
            return []
        
        # Get similar properties
        distances, indices = self.knn_model.kneighbors(
            [self.property_features_scaled[prop_idx[0]]], 
            n_neighbors=min(n+1, len(self.property_features_scaled))
        )
        
        similar_properties = []
        for i, idx in enumerate(indices[0]):
            if idx != prop_idx[0]:  # Exclude the property itself
                prop_data = self.properties_df.iloc[idx].to_dict()
                similarity = (1 - distances[0][i]) * 100
                similar_properties.append({
                    'property': prop_data,
                    'similarity': similarity
                })
        
        return similar_properties

class MLConciergeEngine:
    """ML-powered concierge recommendation engine"""
    
    def __init__(self):
        self.ml_recommender = MLPropertyRecommender()
        self.work_animations = [
            "Training similarity models...",
            "Analyzing property clusters...",
            "Calculating feature importance...",
            "Predicting value scores...",
            "Optimizing recommendations..."
        ]
    
    def generate_ml_recommendations(self, user_prefs):
        """Generate ML-powered recommendations"""
        print(f"\n🤖 ML CONCIERGE ACTIVATED")
        
        # Simulate ML processing
        print("\n🔧 Running ML algorithms...")
        for i in range(2):
            animation = random.choice(self.work_animations)
            print(f"   {animation}")
            time.sleep(0.3)
        
        # Get ML similarity scores
        all_scores = self.ml_recommender.calculate_ml_similarity(user_prefs)
        
        if not all_scores:
            return self.generate_fallback_recommendations(user_prefs)
        
        # Convert to list and sort
        scored_list = []
        for idx, data in all_scores.items():
            property_data = self.prepare_property_response(
                data['property'], 
                data['adjusted_score'],
                user_prefs
            )
            property_data.update({
                'mlSimilarity': round(data['ml_similarity'], 1),
                'explanations': data['explanations'],
                'featureAnalysis': self.analyze_property_features(data['property'], user_prefs)
            })
            scored_list.append(property_data)
        
        # Sort by adjusted score
        scored_list.sort(key=lambda x: x['matchScore'], reverse=True)
        
        # Generate strategic recommendations
        curated = self.curate_ml_recommendations(scored_list, user_prefs)
        
        return curated
    
    def prepare_property_response(self, prop, match_score, user_prefs):
        """Prepare property response with ML insights"""
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
            'matchScore': round(match_score, 1),
            'matchPercentage': f"{round(match_score, 1)}%",
            'mlCluster': f"Cluster {prop.get('cluster', 0)}",
            'valuePrediction': self.ml_recommender.predict_property_value(prop)
        }
    
    def curate_ml_recommendations(self, scored_properties, user_prefs):
        """Curate recommendations using ML insights"""
        if not scored_properties:
            return {
                'safeBet': None,
                'stretchOption': None,
                'wildcard': None,
                'allMatches': []
            }
        
        # Use ML clustering to diversify recommendations
        clusters = {}
        for prop in scored_properties[:20]:  # Consider top 20
            cluster = prop.get('mlCluster', '0')
            if cluster not in clusters:
                clusters[cluster] = []
            clusters[cluster].append(prop)
        
        curated = {}
        
        # Safe Bet: Best overall from largest cluster
        if clusters:
            largest_cluster = max(clusters.keys(), key=lambda k: len(clusters[k]))
            safe_bet = max(clusters[largest_cluster], key=lambda x: x['matchScore'])
            curated['safeBet'] = self.enhance_ml_presentation(safe_bet, 'safe_bet', largest_cluster)
        
        # Stretch Option: Best from different cluster
        if len(clusters) > 1:
            other_clusters = [k for k in clusters.keys() if k != largest_cluster]
            if other_clusters:
                second_cluster = max(other_clusters, key=lambda k: len(clusters[k]))
                stretch = max(clusters[second_cluster], key=lambda x: x['matchScore'])
                curated['stretchOption'] = self.enhance_ml_presentation(stretch, 'stretch', second_cluster)
        
        # Wildcard: Best value prediction
        if scored_properties:
            wildcard = max(scored_properties[:10], key=lambda x: x.get('valuePrediction', 0))
            curated['wildcard'] = self.enhance_ml_presentation(wildcard, 'wildcard', 'value')
        
        curated['allMatches'] = scored_properties[:10]
        
        return curated
    
    def enhance_ml_presentation(self, property_data, category, ml_info):
        """Add ML-based presentation enhancements"""
        enhanced = property_data.copy()
        
        if category == 'safe_bet':
            enhanced['presentationTitle'] = f"ML Top Match 🏆"
            enhanced['presentationSubtitle'] = f"Best match from {ml_info}"
            enhanced['mlInsights'] = [
                "🤖 Selected by similarity algorithm",
                "📊 High feature alignment",
                "🎯 Optimal balance of preferences"
            ]
            
        elif category == 'stretch':
            enhanced['presentationTitle'] = f"Diverse Option 🔄"
            enhanced['presentationSubtitle'] = f"Alternative from {ml_info}"
            enhanced['mlInsights'] = [
                "🔄 Different property cluster",
                "🎲 Alternative feature combination",
                "💡 Expands your options"
            ]
            
        elif category == 'wildcard':
            enhanced['presentationTitle'] = f"Value Pick 💎"
            enhanced['presentationSubtitle'] = "Best predicted value"
            enhanced['mlInsights'] = [
                "💰 High value prediction score",
                "📈 Strong price-to-features ratio",
                "🏆 ML-identified hidden gem"
            ]
        
        return enhanced
    
    def analyze_property_features(self, property_data, user_prefs):
        """Analyze key feature matches"""
        analysis = {
            'strongMatches': [],
            'weakMatches': [],
            'suggestions': []
        }
        
        # Budget analysis
        property_price = property_data.get('price', 0)
        max_budget = self.ml_recommender.normalize_budget(user_prefs.get('max_budget', 999999))
        
        if property_price <= max_budget:
            analysis['strongMatches'].append(f"Within budget (₱{property_price:,})")
        else:
            analysis['weakMatches'].append(f"Above budget by ₱{property_price - max_budget:,}")
        
        # Location analysis
        distance = property_data.get('distance_to_it_park_km', 10)
        transportation = user_prefs.get('transportation', '')
        
        if transportation == 'walk' and distance <= 1:
            analysis['strongMatches'].append("Walking distance to IT Park")
        elif distance <= 3:
            analysis['strongMatches'].append("Good location")
        else:
            analysis['weakMatches'].append("Further commute")
        
        # Amenities analysis
        amenities = property_data.get('amenities', [])
        preferred = user_prefs.get('preferred_amenities', [])
        
        matched = sum(1 for pref in preferred 
                     if any(pref.lower() in str(a).lower() for a in amenities))
        if matched > 0:
            analysis['strongMatches'].append(f"{matched} preferred amenities")
        
        # ML suggestions
        cluster = property_data.get('cluster', -1)
        if cluster != -1:
            analysis['suggestions'].append(f"Similar properties in cluster {cluster}")
        
        return analysis
    
    def generate_fallback_recommendations(self, user_prefs):
        """Generate fallback recommendations if ML fails"""
        print("⚠️ ML models not ready, using fallback logic")
        
        # Simple rule-based fallback
        scored = []
        for prop in properties:
            score = self.simple_scoring(prop, user_prefs)
            if score > 0:
                property_data = self.prepare_property_response(prop, score, user_prefs)
                scored.append(property_data)
        
        scored.sort(key=lambda x: x['matchScore'], reverse=True)
        
        curated = {
            'safeBet': scored[0] if scored else None,
            'stretchOption': scored[1] if len(scored) > 1 else None,
            'wildcard': scored[2] if len(scored) > 2 else None,
            'allMatches': scored[:10]
        }
        
        return curated
    
    def simple_scoring(self, property_data, user_prefs):
        """Simple rule-based scoring for fallback"""
        score = 50
        
        # Budget factor
        price = property_data.get('price', 0)
        max_budget = self.ml_recommender.normalize_budget(user_prefs.get('max_budget', 999999))
        
        if price <= max_budget:
            score += 30
        elif price <= max_budget * 1.2:
            score += 10
        else:
            score -= 20
        
        # Pet policy
        has_pets = user_prefs.get('has_pets', False)
        pet_friendly = property_data.get('pet_friendly', False)
        if has_pets and pet_friendly:
            score += 10
        elif not has_pets:
            score += 5
        
        # Location
        distance = property_data.get('distance_to_it_park_km', 10)
        if distance <= 2:
            score += 15
        elif distance <= 5:
            score += 5
        
        return max(0, min(100, score))

@app.route('/recommend', methods=['POST'])
def recommend():
    """Main recommendation endpoint with ML concierge"""
    try:
        raw_user_prefs = request.get_json()
        
        if not raw_user_prefs:
            return jsonify(format_response_keys({
                "error": "No preferences provided",
                "curatedMatches": {},
                "totalMatches": 0
            })), 400
        
        print(f"\n📝 ML CONCIERGE REQUEST:")
        print(f"   Budget: ₱{raw_user_prefs.get('minBudget', 0):,} - ₱{raw_user_prefs.get('maxBudget', 0):,}")
        
        # Normalize preferences
        user_prefs = normalize_user_prefs(raw_user_prefs)
        
        # Initialize ML engine
        engine = MLConciergeEngine()
        
        # Generate ML-powered recommendations
        curated_recommendations = engine.generate_ml_recommendations(user_prefs)
        
        # Count matches
        all_matches = curated_recommendations.get('allMatches', [])
        total_matches = len(all_matches)
        
        # Build response
        response = {
            "conciergeService": "Livora ML Concierge",
            "mlModels": {
                "similarity": "Cosine Similarity + KNN",
                "clustering": "K-means Property Segmentation",
                "valuePrediction": "Random Forest Regressor",
                "featureEngineering": "TF-IDF + One-Hot Encoding"
            },
            "curatedMatches": curated_recommendations,
            "totalMatches": total_matches,
            "mlInsights": [
                "🤖 Powered by scikit-learn algorithms",
                "📊 Feature-based similarity matching",
                "🏘️ Property clustering for diversity",
                "💰 ML value prediction scores"
            ],
            "nextSteps": [
                "Review ML-curated matches",
                "Check feature analysis for each property",
                "Compare different ML clusters",
                "Consider value prediction scores"
            ]
        }
        
        print(f"\n✅ ML CONCIERGE COMPLETE:")
        print(f"   Total properties analyzed: {len(properties)}")
        print(f"   ML matches found: {total_matches}")
        print(f"   Algorithms used: KNN, K-means, Random Forest")
        
        return jsonify(format_response_keys(response))
        
    except Exception as e:
        print(f"❌ ML Concierge Error: {e}")
        import traceback
        traceback.print_exc()
        
        return jsonify(format_response_keys({
            "error": str(e),
            "curatedMatches": {},
            "totalMatches": 0
        })), 500

@app.route('/ml/similar/<int:property_id>', methods=['GET'])
def get_similar_properties(property_id):
    """Get similar properties using ML"""
    try:
        engine = MLConciergeEngine()
        similar = engine.ml_recommender.find_similar_properties(property_id, n=5)
        
        return jsonify(format_response_keys({
            "propertyId": property_id,
            "similarProperties": similar,
            "algorithm": "K-Nearest Neighbors (cosine similarity)"
        }))
    except Exception as e:
        return jsonify(format_response_keys({"error": str(e)})), 500

@app.route('/ml/clusters', methods=['GET'])
def get_property_clusters():
    """Get property clustering information"""
    try:
        engine = MLConciergeEngine()
        clusters = {}
        
        if hasattr(engine.ml_recommender, 'clustering_model'):
            for cluster_id in range(engine.ml_recommender.clustering_model.n_clusters):
                cluster_props = engine.ml_recommender.properties_df[
                    engine.ml_recommender.properties_df['cluster'] == cluster_id
                ]
                
                clusters[cluster_id] = {
                    "count": len(cluster_props),
                    "avgPrice": cluster_props['price'].mean(),
                    "avgRating": cluster_props['rating'].mean(),
                    "commonTypes": cluster_props['type'].value_counts().head(3).to_dict()
                }
        
        return jsonify(format_response_keys({
            "clusters": clusters,
            "algorithm": "K-means Clustering",
            "totalClusters": engine.ml_recommender.clustering_model.n_clusters if hasattr(engine.ml_recommender, 'clustering_model') else 0
        }))
    except Exception as e:
        return jsonify(format_response_keys({"error": str(e)})), 500

@app.route('/ml/explain', methods=['GET'])
def explain_ml_system():
    """Explain the ML system"""
    explanation = {
        "title": "Livora ML Property Recommender",
        "description": "Machine Learning-powered property matching system",
        "mlAlgorithms": [
            {
                "algorithm": "K-Nearest Neighbors (KNN)",
                "purpose": "Property similarity matching",
                "metric": "Cosine similarity",
                "output": "Similarity scores between properties"
            },
            {
                "algorithm": "K-means Clustering",
                "purpose": "Property segmentation",
                "features": "Price, location, amenities, etc.",
                "output": "Property clusters for diverse recommendations"
            },
            {
                "algorithm": "Random Forest Regressor",
                "purpose": "Value prediction",
                "features": "Property characteristics",
                "output": "Value score (0-100)"
            },
            {
                "algorithm": "TF-IDF Vectorizer",
                "purpose": "Amenities text processing",
                "output": "Numerical representation of amenities"
            }
        ],
        "featureEngineering": [
            "Numerical features: Price, area, distance, rating",
            "Categorical features: Type, location, amenities (one-hot encoded)",
            "Boolean features: Pet-friendly, furnished, etc.",
            "Text features: Amenities (TF-IDF vectorized)"
        ],
        "matchingProcess": [
            "1. Convert user preferences to feature vector",
            "2. Calculate cosine similarity with all properties",
            "3. Apply dealbreaker filters",
            "4. Adjust scores with rule-based factors",
            "5. Use clustering to ensure diversity",
            "6. Apply value prediction scores"
        ]
    }
    return jsonify(format_response_keys(explanation))

@app.route('/properties', methods=['GET'])
def get_properties():
    """Get all properties"""
    try:
        limit = int(request.args.get('limit', 20))
        offset = int(request.args.get('offset', 0))
        
        end_idx = min(offset + limit, len(properties))
        properties_list = properties[offset:end_idx]
        
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

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify(format_response_keys({
        "status": "healthy",
        "service": "Livora ML Concierge Matchmaking",
        "propertiesLoaded": len(properties),
        "mlAlgorithms": "KNN, K-means, Random Forest, TF-IDF",
        "matchingEngine": "scikit-learn powered"
    }))

if __name__ == '__main__':
    print("\n" + "="*80)
    print("🤖 LIVORA ML CONCIERGE MATCHMAKING API")
    print("   Powered by scikit-learn")
    print("="*80)
    print("\n🔬 ML ALGORITHMS:")
    print("   ✓ K-Nearest Neighbors (KNN) - Similarity matching")
    print("   ✓ K-means Clustering - Property segmentation")
    print("   ✓ Random Forest - Value prediction")
    print("   ✓ TF-IDF - Amenities processing")
    
    print(f"\n📊 DATA SUMMARY:")
    print(f"   Properties loaded: {len(properties)}")
    
    print("\n🧠 FEATURE ENGINEERING:")
    print("   Numerical features: Price, area, distance, rating")
    print("   Categorical features: Type, location, amenities")
    print("   Boolean features: Pet-friendly, furnished, etc.")
    
    print("\n📡 ENDPOINTS:")
    print("  POST /recommend         - Get ML-powered recommendations")
    print("  GET  /ml/similar/<id>   - Find similar properties (KNN)")
    print("  GET  /ml/clusters       - View property clusters")
    print("  GET  /ml/explain        - Explain ML system")
    print("  GET  /properties        - List all properties")
    print("  GET  /health           - Health check")
    print("="*80)
    
    app.run(debug=True, port=5000, host='0.0.0.0')