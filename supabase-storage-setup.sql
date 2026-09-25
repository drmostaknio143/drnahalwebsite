-- ==============================================================================
-- SUPABASE STORAGE SETUP FOR PRACTICE GALLERY PHOTOS
-- Run this script in your Supabase SQL Editor:
-- ==============================================================================

-- 1. Create the 'gallery' public storage bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery',
  'gallery',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop any previous conflicting policies for the gallery bucket
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete gallery images" ON storage.objects;

-- 3. Policy: Allow everyone (public & anon) to view images in 'gallery' bucket
CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery' );

-- 4. Policy: Allow uploading images to 'gallery' bucket
CREATE POLICY "Anyone can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'gallery' );

-- 5. Policy: Allow updates to images in 'gallery' bucket
CREATE POLICY "Anyone can update gallery images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'gallery' );

-- 6. Policy: Allow deletion of images in 'gallery' bucket
CREATE POLICY "Anyone can delete gallery images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'gallery' );
