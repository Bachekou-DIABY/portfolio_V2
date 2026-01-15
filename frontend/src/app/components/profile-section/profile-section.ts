import { Component, signal, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-profile-section',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col items-center justify-center min-h-[40vh] bg-bg text-text-main p-8 font-sans transition-colors duration-300">
      <div class="max-w-4xl w-full">
        <header class="space-y-6 text-center lg:text-left">
          <h1 class="text-7xl lg:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-text-main to-text-dim">
            {{ ls.t()('PROFILE.TITLE') }}
          </h1>
          <p class="text-2xl text-text-dim max-w-2xl leading-relaxed mx-auto lg:mx-0">
            {{ ls.t()('PROFILE.SUBTITLE') }}
          </p>
        </header>
      </div>
    </section>
  `,
  styles: []
})
export class ProfileSectionComponent {
  ls = inject(LanguageService);
}
