-- ==========================================
-- TRANSACTIONS & RECEIPTS SCHEMA (Supabase/PostgreSQL)
-- ==========================================
-- This script defines the structure for the "Proof of Payment" model.
-- The platform does NOT process money. It verifies Receipts.

-- 1. Enable UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================
-- TRANSACTIONS TABLE
-- =========================================================
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- 1. The Payer (Tenant)
    payer_id UUID REFERENCES public.users(id) NOT NULL,
    
    -- 2. The Receiver (Landlord/Agent)
    receiver_id UUID REFERENCES public.users(id) NOT NULL,
    
    -- 3. Context (What is this payment for?)
    property_id UUID REFERENCES public.properties(id),
    lease_id UUID REFERENCES public.leases(id), -- Optional (only for Dwellers)
    
    -- 4. Payment Details
    amount NUMERIC NOT NULL,
    transaction_type TEXT CHECK (transaction_type IN ('rent', 'deposit', 'reservation', 'maintenance', 'utility', 'other')),
    
    -- 5. The Proof (The core feature)
    -- This stores the URL to the uploaded screenshot/image of the receipt (GCash/Bank)
    receipt_url TEXT NOT NULL, 
    
    -- Optional: User can type the reference number from the receipt manually
    reference_number TEXT,
    
    -- 6. Verification Status (Manual process by Landlord)
    -- 'pending_verification': User uploaded receipt, waiting for Landlord.
    -- 'verified': Landlord confirmed money is in their account.
    -- 'rejected': Landlord cannot find payment or receipt is invalid.
    status TEXT CHECK (status IN ('pending_verification', 'verified', 'rejected')) DEFAULT 'pending_verification',
    
    -- 7. Meta & Audit
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE, -- When the Landlord clicked "Verify"
    remarks TEXT -- Rejection reason or confirmation note
);

-- =========================================================
-- RLS POLICIES (Security)
-- =========================================================
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- 1. Payers (Tenants) can view their own transactions
CREATE POLICY "Tenants can view own payments" 
ON public.transactions FOR SELECT 
USING (auth.uid() = payer_id);

-- 2. Payers can Insert (Upload) new receipts
CREATE POLICY "Tenants can upload receipts" 
ON public.transactions FOR INSERT 
WITH CHECK (auth.uid() = payer_id);

-- 3. Receivers (Landlords) can view payments made to them
CREATE POLICY "Landlords can view received payments" 
ON public.transactions FOR SELECT 
USING (auth.uid() = receiver_id);

-- 4. Receivers (Landlords) can Update status (Verify/Reject)
CREATE POLICY "Landlords can verify payments" 
ON public.transactions FOR UPDATE 
USING (auth.uid() = receiver_id);
