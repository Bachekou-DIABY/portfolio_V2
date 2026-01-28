import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSectionComponent } from './components/profile-section/profile-section';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher';
import { RecommendationsSectionComponent } from './components/recommendations-section/recommendations-section';
import { SkillsSectionComponent } from './components/skills-section/skills-section';
import { ProjectsSectionComponent } from './components/projects-section/projects-section';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';
import { ContactSectionComponent } from './components/contact-section/contact-section';
import { ProjectModalComponent } from './components/projects-section/project-modal';
import { LabSectionComponent } from './components/projects-section/lab-section';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProfileSectionComponent,
    LanguageSwitcherComponent,
    RecommendationsSectionComponent,
    SkillsSectionComponent,
    ThemeToggleComponent,
    ProjectsSectionComponent,
    LabSectionComponent,
    ProjectModalComponent,
    ContactSectionComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
