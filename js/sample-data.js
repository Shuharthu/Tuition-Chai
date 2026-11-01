/**
 * TUITION CHAI - REALISTIC SAMPLE DATA FOR PHASE 1 UI PREVIEW
 * Realistic Bangladeshi & Chattogram EdTech Data
 * Clearly identified as sample data for preview purposes
 */

const sampleData = {
  stats: {
    verifiedTutors: 248,
    activeTuitions: 94,
    successfulPlacements: 312,
    registeredGuardians: 420
  },

  chattogramLocations: [
    "Panchlaish",
    "Nasirabad",
    "GEC Circle",
    "Khulshi",
    "Agrabad",
    "Halishahar",
    "Chawkbazar",
    "Katalganj",
    "Mehedibag",
    "Muradpur",
    "Kazir Dewri",
    "Bakalia"
  ],

  classes: [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10 (SSC)",
    "HSC 1st Year", "HSC 2nd Year (HSC)"
  ],

  curriculums: [
    "Bangla Medium",
    "English Version (National)",
    "English Medium (Cambridge / Edexcel)",
    "Madrasa / Dakhil"
  ],

  featuredTutors: [
    {
      id: "tut-101",
      name: "Tanvir Ahmed",
      university: "CUET",
      department: "Computer Science & Engineering",
      currentYear: "4th Year / 8th Semester",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviewsCount: 18,
      verified: true,
      subjects: ["Higher Math", "Physics", "ICT"],
      preferredClasses: ["Class 9-10", "HSC"],
      preferredLocations: ["GEC Circle", "Nasirabad", "Panchlaish"],
      expectedSalary: 7500,
      teachingExperience: "3+ Years",
      method: "Home & Online",
      bio: "CUET CSE senior student with 3+ years experience mentoring Class 9-12 students for SSC/HSC board examinations."
    },
    {
      id: "tut-102",
      name: "Nusrat Jahan",
      university: "Chittagong Medical College (CMC)",
      department: "MBBS",
      currentYear: "3rd Year",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      reviewsCount: 14,
      verified: true,
      subjects: ["Biology", "Chemistry", "General Science"],
      preferredClasses: ["Class 8", "Class 9-10", "HSC"],
      preferredLocations: ["Panchlaish", "Chawkbazar", "Katalganj"],
      expectedSalary: 8000,
      teachingExperience: "2+ Years",
      method: "Home Only",
      bio: "Medical student passionate about making science intuitive and memorable. Specialized in HSC biology and medical admission fundamentals."
    },
    {
      id: "tut-103",
      name: "Rafid Hasan",
      university: "University of Chittagong (CU)",
      department: "Department of English",
      currentYear: "Master's (MA)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 22,
      verified: true,
      subjects: ["English 1st & 2nd Paper", "Grammar", "Creative Writing"],
      preferredClasses: ["Class 6-8", "Class 9-10", "HSC"],
      preferredLocations: ["Khulshi", "Halishahar", "Agrabad"],
      expectedSalary: 6500,
      teachingExperience: "4 Years",
      method: "Home & Online",
      bio: "Dedicated English educator focused on building strong foundational grammar, pronunciation, and board exam answer formulation."
    },
    {
      id: "tut-104",
      name: "Sadia Chowdhury",
      university: "Premier University, Chittagong",
      department: "BBA (Finance & Accounting)",
      currentYear: "Final Year",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviewsCount: 12,
      verified: true,
      subjects: ["Accounting", "Finance", "General Math"],
      preferredClasses: ["Class 9-10 (Commerce)", "HSC (Commerce)"],
      preferredLocations: ["Muradpur", "Mehedibag", "GEC"],
      expectedSalary: 6000,
      teachingExperience: "2.5 Years",
      method: "Home & Online",
      bio: "Specialist in secondary & higher secondary commerce subjects. Patient, disciplined teaching style with regular mock tests."
    }
  ],

  latestTuitions: [
    {
      id: "TC-2026-089",
      title: "HSC 1st Year Science (Physics & Higher Math)",
      guardianName: "M. Rahman",
      studentClass: "HSC 1st Year",
      curriculum: "Bangla Medium",
      subjects: ["Physics", "Higher Mathematics"],
      location: "Nasirabad Housing Society, Chattogram",
      daysPerWeek: 4,
      monthlyBudget: 8500,
      preferredTutor: "CUET / Engineering Student Preferred (Male)",
      teachingMethod: "Home Tutoring",
      postedDate: "2 hours ago",
      deadline: "Nov 15, 2026",
      status: "Published",
      applicantCount: 3,
      desc: "Looking for an energetic engineering student who can build deep conceptual clarity in Newtonian Mechanics and Calculus for college exams."
    },
    {
      id: "TC-2026-088",
      title: "Class 10 SSC Candidate (All Science Subjects)",
      guardianName: "Dr. Farhana Begum",
      studentClass: "Class 10 (SSC)",
      curriculum: "English Version",
      subjects: ["Physics", "Chemistry", "General Math", "Biology"],
      location: "Panchlaish R/A (Near Medical Gate 2), Chattogram",
      daysPerWeek: 5,
      monthlyBudget: 10000,
      preferredTutor: "University Student (Female preferred)",
      teachingMethod: "Home Tutoring",
      postedDate: "Yesterday",
      deadline: "Nov 12, 2026",
      status: "Published",
      applicantCount: 5,
      desc: "My daughter is preparing for SSC 2027. Need a caring, punctual female tutor who can take daily tests and revise the entire test paper."
    },
    {
      id: "TC-2026-087",
      title: "Class 8 Junior School Math & English",
      guardianName: "Kamrul Islam",
      studentClass: "Class 8",
      curriculum: "Bangla Medium",
      subjects: ["General Mathematics", "English", "Science"],
      location: "Halishahar Housing Estate, Block-B, Chattogram",
      daysPerWeek: 3,
      monthlyBudget: 5500,
      preferredTutor: "Any Qualified University Student",
      teachingMethod: "Home Tutoring",
      postedDate: "3 days ago",
      deadline: "Nov 10, 2026",
      status: "Published",
      applicantCount: 7,
      desc: "Student is attentive but needs guidance in basic geometry and English 2nd paper grammatical rules."
    },
    {
      id: "TC-2026-086",
      title: "Class 6 Cambridge Curriculum All Subjects",
      guardianName: "Mrs. Shahnaz Kabir",
      studentClass: "Class 6",
      curriculum: "English Medium",
      subjects: ["Science (Checkpoint)", "Mathematics", "English"],
      location: "Khulshi R/A, Road #3, Chattogram",
      daysPerWeek: 4,
      monthlyBudget: 12000,
      preferredTutor: "English Medium Background Preferred",
      teachingMethod: "Home Tutoring",
      postedDate: "4 days ago",
      deadline: "Nov 18, 2026",
      status: "Published",
      applicantCount: 4,
      desc: "Looking for a mentor with Cambridge O/A Levels background who can assist with daily homework, school projects and weekly assignments."
    }
  ],

  testimonials: [
    {
      id: "t-1",
      name: "Engr. Monirul Haque",
      role: "Guardian (Nasirabad, Ctg)",
      text: "Finding a dedicated CUET tutor for my HSC son was so stressful until we used Tuition Chai. Within 24 hours we reviewed verified profiles and started classes. Super transparent!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "t-2",
      name: "Anika Tabassum",
      role: "Tutor (Chittagong University)",
      text: "As a student at CU, other agencies take 50-60% commission and delay contacts. Tuition Chai directly connects us with genuine guardians. The verified badge gave parents instant trust in me.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: "t-3",
      name: "Salma Akhter",
      role: "Guardian (Panchlaish, Ctg)",
      text: "The student safety and profile verification are top-notch. I could review the tutor's university credentials before inviting them home. Highly recommended for parents in Chattogram.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ],

  faqs: [
    {
      q: "How does Tuition Chai verify tutor credentials?",
      a: "Every tutor must upload their official university student ID and board exam certificates. Our verification team manually cross-references institution databases before awarding the 'Verified' badge."
    },
    {
      q: "Is posting a tuition requirement free for guardians?",
      a: "Yes! Guardians can register and submit their tuition requirements 100% free with zero posting fees."
    },
    {
      q: "Are tutors' personal phone numbers and private IDs public?",
      a: "Never. We enforce strict privacy rules. Contact information is only shared once a mutual application is shortlisted and accepted through our secure workflow."
    },
    {
      q: "Which areas in Chattogram are currently covered?",
      a: "We cover all major locations across Chattogram metropolitan area, including Panchlaish, Nasirabad, GEC, Khulshi, Agrabad, Halishahar, Chawkbazar, Mehedibag, Katalganj, Muradpur, and adjacent regions."
    },
    {
      q: "What classes and curriculums are supported?",
      a: "We cater to students from Class 1 to Class 12 (SSC & HSC) across Bangla Medium, English Version (National Curriculum), English Medium (Cambridge/Edexcel), and Madrasa backgrounds."
    }
  ],

  // Sample Guardian Dashboard data
  guardianProfile: {
    name: "Dr. Farhana Begum",
    phone: "01819-******",
    email: "farhana.begum@example.com",
    role: "Guardian",
    location: "Panchlaish R/A, Chattogram",
    activePosts: 2,
    totalApplications: 8,
    shortlisted: 3,
    ongoingTuitions: 1
  },

  // Sample Tutor Dashboard data
  tutorProfile: {
    name: "Tanvir Ahmed",
    university: "CUET (CSE)",
    phone: "01700-******",
    email: "tanvir.cuet@example.com",
    role: "Tutor",
    verificationStatus: "Verified",
    completionPercentage: 90,
    appliedCount: 5,
    shortlistedCount: 2,
    acceptedPlacements: 1
  },

  // Sample Admin Dashboard data
  adminStats: {
    totalUsers: 668,
    guardians: 420,
    tutors: 248,
    pendingVerifications: 14,
    verifiedTutors: 215,
    pendingTuitionPosts: 9,
    publishedTuitionPosts: 94,
    totalApplications: 582,
    successfulPlacements: 312,
    suspendedAccounts: 2
  }
};

window.sampleData = sampleData;
