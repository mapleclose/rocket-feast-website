import type { I18nConfig, LocaleKey } from "@/types/i18n";
import type { Language, Region } from "@/types/locale";
import { globalEnConfig } from "./global-en";
import { thEnConfig } from "./th-en";
import { thThConfig } from "./th-th";

/**
 * All locale configurations
 * Add new locales here as needed
 */
const localeConfigs: Record<string, Partial<I18nConfig>> = {
    "global-en": globalEnConfig,
    "th-en": thEnConfig,
    "th-th": thThConfig,
};

/**
 * Deep merge utility that handles nested objects
 * Creates new object references to ensure React detects changes
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
    const result = { ...target };

    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = result[key];

        if (sourceValue && typeof sourceValue === "object" && !Array.isArray(sourceValue)) {
            // Handle nested objects
            if (targetValue && typeof targetValue === "object" && !Array.isArray(targetValue)) {
                // Both are objects, merge recursively
                result[key] = deepMerge(targetValue, sourceValue);
            } else {
                // Target is not an object, use source value
                result[key] = JSON.parse(JSON.stringify(sourceValue));
            }
        } else if (sourceValue !== undefined) {
            // Primitive value or array, just assign
            result[key] = sourceValue as any;
        }
    }

    return result;
}

/**
 * Get locale configuration with intelligent fallback
 * Fallback order:
 * 1. Requested locale (e.g., th-th)
 * 2. Same region, English language (e.g., th-en)
 * 3. Global English (global-en) - always exists
 */
export function getLocaleConfig(region: Region, language: Language): I18nConfig {
    const localeKey = `${region}-${language}`;
    const baseKey = "global-en";

    // Start with a deep copy of base (global-en)
    // Use JSON parse/stringify for a deep clone to ensure new references
    let config: I18nConfig = JSON.parse(JSON.stringify(globalEnConfig));

    // If this is the base locale, just return it
    if (localeKey === baseKey) {
        return config;
    }

    // First, merge region-specific English config if it exists and is different from base
    const fallbackKey = `${region}-en`;
    if (fallbackKey !== baseKey && localeConfigs[fallbackKey]) {
        config = deepMerge(config, localeConfigs[fallbackKey] as Partial<I18nConfig>);
    }

    // Then, merge the specific language config if it exists and is different from fallback
    if (localeKey !== fallbackKey && localeConfigs[localeKey]) {
        config = deepMerge(config, localeConfigs[localeKey] as Partial<I18nConfig>);
    }

    return config;
}

/**
 * Get nested value from object using dot notation
 * e.g., "common.learnMore" -> config.content.common.learnMore
 */
export function getNestedValue<T extends Record<string, any>>(obj: T, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj);
}

/**
 * Export all configs for direct access if needed
 */
export { globalEnConfig, thEnConfig, thThConfig };
