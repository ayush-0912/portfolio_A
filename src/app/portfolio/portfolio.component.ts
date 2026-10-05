import { Component, HostListener, OnInit } from '@angular/core';
import { PORTFOLIO, EXPERIENCES, PROJECTS } from './portfolio-data';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  activeSection: string = 'home';
  isMenuOpen: boolean = false;

  experiences = EXPERIENCES;
  projects = PROJECTS;
  skills = PORTFOLIO.skills;
  achievements = PORTFOLIO.achievements;

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