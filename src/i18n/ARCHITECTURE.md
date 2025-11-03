# i18n System Architecture

## Overview

This is a **cascading localization system** designed for efficiency - you only define what's different at each level.

## Key Concepts

### 1. Separation of Concerns

**Regional Settings** (region-dependent, language-agnostic)
- Company information
- Currency settings
- Same across all languages in a region

**Content** (language-dependent)
- All user-facing text
- Translations
- Can be region-specific if needed

### 2. Fallback Chain

```
Requested Locale → Regional English → Global English
      (th-th)           (th-en)          (global-en)
```

Each level only contains what's different from the previous level.

## Data Flow

```
User selects locale (region + language)
           ↓
    LocaleProvider stores selection
           ↓
    useI18n() hook accesses current locale
           ↓
    getLocaleConfig() builds merged config
           ↓
  Deep merge: global-en + th-en + th-th
           ↓
    Component receives complete config
```

## File Structure

```
src/
├── types/
│   ├── locale.ts           # Region, Language types
│   └── i18n.ts             # I18nConfig, ContentConfig types
│
├── i18n/
│   ├── global-en.ts        # Base: Complete I18nConfig
│   ├── th-en.ts            # Override: Partial<I18nConfig>
│   ├── th-th.ts            # Override: Partial<I18nConfig>
│   └── index.ts            # Config loader & merge logic
│
├── hooks/
│   └── use-i18n.ts         # React hooks for components
│
└── providers/
    └── locale-provider.tsx # Context for current locale
```

## Type System

### ContentConfig (Content Layer)
Defines all translatable strings:
```typescript
interface ContentConfig {
    common: { getStarted: string; ... }
    hero: { title: string; ... }
    // ...
}
```

### RegionalConfig (Regional Layer)
Defines region-specific settings:
```typescript
interface RegionalConfig {
    company: CompanyConfig;
    currency: CurrencyConfig;
}
```

### I18nConfig (Complete)
Combines both layers:
```typescript
interface I18nConfig {
    regional: RegionalConfig;
    content: ContentConfig;
}
```

## Deep Merge Strategy

Given these configs:

**global-en.ts** (Complete)
```typescript
{
    regional: { company: { name: "Rocket Feast", legalName: "Maple Close Ltd." } },
    content: { hero: { title: "Welcome", subtitle: "Get started" } }
}
```

**th-en.ts** (Partial)
```typescript
{
    regional: { company: { legalName: "Yummi Umami Ltd." } }
    // content is omitted, will inherit from global-en
}
```

**th-th.ts** (Partial)
```typescript
{
    // regional omitted, will inherit from th-en
    content: { hero: { title: "ยินดีต้อนรับ" } }
    // subtitle not translated, will inherit from th-en/global-en
}
```

**Result for `th-th`:**
```typescript
{
    regional: {
        company: {
            name: "Rocket Feast",           // from global-en
            legalName: "Yummi Umami Ltd."   // from th-en
        }
    },
    content: {
        hero: {
            title: "ยินดีต้อนรับ",           // from th-th
            subtitle: "Get started"         // from global-en
        }
    }
}
```

## Hook API

### `useI18n()`
Full access to i18n system:
```typescript
const {
    t,              // (key: string) => string
    regional,       // RegionalConfig
    formatCurrency, // (amount: number) => string
    formatNumber,   // (value: number) => string
    locale,         // LocaleConfig
    config,         // I18nConfig
} = useI18n();
```

### `useRegional()`
Regional settings only:
```typescript
const {
    regional,       // RegionalConfig
    formatCurrency, // (amount: number) => string
    formatNumber,   // (value: number) => string
} = useRegional();
```

### `useI18nConfig()`
Raw config access:
```typescript
const config: I18nConfig = useI18nConfig();
```

## Translation Key Resolution

Using `t("hero.title")`:

1. Split path: `["hero", "title"]`
2. Navigate config: `config.content.hero.title`
3. Return value or key if not found

TypeScript provides autocomplete for all valid paths.

## Currency Formatting

Uses `Intl.NumberFormat` with regional settings:

```typescript
formatCurrency(299) // Thailand → "฿299" | Global → "$299"
```

Automatically applies:
- Correct currency code (USD/THB)
- Correct symbol ($/฿)
- Correct locale formatting (en-US/th-TH)

## Adding a New Region

Example: Adding Singapore

1. **Update types** (`src/types/locale.ts`):
```typescript
export type Region = "global" | "th" | "sg";
```

2. **Create config** (`src/i18n/sg-en.ts`):
```typescript
export const sgEnConfig: Partial<I18nConfig> = {
    regional: {
        company: { legalName: "Rocket Feast Pte Ltd.", country: "Singapore" },
        currency: { code: "SGD", symbol: "S$", locale: "en-SG" },
    },
};
```

3. **Register** (`src/i18n/index.ts`):
```typescript
const localeConfigs = {
    "global-en": globalEnConfig,
    "th-en": thEnConfig,
    "th-th": thThConfig,
    "sg-en": sgEnConfig,  // Add here
};
```

4. **Update locale config** (`src/types/locale.ts`):
```typescript
export const LOCALE_CONFIGS: Record<Region, LocaleConfig[]> = {
    global: [...],
    th: [...],
    sg: [{ region: "sg", language: "en", ... }],
};
```

## Performance Considerations

- **Memoization**: `useI18n()` memoizes config based on locale
- **Static configs**: All locale configs are static imports
- **Deep merge**: Only runs when locale changes
- **Bundle size**: Each locale config is ~1-2KB

## Testing Strategy

1. **Switch locales**: Use country selector
2. **Check fallback**: View th-th without translations
3. **Verify regional**: Check company name/currency per region
4. **Test formatting**: Verify currency displays correctly

## Extension Points

### Custom Formatters
Add to `useI18n()`:
```typescript
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(config.regional.currency.locale).format(date);
};
```

### Region-Specific Content
Override content in regional configs:
```typescript
// th-en.ts
content: {
    hero: {
        title: "Welcome to Thailand!"  // Different from global-en
    }
}
```

### Pluralization
Extend `t()` function:
```typescript
const tn = (key: string, count: number) => {
    // Implementation for plural forms
};
```

## Best Practices

1. **Complete base**: Always define full content in `global-en`
2. **Minimal overrides**: Only override what differs
3. **Type first**: Update types before adding content
4. **Test early**: Test with English before translating
5. **Incremental translation**: Translate section by section
6. **Regional vs language**: Keep regional settings separate
7. **Consistent keys**: Use clear, hierarchical key names
8. **Document context**: Add comments for translators

## Migration Path

Current state → Fully translated:

1. **Phase 1** (Current): English in all locales
   - Build features with English content
   - Regional settings (company, currency) work correctly

2. **Phase 2**: Partial translation
   - Translate high-priority sections (hero, nav, pricing)
   - Other sections fall back to English

3. **Phase 3**: Complete translation
   - All sections translated
   - Fallback rarely used

At each phase, the system works correctly with proper fallbacks.
