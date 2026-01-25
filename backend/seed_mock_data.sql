-- =========================================================
-- SEED MOCK DATA SCRIPT
-- Usage: Run this in the Supabase SQL Editor.
-- WARNING: This script inserts directly into auth.users for testing purposes.
-- =========================================================

BEGIN;

-- =========================================================
-- 1. USERS (Auth + Public)
-- IDs:
-- User 1 (Alice Searcher): a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001
-- User 2 (Bob Searcher):   a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002
-- User 3 (Charlie Dweller): a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003
-- User 4 (Diana Dweller):   a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004
-- User 5 (Evan Landlord):   a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005
-- =========================================================

-- Alice
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
    'alice@example.com',
    '$2a$10$dummyhashdummyhashdummyhashdummyhashdummyhash',
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Alice Searcher","role":"tenant","tenant_type":"searcher"}',
    'authenticated',
    'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, full_name, email, role, tenant_type, profile_image, is_verified)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
    'Alice Searcher',
    'alice@example.com',
    'tenant',
    'searcher',
    'https://example.com/alice.jpg',
    true
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    tenant_type = EXCLUDED.tenant_type,
    profile_image = EXCLUDED.profile_image,
    is_verified = EXCLUDED.is_verified;

-- Bob
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
    'bob@example.com',
    '$2a$10$dummyhashdummyhashdummyhashdummyhashdummyhash',
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Bob Searcher","role":"tenant","tenant_type":"searcher"}',
    'authenticated',
    'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, full_name, email, role, tenant_type, profile_image, is_verified)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
    'Bob Searcher',
    'bob@example.com',
    'tenant',
    'searcher',
    'https://example.com/bob.jpg',
    false
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    tenant_type = EXCLUDED.tenant_type,
    profile_image = EXCLUDED.profile_image,
    is_verified = EXCLUDED.is_verified;

-- Charlie
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003',
    'charlie@example.com',
    '$2a$10$dummyhashdummyhashdummyhashdummyhashdummyhash',
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Charlie Dweller","role":"tenant","tenant_type":"dweller"}',
    'authenticated',
    'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, full_name, email, role, tenant_type, profile_image, is_verified)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003',
    'Charlie Dweller',
    'charlie@example.com',
    'tenant',
    'dweller',
    'https://example.com/charlie.jpg',
    true
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    tenant_type = EXCLUDED.tenant_type,
    profile_image = EXCLUDED.profile_image,
    is_verified = EXCLUDED.is_verified;

-- Diana
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004',
    'diana@example.com',
    '$2a$10$dummyhashdummyhashdummyhashdummyhashdummyhash',
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Diana Dweller","role":"tenant","tenant_type":"dweller"}',
    'authenticated',
    'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, full_name, email, role, tenant_type, profile_image, is_verified)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004',
    'Diana Dweller',
    'diana@example.com',
    'tenant',
    'dweller',
    'https://example.com/diana.jpg',
    true
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    tenant_type = EXCLUDED.tenant_type,
    profile_image = EXCLUDED.profile_image,
    is_verified = EXCLUDED.is_verified;

-- Evan
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, aud, role)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005',
    'evan@example.com',
    '$2a$10$dummyhashdummyhashdummyhashdummyhashdummyhash',
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Evan Landlord","role":"landlord"}',
    'authenticated',
    'authenticated'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, full_name, email, role, tenant_type, profile_image, is_verified, payment_details)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005',
    'Evan Landlord',
    'evan@example.com',
    'landlord',
    null,
    'https://example.com/evan.jpg',
    true,
    '{"gcash_qr": "https://qr.com/evan", "bank_name": "BDO"}'::jsonb
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    tenant_type = EXCLUDED.tenant_type,
    profile_image = EXCLUDED.profile_image,
    is_verified = EXCLUDED.is_verified,
    payment_details = EXCLUDED.payment_details;


