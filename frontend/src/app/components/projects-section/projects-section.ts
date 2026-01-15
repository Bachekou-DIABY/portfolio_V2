import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Experience } from '../../services/project.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-24 bg-bg text-text-main px-8 transition-colors duration-300">
      <div class="max-w-6xl mx-auto">
        <header class="mb-16">
          <h2 class="text-4xl font-black tracking-tight mb-4">
            {{ ls.t()('PROJECTS.TITLE') }}
          </h2>
          <p class="text-xl text-text-dim max-w-2xl">
            {{ ls.t()('PROJECTS.SUBTITLE') }}
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let project of projects()" 
               [class.lg:col-span-2]="project.featured"
               [class.border-text-main]="project.featured"
               class="group relative bg-bg border border-border rounded-3xl overflow-hidden transition-all hover:border-text-dim hover:shadow-2xl flex flex-col">
            
            <!-- Project Image fallback or carousel first img -->
            <div [class.aspect-video]="!project.featured" 
                 [class.aspect-[2/1]]="project.featured"
                 class="bg-bg border-b border-border overflow-hidden flex items-center justify-center relative">
              <img *ngIf="project.images?.length" 
                   [src]="project.images![0]" 
                   [alt]="ls.t()(project.title)" 
                   class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
              <div *ngIf="!project.images?.length" class="text-text-dim font-black text-4xl italic uppercase opacity-20">
                {{ project.company }}
              </div>
              
              <!-- Badge Overlay Period -->
              <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-bg/80 backdrop-blur-md border border-border text-[10px] font-bold tracking-widest text-text-dim uppercase">
                {{ ls.t()(project.period) }}
              </div>

              <!-- Project Type Badge -->
              <div *ngIf="project.type" 
                   class="absolute top-4 left-4 px-3 py-1 rounded-full bg-text-main text-bg text-[10px] font-bold tracking-widest uppercase shadow-lg">
                {{ ls.t()('SKILLS.TYPE.' + (project.type?.toUpperCase() || '')) }}
              </div>
            </div>

            <div class="p-8 space-y-4 flex-1 flex flex-col">
              <div class="flex-1">
                <div class="flex items-start justify-between mb-2">
                  <h3 [class.text-3xl]="project.featured"
                      [class.text-2xl]="!project.featured"
                      class="font-bold tracking-tight group-hover:text-text-main">
                    {{ ls.t()(project.title) }}
                  </h3>
                </div>
                <p class="text-sm font-bold text-text-dim uppercase tracking-widest mb-4">
                  {{ project.company }}
                </p>
                <p class="text-text-dim leading-relaxed" [class.line-clamp-3]="!project.featured">
                  {{ ls.t()(project.description) }}
                </p>
              </div>

              <div class="pt-6 flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all mt-auto">
                <span class="text-text-main">Voir les détails</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ProjectsSectionComponent implements OnInit {
  projectService = inject(ProjectService);
  ls = inject(LanguageService);

  projects = signal<Experience[]>([]);

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects);
    });
  }
}
