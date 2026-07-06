-- Migration: allow NULL emails for registrations
-- Run this in Supabase SQL editor or via psql connected to your database.

ALTER TABLE public.registrations
  ALTER COLUMN email DROP NOT NULL;

-- Optional: if you prefer to remove the column entirely later:
-- ALTER TABLE public.registrations DROP COLUMN email;