-- =========================================================
-- 2. PROPERTIES
-- IDs:
-- Prop 1: b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101
-- Prop 2: b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102
-- Prop 3: b0eebc99-9c0b-4ef8-bb6d-6bb9bd380103
-- Prop 4: b0eebc99-9c0b-4ef8-bb6d-6bb9bd380104
-- Prop 5: b0eebc99-9c0b-4ef8-bb6d-6bb9bd380105
-- =========================================================

INSERT INTO public.properties (id, landlord_id, location, price_monthly, bedrooms, bathrooms, property_type, verification_status, images, amenities, unit_orientation)
VALUES 
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Makati CBD', 25000, 1, 1, 'condo', 'verified', ARRAY['https://example.com/prop1a.jpg', 'https://example.com/prop1b.jpg'], ARRAY['Gym', 'Pool'], 'East'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'BGC', 45000, 2, 2, 'condo', 'verified', ARRAY['https://example.com/prop2.jpg'], ARRAY['Gym', 'Pool', 'Parking'], 'West'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380103', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Ortigas', 15000, 0, 1, 'apartment', 'pending', ARRAY['https://example.com/prop3.jpg'], ARRAY[]::text[], 'North'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380104', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Mandaluyong', 18000, 1, 1, 'condo', 'verified', ARRAY['https://example.com/prop4.jpg'], ARRAY['Pool'], 'South'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380105', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Quezon City', 12000, 2, 1, 'house', 'unverified', ARRAY['https://example.com/prop5.jpg'], ARRAY['Parking'], 'East')
ON CONFLICT (id) DO NOTHING;


-- =========================================================
-- 3. TENANT PREFERENCES (Searcher)
-- =========================================================

INSERT INTO public.tenant_preferences (user_id, budget_min, budget_max, preferred_areas, preferred_orientation, parking_requirement)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 10000, 30000, ARRAY['Makati', 'BGC'], 'East', 'none'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 5000, 20000, ARRAY['Ortigas'], 'West', 'motorcycle'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 20000, 50000, ARRAY['BGC'], 'North', 'car'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 15000, 25000, ARRAY['Mandaluyong'], 'South', 'both')
ON CONFLICT (user_id) DO UPDATE SET
    budget_max = EXCLUDED.budget_max,
    preferred_areas = EXCLUDED.preferred_areas;


-- =========================================================
-- 4. DWELLER SETTINGS (Living OS)
-- =========================================================

INSERT INTO public.dweller_settings (user_id, is_night_shift_worker, quiet_hours_start, quiet_hours_end, notify_utility_outages)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', true, '08:00:00', '16:00:00', true),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', false, '22:00:00', '06:00:00', true)
ON CONFLICT (user_id) DO UPDATE SET
    is_night_shift_worker = EXCLUDED.is_night_shift_worker;


-- =========================================================
-- 5. AMENITY BOOKINGS
-- =========================================================

INSERT INTO public.amenity_bookings (property_id, user_id, amenity_name, booking_date, start_time, end_time, status)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Gym', '2023-11-01', '08:00:00', '09:00:00', 'confirmed'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Pool', '2023-11-02', '10:00:00', '12:00:00', 'confirmed'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Function Room', '2023-11-05', '18:00:00', '22:00:00', 'pending'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Gym', '2023-11-06', '07:00:00', '08:00:00', 'cancelled'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Gym', '2023-11-03', '08:00:00', '09:00:00', 'confirmed');


-- =========================================================
-- 6. COMMUNITY PERKS
-- =========================================================

INSERT INTO public.community_perks (property_id, title, partner_name, discount_code, expiry_date)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', '20% Off Laundry', 'Suds & Bubbles', 'LIVORA20', '2024-12-31'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'Free Coffee', 'Corner Cafe', 'FREECUP', '2024-06-30'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'Gym Membership Discount', 'Anytime Fitness', 'AF_LIVORA', '2025-01-01'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'Internet Promo', 'Globe Fiber', 'GLOBE_LIV', '2024-03-01'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380103', 'Move-in Truck', 'Lalamove', 'MOVEIT', '2024-12-31');


-- =========================================================
-- 7. MARKETPLACE LISTINGS
-- =========================================================

