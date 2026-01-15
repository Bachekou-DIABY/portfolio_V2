import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../services/project.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-project-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class.lg:flex-row]="project.featured"
         [class.border-text-main]="project.featured"
         class="group relative bg-bg border border-border rounded-4xl overflow-hidden transition-all hover:border-text-dim hover:shadow-2xl flex flex-col h-full">
      
      <!-- Project Media (Carousel) -->
      <div [class.aspect-video]="!project.featured" 
           [class.aspect-[16/10]]="project.featured"
           [class.lg:w-1/2]="project.featured"
           [class.lg:aspect-auto]="project.featured"
           class="bg-[#08090a] border-b lg:border-b-0 lg:border-r border-border overflow-hidden flex items-center justify-center relative group/media">
        
        <!-- Multi-image Carousel -->
        <ng-container *ngIf="project.images?.length; else noImage">
          <div class="relative w-full h-full overflow-hidden">
            <div class="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" 
                 [style.transform]="'translateX(-' + currentIndex() * 100 + '%)'">
              <img *ngFor="let img of project.images" 
                   [src]="img" 
                   [alt]="ls.t()(project.title)" 
                   class="min-w-full h-full transition-transform duration-700"
                   [class.object-contain]="project.featured"
                   [class.object-cover]="!project.featured">
            </div>
          </div>

          <!-- Navigation Arrows (only if multiple images) -->
          <div *ngIf="project.images!.length > 1" 
               class="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button (click)="prev($event)" class="w-10 h-10 rounded-full bg-bg/80 border border-border flex items-center justify-center text-text-main backdrop-blur-md pointer-events-auto hover:bg-text-main hover:text-bg transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button (click)="next($event)" class="w-10 h-10 rounded-full bg-bg/80 border border-border flex items-center justify-center text-text-main backdrop-blur-md pointer-events-auto hover:bg-text-main hover:text-bg transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <!-- Dots Overlay -->
          <div *ngIf="project.images!.length > 1" class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-bg/40 backdrop-blur-sm">
            <div *ngFor="let img of project.images; let i = index" 
                 [class.bg-text-main]="currentIndex() === i"
                 [class.bg-text-main/20]="currentIndex() !== i"
                 class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                 [class.w-4]="currentIndex() === i">
            </div>
          </div>
        </ng-container>

        <ng-template #noImage>
          <div class="text-text-dim font-black text-4xl italic uppercase opacity-20">
            {{ project.company }}
          </div>
        </ng-template>
        
        <!-- Badge Overlay Period (Top Right) -->
        <div class="absolute top-6 right-6 px-4 py-2 rounded-full bg-bg/80 backdrop-blur-md border border-border text-[10px] font-bold tracking-widest text-text-dim uppercase">
          {{ ls.t()(project.period) }}
        </div>

        <!-- Project Type Badge (Top Left) -->
        <div *ngIf="project.type" 
             class="absolute top-6 left-6 px-4 py-2 rounded-full bg-text-main text-bg text-[10px] font-bold tracking-widest uppercase shadow-lg">
          {{ ls.t()('SKILLS.TYPE.' + project.type.toUpperCase()) }}
        </div>
      </div>

      <!-- Content -->
      <div class="p-8 lg:p-10 space-y-6 flex-1 flex flex-col justify-center">
        <div class="flex-1 space-y-4">
          <div class="space-y-2">
            <p class="text-sm font-bold text-text-dim uppercase tracking-widest">
              {{ project.company }}
            </p>
            <h3 [class.text-3xl]="project.featured"
                [class.text-2xl]="!project.featured"
                class="font-black tracking-tight group-hover:text-text-main transition-colors">
              {{ ls.t()(project.title) }}
            </h3>
          </div>
          
          <p class="text-text-dim leading-relaxed text-lg" [class.line-clamp-3]="!project.featured">
            {{ ls.t()(project.description) }}
          </p>

          <!-- Impact Statistics -->
          <div *ngIf="project.impact && project.impact.length > 0" 
               class="flex flex-wrap gap-3 pt-2">
            <div *ngFor="let item of project.impact" 
                 class="px-4 py-3 rounded-2xl bg-bg border border-border hover:border-text-main transition-colors group/stat">
              <p class="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-0.5 group-hover/stat:text-text-main transition-colors">{{ item.label }}</p>
              <p class="text-xl font-mono font-bold">{{ item.value }}+</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="pt-8 flex items-center gap-3 text-sm font-bold group-hover:gap-5 transition-all mt-auto group/btn">
          <span class="text-text-main">Voir les détails</span>
          <div class="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover/btn:bg-text-main group-hover/btn:text-bg transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class ProjectCardComponent {
    @Input({ required: true }) project!: Experience;

    ls = inject(LanguageService);
    currentIndex = signal(0);

    next(event: Event) {
        event.stopPropagation();
        if (this.project.images?.length) {
            this.currentIndex.set((this.currentIndex() + 1) % this.project.images.length);
        }
    }

    prev(event: Event) {
        event.stopPropagation();
        if (this.project.images?.length) {
            this.currentIndex.set((this.currentIndex() - 1 + this.project.images.length) % this.project.images.length);
        }
    }
}
