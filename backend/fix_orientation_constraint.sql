-- =========================================================
-- FIX: UPDATE UNIT ORIENTATION CONSTRAINT
-- The previous schema restricted orientation to "street_facing", etc.
-- We need to allow cardinal directions (East, West) for the "Morning Sun" feature.
-- =========================================================

BEGIN;

-- 1. Drop the restrictive constraint
ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_unit_orientation_check;

-- 2. Add the expanded constraint
ALTER TABLE public.properties 
ADD CONSTRAINT properties_unit_orientation_check 
CHECK (unit_orientation IN (
    -- Original values
    'street_facing', 'interior_view', 'rear_view',
    -- Cardinal directions (for Sun Analysis)
    'East', 'West', 'North', 'South', 
    'North East', 'North West', 'South East', 'South West'
));

COMMIT;
