import type { Language, Region } from "./locale";

/**
 * Company configuration per region
 */
export interface CompanyConfig {
    name: string;
    legalName: string;
    country: string;
}

/**
 * Currency configuration
 */
export interface CurrencyConfig {
    code: string; // ISO 4217 currency code (USD, THB)
    symbol: string; // $, ฿
    locale: string; // For number formatting (en-US, th-TH)
}

/**
 * Pricing configuration per region
 */
export interface PricingConfig {
    starter: number;
    professional: number;
    enterprise: number;
}

/**
 * Regional configuration (region-specific, language-agnostic)
 * These values are the same regardless of language
 */
export interface RegionalConfig {
    company: CompanyConfig;
    currency: CurrencyConfig;
    pricing: PricingConfig;
}

/**
 * Content that can be translated
 * This is where all your translatable strings go
 */
export interface ContentConfig {
    // Common
    common: {
        learnMore: string;
        getStarted: string;
        getStartedFree: string;
        contactUs: string;
        signUp: string;
        signIn: string;
        logIn: string;
        readMore: string;
        comingSoon: string;
        watchDemo: string;
        bookDemo: string;
    };

    // Navigation
    nav: {
        home: string;
        features: string;
        caseStudies: string;
        pricing: string;
        faqs: string;
        contact: string;
        products: string;
        services: string;
        resources: string;
        about: string;
        aboutUs: string;
        press: string;
        careers: string;
        legal: string;
        support: string;
        sitemap: string;
        cookieSettings: string;
    };

    // Hero section
    hero: {
        title: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };

    // Social Proof
    socialProof: {
        text: string;
    };

    // Why Section (Features Icons and Image 03)
    why: {
        badge: string;
        title: string;
        subtitle: string;
        guestOrdering: {
            title: string;
            description: string;
        };
        operatorPlatform: {
            title: string;
            description: string;
        };
    };

    // Built For Section (Features Icons and Image 02)
    builtFor: {
        badge: string;
        title: string;
        subtitle: string;
        multiVenue: {
            title: string;
            description: string;
        };
        highVolume: {
            title: string;
            description: string;
        };
        qualityFocused: {
            title: string;
            description: string;
        };
    };

    // Metrics Section
    metrics: {
        title: string;
        subtitle: string;
        smallerTeams: {
            value: string;
            label: string;
            description: string;
        };
        higherAov: {
            value: string;
            label: string;
            description: string;
        };
        fasterDelivery: {
            value: string;
            label: string;
            description: string;
        };
        satisfaction: {
            value: string;
            label: string;
            description: string;
        };
    };

    // Complete Platform Section (Features Icons and Mockup)
    completePlatform: {
        badge: string;
        title: string;
        subtitle: string;
        qrPos: {
            title: string;
            description: string;
        };
        inventory: {
            title: string;
            description: string;
        };
        staffAutomation: {
            title: string;
            description: string;
        };
        loyalty: {
            title: string;
            description: string;
        };
    };

    // How It Works Section (Alternating Layout)
    howItWorks: {
        badge: string;
        title: string;
        subtitle: string;
        guestOrdering: {
            title: string;
            description: string;
            features: [string, string, string];
        };
        kitchen: {
            title: string;
            description: string;
            features: [string, string, string];
        };
        staff: {
            title: string;
            description: string;
            features: [string, string, string];
        };
        customerLoyalty: {
            title: string;
            description: string;
            features: [string, string, string];
        };
    };

    // Pricing Section
    pricingSection: {
        badge: string;
        title: string;
        subtitle: string;
        starter: {
            title: string;
            description: string;
            features: [string, string, string, string, string, string, string, string, string];
        };
        professional: {
            title: string;
            description: string;
            features: [string, string, string, string];
        };
        enterprise: {
            title: string;
            description: string;
            features: [string, string, string, string, string];
        };
    };

    // Testimonials
    testimonials: {
        reviews: Array<{
            quote: string;
            author: {
                name: string;
                title: string;
            };
        }>;
    };

    // Features Page
    features: {
        page: {
            badge: string;
            title: string;
            subtitle: string;
        };
    };

    // Pricing Page
    pricing: {
        page: {
            badge: string;
            title: string;
            subtitle: string;
        };
        table: {
            tiers: {
                starter: {
                    name: string;
                    description: string;
                };
                professional: {
                    name: string;
                    description: string;
                };
                enterprise: {
                    name: string;
                    description: string;
                };
            };
            sections: {
                ordering: {
                    name: string;
                    features: {
                        qrOrdering: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        pos: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        inAppPayments: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        thirdPartyPayments: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                    };
                };
                operations: {
                    name: string;
                    features: {
                        analytics: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        inventory: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        dietary: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        advancedAnalytics: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                    };
                };
                customer: {
                    name: string;
                    features: {
                        feedback: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        discounts: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        loyalty: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                    };
                };
                staff: {
                    name: string;
                    features: {
                        taskManagement: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        performance: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        roster: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                        issues: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                    };
                };
                integrations: {
                    name: string;
                    features: {
                        customIntegrations: {
                            name: string;
                            tooltip: {
                                title: string;
                                description: string;
                            };
                        };
                    };
                };
            };
        };
    };

    // Case Studies
    caseStudies: {
        page: {
            badge: string;
            title: string;
            subtitle: string;
        };
        sunsetClub: {
            badge: string;
            title: string;
            imageUrl: string;
            author: {
                name: string;
                title: string;
                company: string;
            };
            sections: [string, string];
            outcomes: {
                title: string;
                description: string;
            };
            ctaPrimary: string;
            ctaSecondary: string;
        };
        gardenCafe: {
            badge: string;
            title: string;
            imageUrl: string;
            author: {
                name: string;
                title: string;
                company: string;
            };
            sections: [string, string];
            outcomes: {
                title: string;
                description: string;
            };
            ctaPrimary: string;
            ctaSecondary: string;
        };
        baanCoffee: {
            badge: string;
            title: string;
            imageUrl: string;
            author: {
                name: string;
                title: string;
                company: string;
            };
            sections: [string, string];
            outcomes: {
                title: string;
                description: string;
            };
            ctaPrimary: string;
            ctaSecondary: string;
        };
    };

    // CTA Section
    cta: {
        badge: string;
        title: string;
        titleMobile: string;
        subtitle: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };

    // Footer
    footer: {
        description: string;
        product: {
            label: string;
            features: string;
            pricing: string;
            integrations: string;
            demo: string;
            demoBadge: string;
            useCases: string;
            caseStudies: string;
        };
        company: {
            label: string;
            about: string;
            contact: string;
            support: string;
            documentation: string;
            partnerProgram: string;
            careers: string;
        };
        legal: {
            terms: string;
            privacy: string;
            cookies: string;
        };
        copyright: string;
    };
}

/**
 * Complete i18n configuration combining regional and content
 */
export interface I18nConfig {
    regional: RegionalConfig;
    content?: ContentConfig; // Optional - only needed if using translations
}

/**
 * Locale key type for type safety
 */
export type LocaleKey = `${Region}-${Language}`;

/**
 * Helper type for nested object paths (for type-safe translations)
 */
export type NestedKeyOf<T> = T extends object
    ? {
          [K in keyof T]: K extends string ? `${K}` | `${K}.${NestedKeyOf<T[K]>}` : never;
      }[keyof T]
    : never;

/**
 * Type-safe translation key
 */
export type TranslationKey = NestedKeyOf<ContentConfig>;
