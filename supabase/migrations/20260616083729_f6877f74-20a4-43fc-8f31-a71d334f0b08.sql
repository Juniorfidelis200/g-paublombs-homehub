
-- Revoke public execute on SECURITY DEFINER helpers. RLS policies still work
-- because policy expressions are evaluated by the database, not via API grants.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Explicit restrictive policy so authenticated users cannot escalate themselves
-- to admin by inserting/updating/deleting rows in user_roles via the Data API.
CREATE POLICY "deny user role writes" ON public.user_roles
  AS RESTRICTIVE
  FOR ALL
  TO authenticated, anon
  USING (false)
  WITH CHECK (false);
