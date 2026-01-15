import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Experience } from '../../services/project.service';
import { LanguageService } from '../../services/language.service';
import { ProjectCardComponent } from './project-card';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  template: `
    <section class="py-24 bg-bg text-text-main px-8 transition-colors duration-300">
      <div class="max-w-[1440px] mx-auto">
        <header class="mb-16">
          <h2 class="text-4xl font-black tracking-tight mb-4">
            {{ ls.t()('PROJECTS.TITLE') }}
          </h2>
          <p class="text-xl text-text-dim max-w-2xl">
            {{ ls.t()('PROJECTS.SUBTITLE') }}
          </p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <app-project-card 
            *ngFor="let project of projects()" 
            [project]="project"
            [class.md:col-span-2]="project.featured"
            [class.lg:col-span-3]="project.featured">
          </app-project-card>
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
