const APP_STATE_KEY = "careerPathStudentProfile";
const SELECTED_CAREER_KEY = "careerPathSelectedCareer";

const interestOptions = [
  { id: "technology", label: "Technology", icon: "💻" },
  { id: "government", label: "Government Jobs", icon: "🏛" },
  { id: "design", label: "Design", icon: "🎨" },
  { id: "business", label: "Business", icon: "📈" },
  { id: "teaching", label: "Teaching", icon: "📚" },
  { id: "finance", label: "Finance", icon: "💹" },
  { id: "communication", label: "Communication", icon: "🗣" },
  { id: "problem-solving", label: "Problem Solving", icon: "🧩" }
];

const skillOptions = [
  { id: "coding", label: "Coding Basics", icon: "⌨️" },
  { id: "communication", label: "Communication", icon: "💬" },
  { id: "math", label: "Math & Aptitude", icon: "➗" },
  { id: "creativity", label: "Creativity", icon: "✨" },
  { id: "analysis", label: "Analysis", icon: "📊" },
  { id: "writing", label: "Writing", icon: "✍️" },
  { id: "discipline", label: "Discipline", icon: "🎯" },
  { id: "leadership", label: "Leadership", icon: "🚀" }
];

const workStyleOptions = [
  { id: "structured", label: "Structured", icon: "📋" },
  { id: "creative", label: "Creative", icon: "🎭" },
  { id: "analytical", label: "Analytical", icon: "🔍" },
  { id: "people-focused", label: "People Focused", icon: "🤝" }
];

const priorityFilters = [
  { id: "high-salary", label: "High Salary", icon: "💸" },
  { id: "low-investment", label: "Low Investment", icon: "🌱" },
  { id: "government-jobs", label: "Government Jobs", icon: "🏢" },
  { id: "creative-fields", label: "Creative Fields", icon: "🪄" }
];

