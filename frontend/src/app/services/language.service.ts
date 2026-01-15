import { Injectable, signal, effect, computed } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLanguage = signal<'fr' | 'en'>('fr');
    private translations = signal<any>({});
    private translationsCache: { fr?: any; en?: any } = {};

    lang = computed(() => this.currentLanguage());

    constructor() {
        // Preload both languages for instant switching
        this.preloadTranslations();

        // Try to load from localStorage
        const savedLang = localStorage.getItem('lang') as 'fr' | 'en';
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            this.currentLanguage.set(savedLang);
        }

        // Update translations when language changes
        effect(() => {
            const lang = this.currentLanguage();
            if (this.translationsCache[lang]) {
                this.translations.set(this.translationsCache[lang]);
            }
        });
    }

    async preloadTranslations() {
        try {
            // Load both languages in parallel
            const [frData, enData] = await Promise.all([
                fetch('./i18n/fr.json').then(r => r.json()),
                fetch('./i18n/en.json').then(r => r.json())
            ]);

            this.translationsCache.fr = frData;
            this.translationsCache.en = enData;

            // Set initial translations
            this.translations.set(this.translationsCache[this.currentLanguage()]);
        } catch (error) {
            console.error('Could not preload translations', error);
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
