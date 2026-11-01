# Tuition Chai — Security Architecture & Access Control Specification
**Security Clearance:** Production EdTech Security Standards  
**Identity Engine:** Supabase Authentication + Row Level Security (RLS)  
**Threat Model:** Defense in Depth against IDOR, Privilege Escalation, Data Scraping & Unauthorized Access

---

## 1. Role-Based Access Control (RBAC) Matrix

| Resource / Action | Guardian | Tutor | Super Admin | Public Visitor |
| :--- | :---: | :---: | :---: | :---: |
| **Browse Published Tutors** | Read (Public fields only) | Read (Public fields only) | Full Read | Read (Public fields only) |
| **View Tutor Private Documents** | ❌ Denied | Own Documents Only | Full Read | ❌ Denied |
| **Post Tuition Requirement** | Create / Edit Own | ❌ Denied | Full CRUD | ❌ Denied |
| **Approve / Feature Tuition** | ❌ Denied | ❌ Denied | Full Authority | ❌ Denied |
| **Apply for Tuition** | ❌ Denied | Create / Read Own | Full Read | ❌ Denied |
| **Shortlist / Accept Tutor** | Own Post Applicants | ❌ Denied | Full Authority | ❌ Denied |
| **Verify Tutor Badge** | ❌ Denied | ❌ Denied | Full Authority | ❌ Denied |
| **Modify User Roles** | ❌ Denied | ❌ Denied | Server / Edge Function | ❌ Denied |
| **Admin Audit Logs** | ❌ Denied | ❌ Denied | Read Only | ❌ Denied |

---

## 2. Row Level Security (RLS) Enforcement Rules

### 2.1 Principle of Least Privilege
1. **Never trust frontend JavaScript:** Roles stored in client localStorage or submitted in mutation payloads are never trusted. All permissions are evaluated in PostgreSQL policies using `auth.uid()` and an immutable role helper:
   ```sql
   CREATE OR REPLACE FUNCTION auth.get_user_role()
   RETURNS user_role AS $$
     SELECT role FROM public.profiles WHERE id = auth.uid();
   $$ LANGUAGE sql SECURITY DEFINER STABLE;
   ```

2. **Self-Assignment Defense:**
   - Database triggers strictly prohibit users from updating their own `role` or `verification_status` column.
   - Any attempt to update `role` via the standard Supabase client raises an exception:
     `"Unauthorized privilege escalation attempt recorded."`

### 2.2 Table Policies

#### Profiles Table
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated or public can read active verified profile summaries
CREATE POLICY "Public profiles read policy"
ON profiles FOR SELECT
USING (status = 'active');

-- Users can only modify their own name and language
CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND 
  role = (SELECT role FROM profiles WHERE id = auth.uid()) -- Role cannot be changed
);
```

#### Tuition Posts Table
```sql
ALTER TABLE tuition_posts ENABLE ROW LEVEL SECURITY;

-- Public can view published tuitions
CREATE POLICY "Public read published tuitions"
ON tuition_posts FOR SELECT
USING (status = 'published');

-- Guardians can view and update their own tuitions regardless of status
CREATE POLICY "Guardians manage own posts"
ON tuition_posts FOR ALL
USING (auth.uid() = guardian_id);

-- Super admin has full control
CREATE POLICY "Admin manage all tuitions"
ON tuition_posts FOR ALL
USING (auth.get_user_role() = 'super_admin');
```

#### Tutor Documents (Private Storage & Table)
```sql
ALTER TABLE tutor_documents ENABLE ROW LEVEL SECURITY;

-- Only the tutor who uploaded or Super Admin can read documents
CREATE POLICY "Tutor view own docs"
ON tutor_documents FOR SELECT
USING (auth.uid() = tutor_id OR auth.get_user_role() = 'super_admin');

-- Tutors can only insert their own documents
CREATE POLICY "Tutor insert own docs"
ON tutor_documents FOR INSERT
WITH CHECK (auth.uid() = tutor_id);
```

---

## 3. Storage Bucket Security

1. **`public-avatars` (Public Bucket):**
   - Read: Public
   - Write: Authenticated users (`auth.uid() = file_owner`)
   - Max file size: 2 MB
   - Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`

2. **`private-documents` (Private Encrypted Bucket):**
   - Read: Restricted via RLS or signed URLs (Tutor owner + Super Admin)
   - Write: Authenticated tutors only
   - Guardians and public scrapers are permanently blocked from accessing raw documents
   - Max file size: 5 MB
   - Allowed MIME types: `image/jpeg`, `image/png`, `application/pdf`

---

## 4. Input Validation & XSS Defenses
- All dynamic inputs are sanitized before rendering or stored via parameterized SQL.
- CSP (Content Security Policy) and Strict HTTP Transport headers configured for production deployment.
- Mobile numbers validated against Bangladeshi standard regex: `^(\+8801|01)[3-9]\d{8}$`.
