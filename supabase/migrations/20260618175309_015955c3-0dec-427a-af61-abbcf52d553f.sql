
-- Create categories table
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admins update categories" ON public.categories FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admins delete categories" ON public.categories FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed the 8 brand categories
INSERT INTO public.categories (name, slug, sort_order) VALUES
  ('Security Doors', 'security-doors', 10),
  ('Luxury Entrance Doors', 'luxury-entrance-doors', 20),
  ('Turkish Doors', 'turkish-doors', 30),
  ('Smart Doors', 'smart-doors', 40),
  ('Fireproof Doors', 'fireproof-doors', 50),
  ('Interior Doors', 'interior-doors', 60),
  ('Wooden Doors', 'wooden-doors', 70),
  ('Customized Doors', 'customized-doors', 80)
ON CONFLICT (slug) DO NOTHING;

-- Reconcile existing product categories with the new taxonomy
UPDATE public.products SET category = 'Luxury Entrance Doors' WHERE category = 'Luxury Doors';
UPDATE public.products SET category = 'Wooden Doors'          WHERE category = 'Modern Doors';
UPDATE public.products SET category = 'Fireproof Doors'       WHERE category = 'Fire-Resistant Doors';