const careerDatabase = [
  {
    id: "software-developer",
    name: "Software Developer",
    icon: "💻",
    category: "Technology",
    tags: ["high-salary", "low-investment"],
    interests: ["technology", "problem-solving"],
    skills: ["coding", "analysis", "discipline"],
    workStyle: ["analytical", "structured"],
    description: "Build websites, apps, and systems with a strong growth path even from smaller cities.",
    skillGaps: ["Data structures", "Git and collaboration", "Frontend or backend specialization"],
    timeline: "9-18 months to job-ready foundation",
    roadmap: [
      {
        level: "Beginner",
        duration: "Month 1-3",
        skills: ["HTML, CSS, JavaScript foundations", "Problem solving basics", "Internet and Git fundamentals"],
        tools: ["VS Code", "GitHub", "Chrome DevTools"],
        projects: ["Personal portfolio", "Responsive landing page"]
      },
      {
        level: "Intermediate",
        duration: "Month 4-8",
        skills: ["React or Node.js", "APIs and databases", "Clean code practices"],
        tools: ["React", "Node.js", "Postman"],
        projects: ["Career app dashboard", "CRUD web app"]
      },
      {
        level: "Advanced",
        duration: "Month 9-18",
        skills: ["System thinking", "Interview prep", "Deployment and testing"],
        tools: ["Vercel", "Render", "GitHub Actions"],
        projects: ["Capstone app", "Internship-ready case study"]
      }
    ]
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    icon: "📊",
    category: "Technology",
    tags: ["high-salary", "low-investment"],
    interests: ["technology", "finance", "problem-solving", "business"],
    skills: ["analysis", "math", "communication"],
    workStyle: ["analytical", "structured"],
    description: "Turn raw numbers into insights for companies across finance, retail, and operations.",
    skillGaps: ["Excel mastery", "SQL", "Dashboard storytelling"],
    timeline: "6-12 months to entry-level readiness",
    roadmap: [
      {
        level: "Beginner",
        duration: "Month 1-2",
        skills: ["Excel basics", "Data cleaning", "Percentages and charts"],
        tools: ["Excel", "Google Sheets"],
        projects: ["Student performance dashboard", "Budget tracker"]
      },
      {
        level: "Intermediate",
        duration: "Month 3-6",
        skills: ["SQL", "Statistics basics", "Data interpretation"],
        tools: ["MySQL", "Power BI"],
        projects: ["Sales analysis report", "Hiring funnel dashboard"]
      },
      {
        level: "Advanced",
        duration: "Month 7-12",
        skills: ["Python for analysis", "Business communication", "Case interviews"],
        tools: ["Python", "Jupyter", "Tableau"],
        projects: ["End-to-end analytics case study", "Portfolio dashboard"]
      }
    ]
  },
  {
    id: "ui-ux-designer",
    name: "UI/UX Designer",
    icon: "🎨",
    category: "Creative",
    tags: ["creative-fields", "high-salary"],
    interests: ["design", "technology", "communication"],
    skills: ["creativity", "communication", "analysis"],
    workStyle: ["creative", "people-focused"],
    description: "Design digital products that are intuitive, beautiful, and user-friendly.",
    skillGaps: ["Design systems", "Wireframing", "User research"],
    timeline: "6-10 months to build a portfolio",
    roadmap: [
      {
        level: "Beginner",
        duration: "Month 1-2",
        skills: ["Design principles", "Typography and color", "User empathy"],
        tools: ["Figma", "Canva"],
        projects: ["App redesign", "Landing page wireframe"]
      },
      {
        level: "Intermediate",
        duration: "Month 3-5",
        skills: ["Wireframes", "User flows", "Component systems"],
        tools: ["Figma", "FigJam"],
        projects: ["Job portal prototype", "Learning app case study"]
      },
      {
        level: "Advanced",
        duration: "Month 6-10",
        skills: ["Portfolio storytelling", "Research synthesis", "Design collaboration"],
        tools: ["Notion", "Maze"],
        projects: ["Capstone product case study", "Interactive prototype"]
      }
    ]
  },
  {
    id: "digital-marketer",
    name: "Digital Marketer",
    icon: "📣",
    category: "Business",
    tags: ["creative-fields", "low-investment"],
    interests: ["business", "communication", "design"],
    skills: ["communication", "writing", "creativity"],
    workStyle: ["creative", "people-focused"],
    description: "Grow brands using content, SEO, social strategy, and performance campaigns.",
    skillGaps: ["SEO fundamentals", "Campaign planning", "Analytics reading"],
    timeline: "4-8 months to freelance or intern",
    roadmap: [
      {
        level: "Beginner",
        duration: "Month 1-2",
        skills: ["Content strategy", "Audience research", "Social media basics"],
        tools: ["Canva", "Google Trends"],
        projects: ["Instagram campaign", "Content calendar"]
      },
      {
        level: "Intermediate",
        duration: "Month 3-5",
        skills: ["SEO", "Email marketing", "Copywriting"],
        tools: ["Google Analytics", "Mailchimp"],
        projects: ["Blog growth plan", "SEO audit"]
      },
      {
        level: "Advanced",
        duration: "Month 6-8",
        skills: ["Paid ads basics", "Client pitching", "Performance reporting"],
        tools: ["Meta Ads Manager", "Looker Studio"],
        projects: ["Campaign case study", "Freelance portfolio"]
      }
    ]
  },
  {
    id: "banking-ssc-aspirant",
    name: "Banking / SSC Aspirant",
    icon: "🏛",
    category: "Government",
    tags: ["government-jobs", "low-investment"],
    interests: ["government", "finance", "problem-solving"],
    skills: ["math", "discipline", "analysis"],
    workStyle: ["structured", "analytical"],
    description: "A stable path for students who prefer structured exam preparation and public sector roles.",
    skillGaps: ["Reasoning speed", "Quant shortcuts", "Current affairs consistency"],
    timeline: "8-18 months of focused preparation",
    roadmap: [
      {
        level: "Beginner",
        duration: "Month 1-3",
        skills: ["Exam pattern understanding", "Basic quant and reasoning", "Daily study system"],
        tools: ["Previous year papers", "Mock test apps"],
        projects: ["30-day study planner", "Error log notebook"]
      },
      {
        level: "Intermediate",
        duration: "Month 4-9",
        skills: ["Speed improvement", "Current affairs notes", "Sectional accuracy"],
        tools: ["Oliveboard", "Adda247"],
        projects: ["Weekly mock review", "Topic mastery tracker"]
      },
      {
        level: "Advanced",
        duration: "Month 10-18",
        skills: ["Full mocks", "Revision cycles", "Interview readiness if applicable"],
        tools: ["Testbook", "PDF compilations"],
        projects: ["Final 60-day revision plan", "Exam-day strategy sheet"]
      }
    ]
  },
  {
    id: "teacher-trainer",
    name: "Teacher / Trainer",
    icon: "📚",
    category: "Education",
    tags: ["low-investment"],
    interests: ["teaching", "communication"],
    skills: ["communication", "discipline", "leadership"],
    workStyle: ["people-focused", "structured"],
    description: "Guide students through academic subjects, spoken English, or skill-based training roles.",
    skillGaps: ["Lesson planning", "Public speaking confidence", "Subject depth"],
    timeline: "6-12 months depending on specialization",
    roadmap: [
      {
        level: "Beginner",
        duration: "Month 1-2",
        skills: ["Concept explanation", "Voice confidence", "Student empathy"],
        tools: ["Google Meet", "Canva"],
        projects: ["Sample lesson video", "One-week lesson plan"]
      },
      {
        level: "Intermediate",
        duration: "Month 3-6",
        skills: ["Curriculum design", "Practice materials", "Feedback systems"],
        tools: ["Zoom", "Google Docs"],
        projects: ["Mini teaching portfolio", "Assessment sheet"]
      },
      {
        level: "Advanced",
        duration: "Month 7-12",
        skills: ["Personal brand", "Batch handling", "Career counseling basics"],
        tools: ["YouTube", "Notion"],
        projects: ["Teaching channel", "Structured training program"]
      }
    ]
  }
];

