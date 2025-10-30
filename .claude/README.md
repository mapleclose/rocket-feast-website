# Claude Code Context Files

This directory contains comprehensive context for building the Rocket Feast marketing website using Claude Code.

## Overview

The Rocket Feast marketing website is built with Next.js 15 and the Untitled UI React component library. These context files provide all the information needed to understand the project, maintain consistency, and build new features aligned with the brand and technical requirements.

## Context Files

### [context.md](./context.md)
**Main project context** - Start here for an overview of:
- Project purpose and goals
- Target audience and markets
- Website structure and sitemap
- Technical stack (Next.js, Untitled UI, TypeScript, Tailwind)
- Development workflow
- SEO strategy
- Current project status

**When to use:** Beginning any new feature, onboarding to the project, or refreshing context about project goals.

### [product-overview.md](./product-overview.md)
**Complete Rocket Feast product information** - Deep dive into:
- Rocket Feast SaaS platform overview
- All system components and features
- Pricing model
- Target market details
- Competitive advantages
- Future roadmap
- Key success metrics

**When to use:** Writing content about Rocket Feast features, creating marketing copy, building feature showcase pages, or understanding what to communicate to visitors.

### [technical-specs.md](./technical-specs.md)
**Technical implementation guide** - Details about:
- Website technology stack
- Untitled UI component library
- Project structure
- Component development patterns
- Styling system (Tailwind CSS)
- Performance optimization
- SEO implementation
- Forms and integrations
- Browser support

**When to use:** Building new components, implementing pages, making technical decisions, optimizing performance, or troubleshooting issues.

### [brand-guidelines.md](./brand-guidelines.md)
**Brand identity and guidelines** - Complete guide to:
- Brand voice and tone
- Messaging framework
- Visual identity (colors, typography, logo)
- UI component styling
- Content guidelines
- Accessibility standards
- Social media guidelines
- Writing for internationalization

**When to use:** Writing content, designing components, creating marketing materials, ensuring brand consistency, or reviewing design decisions.

## Custom Slash Commands

The `commands/` directory contains custom Claude Code commands for common tasks:

### `/new-page`
Create a new marketing page with proper structure, SEO, and brand compliance.
- Generates Next.js page with TypeScript
- Includes SEO metadata
- Uses Untitled UI components
- Follows brand guidelines

### `/new-component`
Create a new custom component using Untitled UI patterns.
- Checks for existing similar components
- Generates TypeScript component
- Ensures accessibility
- Follows design system

### `/check-components`
Find the right Untitled UI component for your needs.
- Searches existing components
- Provides usage examples
- Suggests component combinations
- Prevents duplication

### `/review-accessibility`
Review components/pages for WCAG 2.1 AA compliance.
- Checks keyboard navigation
- Validates ARIA usage
- Tests color contrast
- Ensures semantic HTML
- Provides detailed report

### `/optimize-seo`
Audit and optimize page SEO.
- Reviews meta tags
- Checks content structure
- Validates technical SEO
- Suggests improvements
- Generates optimized code

### `/brand-check`
Verify content and design follows brand guidelines.
- Reviews voice and tone
- Checks visual design
- Validates messaging
- Ensures accessibility
- Provides compliance score

## How to Use These Files

### For New Features
1. Read [context.md](./context.md) to understand project goals
2. Check [product-overview.md](./product-overview.md) for feature details
3. Reference [technical-specs.md](./technical-specs.md) for implementation patterns
4. Follow [brand-guidelines.md](./brand-guidelines.md) for design and content

### For Content Writing
1. Review [brand-guidelines.md](./brand-guidelines.md) for voice and tone
2. Check [product-overview.md](./product-overview.md) for accurate feature information
3. Use `/brand-check` command to validate content
4. Use `/optimize-seo` command for SEO optimization

### For Component Development
1. Use `/check-components` to find existing components
2. Reference [technical-specs.md](./technical-specs.md) for patterns
3. Use `/new-component` if creating something new
4. Run `/review-accessibility` before completion

### For Page Creation
1. Use `/new-page` command to scaffold
2. Reference [context.md](./context.md) for page purpose and audience
3. Follow [brand-guidelines.md](./brand-guidelines.md) for design
4. Run `/optimize-seo` for SEO optimization

## Quick Reference

### Primary Colors
- **Charcoal:** #121212 (text, headers)
- **Vermilion:** #FF5A33 (primary CTA, accents)
- **Teal:** #00C4B3 (secondary CTA, success)
- **Sand:** #E9E7E5 (backgrounds, neutrals)

### Typography
- **Primary:** Inter (body text, UI)
- **Alternative:** Space Grotesk (headlines)
- **Thai:** IBM Plex Sans Thai
- **Mono:** JetBrains Mono (code)

### Key Messaging
- "Your Restaurant, Fully Automated"
- "Run Lean. Serve Better"
- "Built by Restaurateurs. Perfected for You"

### Primary CTAs
- "Get Started for Free"
- "Start Your Free Trial"
- "Book a Demo"

### SEO Keywords
- QR Ordering System Thailand
- Restaurant POS Software
- Hospitality Management System
- Restaurant Operations Software
- F&B Management Platform

## Project Structure Quick Reference

```
src/
├── app/                    # Next.js pages (App Router)
├── components/
│   ├── base/              # Basic UI (buttons, inputs)
│   ├── application/       # Complex components (modals, tables)
│   ├── marketing/         # Marketing-specific
│   ├── foundations/       # Icons, logos
│   └── shared-assets/     # Illustrations, patterns
├── hooks/                 # Custom React hooks
├── providers/             # Context providers
├── styles/                # Global styles, theme
└── utils/                 # Utility functions
```

## Important Principles

1. **Always use existing Untitled UI components** - Don't reinvent the wheel
2. **Mobile-first responsive design** - Most users are on mobile
3. **Accessibility is mandatory** - WCAG 2.1 AA compliance required
4. **SEO optimization** - Every page should be search-optimized
5. **Brand consistency** - Follow voice, tone, and visual guidelines
6. **Performance matters** - Fast load times are crucial
7. **Type safety** - Use TypeScript properly
8. **Document as you go** - Update context files when patterns change

## Updating These Files

These context files are living documents. When you make significant changes to:
- Project structure or tech stack → Update `context.md` and `technical-specs.md`
- Brand guidelines or design system → Update `brand-guidelines.md`
- Product features or messaging → Update `product-overview.md`

## Getting Help

If you need clarification on any aspect of the project:
1. Check the relevant context file first
2. Use the appropriate slash command
3. Ask specific questions with context
4. Reference the file paths and line numbers

## Version

**Last Updated:** 2025-10-30
**Project Phase:** Initial Setup
**Next.js Version:** 15.5.6
**Untitled UI:** Latest (from starter kit)

---

**Remember:** These files exist to make development faster and more consistent. Use them liberally, update them regularly, and trust the guidance they provide.
