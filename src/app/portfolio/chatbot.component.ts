import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
      class="fixed bottom-24 right-6 z-50 w-80 sm:w-[34rem] lg:w-[40rem] max-w-[calc(100vw-2rem)] h-[28rem] sm:h-[32rem] max-h-[calc(100vh-8rem)] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col text-white"
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

        <!-- Typing indicator -->
        <div *ngIf="loading" class="text-left">
          <span class="inline-flex items-center gap-1 px-3 py-3 rounded-xl bg-gray-800">
            <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
            <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
          </span>
        </div>
      </div>

      <div class="px-3 pb-2 flex flex-wrap gap-2">
        <button
          *ngFor="let s of suggestions"
          (click)="send(s.question)"
          [disabled]="loading"
          class="text-xs px-2 py-1 rounded-full border border-blue-900/50 text-blue-300 hover:bg-gray-800 disabled:opacity-50"
        >
          {{ s.label }}
        </button>
      </div>

      <div class="p-3 border-t border-gray-700 flex gap-2">
        <input
          [(ngModel)]="input"
          (keyup.enter)="send(input)"
          [disabled]="loading"
          maxlength="500"
          placeholder="Type your question..."
          class="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm outline-none disabled:opacity-60"
        />
        <button
          (click)="send(input)"
          [disabled]="loading"
          class="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  `,
})
export class ChatbotComponent {
  @ViewChild('scroll') scrollEl?: ElementRef<HTMLDivElement>;

  open = false;
  input = '';
  loading = false;

  suggestions = [
    { label: 'Education', question: "What is Ayush's education?" },
    { label: 'Experience', question: "What is Ayush's work experience?" },
    { label: 'Projects', question: 'What projects has Ayush built?' },
    { label: 'Skills', question: "What are Ayush's technical skills?" },
    { label: 'Achievements', question: "What are Ayush's achievements and certifications?" },
    { label: 'Contact', question: "How can I contact Ayush?" },
  ];

  messages: { from: 'user' | 'bot'; text: string }[] = [
    { from: 'bot', text: `Hi! Ask me anything about Ayush.` },
  ];

  constructor(private bot: ChatbotService, private host: ElementRef<HTMLElement>) {}

  /** Close the chat when the user clicks anywhere outside it. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.open) return;
    const path = event.composedPath();
    if (!path.includes(this.host.nativeElement)) {
      this.open = false;
    }
  }

  /** Close the chat with the Escape key. */
  @HostListener('document:keydown.escape')
  onEscape() {
    this.open = false;
  }

  async send(text: string) {
    const q = (text || '').trim();
    if (!q || this.loading) return;

    this.messages.push({ from: 'user', text: q });
    this.input = '';
    this.loading = true;
    this.scrollToBottom();

    try {
      const answer = await this.bot.ask(q);
      this.messages.push({ from: 'bot', text: answer });
    } finally {
      this.loading = false;
      this.scrollToBottom();
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollEl) this.scrollEl.nativeElement.scrollTop = this.scrollEl.nativeElement.scrollHeight;
    });
  }
}