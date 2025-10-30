# Rocket Feast - Technical Specifications (Marketing Website)

> **Important:** This document covers the technical specifications for the **Rocket Feast marketing website**, which is built using the Untitled UI Next.js starter kit. For specifications about the Rocket Feast SaaS platform itself, see the product overview document.

## Website Technology Stack

This marketing website is built using modern web technologies with the Untitled UI component library:

### Core Framework
- **Next.js 15** - React framework with App Router and Turbopack
- **React 19.1** - Latest React version with modern features
- **TypeScript 5.9** - Full type safety across the codebase

### Styling & UI
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Untitled UI React Components** - Professional, accessible component library
- **React Aria Components** - Accessible UI primitives
- **tailwindcss-react-aria-components** - Tailwind integration for React Aria
- **tailwind-merge** - Intelligent class merging

### Component Library

**Untitled UI provides the following components:**

#### Base Components
- Buttons, Button Groups, Social Buttons
- Inputs, Textareas, Selects (including Multi-select and Combobox)
- Forms, Checkboxes, Radio Buttons, Toggles
- Badges, Tags, Avatars, Tooltips
- Progress Indicators, Sliders
- Dropdowns, File Upload Triggers

#### Application Components
- Navigation (Sidebar and Header)
- Modals, Slideout Menus
- Tables, Tabs, Pagination
- Date Pickers, Range Pickers
- Empty States, Loading Indicators

#### Marketing Components
- Header Navigation with Dropdowns
- Hero sections (to be built)
- Feature showcases (to be built)
- Pricing tables (to be built)
- Testimonial sections (to be built)

#### Foundations
- Icons (@untitledui/icons)
- File Icons (@untitledui/file-icons)
- Social Icons (Twitter/X, Facebook, LinkedIn, etc.)
- Payment Icons (Visa, Mastercard, PayPal, etc.)
- Logos and Featured Icons
- Rating Stars
- Background Patterns

### Animation & Interaction
- **Motion** (formerly Framer Motion) - Declarative animations
- **react-hotkeys-hook** - Keyboard shortcuts

### Theme & Styling
- **next-themes** - Dark/light mode support
- Custom CSS variables for theming
- Typography system with multiple font stacks

### Icons
- **@untitledui/icons** - 1000+ icons optimized for modern UI
- **@untitledui/file-icons** - File type icons

## Project Structure

```
rocket-feast-website/
├── .claude/                    # Claude Code context files
│   ├── context.md             # Main project context
│   ├── product-overview.md    # Complete product information
│   ├── technical-specs.md     # This file
│   ├── brand-guidelines.md    # Brand and design guidelines
│   └── commands/              # Custom slash commands
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page
│   │   ├── not-found.tsx      # 404 page
│   │   └── home-screen.tsx    # Home screen demo component
│   ├── components/
│   │   ├── base/              # Base UI components from Untitled UI
│   │   ├── application/       # Application components
│   │   ├── marketing/         # Marketing-specific components
│   │   ├── foundations/       # Icons, logos, design tokens
│   │   └── shared-assets/     # Shared illustrations, patterns
│   ├── hooks/
│   │   ├── use-breakpoint.ts  # Responsive breakpoint hook
│   │   ├── use-clipboard.ts   # Clipboard operations
│   │   └── use-resize-observer.ts  # Element resize observer
│   ├── providers/
│   │   ├── router-provider.tsx    # Next.js router context
│   │   └── theme.tsx          # Theme provider (dark/light mode)
│   ├── styles/
│   │   ├── globals.css        # Global styles and resets
│   │   ├── theme.css          # CSS variables and theme tokens
│   │   └── typography.css     # Typography system
│   └── utils/
│       ├── cx.ts              # Class name merging utility
│       └── is-react-component.ts  # Type checking utility
├── public/                    # Static assets
│   ├── favicon.ico
│   └── (future: images, fonts, etc.)
├── .github/                   # GitHub workflows and CI/CD
├── package.json
├── tsconfig.json
├── next.config.mjs            # Next.js configuration
├── postcss.config.mjs         # PostCSS configuration
├── .prettierrc                # Prettier configuration
└── README.md
```

## Development Approach

### Building with Claude Code

**This website should be built using Claude Code with the following approach:**

1. **Use Untitled UI components** - Leverage the existing component library rather than building from scratch
2. **Component composition** - Combine base components to create page-specific components
3. **Responsive-first** - All components should work seamlessly on mobile, tablet, and desktop
4. **Accessibility-first** - Use React Aria components properly with keyboard navigation and screen reader support
5. **Performance-conscious** - Lazy load components, optimize images, minimize bundle size

### Component Development Pattern

When building new pages or features:

1. **Explore available components** - Check `src/components/` for existing Untitled UI components
2. **Compose, don't recreate** - Build new features by combining existing components
3. **Follow TypeScript patterns** - Maintain type safety throughout
4. **Use Tailwind utilities** - Style with Tailwind classes, avoid custom CSS when possible
5. **Test responsiveness** - Verify on multiple screen sizes

### Example Component Usage

```typescript
// Import Untitled UI components
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { Modal } from '@/components/application/modals/modal'

// Compose into page-specific features
export function ContactForm() {
  return (
    <form className="space-y-4">
      <Input label="Name" type="text" />
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </form>
  )
}
```

## Styling System

### Tailwind CSS Configuration

**Color System:**
- Uses CSS variables defined in `src/styles/theme.css`
- Supports light/dark mode switching
- Custom color palette aligned with Rocket Feast brand (see brand-guidelines.md)

**Typography:**
- Scale: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- Font families: Sans (Inter), Mono (JetBrains Mono)
- Line heights optimized for readability

