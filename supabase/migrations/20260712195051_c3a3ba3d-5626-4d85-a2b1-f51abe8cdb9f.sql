
-- 1. Add published flag to products
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT true;

-- 2. Site settings (single-row config)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true UNIQUE,
  site_name text NOT NULL DEFAULT 'G-Paublo Homes',
  tagline text,
  brand_navy text NOT NULL DEFAULT '#1A0E64',
  brand_blue text NOT NULL DEFAULT '#406AB3',
  brand_light text NOT NULL DEFAULT '#D7DDF9',
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anyone reads site settings" ON public.site_settings;
CREATE POLICY "anyone reads site settings"
  ON public.site_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admins update site settings" ON public.site_settings;
CREATE POLICY "admins update site settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "admins insert site settings" ON public.site_settings;
CREATE POLICY "admins insert site settings"
  ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed single row
INSERT INTO public.site_settings (singleton, tagline)
VALUES (true, 'Crafted Living, Built for Legacy')
ON CONFLICT (singleton) DO NOTHING;
