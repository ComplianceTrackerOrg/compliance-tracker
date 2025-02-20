DROP FUNCTION IF EXISTS get_unassigned_training_users(smallint);
DROP FUNCTION IF EXISTS get_unassigned_requirements_users(smallint);

-- to test: SELECT * from get_unassigned_training_users(1::smallint);
CREATE OR REPLACE FUNCTION get_unassigned_training_users(
  training_resource_id smallint
)
RETURNS TABLE (
  id integer, 
  first_name character varying, 
  last_name character varying,
  email character varying
) 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.first_name, u.last_name, u.email
  FROM public.user u
  EXCEPT
  SELECT ul.id, ul.first_name, ul.last_name, ul.email
  FROM public.user ul
  JOIN public.assigned_learning_resource alr ON ul.id = alr.user_id
  WHERE alr.resource_id = training_resource_id;
END;
$$ LANGUAGE plpgsql;

-- to test: SELECT * from get_unassigned_requirements_users(1::smallint);
CREATE OR REPLACE FUNCTION get_unassigned_requirements_users(
  requirement_resource_id smallint
)
RETURNS TABLE (
  id integer, 
  first_name character varying, 
  last_name character varying,
  email character varying
) 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.first_name, u.last_name, u.email
  FROM public.user u
  EXCEPT
  SELECT ul.id, ul.first_name, ul.last_name, ul.email
  FROM public.user ul
  JOIN public.assigned_compliance_resource acr ON ul.id = acr.user_id
  WHERE acr.resource_id = requirement_resource_id;
END;
$$ LANGUAGE plpgsql;