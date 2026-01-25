-- ==========================================
-- PROPERTIES & PREFERENCES SCHEMA (Supabase/PostgreSQL)
-- ==========================================
-- This script defines the structure for Real Estate Listings (Properties)
-- and Tenant Matching Preferences (The Searcher).

-- 1. Enable UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- PROPERTIES TABLE (Listings)
-- =========================================================
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE, 
    
    -- 1. IMAGES
    -- Array of URLs. 
    -- Convention: [0]=Outside View, [1]=Indoor View, [2]=Window View, [3+]=Others
    images TEXT[], 

    -- 2. LOCATION
    location TEXT NOT NULL,      -- Google Maps Address String
    coordinates JSONB,           -- { "lat": 14.5, "lng": 121.0 }
    
    -- 3. FINANCIALS & TERMS
    price_monthly NUMERIC NOT NULL,
    price_condo_dues NUMERIC DEFAULT 0, -- One-time or monthly dues
    deposit_months INTEGER DEFAULT 1,
    advance_months INTEGER DEFAULT 1,
    min_contract_months INTEGER DEFAULT 6, -- e.g., 6 or 12
    
    -- 4. PHYSICAL SPECS
    property_type TEXT CHECK (property_type IN ('apartment', 'condo', 'house')),
    floor_level TEXT,            -- Only if Condo/Apt
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    bathroom_type TEXT CHECK (bathroom_type IN ('own', 'shared')),
    floor_area_sqm NUMERIC,
    furnishing_status TEXT CHECK (furnishing_status IN ('unfurnished', 'semi-furnished', 'fully-furnished')),
    
    -- Shared Living Option
    allow_shared_living BOOLEAN DEFAULT FALSE,
    shared_living_gender TEXT CHECK (shared_living_gender IN ('male_only', 'female_only', 'mixed', 'co_ed')),

    -- 5. RULES & AMENITIES CHECKLIST
    -- Amenities List
    amenities TEXT[],            -- General list ['gym', 'pool']
    
    -- House Rules
    curfew_time TEXT,            -- e.g., "10:00 PM" or NULL if none
    visitor_policy TEXT CHECK (visitor_policy IN ('not_allowed', 'no_overnight', 'all_allowed')),
    pet_policy TEXT CHECK (pet_policy IN ('yes', 'no', 'small_caged_only')),
    
    -- Security
    is_gated BOOLEAN DEFAULT FALSE,
    
    -- Connectivity & Signal
    -- JSONB: { "smart": 3, "globe": 2, "dito": 0 } (0-5 bars)
    signal_strength JSONB DEFAULT '{"smart": 0, "globe": 0, "dito": 0}'::jsonb,
    connectivity_type TEXT CHECK (connectivity_type IN ('fiber_active', 'fiber_ready', 'no_coverage')),
    
    -- Unit Details
    unit_orientation TEXT CHECK (unit_orientation IN ('street_facing', 'interior_view', 'rear_view')),
    laundry_provision TEXT CHECK (laundry_provision IN ('washing_machine_included', 'hookup_ready', 'common_area', 'laundromat_nearby', 'handwash_only')),
    cooking_policy TEXT CHECK (cooking_policy IN ('allowed_gas', 'allowed_electric', 'light_cooking_only', 'not_allowed')),
    
    -- Utilities (Submeters)
    has_own_submeter_water BOOLEAN DEFAULT TRUE,
    has_own_submeter_electric BOOLEAN DEFAULT TRUE,
    
    -- Parking
    parking_type TEXT CHECK (parking_type IN ('dedicated', 'common', 'street', 'paid_offsite')),
    
    -- A/C Details (If Semi/Fully Furnished)
    -- JSONB: { "inverter": true, "type": "split", "hp": 1.5 }
    aircon_details JSONB,

    -- 6. STATUS
    rating NUMERIC DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    
    -- Verification Status (Property Legitimacy)
    verification_status TEXT CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')) DEFAULT 'unverified',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- TENANT PREFERENCES TABLE (The Searcher)
-- =========================================================
CREATE TABLE public.tenant_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    
    budget_min NUMERIC DEFAULT 0,
    budget_max NUMERIC NOT NULL,
    regions TEXT[],
    preferred_areas TEXT[],
    
    -- Matching Criteria (Updated to match Property Specs)
    bedrooms_min INTEGER DEFAULT 0,
    preferred_property_type TEXT[],
    preferred_furnishing TEXT[],
    
    household_size INTEGER DEFAULT 1,
    move_in_date DATE,
    
    pet_friendly BOOLEAN DEFAULT FALSE,
    amenities TEXT[],
    lifestyle_features TEXT[],
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- RLS POLICIES
-- =========================================================
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public properties are viewable by everyone" 
ON public.properties FOR SELECT 
USING (true);

CREATE POLICY "Landlords can manage own properties" 
ON public.properties FOR ALL 
USING (auth.uid() = landlord_id);

CREATE POLICY "Users manage their own preferences" 
ON public.tenant_preferences FOR ALL 
USING (auth.uid() = user_id);
