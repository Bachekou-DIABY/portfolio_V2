import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-recommendations-section',
  standalone: true,
  template: `
    <section class="py-24 bg-zinc-950 text-white px-8 border-t border-zinc-900">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-16 tracking-tight">{{ ls.t()('RECOMMENDATIONS.TITLE') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (rec of recommendations(); track rec.id) {
            <div class="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-6 relative group transition-all hover:bg-zinc-900/60">
              <svg class="absolute top-8 right-8 text-zinc-800 w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8v8h6v-8h-6zM22 8v8h6v-8h-6zM10 18c0 3.314-2.686 6-6 6v2c4.418 0 8-3.582 8-8h-2zM22 18c0 3.314-2.686 6-6 6v2c4.418 0 8-3.582 8-8h-2z"></path>
              </svg>
              
              <p class="text-zinc-400 italic text-lg leading-relaxed relative">
                "{{ ls.t()('RECOMMENDATIONS.' + rec.id + '.TEXT') }}"
              </p>
              
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-500">
                  {{ rec.initials }}
                </div>
                <div>
                  <h4 class="font-bold text-white">{{ ls.t()('RECOMMENDATIONS.' + rec.id + '.NAME') }}</h4>
                  <p class="text-zinc-500 text-sm">{{ ls.t()('RECOMMENDATIONS.' + rec.id + '.ROLE') }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class RecommendationsSectionComponent {
  ls = inject(LanguageService);
  recommendations = signal([
    { id: 'HUGO', initials: 'HV' },
    { id: 'GERMAIN', initials: 'GM' }
  ]);
}
