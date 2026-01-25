-- =========================================================
-- FIX: UPDATE AMENITY BOOKING STATUS CONSTRAINT
-- The previous schema did not include 'pending' status for bookings.
-- We need to allow 'pending' for bookings requiring approval.
-- =========================================================

BEGIN;

-- 1. Drop the restrictive constraint
ALTER TABLE public.amenity_bookings DROP CONSTRAINT IF EXISTS amenity_bookings_status_check;

-- 2. Add the expanded constraint
ALTER TABLE public.amenity_bookings 
ADD CONSTRAINT amenity_bookings_status_check 
CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'));

COMMIT;
