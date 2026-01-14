import { Injectable, signal, effect, computed } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLanguage = signal<'fr' | 'en'>('fr');
    private translations = signal<any>({});

    lang = computed(() => this.currentLanguage());

    constructor() {
        // Load initial translations
        this.loadTranslations(this.currentLanguage());

        // Automatically load translations when language changes
        effect(() => {
            this.loadTranslations(this.currentLanguage());
        });

        // Try to load from localStorage
        const savedLang = localStorage.getItem('lang') as 'fr' | 'en';
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            this.currentLanguage.set(savedLang);
        }
    }

    async loadTranslations(lang: 'fr' | 'en') {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            const data = await response.json();
            this.translations.set(data);
        } catch (error) {
            console.error(`Could not load translations for ${lang}`, error);
        }
    }

    setLanguage(lang: 'fr' | 'en') {
        this.currentLanguage.set(lang);
        localStorage.setItem('lang', lang);
    }

    translate(key: string): string {
        const keys = key.split('.');
        let result = this.translations();
        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return key; // Return key if translation not found
            }
        }
        return typeof result === 'string' ? result : key;
    }

    // Helper for templates
    t = computed(() => (key: string) => this.translate(key));
}