INSERT INTO public.marketplace_listings (property_id, seller_id, title, price, category, status)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Study Table', 1500, 'furniture', 'active'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Microwave', 2000, 'appliances', 'sold'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Gaming Chair', 5000, 'furniture', 'active'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Blender', 800, 'appliances', 'reserved'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Curtains', 500, 'other', 'active');


-- =========================================================
-- 8. MAINTENANCE REQUESTS & TIMELINE
-- =========================================================

-- Request 1
INSERT INTO public.maintenance_requests (id, property_id, tenant_id, title, priority, status, ai_priority_score, tenant_rating)
VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Leaky Faucet', 'low', 'resolved', 20, 5) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.maintenance_timeline (request_id, status, details) VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'open', 'Ticket created');
INSERT INTO public.maintenance_timeline (request_id, status, details) VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'in_progress', 'Plumber assigned');
INSERT INTO public.maintenance_timeline (request_id, status, details) VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'resolved', 'Faucet replaced');

-- Request 2
INSERT INTO public.maintenance_requests (id, property_id, tenant_id, title, priority, status, ai_priority_score)
VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'AC Not Cooling', 'high', 'in_progress', 85) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.maintenance_timeline (request_id, status, details) VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'open', 'Ticket created');
INSERT INTO public.maintenance_timeline (request_id, status, details) VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'in_progress', 'Technician scheduled');

-- Request 3, 4, 5
INSERT INTO public.maintenance_requests (id, property_id, tenant_id, title, priority, status, ai_priority_score)
VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Busted Light', 'low', 'open', 10) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.maintenance_requests (id, property_id, tenant_id, title, priority, status, ai_priority_score)
VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'No Water', 'emergency', 'open', 95) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.maintenance_requests (id, property_id, tenant_id, title, priority, status, ai_priority_score, tenant_rating)
VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Door Lock Jammed', 'medium', 'resolved', 60, 4) ON CONFLICT (id) DO NOTHING;


-- =========================================================
-- 9. VENDORS
-- =========================================================

INSERT INTO public.vendors (landlord_id, name, service_category, contact_number, rating)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Mario Plumbing', 'plumbing', '0917-111-2222', 4.5),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Cool Breeze AC', 'general_repair', '0917-333-4444', 4.8),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Sparky Electric', 'electrical', '0917-555-6666', 4.2),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Clean Queens', 'cleaning', '0917-777-8888', 4.9),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Secure Locks', 'security', '0917-999-0000', 4.0);


-- =========================================================
-- 10. PROPERTY ANNOUNCEMENTS
-- =========================================================

INSERT INTO public.property_announcements (property_id, landlord_id, title, message, type, target_audience)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Water Interruption', 'Scheduled maintenance on Nov 10, 10am-2pm.', 'utility', 'all'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'New Gym Equipment', 'We have added new treadmills!', 'community', 'all'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Fire Drill', 'Annual fire drill on Nov 15.', 'emergency', 'all'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Elevator Maintenance', 'Elevator B will be down tomorrow.', 'general', 'all'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Rent Reminder', 'Rent is due on the 5th.', 'general', 'all');


-- =========================================================
-- 11. INSPECTIONS
-- =========================================================

INSERT INTO public.inspections (property_id, tenant_id, landlord_id, scheduled_date, status, rsvp_status)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', '2023-11-20T10:00:00Z', 'scheduled', 'confirmed'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', '2023-11-21T14:00:00Z', 'scheduled', 'pending'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380103', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', '2023-11-22T09:00:00Z', 'completed', 'confirmed'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380104', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', '2023-11-23T16:00:00Z', 'cancelled', 'reschedule_requested'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', '2023-11-25T11:00:00Z', 'scheduled', 'pending');


-- =========================================================
-- 12. RENTAL APPLICATIONS
-- =========================================================

INSERT INTO public.rental_applications (property_id, tenant_id, status, offer_rent)
VALUES
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'negotiating', 24000),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'pending', 45000),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380103', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'rejected', 10000),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380104', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'lease_sent', 18000),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'cancelled', 25000);


