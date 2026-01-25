-- ==========================================
-- USER DATA STRUCTURE SCRIPT (Supabase/PostgreSQL)
-- ==========================================
-- This script defines the core Users table and the logic 
-- for handling the different roles (Tenant vs Landlord/Agent)
-- and Tenant sub-roles (Searcher vs Dweller).

-- 1. Enable UUIDs for unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS TABLE
-- The central table for all user types.
CREATE TABLE public.users (
    -- Links to Supabase Auth (security)
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    
    -- Basic Profile Info
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    mobile_number TEXT,
    
    -- Profile Image (Stores the URL from Supabase Storage)
    profile_image TEXT,

    -- Landlord Payment Details (For receiving payments)
    -- Stores JSON structure: { "gcash_qr": "url", "bank_name": "BDO", "account_no": "123" }
    payment_details JSONB DEFAULT '{}'::jsonb,
    
    -- Verification Status (Email verified, ID verified etc.)
    is_verified BOOLEAN DEFAULT FALSE,
    verification_level TEXT CHECK (verification_level IN ('none', 'email_verified', 'identity_verified', 'fully_verified')) DEFAULT 'none',

    -- =========================================================
    -- ROLE LOGIC
    -- =========================================================
    
    -- PRIMARY ROLE:
    -- Users must be either a 'tenant', 'landlord', or 'agent'.
    role TEXT CHECK (role IN ('tenant', 'landlord', 'agent')) DEFAULT 'tenant',

    -- TENANT SUB-ROLE (The "Mode" of the tenant):
    -- 'searcher': A tenant looking for a home (Needs Matching Dashboard).
    -- 'dweller': A tenant living in a home (Needs Living OS Dashboard).
    -- This can be NULL if the user is a Landlord/Agent.
    tenant_type TEXT CHECK (tenant_type IN ('searcher', 'dweller')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AUTOMATION (Triggers)
-- Automatically creates a User Profile when they sign up via Supabase Auth.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role, tenant_type)
  VALUES (
    new.id,
    -- Extract metadata sent from Frontend during Sign Up
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'tenant'),
    new.raw_user_meta_data->>'tenant_type'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. SECURITY (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own data
CREATE POLICY "Users can view their own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update their own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = id);
