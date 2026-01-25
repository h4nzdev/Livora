-- 1. Fix maintenance_requests table (Add AI and Feedback columns)
ALTER TABLE public.maintenance_requests 
ADD COLUMN IF NOT EXISTS ai_priority_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ai_detected_keywords TEXT[],
ADD COLUMN IF NOT EXISTS ai_analysis JSONB,
ADD COLUMN IF NOT EXISTS tenant_rating INTEGER CHECK (tenant_rating BETWEEN 1 AND 5),
ADD COLUMN IF NOT EXISTS tenant_feedback TEXT;

-- 2. Fix tenant_preferences table (Add Matching preferences)
ALTER TABLE public.tenant_preferences 
ADD COLUMN IF NOT EXISTS preferred_orientation TEXT,
ADD COLUMN IF NOT EXISTS parking_requirement TEXT CHECK (parking_requirement IN ('none', 'car', 'motorcycle', 'both'));

-- 3. Fix rental_applications table (Update Status Enum)
-- First drop the old constraint if it exists
ALTER TABLE public.rental_applications DROP CONSTRAINT IF EXISTS rental_applications_status_check;
-- Add the new constraint with all statuses
ALTER TABLE public.rental_applications 
ADD CONSTRAINT rental_applications_status_check 
CHECK (status IN ('pending', 'negotiating', 'approved', 'lease_sent', 'lease_signed', 'moving_in', 'rejected', 'cancelled'));

-- Handle column renaming (offer_monthly_rent -> offer_rent) safely
DO $$
BEGIN
    IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='rental_applications' AND column_name='offer_monthly_rent') THEN
        ALTER TABLE public.rental_applications RENAME COLUMN offer_monthly_rent TO offer_rent;
    END IF;
END $$;

-- Add offer_rent if missing (and renaming didn't happen)
ALTER TABLE public.rental_applications 
ADD COLUMN IF NOT EXISTS offer_rent NUMERIC;

-- 4. Fix maintenance_timeline table
-- Add 'details' column if it's missing (it might be called 'description' in some versions)
ALTER TABLE public.maintenance_timeline 
ADD COLUMN IF NOT EXISTS details TEXT;

-- Drop strict status check on maintenance_timeline to allow seed data statuses ('open', 'resolved')
ALTER TABLE public.maintenance_timeline DROP CONSTRAINT IF EXISTS maintenance_timeline_status_check;

-- 5. Fix property_announcements table
-- Handle column renaming (content -> message) safely
DO $$
BEGIN
    IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='property_announcements' AND column_name='content') THEN
        ALTER TABLE public.property_announcements RENAME COLUMN content TO message;
    END IF;
END $$;

-- Add target_audience if missing
ALTER TABLE public.property_announcements 
ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'all';

-- Fix constraints for type to allow seed data values
ALTER TABLE public.property_announcements DROP CONSTRAINT IF EXISTS property_announcements_type_check;
ALTER TABLE public.property_announcements 
ADD CONSTRAINT property_announcements_type_check 
CHECK (type IN ('general', 'utility', 'emergency', 'community', 'package_delivery', 'utility_outage', 'maintenance_schedule', 'community_event'));

-- 6. Fix inspections table
-- Add rsvp_status column if missing
ALTER TABLE public.inspections 
ADD COLUMN IF NOT EXISTS rsvp_status TEXT CHECK (rsvp_status IN ('pending', 'confirmed', 'reschedule_requested', 'declined')) DEFAULT 'pending';

-- Ensure scheduled_date is TIMESTAMP (some schemas might have it as DATE)
-- If it's DATE, we might need to alter it to TIMESTAMP or just accept DATE depending on data
-- The seed data uses ISO strings like '2023-11-20T10:00:00Z', which work for both but TIMESTAMP is better for time.
ALTER TABLE public.inspections 
ALTER COLUMN scheduled_date TYPE TIMESTAMP WITH TIME ZONE USING scheduled_date::TIMESTAMP WITH TIME ZONE;

-- Make scheduled_time optional since we are using a full timestamp in scheduled_date
ALTER TABLE public.inspections 
ALTER COLUMN scheduled_time DROP NOT NULL;

-- Fix inspections status constraint to allow seed values
ALTER TABLE public.inspections DROP CONSTRAINT IF EXISTS inspections_status_check;
ALTER TABLE public.inspections 
ADD CONSTRAINT inspections_status_check 
CHECK (status IN ('scheduled', 'completed', 'cancelled', 'pending', 'confirmed', 'reschedule_requested'));

-- 7. Fix conversations table
ALTER TABLE public.conversations 
ADD COLUMN IF NOT EXISTS unread_count INTEGER DEFAULT 0;

-- Make type optional in conversations (it exists in some schemas as NOT NULL)
ALTER TABLE public.conversations 
ALTER COLUMN type DROP NOT NULL;

-- 8. Fix messages table
-- Handle column renaming (content -> text) safely
DO $$
BEGIN
    IF EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='messages' AND column_name='content') THEN
        ALTER TABLE public.messages RENAME COLUMN content TO text;
    END IF;
END $$;

-- Add text column if missing
ALTER TABLE public.messages 
ADD COLUMN IF NOT EXISTS text TEXT;

-- 9. Fix user_verifications table
-- Drop strict id_type check to allow seed data values
ALTER TABLE public.user_verifications DROP CONSTRAINT IF EXISTS user_verifications_id_type_check;
ALTER TABLE public.user_verifications 
ADD CONSTRAINT user_verifications_id_type_check 
CHECK (id_type IN ('Passport', 'Driver License', 'UMID', 'TIN', 'SSS', 'PhilHealth', 'National ID', 'Other'));

-- Fix user_verifications status constraint (allow 'verified', 'pending', 'rejected')
ALTER TABLE public.user_verifications DROP CONSTRAINT IF EXISTS user_verifications_status_check;
ALTER TABLE public.user_verifications 
ADD CONSTRAINT user_verifications_status_check 
CHECK (status IN ('pending', 'verified', 'rejected', 'incomplete'));
