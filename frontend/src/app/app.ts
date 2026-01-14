import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileSectionComponent } from './components/profile-section/profile-section';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileSectionComponent, LanguageSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
