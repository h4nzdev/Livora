-- ==========================================
-- LANDLORD DASHBOARD & OPERATIONS SCHEMA
-- ==========================================
-- This script handles the business side of the rental:
-- Vendors, AI Maintenance, Smart Alerts, and Inspections.

-- 1. Enable UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- 1. UNIFIED OPERATIONAL DASHBOARD
-- =========================================================

-- Vendor Management
-- Landlords can organize their service providers.
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    
    name TEXT NOT NULL,
    service_category TEXT CHECK (service_category IN ('plumbing', 'electrical', 'cleaning', 'internet', 'general_repair', 'security', 'other')) NOT NULL,
    contact_number TEXT,
    email TEXT,
    company_name TEXT,
    
    rating NUMERIC DEFAULT 0, -- Private rating by landlord
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 2. AI-DRIVEN MAINTENANCE SYSTEM ("Actionable Grievance")
-- =========================================================

-- Note: 'maintenance_requests' table exists in main schema.
-- We are adding a side table for the AI analysis to keep it clean, 
-- or we can ALTER the main table. For this script, I'll define the 
-- schema extensions that will be merged.

-- Maintenance Timeline / Updates
-- Tracks the lifecycle of a request in real-time (e.g., "Reported" -> "Vendor Assigned" -> "Parts Ordered" -> "Fixed")
CREATE TABLE public.maintenance_timeline (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES public.maintenance_requests(id) ON DELETE CASCADE,
    
    -- Status at this point in time
    status TEXT CHECK (status IN ('reported', 'ai_triaged', 'vendor_contacted', 'scheduled', 'in_progress', 'parts_pending', 'completed', 'verified_by_tenant')) NOT NULL,
    
    -- Details
    description TEXT, -- e.g., "Assigned to Mario Plumbing"
    actor_id UUID REFERENCES public.users(id), -- Who made this update? (Landlord, Tenant, or System)
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 3. SMART ALERTS & COMMUNICATION
-- =========================================================

-- Context-Aware Notifications / Announcements
-- "The system automatically notifies tenants about relevant events"
CREATE TABLE public.property_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    
    -- Type of Alert
    type TEXT CHECK (type IN ('package_delivery', 'utility_outage', 'maintenance_schedule', 'community_event', 'emergency', 'general')) NOT NULL,
    
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    
    -- Target Audience (Optional filtering)
    -- If NULL, sends to all active tenants in the property.
    target_unit_ids TEXT[], -- Array of Unit IDs or Lease IDs if specific
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Digital RSVP / Inspections
-- "Landlords can schedule inspections, and tenants can confirm attendance"
CREATE TABLE public.inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    landlord_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- Schedule
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    
    -- Purpose
    type TEXT CHECK (type IN ('routine_check', 'move_out_inspection', 'repair_verification', 'showing')) DEFAULT 'routine_check',
    
    -- Tenant Response (Digital RSVP)
    status TEXT CHECK (status IN ('pending', 'confirmed', 'reschedule_requested', 'completed', 'cancelled')) DEFAULT 'pending',
    
    tenant_notes TEXT, -- e.g., "I will be at work, my sister will open the door"
    landlord_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- 4. DIRECT DEALING & NEGOTIATION
-- =========================================================

-- Rental Applications / Offers
-- Formalizes the "Deal" phase.
CREATE TABLE public.rental_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- The Offer
    offer_monthly_rent NUMERIC NOT NULL,
    offer_deposit_months INTEGER,
    offer_advance_months INTEGER,
    proposed_move_in_date DATE,
    proposed_lease_duration_months INTEGER,
    
    -- Status
    status TEXT CHECK (status IN ('applied', 'screening', 'negotiating', 'approved', 'rejected', 'withdrawn')) DEFAULT 'applied',
    
    -- Links to the negotiation chat
    conversation_id UUID REFERENCES public.conversations(id),
    
    landlord_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- RLS POLICIES
-- =========================================================
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_applications ENABLE ROW LEVEL SECURITY;

-- Vendors: Landlord only
CREATE POLICY "Landlords manage vendors" ON public.vendors 
USING (auth.uid() = landlord_id);

-- Maintenance Timeline: Viewable by Tenant & Landlord involved
-- (Complex policy omitted for brevity, logic: user is tenant OR landlord of request.property)

-- Announcements: Landlord manages, Tenant views
CREATE POLICY "Landlords manage announcements" ON public.property_announcements 
USING (auth.uid() = landlord_id);

CREATE POLICY "Tenants view announcements" ON public.property_announcements FOR SELECT
USING (auth.uid() IN (
    SELECT tenant_id FROM public.leases 
    WHERE property_id = public.property_announcements.property_id 
    AND status = 'active'
));
