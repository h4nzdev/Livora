-- MESSAGING & COMMUNITY CHAT SCHEMA
-- Enables Searchers to chat with Landlords (Inquiry) and Dwellers (Community/Vibe Check).

-- 1. Conversations Table
CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Context: Which property is this chat about?
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    
    -- Chat Type:
    -- 'inquiry': Private chat between Searcher and Landlord/Agent
    -- 'community': Group chat for the property (Searcher asking Dwellers)
    -- 'direct': Private chat between two users (e.g., Searcher and a specific Dweller)
    -- 'maintenance': Ticket-based chat (Dweller and Landlord)
    type TEXT CHECK (type IN ('inquiry', 'community', 'direct', 'maintenance')) NOT NULL,
    
    -- Optional Title (mostly for Community chats, e.g., "The Avida Dwellers")
    title TEXT,
    
    -- Meta
    last_message TEXT,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Conversation Participants
-- Links Users to Conversations with specific roles/permissions
CREATE TABLE public.conversation_participants (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- Participant Role:
    -- 'owner': Landlord/Agent (Admin of the property chats)
    -- 'resident': Verified Dweller (Can vouch/answer in community chat)
    -- 'guest': Searcher (Asking questions)
    role TEXT CHECK (role IN ('owner', 'resident', 'guest')) DEFAULT 'guest',
    
    -- Status (e.g., if a Searcher leaves the chat)
    status TEXT CHECK (status IN ('active', 'muted', 'left')) DEFAULT 'active',
    
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (conversation_id, user_id)
);

-- 3. Messages
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- Keep message even if user deleted
    
    -- Content
    content TEXT, -- Can be null if it's purely an image
    
    -- Message Type
    -- 'text': Standard text
    -- 'image': Photo upload
    -- 'system': Auto-generated (e.g., "John joined the chat")
    type TEXT CHECK (type IN ('text', 'image', 'system')) DEFAULT 'text',
    
    -- Attachments (Array of URLs for images/files)
    attachments TEXT[], 
    
    -- Status
    is_edited BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP WITH TIME ZONE, -- Soft delete
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Message Read Status (Optional but useful for "Read by X")
-- Tracks who has read which specific message (granular read receipts)
CREATE TABLE public.message_read_receipts (
    message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (message_id, user_id)
);

-- RLS Policies
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_read_receipts ENABLE ROW LEVEL SECURITY;

-- Triggers for Updating 'last_message' and 'updated_at' on Conversations
CREATE OR REPLACE FUNCTION public.update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.conversations
    SET last_message = LEFT(new.content, 50), -- Store snippet
        last_message_at = new.created_at,
        updated_at = new.created_at
    WHERE id = new.conversation_id;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_new_message ON public.messages;
CREATE TRIGGER on_new_message
    AFTER INSERT ON public.messages
    FOR EACH ROW
    EXECUTE PROCEDURE public.update_conversation_last_message();
