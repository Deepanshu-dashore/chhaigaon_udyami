-- ==============================================================================
-- SUPABASE POSTGRES TRIGGER FOR AUTOMATIC USER PROVISIONING
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Create helper function to generate a random CUID/UUID for the ID column
CREATE OR REPLACE FUNCTION generate_cuid_id() 
RETURNS TEXT AS $$
BEGIN
  RETURN 'c' || substr(md5(random()::text || clock_timestamp()::text), 1, 24);
END;
$$ LANGUAGE plpgsql;

-- 2. Create the trigger function to automatically create a public."User" and public."UserProfile"
CREATE OR REPLACE FUNCTION public.handle_new_supabase_user()
RETURNS TRIGGER AS $$
DECLARE
  new_user_id TEXT;
  extracted_name TEXT;
  extracted_avatar TEXT;
  extracted_mobile TEXT;
  assigned_role "UserRole";
BEGIN
  -- Generate unique ID for public."User"
  new_user_id := generate_cuid_id();

  -- Extract metadata provided by Google OAuth or email signup
  extracted_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1),
    'Student'
  );

  extracted_avatar := COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture',
    NULL
  );

  extracted_mobile := COALESCE(
    NEW.raw_user_meta_data->>'mobile',
    NEW.phone,
    NULL
  );

  -- Determine role from metadata or default to STUDENT
  BEGIN
    assigned_role := COALESCE(
      (NEW.raw_user_meta_data->>'role')::"UserRole",
      'STUDENT'::"UserRole"
    );
  EXCEPTION WHEN OTHERS THEN
    assigned_role := 'STUDENT'::"UserRole";
  END;

  -- Insert into public."User" if not already present
  INSERT INTO public."User" (
    "id",
    "supabaseUserId",
    "name",
    "email",
    "mobile",
    "role",
    "status",
    "isVerified",
    "createdAt",
    "updatedAt"
  )
  VALUES (
    new_user_id,
    NEW.id::text,
    extracted_name,
    NEW.email,
    extracted_mobile,
    assigned_role,
    'ACTIVE'::"UserStatus",
    true,
    NOW(),
    NOW()
  )
  ON CONFLICT ("supabaseUserId") DO UPDATE
  SET
    "email" = EXCLUDED."email",
    "name" = COALESCE(public."User"."name", EXCLUDED."name"),
    "updatedAt" = NOW();

  -- Insert initial public."UserProfile"
  INSERT INTO public."UserProfile" (
    "id",
    "userId",
    "profilePhoto",
    "state",
    "createdAt",
    "updatedAt"
  )
  VALUES (
    generate_cuid_id(),
    (SELECT "id" FROM public."User" WHERE "supabaseUserId" = NEW.id::text LIMIT 1),
    extracted_avatar,
    'Madhya Pradesh',
    NOW(),
    NOW()
  )
  ON CONFLICT ("userId") DO UPDATE
  SET
    "profilePhoto" = COALESCE(public."UserProfile"."profilePhoto", EXCLUDED."profilePhoto"),
    "updatedAt" = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach trigger to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_supabase_user();
