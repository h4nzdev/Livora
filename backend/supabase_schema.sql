-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- 1. CORE USERS & AUTH
-- =========================================================

-- Users Table (Linked to Supabase Auth)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mobile_number TEXT,
    
    -- Roles
    role TEXT CHECK (role IN ('tenant', 'landlord', 'agent')) DEFAULT 'tenant',
    tenant_type TEXT CHECK (tenant_type IN ('searcher', 'dweller')), -- Only for tenants
    
    -- Profile
    profile_image TEXT,
    
    -- Landlord Specific
    payment_details JSONB DEFAULT '{}'::jsonb, -- { "gcash_qr": "url", "bank_name": "BDO" }
    
    -- Verification
    is_verified BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 2. PROPERTIES & SEARCH
-- =========================================================

-- Properties Table
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE, 
    
    -- Media
    images TEXT[], 
    
    -- Location
    location TEXT NOT NULL,
    coordinates JSONB,
    
    -- Financials
    price_monthly NUMERIC NOT NULL,
    price_condo_dues NUMERIC DEFAULT 0,
    deposit_months INTEGER DEFAULT 1,
    advance_months INTEGER DEFAULT 1,
    min_contract_months INTEGER DEFAULT 6,
    
    -- Specs
    property_type TEXT CHECK (property_type IN ('apartment', 'condo', 'house')),
    floor_level TEXT,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    bathroom_type TEXT CHECK (bathroom_type IN ('own', 'shared')),
    floor_area_sqm NUMERIC,
    furnishing_status TEXT CHECK (furnishing_status IN ('unfurnished', 'semi-furnished', 'fully-furnished')),
    
    -- Shared Living
    allow_shared_living BOOLEAN DEFAULT FALSE,
    shared_living_gender TEXT,
    
    -- Amenities & Rules
    amenities TEXT[],
    curfew_time TEXT,
    visitor_policy TEXT,
    pet_policy TEXT,
    is_gated BOOLEAN DEFAULT FALSE,
    
    -- Tech & Utilities
    signal_strength JSONB DEFAULT '{"smart": 0, "globe": 0, "dito": 0}'::jsonb,
    connectivity_type TEXT,
    unit_orientation TEXT,
    laundry_provision TEXT,
    cooking_policy TEXT,
    has_own_submeter_water BOOLEAN DEFAULT TRUE,
    has_own_submeter_electric BOOLEAN DEFAULT TRUE,
    parking_type TEXT,
    aircon_details JSONB,

    -- Status
    rating NUMERIC DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    verification_status TEXT CHECK (verification_status IN ('unverified', 'pending', 'verified', 'rejected')) DEFAULT 'unverified',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tenant Preferences (The Searcher)
CREATE TABLE public.tenant_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    budget_min NUMERIC DEFAULT 0,
    budget_max NUMERIC NOT NULL,
    lease_duration TEXT,
    regions TEXT[],
    preferred_areas TEXT[],
    household_size INTEGER DEFAULT 1,
    move_in_date DATE,
    pet_friendly BOOLEAN DEFAULT FALSE,
    amenities TEXT[],
    
    -- Enhanced Matching
    preferred_orientation TEXT, -- e.g. 'East' (Morning Sun)
    parking_requirement TEXT CHECK (parking_requirement IN ('none', 'car', 'motorcycle', 'both')),
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 3. LIVING OS (THE DWELLER)
-- =========================================================

-- Leases (The contract link)
CREATE TABLE public.leases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rent_amount NUMERIC NOT NULL,
    payment_day INTEGER,
    status TEXT CHECK (status IN ('active', 'pending', 'terminated', 'expired')) DEFAULT 'active',
    contract_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dweller Settings (Context-Aware Modes)
CREATE TABLE public.dweller_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    is_night_shift_worker BOOLEAN DEFAULT FALSE,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    notify_utility_outages BOOLEAN DEFAULT TRUE,
    notify_community_events BOOLEAN DEFAULT TRUE,
    notify_marketplace_deals BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Amenity Bookings
CREATE TABLE public.amenity_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    amenity_name TEXT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status TEXT CHECK (status IN ('confirmed', 'cancelled', 'completed')) DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketplace Listings
CREATE TABLE public.marketplace_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    category TEXT CHECK (category IN ('furniture', 'electronics', 'appliances', 'clothing', 'services', 'other')),
    images TEXT[],
    status TEXT CHECK (status IN ('active', 'sold', 'reserved', 'deleted')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Perks
CREATE TABLE public.community_perks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    partner_name TEXT,
    discount_code TEXT,
    promo_image_url TEXT,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 4. MAINTENANCE & LANDLORD OPS
-- =========================================================

-- Maintenance Requests (Enhanced with AI & Ratings)
CREATE TABLE public.maintenance_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'emergency')) DEFAULT 'low',
    status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
    images TEXT[],
    
    -- AI Fields
    ai_priority_score INTEGER DEFAULT 0,
    ai_detected_keywords TEXT[],
    ai_analysis JSONB,
    
    -- Tenant Feedback
    tenant_rating INTEGER CHECK (tenant_rating BETWEEN 1 AND 5),
    tenant_feedback TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maintenance Timeline
