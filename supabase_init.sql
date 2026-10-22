-- Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    bundle_type INTEGER NOT NULL,
    total_price NUMERIC NOT NULL,
    status TEXT DEFAULT 'new'::text,
    ip_address TEXT
);

-- Enable Row Level Security (RLS) but allow anonymous inserts for the checkout form
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert an order (so the checkout form works)
CREATE POLICY "Allow anonymous inserts" ON public.orders
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Allow anyone to read orders (for the admin dashboard)
-- Note: In a real production app, you would restrict this to authenticated admin users only!
CREATE POLICY "Allow anonymous select" ON public.orders
    FOR SELECT 
    TO anon
    USING (true);

-- Allow anyone to update orders (for changing status in admin dashboard)
CREATE POLICY "Allow anonymous update" ON public.orders
    FOR UPDATE 
    TO anon
    USING (true);
