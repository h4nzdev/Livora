
import os
import time
from dotenv import load_dotenv
from supabase import create_client, Client
import sys

# Load environment variables
load_dotenv()

# Supabase configuration
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    print("Error: Supabase URL or Key not found in environment variables.")
    sys.exit(1)

supabase: Client = create_client(url, key)

# Import local data
try:
    sys.path.append(os.path.join(os.path.dirname(__file__), 'data'))
    from properties import properties
    print(f"✓ Loaded {len(properties)} properties from local data.")
except ImportError as e:
    print(f"Error importing properties: {e}")
    sys.exit(1)

def seed_properties():
    print("Starting seeding process...")
    
    # Check if properties already exist to avoid duplicates
    try:
        response = supabase.table("properties").select("id", count="exact").execute()
        count = response.count
        if count > 0:
            print(f"Warning: {count} properties already exist in the database.")
            # Optional: Clear existing data
            # supabase.table("properties").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()
            # print("Cleared existing properties.")
    except Exception as e:
        print(f"Error checking existing properties: {e}")

    success_count = 0
    error_count = 0

    for prop in properties:
        # Map local property fields to Supabase schema
        # Schema: public.properties (id, location, price_monthly, bedrooms, bathrooms, amenities, etc.)
        
        # Note: 'id' in local is integer, schema expects UUID. We will let Postgres generate UUID.
        # But for 'properties.py' mapping, we might lose the integer ID mapping.
        # Ideally, we should keep track, but for this task, re-generating UUIDs is fine.
        
        # Map amenities (list of strings to array)
        amenities = prop.get("amenities", [])
        
        db_record = {
            "location": prop.get("location"),
            "price_monthly": prop.get("price"),
            "bedrooms": prop.get("bedrooms"),
            "bathrooms": prop.get("bathrooms"),
            "amenities": amenities,
            "property_type": prop.get("type").lower() if prop.get("type") else None,
            "rating": prop.get("rating"),
            "floor_area_sqm": prop.get("area_sqm"),
            "is_available": True
            # Add other fields as necessary matching the schema
        }
        
        # Handle some schema constraints
        # property_type enum: 'apartment', 'condo', 'house'
        # Local types: 'Apartment', 'Condominium', 'House', 'Shared', 'Loft', 'Villa', etc.
        # We need to normalize or the insert will fail if there's a strict CHECK constraint.
        # Looking at schema: CHECK (property_type IN ('apartment', 'condo', 'house'))
        # This is quite restrictive. "Shared", "Loft", "Villa" will fail.
        # We might need to map them to closest allowed or update schema later.
        
        raw_type = prop.get("type", "").lower()
        if raw_type in ['apartment', 'studio', 'loft', 'dormitory', 'shared']:
            db_record['property_type'] = 'apartment'
        elif raw_type in ['condominium', 'condo', 'serviced apartment']:
            db_record['property_type'] = 'condo'
        elif raw_type in ['house', 'villa', 'duplex', 'townhouse']:
            db_record['property_type'] = 'house'
        else:
            db_record['property_type'] = 'apartment' # Fallback
            
        
        try:
            data, count = supabase.table("properties").insert(db_record).execute()
            success_count += 1
            print(f"Inserted: {prop.get('name')}")
        except Exception as e:
            error_count += 1
            print(f"Failed to insert {prop.get('name')}: {e}")

    print(f"\nSeeding complete.")
    print(f"Success: {success_count}")
    print(f"Errors: {error_count}")

if __name__ == "__main__":
    seed_properties()
