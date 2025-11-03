# i18n Quick Start Guide

## In Your Component

```tsx
"use client";
import { useI18n } from "@/hooks/use-i18n";

export function MyComponent() {
    const { t, regional, formatCurrency } = useI18n();

    return (
        <div>
            {/* Translations */}
            <h1>{t("hero.title")}</h1>
            <button>{t("common.getStarted")}</button>

            {/* Regional data */}
            <p>Operated by {regional.company.legalName}</p>
            <p>Based in {regional.company.country}</p>

            {/* Currency */}
            <div>{formatCurrency(299)} {t("pricing.perMonth")}</div>
        </div>
    );
}
```

## Current Setup

### Global English (`global-en`)
- **Company:** Maple Close Ltd.
- **Location:** Hong Kong
- **Currency:** USD ($)
- **Language:** English

### Thailand English (`th-en`)
- **Company:** Yummi Umami Ltd.
- **Location:** Thailand
- **Currency:** THB (฿)
- **Language:** English (same as global-en)

### Thailand Thai (`th-th`)
- **Company:** Yummi Umami Ltd.
- **Location:** Thailand
- **Currency:** THB (฿)
- **Language:** Thai (falls back to English until translated)

## Adding New Content

### 1. Update the type in `src/types/i18n.ts`:

```typescript
export interface ContentConfig {
    // ... existing
    about: {
        title: string;
        description: string;
    };
}
```

### 2. Add English in `src/i18n/global-en.ts`:

```typescript
content: {
    // ... existing
    about: {
        title: "About Us",
        description: "We are a food delivery company.",
    },
}
```

### 3. Use in your component:

```tsx
const { t } = useI18n();
<h1>{t("about.title")}</h1>
```

### 4. Add Thai later in `src/i18n/th-th.ts`:

```typescript
content: {
    about: {
        title: "เกี่ยวกับเรา",
        description: "เราเป็นบริษัทจัดส่งอาหาร",
    },
}
```

## How Fallback Works

When user selects **Thailand → ไทย**:
1. Look for translation in `th-th` → **Use it if found**
2. If not found, look in `th-en` → **Use regional English**
3. If still not found, look in `global-en` → **Use base English**

This means:
- You only write what's different
- Untranslated content shows English
- Regional settings (company, currency) are always correct

## Files You'll Edit Most

- `src/i18n/global-en.ts` - Add all new English content here first
- `src/i18n/th-th.ts` - Add Thai translations when ready
- `src/types/i18n.ts` - Add types for new content sections

## Example: Adding a New Section

Let's add a "Features" section:

```typescript
// 1. src/types/i18n.ts
export interface ContentConfig {
    features: {
        delivery: {
            title: string;
            description: string;
        };
        tracking: {
            title: string;
            description: string;
        };
    };
}

// 2. src/i18n/global-en.ts
content: {
    features: {
        delivery: {
            title: "Fast Delivery",
            description: "Get your food in 30 minutes",
        },
        tracking: {
            title: "Live Tracking",
            description: "Track your order in real-time",
        },
    },
}

// 3. Your component
const { t } = useI18n();
<div>
    <h2>{t("features.delivery.title")}</h2>
    <p>{t("features.delivery.description")}</p>
</div>

// 4. Later: src/i18n/th-th.ts
content: {
    features: {
        delivery: {
            title: "จัดส่งรวดเร็ว",
            description: "รับอาหารของคุณใน 30 นาที",
        },
        tracking: {
            title: "ติดตามสดๆ",
            description: "ติดตามคำสั่งซื้อของคุณแบบเรียลไทม์",
        },
    },
}
```

## Testing

Switch locales using the country selector in the header:
- **Global → English** - See Maple Close Ltd., USD
- **Thailand → English** - See Yummi Umami Ltd., THB
- **Thailand → ไทย** - See Yummi Umami Ltd., THB, Thai text (when added)

## Need Help?

See [README.md](./README.md) for detailed documentation.
