# Localization System

An efficient, cascading localization system that allows you to override only what differs between regions and languages.

## Overview

The system separates:
- **Regional settings**: Company info, currency (same across languages in a region)
- **Content translations**: All user-facing text (language-specific)

## Fallback Strategy

The system uses intelligent fallback:
1. **Requested locale** (e.g., `th-th` for Thailand Thai)
2. **Regional English** (e.g., `th-en` for Thailand English)
3. **Global English** (`global-en` - the base)

This means you only need to define what's different at each level.

## Structure

```
src/i18n/
├── global-en.ts    # Base English (Global region, USD, Maple Close Ltd.)
├── th-en.ts        # Thailand overrides (English, THB, Yummi Umami Ltd.)
├── th-th.ts        # Thai translations (Same as th-en but in Thai language)
└── index.ts        # Configuration loader with fallback logic
```

## Usage Examples

### Basic Translation

```tsx
import { useI18n } from "@/hooks/use-i18n";

export function MyComponent() {
    const { t } = useI18n();

    return (
        <div>
            <h1>{t("hero.title")}</h1>
            <button>{t("common.getStarted")}</button>
        </div>
    );
}
```

### Regional Information

```tsx
import { useI18n } from "@/hooks/use-i18n";

export function CompanyInfo() {
    const { regional } = useI18n();

    return (
        <div>
            <p>{regional.company.name}</p>
            <p>{regional.company.legalName}</p>
            <p>Based in {regional.company.country}</p>
        </div>
    );
}
```

### Currency Formatting

```tsx
import { useI18n } from "@/hooks/use-i18n";

export function PricingCard({ price }: { price: number }) {
    const { formatCurrency, t } = useI18n();

    return (
        <div>
            <h2>{formatCurrency(price)}</h2>
            <p>{t("pricing.perMonth")}</p>
        </div>
    );
}
```

### Using Only Regional Data

```tsx
import { useRegional } from "@/hooks/use-i18n";

export function Footer() {
    const { regional } = useRegional();

    return (
        <footer>
            <p>© 2024 {regional.company.legalName}</p>
        </footer>
    );
}
```

## Adding New Translations

### Step 1: Define the Content Type

Add your new content structure to `src/types/i18n.ts`:

```typescript
export interface ContentConfig {
    // ... existing content

    newSection: {
        title: string;
        description: string;
    };
}
```

### Step 2: Add Base English Content

Add to `src/i18n/global-en.ts`:

```typescript
export const globalEnConfig: I18nConfig = {
    // ... existing config
    content: {
        // ... existing content
        newSection: {
            title: "My New Section",
            description: "This is the description",
        },
    },
};
```

### Step 3: Add Thai Translation (When Ready)

Add to `src/i18n/th-th.ts`:

```typescript
export const thThConfig: Partial<I18nConfig> = {
    // ... existing config
    content: {
        // ... existing content
        newSection: {
            title: "ส่วนใหม่ของฉัน",
            description: "นี่คือคำอธิบาย",
        },
    },
};
```

## Region-Specific Overrides

If you want different English content for Thailand (not just regional settings):

```typescript
// src/i18n/th-en.ts
export const thEnConfig: Partial<I18nConfig> = {
    regional: {
        // ... regional settings
    },
    content: {
        hero: {
            title: "Thailand-specific English title",
            // Other hero fields will fall back to global-en
        },
    },
};
```

## Examples by Locale

### Global English (`global-en`)
- Company: Maple Close Ltd. (Hong Kong)
- Currency: USD ($)
- Language: English

### Thailand English (`th-en`)
- Company: Yummi Umami Ltd. (Thailand)
- Currency: THB (฿)
- Language: English
- Content: Falls back to global-en

### Thailand Thai (`th-th`)
- Company: Yummi Umami Ltd. (Thailand)
- Currency: THB (฿)
- Language: Thai
- Content: Thai translations where available, falls back to th-en/global-en

## Adding a New Region

1. Update `src/types/locale.ts` to add the region
2. Create `{region}-en.ts` in `src/i18n/`
3. Add regional overrides (company, currency)
4. Register in `src/i18n/index.ts`
5. Update locale selector UI

## Best Practices

1. **Start with base content**: Always define complete content in `global-en.ts`
2. **Override minimally**: Only override what's actually different
3. **Regional vs Language**: Keep regional settings separate from translations
4. **Incremental translation**: You can translate one section at a time
5. **Type safety**: Use TypeScript's autocomplete for translation keys
6. **Test fallbacks**: Check that missing translations fall back gracefully

## Type Safety

The system provides full TypeScript support:

```tsx
// ✅ Type-safe translation keys
t("common.learnMore")  // Works
t("common.invalid")    // TypeScript error

// ✅ Type-safe config access
regional.company.name  // Works
regional.company.invalid  // TypeScript error
```

## Development Workflow

While building new features:
1. Add English content to `global-en.ts`
2. Test with English in all regions
3. When content is finalized, add translations to `th-th.ts`
4. Thai selector will show Thai translations where available, English otherwise

## Testing Different Locales

Use the country selector in the header to switch between:
- Global → English (global-en)
- Thailand → English (th-en)
- Thailand → ไทย (th-th)

Changes take effect immediately throughout the app.
