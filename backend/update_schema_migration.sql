-- =========================================================
-- MIGRATION SCRIPT: UPDATE SCHEMA TO LATEST VERSION
-- Run this script if you encounter "column does not exist" errors.
-- It adds missing columns and updates constraints for the new dashboards.
-- =========================================================

BEGIN;

-- 1. Update Users Table (Landlord Payment Details)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS payment_details JSONB DEFAULT '{}'::jsonb;

-- 2. Update Tenant Preferences (Searcher Dashboard Compatibility)
ALTER TABLE public.tenant_preferences 
ADD COLUMN IF NOT EXISTS preferred_orientation TEXT,
ADD COLUMN IF NOT EXISTS parking_requirement TEXT CHECK (parking_requirement IN ('none', 'car', 'motorcycle', 'both'));

-- 3. Update Tenant Verifications (Resume Status)
ALTER TABLE public.tenant_verifications 
ADD COLUMN IF NOT EXISTS profile_status TEXT CHECK (profile_status IN ('guest', 'verified', 'high_intent')) DEFAULT 'guest';

-- 4. Update Rental Applications (Pipeline States)
-- We need to drop the old constraint to allow new status values
ALTER TABLE public.rental_applications DROP CONSTRAINT IF EXISTS rental_applications_status_check;
ALTER TABLE public.rental_applications 
ADD CONSTRAINT rental_applications_status_check 
CHECK (status IN ('pending', 'negotiating', 'approved', 'lease_sent', 'lease_signed', 'moving_in', 'rejected', 'cancelled'));

-- 5. Create/Replace Tenant Pipeline View (Searcher Dashboard)
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

COMMIT;
