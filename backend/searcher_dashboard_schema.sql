-- =========================================================
-- SEARCHER DASHBOARD SCHEMA ("The Searcher" Ecosystem)
-- =========================================================

-- 1. ENHANCED TENANT PREFERENCES (For "Intelligent Profiling")
-- Adding fields to support "Morning Sun", "Parking", and other specific matches
/*
ALTER TABLE public.tenant_preferences 
ADD COLUMN preferred_orientation TEXT, -- e.g., 'East' (Morning Sun), 'West' (Sunset)
ADD COLUMN parking_requirement TEXT CHECK (parking_requirement IN ('none', 'car', 'motorcycle', 'both'));
*/

-- 2. TENANT RESUME STATUS (Trust Badge)
-- Explicitly tracking the profile level (Guest -> Verified -> High Intent)
/*
ALTER TABLE public.tenant_verifications
ADD COLUMN profile_status TEXT CHECK (profile_status IN ('guest', 'verified', 'high_intent')) DEFAULT 'guest';
*/

-- 3. ENHANCED APPLICATION TRACKING
-- Expanding the status enum to cover the full pipeline (Inquiry -> Move In)
-- Note: This requires dropping the old constraint and adding a new one.
/*
ALTER TABLE public.rental_applications 
DROP CONSTRAINT rental_applications_status_check;

ALTER TABLE public.rental_applications 
ADD CONSTRAINT rental_applications_status_check 
CHECK (status IN ('pending', 'negotiating', 'approved', 'lease_sent', 'lease_signed', 'moving_in', 'rejected', 'cancelled'));
*/

-- 4. PIPELINE VIEW (The "Tracker" Widget)
-- Aggregates data from Conversations, Inspections, Applications, and Leases
-- to show the "Highest Stage" reached for each property interaction.

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

-- Enable RLS on the view (indirectly via underlying tables, but views often need explicit access rights)
-- For Supabase, standard table policies usually apply if the view is just a query helper.
-- However, creating a secure view is best practice if exposing directly.