const resourceCatalog = {
  learning: [
    {
      title: "YouTube",
      description: "Free tutorials for coding, exam prep, design, spoken English, and productivity.",
      url: "https://www.youtube.com/"
    },
    {
      title: "Coursera",
      description: "Structured certificate-based learning from universities and industry experts.",
      url: "https://www.coursera.org/"
    },
    {
      title: "Skill India",
      description: "India-focused skilling ecosystem for vocational and industry-ready learning.",
      url: "https://www.skillindia.gov.in/"
    }
  ],
  jobs: [
    {
      title: "LinkedIn",
      description: "Build your profile, connect with recruiters, and explore internships and jobs.",
      url: "https://www.linkedin.com/"
    },
    {
      title: "Naukri",
      description: "Popular India-focused job platform for entry-level and experienced roles.",
      url: "https://www.naukri.com/"
    },
    {
      title: "Internshala",
      description: "A strong platform for internships, fresher roles, and skill-building opportunities.",
      url: "https://internshala.com/"
    }
  ],
  government: [
    {
      title: "SSC",
      description: "Central government recruitment exams for multiple graduate and 12th-pass roles.",
      url: "https://ssc.gov.in/"
    },
    {
      title: "Banking",
      description: "IBPS and SBI exam ecosystem covering clerical and probationary officer tracks.",
      url: "https://www.ibps.in/"
    },
    {
      title: "Defence",
      description: "Explore Indian Army, Navy, Air Force, and combined defence opportunities.",
      url: "https://www.joinindianarmy.nic.in/"
    }
  ]
};

const parichitKnowledge = [
  {
    keywords: ["best career", "which career", "career is best", "suitable career"],
    answer: "The best career is the one that matches three things together: what you enjoy, what you can build skill in, and what opportunities are realistic for your situation. Use your top match as direction, not pressure. Start with one path for 90 days, build small proof through projects or mock tests, and then review progress."
  },
  {
    keywords: ["confused", "what should i do", "lost"],
    answer: "Feeling confused is normal, especially when you are choosing between many paths. Start by reducing the decision to two questions: do you want a skill-first path like tech or design, or a structured exam-first path like government jobs? Pick one main path and one backup path, then follow each for two weeks before comparing energy, consistency, and progress."
  },
  {
    keywords: ["tech vs government", "government vs tech"],
    answer: "Tech usually rewards skill-building, portfolio work, and faster iteration. Government careers reward patience, discipline, and long exam preparation cycles. If you like building things, learning online, and experimenting, tech may fit better. If you want structured competition, job stability, and a clear syllabus, government may suit you more."
  },
  {
    keywords: ["high salary", "salary careers", "money"],
    answer: "High salary careers often come from strong skill depth, not just degree names. Software development, data analytics, UI/UX, and product-aligned roles can grow well over time. The important part is becoming demonstrably good through projects, portfolios, internships, and communication."
  },
  {
    keywords: ["start coding", "how to start coding"],
    answer: "Start coding with one language and one simple goal. JavaScript is a practical choice because it helps you build websites quickly. Spend the first month learning basics, then make two small projects like a portfolio and a to-do app. Do not jump between too many languages early."
  },
  {
    keywords: ["what skills", "important skills", "skills are important"],
    answer: "The most important skills are problem solving, communication, digital fluency, and consistency. Then add domain-specific skills based on your path: coding for tech, aptitude for exams, design tools for creative careers, and writing or persuasion for business roles."
  },
  {
    keywords: ["stay consistent", "consistent", "discipline"],
    answer: "Consistency becomes easier when your plan is small enough to repeat. Fix one daily time slot, keep only one main target, and track visible streaks. Even 90 focused minutes per day can create strong momentum if you avoid random switching."
  },
  {
    keywords: ["study plan", "best study plan"],
    answer: "A good study plan has three layers: learning, revision, and testing. Learn one topic, revise it within 24 hours, and then test yourself weekly. Keep Sundays for review, not guilt. The plan should be simple enough that you can follow it during low-energy days too."
  },
  {
    keywords: ["ssc", "prepare ssc"],
    answer: "For SSC, first understand the exam pattern and syllabus. Then divide preparation into quant, reasoning, English, and general awareness. Start with basics, maintain a notebook of errors, and move into timed mocks only after accuracy improves. Daily current affairs revision matters."
  },
  {
    keywords: ["banking", "banking preparation"],
    answer: "Banking preparation works best when you build speed gradually. Focus on arithmetic basics, simplification, reasoning patterns, English comprehension, and mock analysis. The real progress comes from reviewing why you made mistakes, not just taking more tests."
  },
  {
    keywords: ["tier 3 city", "tier 2", "small town"],
    answer: "Your city does not define your ceiling. Students from Tier 2 and Tier 3 places often grow fast because they learn focus and resilience early. Use online communities, free resources, and public proof of work like projects, mock scores, or portfolios. Visibility can be created from anywhere."
  }
];
