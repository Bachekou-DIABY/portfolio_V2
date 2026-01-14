import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  template: `
    <section class="flex flex-col items-center justify-center min-h-[60vh] bg-zinc-950 text-white p-8 font-sans">
      <div class="max-w-4xl w-full space-y-12">
        <header class="space-y-4">
          <h1 class="text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Portfolio v2
          </h1>
          <p class="text-xl text-zinc-400 max-w-xl leading-relaxed">
            Passionné par le développement d'écosystèmes scalables et performants. 
            Découvrez mes réalisations et mon expertise technique.
          </p>
        </header>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          @for (stat of stats(); track stat.label) {
            <div class="group relative p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 transition-all hover:bg-zinc-900/80 hover:border-zinc-700">
              <div class="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity"></div>
              <p class="text-zinc-500 text-sm font-medium uppercase tracking-[0.2em] mb-4">{{ stat.label }}</p>
              <h3 class="text-5xl font-mono font-bold tracking-tighter">{{ stat.value }}</h3>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class HeroSectionComponent {
  stats = signal([
    { label: 'Interactions Ankama', value: '130M+' },
    { label: 'Total Users', value: '250K+' }
  ]);
}
