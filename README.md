# Tuition Chai (টিউশন চাই)
> **Learn • Teach • Grow Together**  
> *"টিউশন ও টিউটর এর জন্য নতুন সম্ভাবনা"*  
> Chattogram's Premier Secure, Futuristic Tutor Marketplace & Education Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Status: Phase 1 Complete](https://img.shields.io/badge/Status-Phase%201%20Ready-12B8A6.svg)]()
[![Platform: Responsive](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile%20%7C%20Tablet-102A43.svg)]()

Tuition Chai connects guardians searching for qualified tutors for Class 1 to 12 students with capable tutors—primarily high-achieving undergraduate and postgraduate students from **CUET, University of Chittagong (CU), Chittagong Medical College (CMC)**, and premier institutions in Chattogram, Bangladesh.

---

## 🌟 Key Features

- **Universal Device Compatibility:** Engineered for 4K desktops, laptops, tablets, phablets, and smartphones (iOS & Android) with notch/island safe area insets and anti-zoom mobile ergonomics.
- **Dual Theme Engine (Dark & Light Mode):** Modern Linear/Stripe-inspired aesthetics with deep navy (`#0B1320`), glowing teal accents (`#14B8A6`), and persistent theme caching.
- **Bilingual Localization (EN & বাংলা):** Seamless instant toggling between English (Inter) and Bengali (Hind Siliguri).
- **Three Distinct Role Portals:**
  - **Guardian Portal:** Post multi-step tuition requirements, review applicants, shortlist candidates, unlock private contacts, and manage ongoing tuitions.
  - **Tutor Portal:** Verified badges, live opportunity search, personalized application submission, status tracking (Submitted → Under Review → Shortlisted → Accepted), and credential verification upload.
  - **Super Admin Command Center:** Real-time platform KPI metrics, tutor credential verification queue, tuition fraud moderation, immutable security audit trail, and CSV data export.
- **Cybersecurity & Privacy by Design:** Zero client trust, Row Level Security (RLS) enforcement, private encrypted document storage buckets, and phone number masking before mutual agreement.

---

## 🛠️ Technology Stack

- **Frontend:** Semantic HTML5, CSS3 (CSS Variables, Flexbox, CSS Grid), Vanilla ES6+ JavaScript.
- **Backend / Database:** Supabase Free Tier, PostgreSQL 15+, Supabase Auth, Row Level Security (RLS), Supabase Storage.
- **Design System:** Inter & Hind Siliguri typography, restrained palette (Primary Navy `#102A43`, Primary Teal `#12B8A6`, Accent Amber `#E9A23B`).

---

## 📂 Project Architecture

```
Tuition Chai/
├── index.html                   # High-converting landing page
├── login.html                   # Auth portal with interactive demo switcher
├── register.html                # Guardian & Tutor onboarding workflows
├── find-tutors.html             # Verified tutors directory with multi-filters
├── find-tuition.html            # Active tuition board in Chattogram
├── about.html                   # Mission, story & community values
├── contact.html                 # Direct support & inquiry form
│
├── guardian/
│   └── dashboard.html           # Guardian command center & post-tuition form
├── tutor/
│   └── dashboard.html           # Tutor opportunities & application tracking
├── admin/
│   └── dashboard.html           # Super Admin control room & verification queue
│
├── css/
│   ├── style.css                # Global design system & theme variables
│   ├── components.css           # Themed cards, forms, buttons & modals
│   ├── dashboard.css            # Responsive dashboard layouts & bottom nav
│   └── responsive.css           # Multi-tier device breakpoint rules
│
├── js/
│   ├── app.js                   # Theme toggle, mobile drawer & modals
│   ├── translations.js          # English / Bengali localization engine
│   └── sample-data.js           # Realistic Chattogram EdTech sample dataset
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Complete PostgreSQL DDL with RLS policies
│
├── docs/
│   ├── DATABASE.md              # Relational schema ERD & index strategy
│   └── SECURITY.md              # Threat model, RBAC & document protection
│
└── assets/images/               # Brand logo variants & high-res icons
```

---

## 🚀 Getting Started

To run Tuition Chai locally:

```bash
# Clone the repository
git clone https://github.com/Shuharthu/<repo-name>.git

# Navigate to project directory
cd "Tuition Chai"

# Start local server (Python built-in)
python -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

---

## 📞 Business Information

- **Brand:** Tuition Chai
- **Location:** Chattogram, Bangladesh
- **Phone:** 01300-015091
- **WhatsApp:** +8801300-015091
- **Email:** tuitionchai@gmail.com
- **Facebook:** [Tuition Chai](https://www.facebook.com/tuitionchai) (936 Followers)

---

## 📄 License
This project is licensed under the MIT License.
