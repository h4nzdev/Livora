-- =========================================================
-- LIVING OS DASHBOARD SCHEMA ("The Dweller" Ecosystem)
-- =========================================================

-- 1. DWELLER SETTINGS (Context-Aware Modes)
-- Stores lifestyle preferences to customize app behavior (e.g., Night Shift mode)
CREATE TABLE public.dweller_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    
    -- Context-Aware Modes
    -- "Night Shift": System suppresses non-urgent alerts during the day.
    is_night_shift_worker BOOLEAN DEFAULT FALSE,
    quiet_hours_start TIME, -- e.g., '08:00:00' for night shift
    quiet_hours_end TIME,   -- e.g., '16:00:00'
    
    -- Notification Preferences
    notify_utility_outages BOOLEAN DEFAULT TRUE,
    notify_community_events BOOLEAN DEFAULT TRUE,
    notify_marketplace_deals BOOLEAN DEFAULT FALSE,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. AMENITY BOOKINGS (Digital Booking)
-- "Conflict-Free" system for gyms, pools, function halls
CREATE TABLE public.amenity_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    
    amenity_name TEXT NOT NULL, -- e.g., 'Gym', 'Pool', 'Function Hall'
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    
    status TEXT CHECK (status IN ('confirmed', 'cancelled', 'completed')) DEFAULT 'confirmed',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MARKETPLACE LISTINGS (Trusted Marketplace)
-- Verified Resident Network for buying/selling items
CREATE TABLE public.marketplace_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE, -- Listings are scoped to the building/community
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

-- 4. COMMUNITY PERKS (Local Ecosystem)
-- Exclusive discounts for nearby services
CREATE TABLE public.community_perks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE, -- Perks can be specific to a building or shared
    
    title TEXT NOT NULL, -- e.g., "10% Off at Joe's Coffee"
    description TEXT,
    partner_name TEXT, -- e.g., "Joe's Coffee"
    discount_code TEXT, -- Optional
    promo_image_url TEXT,
    
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. MAINTENANCE RATINGS (Vendor Feedback Loop)
-- Updates to maintenance_requests to support "Vendor Reliability Score"
-- (These columns should be added to the existing maintenance_requests table)
/*
ALTER TABLE public.maintenance_requests 
ADD COLUMN tenant_rating INTEGER CHECK (tenant_rating BETWEEN 1 AND 5), -- 1-5 Star Rating
ADD COLUMN tenant_feedback TEXT; -- "Technician was on time and clean."
*/

-- Enable RLS
ALTER TABLE public.dweller_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenity_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_perks ENABLE ROW LEVEL SECURITY;

-- Policies (Examples)
-- Dwellers can view bookings in their property
-- Dwellers can view marketplace listings in their property
