import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSectionComponent } from './components/profile-section/profile-section';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher';
import { FeaturedProjectComponent } from './components/featured-project/featured-project';
import { RecommendationsSectionComponent } from './components/recommendations-section/recommendations-section';
import { SkillsSectionComponent } from './components/skills-section/skills-section';
import { ProjectsSectionComponent } from './components/projects-section/projects-section';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';
import { ContactSectionComponent } from './components/contact-section/contact-section';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProfileSectionComponent,
    LanguageSwitcherComponent,
    FeaturedProjectComponent,
    RecommendationsSectionComponent,
    SkillsSectionComponent,
    ThemeToggleComponent,
    ProjectsSectionComponent,
    ContactSectionComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