-- =========================================================
-- 13. LEASES
-- =========================================================

INSERT INTO public.leases (id, property_id, tenant_id, status, rent_amount, start_date, end_date)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'active', 25000, '2023-01-01', '2024-01-01') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.leases (id, property_id, tenant_id, status, rent_amount, start_date, end_date)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'active', 45000, '2023-06-01', '2024-06-01') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.leases (id, property_id, tenant_id, status, rent_amount, start_date, end_date)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380103', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'expired', 15000, '2022-01-01', '2023-01-01') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.leases (id, property_id, tenant_id, status, rent_amount, start_date, end_date)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380104', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'terminated', 18000, '2022-06-01', '2022-09-01') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.leases (id, property_id, tenant_id, status, rent_amount, start_date, end_date)
VALUES
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'pending', 26000, '2024-01-02', '2025-01-02') ON CONFLICT (id) DO NOTHING;


-- =========================================================
-- 14. TRANSACTIONS
-- =========================================================

INSERT INTO public.transactions (payer_id, receiver_id, amount, status, transaction_type, receipt_url, lease_id)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 25000, 'verified', 'rent', 'https://example.com/receipt1.jpg', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380001'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 25000, 'pending_verification', 'rent', 'https://example.com/receipt2.jpg', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380001'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 45000, 'verified', 'rent', 'https://example.com/receipt3.jpg', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380002'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 45000, 'rejected', 'rent', 'https://example.com/receipt4.jpg', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380002'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 2000, 'verified', 'utility', 'https://example.com/receipt5.jpg', null);


-- =========================================================
-- 15. COMMUNICATION (Conversations & Messages)
-- =========================================================

-- Conversation 1 (Alice & Evan - Prop 1)
INSERT INTO public.conversations (id, property_id, last_message, unread_count)
VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380101', 'Is this still available?', 1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.conversation_participants (conversation_id, user_id) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001');
INSERT INTO public.conversation_participants (conversation_id, user_id) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005');
INSERT INTO public.messages (conversation_id, sender_id, text, status) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'Hi, is this available?', 'read');
INSERT INTO public.messages (conversation_id, sender_id, text, status) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Yes it is.', 'sent');

-- Conversation 2 (Bob & Evan - Prop 2)
INSERT INTO public.conversations (id, property_id, last_message, unread_count)
VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380102', 'Yes, viewing is confirmed.', 0) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.conversation_participants (conversation_id, user_id) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002');
INSERT INTO public.conversation_participants (conversation_id, user_id) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005');
INSERT INTO public.messages (conversation_id, sender_id, text, status) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'Can I view it tomorrow?', 'read');
INSERT INTO public.messages (conversation_id, sender_id, text, status) VALUES ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Sure, 2pm?', 'read');


-- =========================================================
-- 16. VERIFICATIONS
-- =========================================================

INSERT INTO public.user_verifications (user_id, legal_name, id_type, id_number, id_image_url, selfie_image_url, status)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'Alice Wonderland', 'Passport', 'P1234567A', 'https://example.com/id1.jpg', 'https://example.com/selfie1.jpg', 'verified'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'Bob Builder', 'Driver License', 'D02-12-345678', 'https://example.com/id2.jpg', 'https://example.com/selfie2.jpg', 'pending'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Charlie Chaplin', 'UMID', '0033-1111111-2', 'https://example.com/id3.jpg', 'https://example.com/selfie3.jpg', 'verified'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Diana Prince', 'Passport', 'P7654321B', 'https://example.com/id4.jpg', 'https://example.com/selfie4.jpg', 'verified'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Evan Almighty', 'TIN', '123-456-789-000', 'https://example.com/id5.jpg', 'https://example.com/selfie5.jpg', 'verified');

INSERT INTO public.tenant_verifications (user_id, profile_status, trust_score, monthly_income)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'high_intent', 85, 80000),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'guest', 20, 0),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'verified', 60, 50000),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'high_intent', 90, 120000),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'guest', 0, 0);


COMMIT;
