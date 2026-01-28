import { Component, inject, signal, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Experience } from '../../services/project.service';
import { LanguageService } from '../../services/language.service';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-lab-section',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="py-24 bg-bg text-text-main px-8 border-t border-border/50 transition-colors duration-300 overflow-hidden">
      <div class="max-w-[1440px] mx-auto">
        <header class="mb-12 flex justify-between items-end">
          <div class="space-y-3">
            <h2 class="text-3xl font-black tracking-tight">
              {{ ls.t()('LAB.TITLE') || 'Le Lab' }}
            </h2>
            <p class="text-lg text-text-dim max-w-2xl">
              {{ ls.t()('LAB.SUBTITLE') || 'Une collection de projets académiques et personnels qui ont jalonné mon parcours.' }}
            </p>
          </div>
          
          <!-- Desktop Navigation Arrows -->
          <div class="hidden lg:flex gap-3 mb-2">
            <button (click)="scroll('left')" 
                    class="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-main hover:bg-text-main hover:text-bg transition-all active:scale-95 shadow-lg group">
              <svg class="transition-transform group-active:-translate-x-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button (click)="scroll('right')" 
                    class="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-main hover:bg-text-main hover:text-bg transition-all active:scale-95 shadow-lg group">
              <svg class="transition-transform group-active:translate-x-1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </header>

        <!-- Horizontal Scroll Container -->
        <div class="relative">
          <div #scrollContainer class="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            <div *ngFor="let project of projects()" 
                 class="min-w-[320px] sm:min-w-[420px] snap-start">
              <div class="group/card bg-bg border border-border/60 rounded-3xl h-full flex flex-col hover:border-text-main/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-2 relative overflow-hidden">
                
                <!-- Project Image Thumbnail -->
                <div class="h-48 overflow-hidden bg-[#0a0b0c] relative">
                  <ng-container *ngIf="project.images?.length; else noImg">
                    <img [src]="projectService.getImageUrl(project.images![0])" 
                         [alt]="ls.t()(project.title)"
                         class="w-full h-full object-cover opacity-60 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700">
                  </ng-container>
                  <ng-template #noImg>
                    <div class="w-full h-full flex items-center justify-center opacity-20 italic font-black uppercase tracking-tighter text-2xl">
                      {{ ls.t()(project.company) }}
                    </div>
                  </ng-template>
                  <div class="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent"></div>
                  
                  <!-- Floating Badge -->
                  <span *ngIf="project.type" class="absolute top-4 right-4 px-3 py-1 rounded-full bg-text-main/10 backdrop-blur-md text-text-main text-[9px] font-bold uppercase tracking-widest border border-text-main/20">
                    {{ ls.t()('SKILLS.TYPE.' + project.type.toUpperCase()) }}
                  </span>
                </div>

                <div class="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div class="space-y-4">
                    <div class="flex justify-between items-start">
                      <span class="text-[10px] font-bold text-text-dim/60 uppercase tracking-widest">
                        {{ ls.t()(project.period) }}
                      </span>
                    </div>
                    <h3 class="text-2xl font-black tracking-tight group-hover/card:text-text-main transition-colors duration-300">
                      {{ ls.t()(project.title) }}
                    </h3>
                    <p class="text-text-dim text-sm line-clamp-2 leading-relaxed">
                      {{ ls.t()(project.description) }}
                    </p>
                  </div>

                  <div class="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                    <div class="flex flex-wrap gap-1.5 max-w-[70%]">
                      <span *ngFor="let tech of project.technologies | slice:0:3" 
                            [ngStyle]="getTechStyles(tech)"
                            class="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border transition-all hover:scale-110">
                        {{ tech }}
                      </span>
                    </div>
                    <button (click)="openProject(project)" 
                            class="group/btn inline-flex items-center gap-2 text-xs font-bold text-text-main transition-all">
                      <span>{{ ls.t()('LAB.VIEW') || 'Détails' }}</span>
                      <svg class="transition-transform group-hover/btn:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
export class LabSectionComponent implements OnInit {
    @ViewChild('scrollContainer') scrollContainer!: ElementRef;

    projectService = inject(ProjectService);
    ls = inject(LanguageService);
    modalService = inject(ModalService);

    projects = signal<Experience[]>([]);

    ngOnInit() {
        this.projectService.getProjects().subscribe(projects => {
            this.projects.set(projects.filter(p => !p.featured));
        });
    }

    scroll(direction: 'left' | 'right') {
        const container = this.scrollContainer.nativeElement;
        const scrollAmount = direction === 'left' ? -420 : 420;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    openProject(project: Experience) {
        this.modalService.open(project);
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
            'JavaScript': { bg: 'rgba(247, 223, 30, 0.1)', text: '#b59a00', border: 'rgba(247, 223, 30, 0.2)' }
        };

        const config = colors[tech] || { bg: 'rgba(var(--text-dim-rgb), 0.05)', text: 'var(--text-dim)', border: 'var(--border)' };
        return {
            'background-color': config.bg,
            'color': config.text,
            'border-color': config.border
        };
    }
}
