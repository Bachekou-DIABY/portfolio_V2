import { Component, signal, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-profile-section',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col items-center justify-center min-h-[40vh] bg-bg text-text-main p-8 font-sans transition-colors duration-300">
      <div class="max-w-[1440px] mx-auto">
        <header class="space-y-6">
          <h1 class="text-6xl sm:text-7xl lg:text-8xl font-black text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-text-main to-text-dim animate-reveal opacity-0">
            {{ ls.t()('PROFILE.TITLE') }}
          </h1>
          <p class="text-xl lg:text-2xl text-text-dim max-w-6xl leading-relaxed text-center mx-auto lg:text-left lg:mx-0 px-4 sm:px-0 animate-reveal opacity-0 animation-delay-200">
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
