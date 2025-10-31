# Rocket Feast - Marketing Website Context

## Project Overview

This is the marketing website for **Rocket Feast**, a comprehensive SaaS platform for hospitality businesses. The website's primary purpose is to convert visitors into free-plan users, educate prospects about the platform's capabilities, and collect merchant KYC information.

**Repository:** https://github.com/marc-cem/rocket-feast-website

## About Rocket Feast

Rocket Feast is a comprehensive SaaS platform developed by Yummi Umami Co., Ltd. that unifies every major operational layer of modern restaurants, cafés, and venues. It was originally built to manage Yummi Umami's own multi-venue operations (Yellow Lane, Dip, House) and is now offered as a multi-tenant SaaS for external hospitality clients.

### Core Value Proposition

**The Problem:** Modern hospitality venues struggle with fragmented tools - separate POS systems, QR ordering apps, staff schedulers, and inventory spreadsheets that don't talk to each other.

**The Solution:** Rocket Feast provides a single, integrated operating system for F&B operations combining QR/POS ordering, real-time inventory, staff automation, customer loyalty, and analytics.

### Key Differentiators

- Built by operators for operators - field-tested in real hospitality environments
- Gamified staff workflow automation - turn routine tasks into engagement
- Ingredient-level inventory logic - real-time availability down to prep level
- Guest-centric design - self-service ordering that feels personal
- Multi-tenant SaaS architecture - scales from single café to national chains

## Target Audience

### Primary Market
- Restaurants, cafés, bars, and boutique hotels with dining operations
- Venues with multiple zones or large seating areas and limited staff
- Multi-branch hospitality groups seeking unified digital control

### Secondary Market
- Wellness venues (onsens, spas) offering F&B service
- Event spaces, beach clubs, or mixed-use hospitality concepts

### Ideal User Persona
- Age: 28-50 years old
- Role: Operator, General Manager, or Owner
- Characteristics: Data-driven, tech-curious, pragmatic
- Focus: Efficiency, accountability, and guest satisfaction

## Website Goals

### Primary Objectives
1. **Convert visitors to free-plan users** - Get them signed up and using the platform
2. **Educate prospects** - Clearly communicate features, benefits, and value proposition
3. **Collect merchant KYC** - Facilitate onboarding process for payment processing

### Key CTAs
- **Primary:** "Get Started for Free"
- **Secondary:** "Book a Demo", "Contact Sales"

### Target Markets
- **Phase 1:** Thailand/SEA (bilingual site - English/Thai)
- **Phase 2:** Global rollout (multi-currency)

## Website Structure

### Planned Sitemap
- Home
- Features
- Pricing
- About
- Contact
- Integrations
- Blog (future)

### Design Direction
- Modern and minimal aesthetic
- Warm, professional tone
- Mobile-first responsive design
- Fast load times (Next.js with Turbopack)
- Accessibility compliant (React Aria components)

### SEO Focus Keywords
- "QR Ordering System Thailand"
- "Restaurant POS Software"
- "Hospitality Management System"
- "Restaurant Operations Software"
- "F&B Management Platform"

## Technical Stack

- **Framework:** Next.js 15 (App Router)
- **React:** 19.1
- **TypeScript:** 5.9
- **Styling:** Tailwind CSS 4.1
- **UI Components:** Untitled UI React (with React Aria)
- **Animations:** Motion (formerly Framer Motion)
- **Theme:** next-themes for dark/light mode
- **Icons:** @untitledui/icons, @untitledui/file-icons

## Project Structure

```
rocket-feast-website/
├── src/
│   ├── app/                    # Next.js app directory (routes)
│   ├── components/
│   │   ├── base/              # Basic UI components (buttons, inputs, etc.)
│   │   ├── application/       # Application components (modals, tables, etc.)
│   │   ├── marketing/         # Marketing-specific components (headers, CTAs)
│   │   ├── foundations/       # Icons, logos, design tokens
│   │   └── shared-assets/     # Shared illustrations, patterns
│   ├── hooks/                 # Custom React hooks
│   ├── providers/             # Context providers (theme, router)
│   ├── styles/                # Global styles, theme variables
│   └── utils/                 # Utility functions
├── public/                    # Static assets
└── .claude/                   # Claude Code context files
```

## Development Workflow

### Available Scripts
- `npm run dev` - Start development server (currently running on http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server

### Code Style
- TypeScript strict mode enabled
- Prettier for formatting (with Tailwind plugin)
- Component-first architecture
- Atomic design principles where applicable

## Content Strategy

### Tone of Voice
- Confident, human, helpful
- Not overly corporate or salesy
- Empowering and solution-focused
- Technical but accessible

### Key Messaging
- "Your Restaurant, Fully Automated"
- "Run Lean. Serve Better"
- "Built by Restaurateurs. Perfected for You"

## Integration Requirements

### Analytics & Tracking
- Google Analytics 4
- Meta Pixel (Facebook/Instagram)
- Hotjar (user behavior)

### Forms & Lead Capture
- Contact forms
- Demo request forms
- Free trial signup flow
- Merchant KYC collection

### Future Integrations
- CMS for blog content (Sanity/Headless WP/Ghost)
- Payment gateway demos
- Live chat support

## Related Documentation

For detailed information about specific aspects of Rocket Feast:
- [Product Overview](./.claude/product-overview.md) - Complete feature set and system components
- [Technical Specifications](./.claude/technical-specs.md) - Architecture, security, and integrations
- [Brand Guidelines](./.claude/brand-guidelines.md) - Visual identity, tone, and messaging

## Notes for Claude

When working on this project:
1. **Always prioritize mobile-first responsive design** - Many hospitality operators browse on mobile
2. **Use existing Untitled UI components** - Avoid creating custom components unless absolutely necessary
3. **Consider bilingual support** - Structure content to easily support English/Thai localization
4. **Performance matters** - Keep bundle size small, lazy load where possible
5. **Accessibility is non-negotiable** - Use React Aria components properly with keyboard navigation
6. **SEO optimization** - Use proper meta tags, semantic HTML, and structured data
7. **Clear CTAs** - Every page should guide users toward signup or contact
8. **Social proof** - Where possible, incorporate testimonials, case studies, and success metrics

### Working with Untitled UI Components

When installing Untitled UI components:
- Use the batch installation method to avoid interactive prompts: `npx untitledui@latest add component-1 component-2 component-3 --path src/components`
- Components may install to `src/src/components/` instead of `src/components/` - if this happens, use `rsync` to move them to the correct location
- Always verify component installation with: `find src/components/marketing -name "*.tsx" -type f | sort`
- Check export names match imports with: `grep -E "^export (const|function)" src/components/marketing/**/*.tsx`

## Current Status

- Git repository initialized and connected to GitHub
- Next.js + Untitled UI starter kit installed
- Development server running on http://localhost:3000
- README updated with project-specific documentation
- **Home page built with Untitled UI components** (see [src/app/home-screen.tsx](src/app/home-screen.tsx))
  - ✅ All components rendering successfully
  - ✅ VideoPlayer base component installed
  - ✅ IPhoneMockup shared asset installed
  - ✅ Page tested and working at http://localhost:3000

- Missing components to install (marked with TODO comments in code):
  - `npx untitledui@latest add metrics-simple-with-actions-02 --path src/components`
  - `npx untitledui@latest add pricing-simple-call-out --path src/components`
  - `npx untitledui@latest add testimonial-simple-centered-02 --path src/components`
