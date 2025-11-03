# Localization Quick Reference

## System Overview

This project uses a cascading localization system that separates:
- **Regional settings** (company, currency) - same across languages
- **Content translations** - language-specific text

## Quick Start

### Use translations in a component:

```tsx
import { useI18n } from "@/hooks/use-i18n";

export function MyComponent() {
    const { t, regional, formatCurrency } = useI18n();

    return (
        <div>
            <h1>{t("hero.title")}</h1>
            <p>{formatCurrency(299)}</p>
            <footer>© {regional.company.legalName}</footer>
        </div>
    );
}
```

## Current Locales

| Locale | Region | Language | Company | Currency |
|--------|--------|----------|---------|----------|
| `global-en` | Global | English | Maple Close Ltd. (HK) | USD ($) |
| `th-en` | Thailand | English | Yummi Umami Ltd. (TH) | THB (฿) |
| `th-th` | Thailand | Thai | Yummi Umami Ltd. (TH) | THB (฿) |

## Available Hooks

### `useI18n()` - Complete i18n access
```tsx
const { t, regional, formatCurrency, formatNumber, locale, config } = useI18n();
```

### `useRegional()` - Regional settings only
```tsx
const { regional, formatCurrency, formatNumber } = useRegional();
```

### `useI18nConfig()` - Full config access
```tsx
const config = useI18nConfig();
```

## Adding Thai Translations

Edit [src/i18n/th-th.ts](src/i18n/th-th.ts):

```typescript
export const thThConfig: Partial<I18nConfig> = {
    regional: { /* stays same */ },
    content: {
        common: {
            learnMore: "เรียนรู้เพิ่มเติม",
            getStarted: "เริ่มต้นใช้งาน",
            // ... add more
        },
        // Add other sections as needed
    },
};
```

## Adding New Content

1. **Define types** in [src/types/i18n.ts](src/types/i18n.ts):
```typescript
export interface ContentConfig {
    // ... existing
    myNewSection: {
        title: string;
        description: string;
    };
}
```

2. **Add English content** in [src/i18n/global-en.ts](src/i18n/global-en.ts):
```typescript
content: {
    // ... existing
    myNewSection: {
        title: "My Title",
        description: "My Description",
    },
}
```

3. **Use in components**:
```tsx
const { t } = useI18n();
<h1>{t("myNewSection.title")}</h1>
```

4. **Add Thai translation later** in [src/i18n/th-th.ts](src/i18n/th-th.ts)

## Fallback Chain

```
th-th (Thai) → th-en (Thailand English) → global-en (Base)
```

Missing translations automatically fall back to the next level.

## Files Structure

```
src/
├── i18n/
│   ├── global-en.ts    # Base English (Global)
│   ├── th-en.ts        # Thailand overrides (English)
│   ├── th-th.ts        # Thai translations
│   ├── index.ts        # Config loader
│   └── README.md       # Detailed docs
├── types/
│   ├── i18n.ts         # Type definitions
│   └── locale.ts       # Locale types
├── hooks/
│   └── use-i18n.ts     # React hooks
└── providers/
    └── locale-provider.tsx  # Locale context
```

## Examples

See:
- [src/i18n/README.md](src/i18n/README.md) - Detailed documentation
- [src/components/examples/i18n-example.tsx](src/components/examples/i18n-example.tsx) - Live examples
- [src/components/marketing/footers/footer-large-04.tsx](src/components/marketing/footers/footer-large-04.tsx) - Real usage

## Testing

Use the country selector in the header to switch locales and see changes instantly.

## Development Workflow

1. Build features with English content in `global-en.ts`
2. Test across all regions/languages
3. When content is finalized, add Thai translations to `th-th.ts`
4. Translations can be added incrementally - untranslated content shows English

## Type Safety

The system provides full TypeScript autocomplete and type checking for:
- Translation keys: `t("common.learnMore")`
- Config access: `regional.company.name`
- Currency formatting: `formatCurrency(100)`

Invalid keys or paths will show TypeScript errors.