**Spacing:**
- Standard Tailwind spacing scale (0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64)
- Custom utilities for common patterns

**Responsive Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Theme System

**Light/Dark Mode:**
- Implemented via `next-themes`
- Provider configured in `src/providers/theme.tsx`
- CSS variables switch based on theme
- Respects user's system preference

**Custom Theming:**
- Modify `src/styles/theme.css` for brand colors
- Update CSS variables for consistent theming
- Use `className="dark:..."` for mode-specific styles

## Performance Optimization

### Next.js Optimizations

**Turbopack:**
- Enabled by default in development (`npm run dev` uses `--turbopack`)
- Faster builds and hot module replacement

**Image Optimization:**
- Use Next.js `<Image>` component for all images
- Automatic WebP/AVIF conversion
- Lazy loading by default
- Responsive image sizing

**Code Splitting:**
- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy load below-the-fold content

**Font Optimization:**
- Next.js font optimization
- Self-hosted fonts for better performance
- Font display: swap

### Build Optimization

**Bundle Analysis:**
- Monitor bundle size
- Remove unused dependencies
- Tree-shake unused code

**Static Generation:**
- Use Static Site Generation (SSG) where possible
- Pre-render marketing pages at build time
- Incremental Static Regeneration (ISR) for dynamic content

## SEO Implementation

### Meta Tags
- Dynamic meta tags per page
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs

### Structured Data
- JSON-LD schema markup
- Organization schema
- Product schema (for SaaS)
- Review/rating schema (when available)

### Sitemap & Robots
- Auto-generated sitemap.xml
- Robots.txt configuration
- Submit to search engines

### Target Keywords
- "QR Ordering System Thailand"
- "Restaurant POS Software"
- "Hospitality Management System"
- "Restaurant Operations Software"
- "F&B Management Platform"

## Analytics & Tracking

### Planned Integrations

**Google Analytics 4:**
- Page view tracking
- Custom event tracking (CTA clicks, form submissions)
- Conversion tracking

**Meta Pixel:**
- Facebook/Instagram ad tracking
- Conversion optimization
- Retargeting campaigns

**Hotjar:**
- Heatmaps
- Session recordings
- User feedback

## Forms & Lead Capture

### Form Types
- Contact form
- Demo request form
- Free trial signup
- Merchant KYC collection (multi-step)

### Form Handling
- Client-side validation (React Hook Form or similar)
- Server-side validation
- Error handling and user feedback
- Success states and redirects

### Data Processing
- Store leads in database or CRM
- Email notifications
- Auto-responder emails
- Integration with sales pipeline

## Accessibility Standards

### WCAG 2.1 AA Compliance

**Keyboard Navigation:**
- All interactive elements keyboard accessible
- Proper focus management
- Skip links for main content

**Screen Reader Support:**
- Semantic HTML
- ARIA labels where needed
- Meaningful alt text for images

**Visual Accessibility:**
- Sufficient color contrast (4.5:1 for text)
- Resizable text (up to 200%)
- No reliance on color alone for meaning

**React Aria:**
- Untitled UI components built on React Aria
- Accessible by default
- Proper focus management and keyboard interactions

## Internationalization (Future)

### Planned Languages
- English (primary)
- Thai (Phase 1)
- Additional languages (Phase 2+)

### Implementation
- Next.js i18n routing
- Translation files (JSON)
- Language switcher component
- Locale-aware formatting (dates, numbers, currency)

## Deployment

### Hosting
- **Recommended:** Vercel (optimized for Next.js)
- **Alternative:** AWS Amplify, Netlify, or self-hosted

### Environment Variables
```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
# API endpoints for form submissions
API_ENDPOINT=
# CMS credentials (if using headless CMS)
CMS_API_KEY=
```

### Build Process
```bash
npm run build    # Production build
npm run start    # Start production server
```

### CI/CD
- Automated builds on push to main
- Preview deployments for pull requests
- Automated testing before deployment

## Browser Support

### Target Browsers
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers

## Development Scripts

```json
{
  "dev": "next dev --turbopack",      // Development with Turbopack
  "build": "next build",               // Production build
  "start": "next start",               // Start production server
  "lint": "next lint",                 // Lint code (when configured)
  "format": "prettier --write ."       // Format code (when configured)
}
```

## Best Practices for Claude Code

When working on this project with Claude Code:

1. **Always check existing components first** - Use `src/components/` library before creating new components
2. **Follow the file structure** - Keep components organized by type (base/application/marketing)
3. **Use TypeScript properly** - Define interfaces for props, maintain type safety
4. **Mobile-first approach** - Design for mobile, enhance for desktop
5. **Accessibility is mandatory** - Use React Aria components, test with keyboard
6. **Performance matters** - Lazy load, optimize images, minimize JavaScript
7. **SEO optimization** - Proper meta tags, semantic HTML, structured data
8. **Test responsively** - Verify on different screen sizes
9. **Version control** - Commit frequently with clear messages
10. **Documentation** - Comment complex logic, update README when needed

## Future Enhancements

### Phase 1 (Current)
- Basic marketing pages (Home, Features, Pricing, Contact)
- Responsive design
- Dark/light mode
- Basic SEO

### Phase 2
- Blog/content section
- Case studies/testimonials
- Interactive product demos
- Advanced animations

### Phase 3
- Multi-language support
- A/B testing framework
- Advanced analytics
- Personalization features

## Notes

This marketing website is completely separate from the Rocket Feast SaaS platform. It serves as the public-facing website to attract and convert customers to the platform.

All implementation should leverage the Untitled UI Next.js starter kit that has been installed, maximizing the use of pre-built components and patterns.
