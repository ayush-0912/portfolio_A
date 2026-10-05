import { Injectable } from '@angular/core';
import { PORTFOLIO as P, EXPERIENCES, PROJECTS } from './portfolio-data';

interface Intent {
  keys: string[];
  answer: () => string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private intents: Intent[] = [
    {
      keys: ['hi', 'hello', 'hey'],
      answer: () =>
        `Hi! I'm Ayush's portfolio assistant. Ask me about his education, experience, projects, skills, achievements or contact details.`,
    },
    {
      keys: ['who', 'about', 'introduce', 'yourself', 'summary'],
      answer: () => `${P.name} is a ${P.title} based in ${P.location}.`,
    },
    {
      keys: ['education', 'college', 'degree', 'cgpa', 'study', 'school', 'university', 'qualification', 'grade'],
      answer: () => P.education.join('\n'),
    },
    {
      keys: ['experience', 'work', 'job', 'intern', 'company', 'career'],
      answer: () =>
        EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.duration})\n- ${e.bullets.join('\n- ')}\nTech: ${e.techs.join(', ')}`).join('\n\n'),
    },
    {
      keys: ['project', 'built', 'build', 'portfolio', 'app'],
      answer: () =>
        PROJECTS.map(p => `${p.title} (${p.type}): ${p.description}\nTech: ${p.techs.join(', ')}`).join('\n\n'),
    },
    {
      keys: ['skill', 'tech', 'stack', 'language', 'framework', 'tool', 'database'],
      answer: () => P.skills.map(s => `${s.title}: ${s.items}`).join('\n'),
    },
    {
      keys: ['achievement', 'award', 'recognition', 'codechef', 'leetcode', 'hackerrank', 'competitive'],
      answer: () => P.achievements.join('\n'),
    },
    {
      keys: ['contact', 'email', 'phone', 'reach', 'linkedin', 'hire', 'number', 'location'],
      answer: () => `Email: ${P.email}\nPhone: ${P.phone}\nLinkedIn: ${P.linkedin}\nLocation: ${P.location}`,
    },
  ];

  reply(question: string): string {
    const tokens = question
      .toLowerCase()
      .replace(/[^a-z0-9+#.\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    let best: Intent | null = null;
    let bestScore = 0;

    for (const intent of this.intents) {
      const score = intent.keys.filter(k =>
        tokens.some(t => t === k || (k.length > 3 && t.startsWith(k)))
      ).length;
      if (score > bestScore) {
        best = intent;
        bestScore = score;
      }
    }

    return best
      ? best.answer()
      : `I can answer questions about Ayush's education, experience, projects, skills, achievements and contact details. Try one of those!`;
  }
}