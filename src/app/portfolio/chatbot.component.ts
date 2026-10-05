import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button
      (click)="open = !open"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg text-2xl"
      aria-label="Toggle chatbot"
    >
      {{ open ? '✕' : '💬' }}
    </button>

    <div
      *ngIf="open"
      class="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col text-white"
    >
      <div class="px-4 py-3 border-b border-gray-700 font-semibold text-blue-400">Ask about Ayush</div>

      <div #scroll class="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
        <div *ngFor="let m of messages" [ngClass]="m.from === 'user' ? 'text-right' : 'text-left'">
          <span
            class="inline-block px-3 py-2 rounded-xl whitespace-pre-line max-w-[85%] text-left"
            [ngClass]="m.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'"
            >{{ m.text }}</span
          >
        </div>
      </div>

      <div class="px-3 pb-2 flex flex-wrap gap-2">
        <button
          *ngFor="let s of suggestions"
          (click)="send(s)"
          class="text-xs px-2 py-1 rounded-full border border-blue-900/50 text-blue-300 hover:bg-gray-800"
        >
          {{ s }}
        </button>
      </div>

      <div class="p-3 border-t border-gray-700 flex gap-2">
        <input
          [(ngModel)]="input"
          (keyup.enter)="send(input)"
          placeholder="Type your question..."
          class="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm outline-none"
        />
        <button (click)="send(input)" class="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg text-sm">Send</button>
      </div>
    </div>
  `,
})
export class ChatbotComponent {
  @ViewChild('scroll') scrollEl?: ElementRef<HTMLDivElement>;

  open = false;
  input = '';
  suggestions = ['Education', 'Experience', 'Projects', 'Skills', 'Achievements', 'Contact'];
  messages: { from: 'user' | 'bot'; text: string }[] = [
    { from: 'bot', text: `Hi! Ask me anything about Ayush.` },
  ];

  constructor(private bot: ChatbotService) {}

  send(text: string) {
    const q = text.trim();
    if (!q) return;
    this.messages.push({ from: 'user', text: q }, { from: 'bot', text: this.bot.reply(q) });
    this.input = '';
    setTimeout(() => {
      if (this.scrollEl) this.scrollEl.nativeElement.scrollTop = this.scrollEl.nativeElement.scrollHeight;
    });
  }
}