CREATE TABLE public.maintenance_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES public.maintenance_requests(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    service_category TEXT NOT NULL,
    contact_number TEXT,
    email TEXT,
    rating NUMERIC DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property Announcements (Smart Alerts)
CREATE TABLE public.property_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('general', 'utility', 'emergency', 'community')),
    target_audience TEXT CHECK (target_audience IN ('all', 'specific_units')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inspections (Digital RSVP)
CREATE TABLE public.inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.users(id), -- Null if generic slot
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled')) DEFAULT 'scheduled',
    rsvp_status TEXT CHECK (rsvp_status IN ('pending', 'confirmed', 'reschedule_requested')) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rental Applications (Direct Dealing)
CREATE TABLE public.rental_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'negotiating', 'approved', 'lease_sent', 'lease_signed', 'moving_in', 'rejected', 'cancelled')) DEFAULT 'pending',
    offer_rent NUMERIC,
    offer_deposit NUMERIC,
    proposed_move_in DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 5. TRANSACTIONS & FINANCIALS
-- =========================================================

-- Transactions (Receipts)
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payer_id UUID REFERENCES public.users(id) NOT NULL,
    receiver_id UUID REFERENCES public.users(id) NOT NULL,
    property_id UUID REFERENCES public.properties(id),
    lease_id UUID REFERENCES public.leases(id),
    amount NUMERIC NOT NULL,
    transaction_type TEXT,
    receipt_url TEXT NOT NULL,
    status TEXT CHECK (status IN ('pending_verification', 'verified', 'rejected')) DEFAULT 'pending_verification',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    remarks TEXT
);

-- =========================================================
-- 6. COMMUNICATION
-- =========================================================

CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id),
    last_message TEXT,
    unread_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.conversation_participants (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.users(id),
    text TEXT NOT NULL,
    status TEXT DEFAULT 'sent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 7. VERIFICATION & DOCUMENTS
-- =========================================================

CREATE TABLE public.user_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    legal_name TEXT NOT NULL,
    id_type TEXT NOT NULL,
    id_number TEXT NOT NULL,
    id_image_url TEXT NOT NULL,
    social_media_link TEXT,
    selfie_image_url TEXT NOT NULL,
    prc_license_number TEXT,
    status TEXT DEFAULT 'pending',
    rejection_reason TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.tenant_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    employment_type TEXT,
    monthly_income NUMERIC,
    financial_documents JSONB,
    quality_filter_responses JSONB,
    trust_score INTEGER DEFAULT 0,
    
    -- Tenant Resume Status
    profile_status TEXT CHECK (profile_status IN ('guest', 'verified', 'high_intent')) DEFAULT 'guest',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 8. PIPELINE VIEWS (SEARCHER DASHBOARD)
-- =========================================================

CREATE OR REPLACE VIEW public.tenant_pipeline_summary AS
SELECT 
    t.id as tenant_id,
    p.id as property_id,
    p.images[1] as property_image,
    p.location,
    p.price_monthly,
    
    -- Determine current stage
    CASE 
        WHEN l.id IS NOT NULL THEN 'lease'
        WHEN ra.id IS NOT NULL THEN 'application'
        WHEN i.id IS NOT NULL THEN 'viewing'
        WHEN c.id IS NOT NULL THEN 'inquiry'
        ELSE 'browsing'
    END as stage,
    
    -- Status Details
    COALESCE(l.status, ra.status, i.status, 'active') as detailed_status,
    
    -- Timestamps for sorting
    GREATEST(
        l.created_at, 
        ra.created_at, 
        i.created_at, 
        c.updated_at
    ) as last_interaction_at

FROM public.users t
JOIN public.properties p ON true -- Cross join potential (filtered by joins below)
LEFT JOIN public.leases l ON l.tenant_id = t.id AND l.property_id = p.id
LEFT JOIN public.rental_applications ra ON ra.tenant_id = t.id AND ra.property_id = p.id
LEFT JOIN public.inspections i ON i.tenant_id = t.id AND i.property_id = p.id
LEFT JOIN public.conversations c ON c.property_id = p.id AND EXISTS (
    SELECT 1 FROM conversation_participants cp WHERE cp.conversation_id = c.id AND cp.user_id = t.id
)
WHERE 
    t.role = 'tenant' AND t.tenant_type = 'searcher'
    AND (l.id IS NOT NULL OR ra.id IS NOT NULL OR i.id IS NOT NULL OR c.id IS NOT NULL);

-- =========================================================
-- 9. SECURITY POLICIES (RLS)
-- =========================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dweller_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenity_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_perks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_verifications ENABLE ROW LEVEL SECURITY;

-- Basic Policy: Users see their own data
CREATE POLICY "Users view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- =========================================================
-- 10. TRIGGERS
-- =========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role, tenant_type)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'tenant'),
    new.raw_user_meta_data->>'tenant_type'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
