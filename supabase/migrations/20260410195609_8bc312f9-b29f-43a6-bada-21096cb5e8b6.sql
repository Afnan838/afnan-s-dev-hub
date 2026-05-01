
-- Drop the overly permissive policy
DROP POLICY "Anyone can submit a contact message" ON public.contact_messages;

-- Create a rate-limiting function
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (
    SELECT COUNT(*) FROM public.contact_messages
    WHERE created_at > now() - interval '1 hour'
  ) < 20
$$;

-- Add rate-limited insert policy
CREATE POLICY "Anyone can submit contact message (rate limited)" ON public.contact_messages
  FOR INSERT WITH CHECK (public.check_contact_rate_limit());
