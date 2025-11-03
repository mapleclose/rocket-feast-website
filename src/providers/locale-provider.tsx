"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language, LocaleConfig, Region } from "@/types/locale";
import { ALL_LOCALE_OPTIONS, LOCALE_CONFIGS } from "@/types/locale";

interface LocaleContextValue {
    locale: LocaleConfig;
    setLocale: (region: Region, language: Language) => void;
    isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = "user-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<LocaleConfig>(LOCALE_CONFIGS.global[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        async function detectLocale() {
            try {
                // First check if user has a saved preference
                const savedLocale = localStorage.getItem(STORAGE_KEY);
                if (savedLocale) {
                    const parsed = JSON.parse(savedLocale) as LocaleConfig;
                    const found = ALL_LOCALE_OPTIONS.find(
                        (opt) => opt.region === parsed.region && opt.language === parsed.language,
                    );
                    if (found) {
                        setLocaleState(found);
                        setIsLoading(false);
                        return;
                    }
                }

                // If no saved preference, detect based on IP
                const response = await fetch("/api/geo");
                const data = await response.json();

                // Get default language for detected region
                const regionLocales = LOCALE_CONFIGS[data.region as Region];
                if (regionLocales && regionLocales.length > 0) {
                    // Default to English if available, otherwise first option
                    const defaultLocale = regionLocales.find((l) => l.language === "en") || regionLocales[0];
                    setLocaleState(defaultLocale);
                }
            } catch (error) {
                console.error("Failed to detect locale:", error);
                // Keep default global English locale
            } finally {
                setIsLoading(false);
            }
        }

        detectLocale();
    }, [isMounted]);

    const setLocale = (region: Region, language: Language) => {
        const newLocale = ALL_LOCALE_OPTIONS.find((opt) => opt.region === region && opt.language === language);
        if (newLocale) {
            setLocaleState(newLocale);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newLocale));
        }
    };

    return <LocaleContext.Provider value={{ locale, setLocale, isLoading }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error("useLocale must be used within LocaleProvider");
    }
    return context;
}
