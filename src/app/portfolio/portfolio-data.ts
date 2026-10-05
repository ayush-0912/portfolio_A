export interface Experience {
  company: string;
  role: string;
  duration: string;
  color: string;
  bullets: string[];
  techs: string[];
}

export interface Project {
  title: string;
  type: string;
  description: string;
  bullets: string[];
  techs: string[];
  icon: string;
}

export interface SkillGroup {
  title: string;
  items: string;
  color: string;
}

export const PORTFOLIO = {
  name: 'Ayush Kukekar',
  title: 'Full Stack Developer & AI/ML Specialist',
  location: 'Nagpur, Maharashtra',
  phone: '+91 7666217137',
  email: 'ayushkukekar09@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayush-kukekar-a5b960257',
  education: [
    "Bachelor's of Technology (Computer Science and Engineering), Yeshwantrao Chavan College of Engineering, 2021 - 2025, CGPA: 8.2",
    'Prerna Junior College, Nagpur, May 2021, Grade: 92.30',
    'Somalwar High School, Nagpur, May 2019, Grade: 86.6',
  ],
  skills: [
    { title: 'Languages', items: 'Python, C#, Java, JavaScript, TypeScript', color: 'text-blue-400' },
    { title: 'Web & Frameworks', items: 'Django, Streamlit, Angular, Next.js, .NET / ASP.NET Core', color: 'text-purple-400' },
    { title: 'AI / ML', items: 'LangChain, RAG, LLM application development', color: 'text-green-400' },
    { title: 'Databases', items: 'MySQL, PostgreSQL, SQL Server', color: 'text-yellow-400' },
    { title: 'Tools & Platforms', items: 'CopyBara, Git, VS Code, IntelliJ IDEA, Power Apps, SharePoint, Dataverse', color: 'text-pink-400' },
    { title: 'Core CS', items: 'OOP, DBMS, Data Structures & Algorithms', color: 'text-cyan-400' },
  ] as SkillGroup[],
  achievements: [
    'Recognized as Intern of the Month 4 times over an 8.5-month tenure at Solar Industries India Ltd.',
    'Scored 91% on LTIMindtree Milestone 3 assessment (2nd highest in cohort); achieved all 4 KPIs throughout training.',
    'Active competitive programmer: LeetCode (300+ problems), CodeChef (1400+ rating), HackerRank (3 stars).',
    'Attended IIT Bombay Techfest Machine Learning Workshop.',
    'Certifications: Python Programming (Coursera), Microsoft Azure Fundamentals (AZ-900).',
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    company: 'LTIMindtree',
    role: 'Engineer — Industrial IoT',
    duration: 'Sept 2025 – Present',
    color: 'blue',
    bullets: [
      'Completed training in .NET Full-Stack Development, followed by Python Full-Stack Development with Angular, securing the 2nd highest rank in the cohort with a 91% score.',
      'Built a full-stack Leave Management System end-to-end, then joined the project team to ship patches and develop APIs.',
      'Working directly on a Google client project focused on Python OSS package upgradation, engaging in daily interaction with Google developers for guidance and code reviews.',
      'Continuously working with Git/GitHub and Python packages, and creating automation scripts to reduce manual effort and improve team efficiency.'
    ],
    techs: ['.NET', 'C#', 'Angular', 'Python', 'Git/GitHub']
  },
  {
    company: 'Solar Industries India Ltd',
    role: 'AI/ML Intern',
    duration: 'Jun 2025 – Sept 2025',
    color: 'purple',
    bullets: [
      'Designed and deployed an LLM-powered Email Classification system using LangChain that categorizes emails into 9 types and tracks embedded task statuses.',
      'Built an interactive Streamlit dashboard for real-time analytics and workflow visibility, streamlining operational productivity for the team.',
      'Recognized as Intern of the Month for consistent high-impact delivery across the internship.'
    ],
    techs: ['LangChain', 'Streamlit', 'Python', 'LLM']
  },
  {
    company: 'Solar Industries India Ltd',
    role: 'Web Developer Intern',
    duration: 'Jan 2025 – May 2025',
    color: 'green',
    bullets: [
      'Led the core development and implementation of a Detonator Planning application using Django and Next.js, managing the full procurement planning workflow.',
      'Integrated Power Apps, SharePoint, and Dataverse to build internal tools.',
      'Earned the Shabash Award for outstanding project delivery and successful organizational adoption of the application.'
    ],
    techs: ['Django', 'Next.js', 'PostgreSQL', 'Power Apps', 'SharePoint', 'Dataverse']
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'Leave Management System',
    type: 'Full-Stack Web Application',
    description: 'Built a role-based Leave Management System with separate user and admin workflows.',
    bullets: [
      'Enabled employees to apply for leave and managers to approve requests.',
      'Admins can manage employee-manager assignments and departments.',
      'Implemented soft delete and delete locks to ensure data integrity and prevent accidental data loss.'
    ],
    techs: ['C#', '.NET', 'Angular (TypeScript)'],
    icon: 'server'
  },
  {
    title: 'AI Email Classifier',
    type: 'LangChain / Python',
    description: 'Developed an AI pipeline that automatically classifies emails into 9 categories and tracks embedded task statuses.',
    bullets: [
      'Significantly reduced manual triage effort.',
      'Visualized real-time analytics and task progress via an interactive Streamlit dashboard, improving team workflow efficiency.'
    ],
    techs: ['Python', 'LangChain', 'Streamlit', 'PostgreSQL'],
    icon: 'code'
  },
  {
    title: 'Detonator Planning System',
    type: 'Full-Stack Web Application',
    description: 'Order management platform for planning and procuring explosive materials.',
    bullets: [
      'Replaced a manual process with a structured digital workflow.',
      'Implemented features for order creation, status tracking, and inventory management with a clean, production-ready UI.'
    ],
    techs: ['Django', 'Next.js', 'PostgreSQL', 'Tailwind CSS'],
    icon: 'database'
  }
];