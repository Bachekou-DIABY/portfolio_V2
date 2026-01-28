import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 pb-32 bg-bg text-text-main px-8 border-t border-border transition-colors duration-300">
      <div class="max-w-[1440px] mx-auto">
        <header class="mb-16">
          <h2 class="text-4xl font-black tracking-tight mb-4">
            {{ ls.t()('CONTACT.TITLE') }}
          </h2>
          <p class="text-xl text-text-dim max-w-none">
            {{ ls.t()('CONTACT.SUBTITLE') }}
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Email -->
          <a href="mailto:bac.diaby@gmail.com" 
             class="group p-6 sm:p-8 rounded-3xl border border-border bg-bg hover:border-text-main transition-all flex items-center gap-4 sm:gap-6">
            <div class="w-12 h-12 min-w-[3rem] rounded-2xl bg-text-main text-bg flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div class="text-left overflow-hidden">
              <p class="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">{{ ls.t()('CONTACT.EMAIL') }}</p>
              <p class="text-base sm:text-lg font-bold truncate">bac.diaby@gmail.com</p>
            </div>
          </a>

          <!-- Phone -->
          <a href="tel:+33787094080" 
             class="group p-6 sm:p-8 rounded-3xl border border-border bg-bg hover:border-text-main transition-all flex items-center gap-4 sm:gap-6">
            <div class="w-12 h-12 min-w-[3rem] rounded-2xl bg-text-main text-bg flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div class="text-left">
              <p class="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">{{ ls.t()('CONTACT.PHONE') }}</p>
              <p class="text-base sm:text-lg font-bold">07 87 09 40 80</p>
            </div>
          </a>

          <!-- LinkedIn -->
          <a href="https://www.linkedin.com/in/bachekou-diaby/" target="_blank"
             class="group p-6 sm:p-8 rounded-3xl border border-border bg-bg hover:border-text-main transition-all flex items-center gap-4 sm:gap-6">
            <div class="w-12 h-12 min-w-[3rem] rounded-2xl bg-text-main text-bg flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <div class="text-left">
              <p class="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">{{ ls.t()('CONTACT.LINKEDIN') }}</p>
              <p class="text-base sm:text-lg font-bold">Bachekou DIABY</p>
            </div>
          </a>

          <!-- GitHub -->
          <a href="https://github.com/Bachekou-DIABY" target="_blank"
             class="group p-6 sm:p-8 rounded-3xl border border-border bg-bg hover:border-text-main transition-all flex items-center gap-4 sm:gap-6">
            <div class="w-12 h-12 min-w-[3rem] rounded-2xl bg-text-main text-bg flex items-center justify-center flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </div>
            <div class="text-left">
              <p class="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">{{ ls.t()('CONTACT.GITHUB') }}</p>
              <p class="text-base sm:text-lg font-bold">@Bachekou-DIABY</p>
            </div>
          </a>
        </div>

        <!-- CV Button -->
        <div class="mt-32 flex justify-center">
          <a href="/CV.pdf" download="DIABY_Bachekou_CV.pdf"
             class="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-text-main text-bg font-bold text-lg hover:scale-105 transition-all shadow-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            {{ ls.t()('CONTACT.CV') }}
          </a>
        </div>
      </div>
    </section>
  `
})
export class ContactSectionComponent {
  ls = inject(LanguageService);
}
