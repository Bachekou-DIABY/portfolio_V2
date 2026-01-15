import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <button 
      (click)="toggleLanguage()" 
      class="fixed top-6 right-6 z-50 px-4 py-2 rounded-full border border-border bg-bg/80 text-text-dim text-sm font-medium hover:text-text-main transition-all backdrop-blur-md"
    >
      {{ langService.lang() === 'fr' ? 'FR' : 'EN' }}
    </button>
  `,
  styles: []
})
export class LanguageSwitcherComponent {
  langService = inject(LanguageService);

  toggleLanguage() {
    const nextLang = this.langService.lang() === 'fr' ? 'en' : 'fr';
    this.langService.setLanguage(nextLang);
  }
}
