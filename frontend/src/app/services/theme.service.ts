import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private theme = signal<'light' | 'dark'>('dark');

    isDark = this.theme;

    constructor() {
        // Try to load from localStorage
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
            this.theme.set(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            this.theme.set('light');
        }

        // Effect to sync with DOM and localStorage
        effect(() => {
            const current = this.theme();
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(current);
            localStorage.setItem('theme', current);
        });
    }

    toggleTheme() {
        this.theme.update(t => t === 'light' ? 'dark' : 'light');
    }

    setTheme(theme: 'light' | 'dark') {
        this.theme.set(theme);
    }
}
