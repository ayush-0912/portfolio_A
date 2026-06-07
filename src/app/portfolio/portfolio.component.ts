import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  activeSection: string = 'home';
  isMenuOpen: boolean = false;

 experiences = [
  {
    company: 'LTIMindtree',
    role: 'Graduate Apprentice — .NET Full Stack Developer',
    duration: 'Sept 2025 – Present',
    color: 'blue',
    bullets: [
      'Engineered full-stack modules including Authentication, Role-Based Access Control, and RESTful CRUD APIs using ASP.NET Core and Entity Framework Core.',
      'Ranked 2nd in cohort on Milestone 3 assessment with a 91% score, and maintained all 4 KPIs throughout the training program.',
      'Completed assignments in half the average time of peers, demonstrating strong self-sufficiency and technical depth.'
    ],
    techs: ['.NET', 'C#', 'Angular', 'ASP.NET Core', 'EF Core']
  },
  {
    company: 'Solar Industries India Ltd',
    role: 'AI/ML Intern',
    duration: 'May 2025 – Sept 2025',
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
    duration: 'Jan 2025 – Apr 2025',
    color: 'green',
    bullets: [
      'Led end-to-end development of a Detonator Planning application using Django and Next.js, managing the full procurement planning workflow.',
      'Integrated Power Apps, SharePoint, and Dataverse to build internal tools, enabling seamless data management for non-technical stakeholders.',
      'Earned the Shabash Award for outstanding project delivery and successful organizational adoption of the application.'
    ],
    techs: ['Django', 'Next.js', 'PostgreSQL', 'Power Apps', 'SharePoint', 'Dataverse']
  }
];

  projects = [
    {
    title: 'Leave Management System',
    type: 'Full Stack Web Application',
    description: 'Built a role-based Leave Management System with separate user and admin workflows.',
    bullets: [
    'Enabled employees to apply for leave and managers to approve or reject requests.',
    'Admins can manage employee-manager assignments and oversee department configurations.',
    'Implemented distinct role-based workflows ensuring clean separation of responsibilities.'
  ],
  techs: ['C#', '.NET Web API', 'Angular (TypeScript)', 'SQL Server'],
  icon: 'server'
    },
    {
      title: 'Email classifier using AI',
      type: 'LangChain',
      description: 'AI application using Python and LangChain to automatically classify emails.',
      bullets: [
        'Classifies emails into 9 categories and tracks the status of embedded tasks.',
        'Built interactive Streamlit dashboard to visualize real-time analytics and task progress.',
        'Significantly streamlined workflow and productivity.'
      ],
      techs: ['Python', 'LangChain', 'Streamlit', 'Postgres'],
      icon: 'code'
    },
    {
      title: 'Detonator Planning',
      type: 'Full stack application',
      description: 'Order management application to streamline planning of explosive materials.',
      bullets: [
        'Built using Next.js, Django, and PostgreSQL.',
        'Developed key features for creating and tracking material orders.',
        'Ensured an efficient and organized procurement workflow for users.'
      ],
      techs: ['Django', 'Next.js', 'Postgres', 'Tailwind CSS'],
      icon: 'database'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'achievements'];
    const scrollPosition = window.pageYOffset + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}