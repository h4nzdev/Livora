-- ==========================================
-- VERIFICATION (KYC) & PROPERTY LEGITIMACY SCHEMA
-- ==========================================
-- This script handles the multi-phase verification process for Users, Tenants, and Properties.

-- 1. Enable UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- PHASE 1: USER IDENTITY (KYC)
-- =========================================================
-- Applies to ALL users (Tenant, Landlord, Agent)
CREATE TABLE public.user_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    
    -- Identity Documents
    legal_name TEXT NOT NULL, -- Must match ID
    id_type TEXT CHECK (id_type IN ('passport', 'drivers_license', 'umid', 'phil_id', 'prc_id', 'other')) NOT NULL,
    id_number TEXT NOT NULL,
    id_image_url TEXT NOT NULL, -- Front of ID
    
    -- Social Media (Optional "Soft Signal")
    social_media_link TEXT,
    
    -- Selfie Check
    selfie_image_url TEXT NOT NULL, -- Selfie holding the ID
    
    -- Broker Specific
    prc_license_number TEXT, -- Required if User Role is Agent/Broker
    
    -- Status
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    rejection_reason TEXT,
    
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.users(id) -- Admin who reviewed
);

-- =========================================================
-- PHASE 2: TENANT FINANCIAL & QUALITY CHECK
-- =========================================================
-- Specific to Tenants (The Searcher)
CREATE TABLE public.tenant_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    
    -- 2. Financial Capability
    employment_type TEXT CHECK (employment_type IN ('local_employed', 'freelancer', 'business_owner', 'student', 'unemployed')),
    monthly_income NUMERIC,
    
    -- Financial Documents (JSONB)
    -- Structure varies by type:
    -- Local: { "coe": "url", "payslip": "url", "company_id": "url" }
    -- Freelancer: { "earnings_cert": "url", "paypal_history": "url", "contract": "url" }
    -- Business: { "dti_sec": "url", "permit": "url" }
    financial_documents JSONB,
    
    -- 3. Quality Filter (Soft Qualifiers)
    -- JSONB: { "move_in_date": "2024-01-01", "occupants": 2, "pets": "none", "smoker": false }
    quality_filter_responses JSONB,
    
    -- 4. Trust Score (0-100%)
    -- Calculated: +20 Mobile, +30 ID, +30 Income, +20 Survey
    trust_score INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- PHASE 3: PROPERTY LEGITIMACY (Proof of Life)
-- =========================================================
CREATE TABLE public.property_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE UNIQUE,
    
    -- 1. Proof of Ownership
    ownership_doc_type TEXT CHECK (ownership_doc_type IN ('tct', 'cct', 'tax_declaration')) NOT NULL,
    ownership_doc_url TEXT NOT NULL, -- Image of the Title/Tax Dec
    
    -- 2. Proof of Address (Utility Bill)
    utility_bill_type TEXT CHECK (utility_bill_type IN ('electricity', 'water', 'internet')) NOT NULL,
    utility_bill_url TEXT NOT NULL, -- Image of bill (dated < 3 months)
    
    -- 3. The "Code Word" Check (Proof of Life)
    -- System generates a code (e.g. "A7B2") stored here.
    generated_code_word TEXT NOT NULL, 
    -- User writes code on paper, places in room, takes photo.
    code_word_image_url TEXT, 
    
    -- 4. Authority Link (Phase 3 Logic)
    -- If Owner Name != User Name, they must upload SPA
    is_owner_listing BOOLEAN DEFAULT TRUE,
    spa_document_url TEXT, -- Special Power of Attorney (if Agent)
    
    -- Status
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    rejection_reason TEXT,
    
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.users(id)
);

-- =========================================================
-- PHASE 4: AUTOMATED RED FLAGS (Audit Log)
-- =========================================================
CREATE TABLE public.verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT CHECK (entity_type IN ('user', 'property')),
    entity_id UUID NOT NULL, -- User ID or Property ID
    
    flag_type TEXT CHECK (flag_type IN ('price_anomaly', 'geolocation_mismatch', 'duplicate_photo', 'expired_id')),
    description TEXT,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- RLS POLICIES
-- =========================================================
ALTER TABLE public.user_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_verifications ENABLE ROW LEVEL SECURITY;

-- Users can view/insert their own KYC
CREATE POLICY "Users manage own KYC" 
ON public.user_verifications FOR ALL 
USING (auth.uid() = user_id);

-- Users can manage their own Tenant Verification
CREATE POLICY "Users manage own Tenant Verification" 
ON public.tenant_verifications FOR ALL 
USING (auth.uid() = user_id);

-- Landlords can view/insert their own Property Verification
CREATE POLICY "Landlords manage own Property Verification" 
ON public.property_verifications FOR ALL 
USING (auth.uid() = (SELECT landlord_id FROM public.properties WHERE id = property_id));
