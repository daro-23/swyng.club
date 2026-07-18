-- Update Profiles Table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS company_logo_url TEXT,
ADD COLUMN IF NOT EXISTS company_description TEXT,
ADD COLUMN IF NOT EXISTS looking_for_tags TEXT[];

-- Create Catalog Items Table
CREATE TABLE IF NOT EXISTS public.catalog_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    price TEXT,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for catalog items
ALTER TABLE public.catalog_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Catalog items are viewable by everyone" 
    ON public.catalog_items FOR SELECT 
    USING (true);

CREATE POLICY "Users can insert their own catalog items" 
    ON public.catalog_items FOR INSERT 
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own catalog items" 
    ON public.catalog_items FOR UPDATE 
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own catalog items" 
    ON public.catalog_items FOR DELETE 
    USING (auth.uid() = profile_id);

-- Create Item Questions Table
CREATE TABLE IF NOT EXISTS public.item_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    item_id UUID REFERENCES public.catalog_items(id) ON DELETE CASCADE,
    asker_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for item questions
ALTER TABLE public.item_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questions are viewable by everyone" 
    ON public.item_questions FOR SELECT 
    USING (true);

CREATE POLICY "Anyone can ask a question" 
    ON public.item_questions FOR INSERT 
    WITH CHECK (auth.uid() = asker_id);

-- Only the owner of the catalog item can answer the question.
CREATE POLICY "Item owner can answer questions" 
    ON public.item_questions FOR UPDATE 
    USING (
        auth.uid() IN (
            SELECT profile_id 
            FROM public.catalog_items 
            WHERE id = item_id
        )
    );
