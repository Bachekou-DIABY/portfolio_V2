import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  template: `
    <section class="py-24 bg-bg text-text-main px-8 border-t border-border transition-colors duration-300">
      <div class="max-w-[1440px] mx-auto">
        <h2 class="text-3xl font-bold mb-16 tracking-tight">{{ ls.t()('SKILLS.TITLE') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          @for (category of skillCategories(); track category.id) {
            <div class="space-y-6">
              <h3 class="text-text-dim text-xs font-bold uppercase tracking-widest">
                {{ ls.t()('SKILLS.' + category.id) }}
              </h3>
              <ul class="space-y-4">
                @for (skill of category.skills; track skill) {
                  <li class="flex items-center gap-3 group">
                    <div class="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-text-main transition-colors"></div>
                    <span class="text-text-dim group-hover:text-text-main transition-colors font-medium">{{ skill }}</span>
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class SkillsSectionComponent {
  ls = inject(LanguageService);

  skillCategories = signal([
    {
      id: 'FRONTEND',
      skills: ['HTML/CSS/JS', 'Angular', 'TypeScript', 'Tailwind CSS', 'Responsive Design']
    },
    {
      id: 'BACKEND',
      skills: ['NestJS', 'Node.Js', 'Express.Js', 'Symfony', 'MongoDB', 'PostgreSQL']
    },
    {
      id: 'DEVOPS',
      skills: ['Docker', 'AWS', 'Git / Github', 'Gitlab', 'CI/CD', 'Cloudflare', 'Redis', 'Jest', 'Swagger']
    }
  ]);
}
