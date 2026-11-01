-- ==========================================================================
-- TUITION CHAI - COMPLETE INITIAL DATABASE MIGRATION (001_initial_schema.sql)
-- Supabase PostgreSQL 15+ Schema
-- ==========================================================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('guardian', 'tutor', 'super_admin');
CREATE TYPE account_status AS ENUM ('active', 'suspended', 'pending_approval');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending_review', 'verified', 'rejected');
CREATE TYPE tuition_status AS ENUM ('draft', 'pending_approval', 'published', 'in_progress', 'completed', 'closed', 'rejected');
CREATE TYPE application_status AS ENUM ('submitted', 'under_review', 'shortlisted', 'interview_requested', 'accepted', 'rejected', 'withdrawn');

-- 2. Profiles Table (1:1 with auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'guardian',
  avatar_url TEXT,
  preferred_language VARCHAR(5) DEFAULT 'en',
  status account_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Guardians Table
CREATE TABLE public.guardians (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  primary_location_area TEXT NOT NULL,
  detailed_address TEXT,
  emergency_contact TEXT,
  notes TEXT
);

-- 4. Tutors Table
CREATE TABLE public.tutors (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  university TEXT NOT NULL,
  department TEXT NOT NULL,
  current_academic_level TEXT NOT NULL,
  current_year_semester TEXT NOT NULL,
  teaching_experience TEXT NOT NULL,
  expected_salary NUMERIC(10,2) NOT NULL,
  preferred_teaching_method TEXT NOT NULL DEFAULT 'Home Tutoring',
  preferred_locations TEXT[] NOT NULL DEFAULT '{}',
  preferred_classes TEXT[] NOT NULL DEFAULT '{}',
  preferred_subjects TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT,
  rating NUMERIC(3,2) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  verification_status verification_status DEFAULT 'unverified',
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES public.profiles(id)
);

-- 5. Tutor Qualifications
CREATE TABLE public.tutor_qualifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES public.tutors(id) ON DELETE CASCADE,
  exam_name TEXT NOT NULL,
  result_gpa TEXT NOT NULL,
  passing_year INTEGER,
  institution_name TEXT
);

-- 6. Tutor Documents (Private Storage)
CREATE TABLE public.tutor_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID NOT NULL REFERENCES public.tutors(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  verification_status verification_status DEFAULT 'pending_review',
  rejection_reason TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 7. Tuition Posts
CREATE TABLE public.tuition_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tuition_code TEXT UNIQUE NOT NULL,
  guardian_id UUID NOT NULL REFERENCES public.guardians(id) ON DELETE CASCADE,
  student_class TEXT NOT NULL,
  curriculum TEXT NOT NULL,
  location_area TEXT NOT NULL,
  detailed_address TEXT,
  monthly_budget NUMERIC(10,2) NOT NULL,
  days_per_week INTEGER NOT NULL DEFAULT 4,
  teaching_method TEXT NOT NULL DEFAULT 'Home Tutoring',
  preferred_tutor_gender TEXT DEFAULT 'Any',
  preferred_tutor_qualification TEXT,
  detailed_requirements TEXT,
  status tuition_status DEFAULT 'pending_approval',
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES public.profiles(id)
);

-- 8. Tuition Subjects
CREATE TABLE public.tuition_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tuition_post_id UUID NOT NULL REFERENCES public.tuition_posts(id) ON DELETE CASCADE,
  subject_name TEXT NOT NULL
);

-- 9. Tutor Applications
CREATE TABLE public.tutor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tuition_post_id UUID NOT NULL REFERENCES public.tuition_posts(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES public.tutors(id) ON DELETE CASCADE,
  proposed_salary NUMERIC(10,2) NOT NULL,
  application_message TEXT NOT NULL,
  status application_status DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_tutor_tuition_application UNIQUE(tuition_post_id, tutor_id)
);

-- 10. Shortlisted Tutors
CREATE TABLE public.shortlisted_tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tuition_post_id UUID NOT NULL REFERENCES public.tuition_posts(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES public.tutors(id) ON DELETE CASCADE,
  shortlisted_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_shortlist UNIQUE(tuition_post_id, tutor_id)
);

-- 11. Tuition Assignments
CREATE TABLE public.tuition_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tuition_post_id UUID NOT NULL REFERENCES public.tuition_posts(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES public.tutors(id) ON DELETE CASCADE,
  guardian_id UUID NOT NULL REFERENCES public.guardians(id) ON DELETE CASCADE,
  agreed_salary NUMERIC(10,2) NOT NULL,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  action_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Admin Activity Logs
CREATE TABLE public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES public.profiles(id),
  action_type TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  target_id UUID NOT NULL,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX idx_tuition_posts_status ON public.tuition_posts(status);
CREATE INDEX idx_tuition_posts_location ON public.tuition_posts(location_area);
CREATE INDEX idx_tutors_verification ON public.tutors(verification_status);
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id) WHERE is_read = FALSE;

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tuition_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
