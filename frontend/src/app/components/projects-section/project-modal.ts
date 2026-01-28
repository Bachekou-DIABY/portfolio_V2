import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ModalService } from '../../services/modal.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="modalService.isOpen()" 
         class="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 animate-in fade-in duration-300">
      
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-bg/80 backdrop-blur-xl" (click)="close()"></div>

      <!-- Modal Content -->
      <div class="relative w-full max-w-7xl bg-bg border border-border rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 delay-100">
        
        <!-- Close Button (Absolute Mobile) -->
        <button (click)="close()" class="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-bg/40 backdrop-blur-md border border-border flex items-center justify-center text-text-main hover:bg-text-main hover:text-bg transition-all lg:hidden">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <!-- Left: Image Gallery -->
        <div class="w-full lg:w-3/5 h-[40vh] lg:h-auto bg-[#08090a] relative group/modal-media">
          <ng-container *ngIf="project()?.images?.length; else noImage">
            <div class="w-full h-full overflow-hidden flex items-center justify-center">
               <div class="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" 
                   [style.transform]="'translateX(-' + currentIndex() * 100 + '%)'">
                <img *ngFor="let img of project()?.images" 
                     [src]="projectService.getImageUrl(img)" 
                     class="min-w-full h-full object-contain p-4 lg:p-12 rounded-[60px] drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              </div>
            </div>

            <!-- Navigation -->
            <ng-container *ngIf="project()!.images!.length > 1">
              <div class="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover/modal-media:opacity-100 transition-opacity pointer-events-none">
                <button (click)="prev($event)" class="w-12 h-12 rounded-full bg-bg/40 backdrop-blur-md border border-border flex items-center justify-center text-text-main pointer-events-auto hover:bg-text-main hover:text-bg transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button (click)="next($event)" class="w-12 h-12 rounded-full bg-bg/40 backdrop-blur-md border border-border flex items-center justify-center text-text-main pointer-events-auto hover:bg-text-main hover:text-bg transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>

              <!-- Indicators -->
              <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-bg/20 backdrop-blur-md">
                <div *ngFor="let img of project()?.images; let i = index" 
                     [class.bg-text-main]="currentIndex() === i"
                     [class.bg-text-main/20]="currentIndex() !== i"
                     class="w-2 h-2 rounded-full transition-all duration-300"
                     [class.w-6]="currentIndex() === i">
                </div>
              </div>
            </ng-container>
          </ng-container>

          <ng-template #noImage>
            <div class="w-full h-full flex items-center justify-center text-text-dim text-6xl font-black italic opacity-10 uppercase tracking-tighter">
              {{ ls.t()(project()?.company || '') }}
            </div>
          </ng-template>
        </div>

        <!-- Right: Project Info -->
        <div class="w-full lg:w-2/5 p-8 lg:p-16 overflow-y-auto flex flex-col bg-bg border-l border-border relative">
          <!-- Close Button (Desktop) -->
          <button (click)="close()" class="hidden lg:flex absolute top-12 right-12 w-12 h-12 rounded-full bg-bg border border-border items-center justify-center text-text-main hover:bg-text-main hover:text-bg transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <div class="space-y-12">
            <!-- Header -->
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <span class="px-4 py-1.5 rounded-full bg-text-main text-bg text-[10px] font-bold tracking-widest uppercase">
                  {{ ls.t()('SKILLS.TYPE.' + (project()?.type?.toUpperCase() || '')) }}
                </span>
                <span class="text-sm font-bold text-text-dim uppercase tracking-widest">
                  {{ ls.t()(project()?.period || '') }}
                </span>
              </div>
              <div class="space-y-2">
                <h4 class="text-lg font-bold text-text-dim uppercase tracking-widest">{{ ls.t()(project()?.company || '') }}</h4>
                <h2 class="text-4xl font-black tracking-tight leading-none">{{ ls.t()(project()?.title || '') }}</h2>
              </div>
            </div>

            <!-- Description -->
            <div class="space-y-6">
              <h3 class="text-xs font-bold text-text-dim uppercase tracking-widest">{{ ls.t()('MODAL.ABOUT') }}</h3>
              <p class="text-lg text-text-main leading-relaxed whitespace-pre-wrap" 
                 [innerHTML]="project()?.longDescription ? ls.t()(project()?.longDescription!) : ls.t()(project()?.description || '')">
              </p>
            </div>

            <!-- Technologies -->
            <div *ngIf="project()?.technologies?.length" class="space-y-6">
              <h3 class="text-xs font-bold text-text-dim uppercase tracking-widest">{{ ls.t()('MODAL.TECH') }}</h3>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let tech of project()?.technologies" 
                      [ngStyle]="getTechStyles(tech)"
                      class="px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wider border transition-all hover:scale-110">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Impact (if multiple/different from card) -->
            <div *ngIf="project()?.impact?.length" class="space-y-6">
              <h3 class="text-xs font-bold text-text-dim uppercase tracking-widest">{{ ls.t()('MODAL.IMPACT') }}</h3>
              <div class="grid grid-cols-2 gap-4">
                <div *ngFor="let item of project()?.impact" class="p-6 rounded-3xl bg-bg border border-border">
                  <p class="text-[10px] font-bold text-text-dim uppercase tracking-widest mb-1">{{ item.label }}</p>
                  <p class="text-3xl font-mono font-bold">{{ item.value }}+</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sticky CTA maybe? -->
          <div class="pt-12 mt-auto">
             <button (click)="close()" class="w-full py-5 rounded-3xl bg-text-main text-bg font-bold text-lg hover:scale-[1.02] transition-all shadow-xl">
               {{ ls.t()('MODAL.CLOSE') }}
             </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectModalComponent {
  modalService = inject(ModalService);
  ls = inject(LanguageService);
  projectService = inject(ProjectService);

  project = this.modalService.activeProject;
  currentIndex = signal(0);

  // Reset index when project changes
  constructor() {
    effect(() => {
      if (this.project()) {
        this.currentIndex.set(0);
      }
    });
  }

  close() {
    this.modalService.close();
  }

  next(event: Event) {
    event.stopPropagation();
    if (this.project()?.images?.length) {
      this.currentIndex.set((this.currentIndex() + 1) % this.project()!.images!.length);
    }
  }

  prev(event: Event) {
    event.stopPropagation();
    if (this.project()?.images?.length) {
      this.currentIndex.set((this.currentIndex() - 1 + this.project()!.images!.length) % this.project()!.images!.length);
    }
  }

  getTechStyles(tech: string) {
    const colors: Record<string, { bg: string, text: string, border: string }> = {
      'Angular': { bg: 'rgba(221, 0, 49, 0.1)', text: '#dd0031', border: 'rgba(221, 0, 49, 0.2)' },
      'NestJS': { bg: 'rgba(224, 35, 78, 0.1)', text: '#e0234e', border: 'rgba(224, 35, 78, 0.2)' },
      'TypeScript': { bg: 'rgba(49, 120, 198, 0.1)', text: '#3178c6', border: 'rgba(49, 120, 198, 0.2)' },
      'PostgreSQL': { bg: 'rgba(51, 103, 145, 0.1)', text: '#336791', border: 'rgba(51, 103, 145, 0.2)' },
      'Docker': { bg: 'rgba(36, 150, 237, 0.1)', text: '#2496ed', border: 'rgba(36, 150, 237, 0.2)' },
      'AWS': { bg: 'rgba(255, 153, 0, 0.1)', text: '#ff9900', border: 'rgba(255, 153, 0, 0.2)' },
      'AWS Lambda': { bg: 'rgba(255, 153, 0, 0.1)', text: '#ff9900', border: 'rgba(255, 153, 0, 0.2)' },
      'Symfony': { bg: 'rgba(0, 0, 0, 0.1)', text: 'var(--text-main)', border: 'rgba(0, 0, 0, 0.2)' },
      'PHP': { bg: 'rgba(119, 123, 179, 0.1)', text: '#777bb3', border: 'rgba(119, 123, 179, 0.2)' },
      'MySQL': { bg: 'rgba(0, 117, 143, 0.1)', text: '#00758f', border: 'rgba(0, 117, 143, 0.2)' },
      'MongoDB': { bg: 'rgba(71, 162, 72, 0.1)', text: '#47a248', border: 'rgba(71, 162, 72, 0.2)' },
      'Node.js': { bg: 'rgba(51, 153, 51, 0.1)', text: '#339933', border: 'rgba(51, 153, 51, 0.2)' },
      'HTML/CSS': { bg: 'rgba(227, 79, 38, 0.1)', text: '#e34f26', border: 'rgba(227, 79, 38, 0.2)' },
      'Redis': { bg: 'rgba(220, 53, 34, 0.1)', text: '#dc3522', border: 'rgba(220, 53, 34, 0.2)' },
      'Cloudflare': { bg: 'rgba(246, 133, 27, 0.1)', text: '#f6851b', border: 'rgba(246, 133, 27, 0.2)' },
      'Flutter': { bg: 'rgba(2, 125, 247, 0.1)', text: '#027df7', border: 'rgba(2, 125, 247, 0.2)' },
      'JavaScript': { bg: 'rgba(247, 223, 30, 0.1)', text: '#f7df1e', border: 'rgba(247, 223, 30, 0.2)' }
    };

    const config = colors[tech] || { bg: 'rgba(var(--text-dim-rgb), 0.05)', text: 'var(--text-dim)', border: 'var(--border)' };
    return {
      'background-color': config.bg,
      'color': config.text,
      'border-color': config.border
    };
  }
}
