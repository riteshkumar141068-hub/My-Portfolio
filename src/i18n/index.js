import { en } from './en';
import { hi } from './hi';

export const locales = { en, hi };
export const localeList = [
    { code: 'en', name: 'English', flag: '/flags/en.svg' },
    { code: 'hi', name: 'हिन्दी', flag: '/flags/in.svg' },
];

/**
 * Detect browser language and return matching locale code
 */
export function detectLocale() {
    if (typeof navigator === 'undefined') return 'en';
    const lang = navigator.language || navigator.languages?.[0] || 'en';
    const code = lang.split('-')[0].toLowerCase();
    if (code === 'hi') return 'hi';
    return 'en';
}

/**
 * Get nested translation value by dot-path key
 * e.g. t('hero.greeting') → locales[locale].hero.greeting
 */
export function getTranslation(locale, key) {
    const keys = key.split('.');
    let value = locales[locale];
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English
            let fallback = locales.en;
            for (const fk of keys) {
                if (fallback && typeof fallback === 'object' && fk in fallback) {
                    fallback = fallback[fk];
                } else {
                    return key;
                }
            }
            return fallback;
        }
    }
    return value;
}
