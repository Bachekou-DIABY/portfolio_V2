import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-recommendations-section',
  standalone: true,
  template: `
    <section class="py-24 bg-bg text-text-main px-8 border-t border-border transition-colors duration-300">
      <div class="max-w-[1440px] mx-auto">
        <h2 class="text-3xl font-bold mb-16 tracking-tight">{{ ls.t()('RECOMMENDATIONS.TITLE') }}</h2>
        
        <div class="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide w-full">
          @for (rec of recommendations(); track rec.id) {
            <div class="w-full md:w-[calc(50%_-_1rem)] p-8 rounded-3xl bg-bg border border-border space-y-6 relative group transition-all hover:border-text-dim snap-start shrink-0">
              <svg class="absolute top-8 right-8 text-text-dim opacity-10 w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8v8h6v-8h-6zM22 8v8h6v-8h-6zM10 18c0 3.314-2.686 6-6 6v2c4.418 0 8-3.582 8-8h-2zM22 18c0 3.314-2.686 6-6 6v2c4.418 0 8-3.582 8-8h-2z"></path>
              </svg>
              
              <p class="text-text-dim italic text-lg leading-relaxed relative group-hover:text-text-main transition-colors">
                "{{ ls.t()('RECOMMENDATIONS.' + rec.id + '.TEXT') }}"
              </p>
              
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center font-bold text-text-dim">
                  {{ rec.initials }}
                </div>
                <div>
                  <h4 class="font-bold text-text-main">{{ ls.t()('RECOMMENDATIONS.' + rec.id + '.NAME') }}</h4>
                  <p class="text-text-dim text-sm">{{ ls.t()('RECOMMENDATIONS.' + rec.id + '.ROLE') }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class RecommendationsSectionComponent {
  ls = inject(LanguageService);
  recommendations = signal([
    { id: 'FRANCK', initials: 'FA' },
    { id: 'ADIL', initials: 'AA' }
  ]);
}
