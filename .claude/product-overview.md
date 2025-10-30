# Rocket Feast - Complete Product Overview

## Executive Summary

Rocket Feast is a comprehensive SaaS platform for hospitality businesses, designed to unify every major operational layer of modern restaurants, cafés, and venues.

**Developed by:** Yummi Umami Co., Ltd.
**Architecture:** Multi-tenant SaaS
**Philosophy:** Empower guests, optimize staff performance, and automate backend operations

## Pricing Model

| Plan | Monthly Fee (per seat/user) | Payment Commission | Payment Gateways | Notes |
|------|----------------------------|-------------------|------------------|-------|
| **Free** | 0 THB | 1% | Rocket Feast (Beam only) | Cash & Beam payments only |
| **Essential** | 300 THB | 0.5% | Beam + 3rd party | 30-day free trial |
| **Pro** | 1,000 THB | 0.3% | Beam + 3rd party | 30-day free trial |

### Additional Notes
- Seat-based billing per active staff user
- Commission deducted automatically from merchant settlements
- Optional enterprise add-ons: multi-brand dashboard, API access, custom analytics

## Major System Components

### 1. Customer-Facing QR Ordering

**Core Features:**
- Scan-to-Order via table QR codes
- Instant responsive web app (no installation required)
- Dynamic menus by location, time, and availability

**Ordering Modes:**
- **Pay Now** - Online checkout with immediate payment
- **Order Now / Pay Later** - Linked to customer profile for tab management

**Key Capabilities:**
- Multi-language support (English, Thai, extensible)
- Item modifiers & upsells (toppings, extras, etc.)
- Allergen/dietary information at ingredient level
- Optional removal of sensitive ingredients (vegan, halal, etc.)
- Multi-cart support (group orders or round re-orders)
- Integrated tipping flow
- Fully responsive design for all screen sizes

### 2. Point of Sale (POS)

**Core Features:**
- Unified dashboard for QR, counter, and phone orders
- Table management (zones, merging, transfer)
- Split bill & payment adjustments
- Offline queueing with auto-sync
- Receipt printing (thermal/USB/Bluetooth)

**Business Logic:**
- Discount, voucher, and loyalty redemption handling
- Staff shift overview and sales tracking
- Payment method configuration per venue
- Real-time synchronization with KDS

### 3. Kitchen Display System (KDS)

**Core Features:**
- Real-time order feed organized by status
- Color-coded priority & prep timers
- Order grouping by section/station
- Completion marking with sound cues
- Support for multiple KDS devices across sections

**Integration:**
- Seamless connection with POS
- Automatic inventory deduction on order completion
- Real-time updates across all connected devices

### 4. Payment Processing & Merchant Services

**Supported Gateways:**
- Beam (Thailand - primary partner)
- Omise
- Stripe
- LinePay
- PromptPay
- And more

**Key Features:**
- Auto-detect sandbox/live via key prefixes
- Mixed payment support (cash + card + QR)
- Commission handling for Rocket Feast plans
- Settlement reconciliation & reporting
- PCI-compliant handling
- Webhook signature verification

**Merchant Onboarding:**
- Rocket Feast collects KYC data
- Forwards to Beam (partnership arrangement)
- Streamlined approval process

### 5. Inventory & Procurement System

**Hierarchy:**
- **Core ingredients** → **Prepped ingredients** → **Products**
- Quantity mapping for each recipe
- Automatic deduction upon sale

**Features:**
- Threshold-based alerts (low/out-of-stock)
- Auto purchase order (PO) generation by supplier
- Supplier database with lead times and prices
- Stock-take scheduling and audit logging
- Cost-of-goods (COGS) tracking and reporting
- Real-time availability updates to QR menus

### 6. Staff Management & Gamification

**Time & Attendance:**
- Clock-in/out with geofenced attendance
- Anti-spoofing measures
- Manager-set schedules
- Staff app for viewing schedules

**Leave Management:**
- Self-service submission
- Manager approval workflow
- Leave balance tracking

**Dynamic Task Lists:**
- **Time-based tasks** (e.g., "Check fridge temp 14:00")
- **Trigger-based tasks** (e.g., "Customer scanned QR but no order in 10 min")
- Auto-assignment to staff/teams

**Gamification System:**
- Points earned per completed task
- Redeem points for vouchers and bonuses
- Leaderboards & performance dashboards
- Badges and achievement levels

**Performance Metrics:**
- Attendance tracking
- Sales contribution
- Task completion rate
- Upsell rate
- Customer feedback scores

### 7. Customer Loyalty & Feedback

**Loyalty Program:**
- Membership via phone number
- Point accrual based on spend
- Redeem points for discounts
- Voucher system (time-limited, quantity-limited)
- Fixed or percentage-based discounts

**Feedback Loop:**
- Post-visit feedback collection
- **Negative feedback** → Internal contact form / voucher recovery
- **Positive feedback** → Redirect to Google / TripAdvisor / Wongnai
- Sentiment tracking dashboard
- Automated response workflows

### 8. Discounts & Promotions

**Types:**
- Product-level discounts
- Cart-level discounts
- Conditional rules (time, day, quantity)
- Promo codes
- Auto-apply campaigns

**Integration:**
- Seamless integration with loyalty system
- Time-based activation/deactivation
- Usage limit controls

### 9. Reporting & Analytics

**Sales Reports:**
- Daily/weekly/monthly breakdowns
- By category, by item
- Revenue trends and forecasting

**Staff Performance:**
- Sales contribution
- Attendance records
- Task completion rates
- Gamification leaderboards

**Inventory Analytics:**
- Usage tracking
- Wastage identification
- COGS analysis

**Customer Analytics:**
- Repeat rate
- Loyalty activity
- Feedback sentiment analysis
- Demographic insights

**Financial Reports:**
- Payment method breakdown
- Commission tracking
- Settlement reconciliation

**Export Options:**
- CSV
- PDF
- API access for BI tools

### 10. Admin / Configuration Panel

**Multi-Venue Management:**
- Centralized control for multiple locations
- Location-specific settings
- Cross-venue reporting

**Configuration:**
- Payment gateway credential setup
- Menu builder with categories, modifiers, media
- Tax and service-charge configuration
- Role-based permissions (Owner, Admin, Manager, Staff, Kitchen)
- API keys and webhook management
- Tenant settings (branding, language, timezone)

**Data Management:**
- Data export functionality
- Audit logs for sensitive actions
- Backup and restore capabilities

## Roles & Permissions

| Role | Key Permissions |
|------|----------------|
| **Customer** | Browse menu, order, pay, give feedback, join loyalty |
| **Staff** | Manage orders, clock-in/out, complete tasks, earn points |
| **Kitchen** | Receive and complete KDS tickets |
| **Manager** | Approve leave, adjust rosters, view reports, manage menu |
| **Admin/Owner** | Configure system, manage tenants, payments, integrations |

## Security & Compliance

**Encryption:**
- TLS 1.3 encryption in transit
- AES-256 encryption at rest
- Encrypted payment tokens (no card storage)

**Access Control:**
- Role-based access control (RBAC)
- Multi-tenant isolation via row-level security
- OAuth 2.0 / JWT authentication
- Optional MFA for admin accounts

**Compliance:**
- PCI DSS alignment
- Regular vulnerability testing
- Audit logs for all sensitive actions
- GDPR-ready data handling

## Multi-Device & Hardware Support

**Software:**
- Web app (mobile, tablet, desktop)
- iOS / Android PWA ready
- POS & KDS tablet mode

**Hardware Integration:**
- Bluetooth printer support
- Cash drawer integration
- Barcode scanner support
- Optional customer-facing display mode

## Communications & Notifications

**Channels:**
- SMS notifications
- Email notifications
- LINE notifications (Thailand)
- In-app alerts

**Trigger Types:**
- New orders
- Order status updates
- Feedback submissions
- Shift reminders
- Task assignments
- Configurable escalation (e.g., overdue orders)

## Integrations

**Current:**
- Payment Gateways: Beam, Omise, Stripe, LinePay, PromptPay
- Analytics: GA4, Meta Pixel, Hotjar

**Planned:**
- CRM: Mailchimp / Brevo / HubSpot (via API)
- Accounting: Xero / QuickBooks exports
- CMS: Sanity / Headless WP / Ghost for marketing content

## Gamification Ecosystem

**XP Points System:**
- Earn points for completed tasks
- Earn points for positive guest reviews
- Point multipliers for streaks

**Progression:**
- Levels & Badges
- Achievement milestones
- Team competitions

**Leaderboards:**
- Ranked by venue
- Ranked by team
- Global rankings (optional)

**Rewards:**
- Points → Voucher redemption
- Exclusive perks for top performers
- Recognition systems

**Impact:**
- Increased engagement
- Reduced staff turnover
- Improved task completion rates
- Enhanced service quality

## Merchant & Partner Features

**Beam Partnership:**
- Rocket Feast acts as onboarding intermediary
- KYC collection and verification
- Streamlined merchant approval

**Commission Routing:**
- Automatic withholding at settlement
- Transparent fee structure
- Real-time commission tracking

**Partner Dashboard:**
- Beam/PSPs can monitor onboarded merchants
- Performance metrics
- Settlement reports

**Future:**
- Referral program for partner venues
- Revenue sharing models
- Co-marketing opportunities

## Competitive Advantages

| Competitor | Their Strength | Rocket Feast Advantage |
|-----------|---------------|----------------------|
| **Toast POS** | US-centric, strong POS | Integrated inventory, gamification, and loyalty in one platform |
| **Square** | Simple POS/payments | Multi-zone QR, hospitality-specific operations, staff management |
| **TabSquare / Storekit** | QR menus | Full staff, inventory, and analytics layer included |
| **Lightspeed** | Enterprise POS | Lower cost, more automation, better staff engagement |

## Future Roadmap

### Q1 2026
- Multi-currency support
- Expanded global payments (Stripe, Adyen)
- Enhanced analytics dashboard

### Q2 2026
- Franchise dashboard for parent companies
- Advanced reporting suite
- AI-powered insights (beta)

### Q3 2026
- White-label capabilities for reseller partners
- Custom branding options
- Partner API marketplace

### Q4 2026
- AI-driven demand forecasting (inventory + staffing)
- Predictive analytics
- Automated scheduling optimization

## Key Success Metrics

**Business Metrics:**
- Monthly active venues
- Monthly order volume
- Average revenue per seat
- Merchant retention (month 6, 12)

**Operational Metrics:**
- % of orders via QR vs staff input
- % of tasks completed on time by staff
- Average response time to customer issues

**Customer Satisfaction:**
- Average guest rating improvement
- Net Promoter Score (NPS)
- Customer retention rate

## Strategic Vision

Rocket Feast is not just a POS — it's the **operating system for human-centered hospitality**.

By merging automation with empathy, it lets restaurants scale without losing soul.

**Long-term Goals:**
- House Ecosystem Integration (shared loyalty/wallet across venues)
- Hospitality-as-a-Service API for third-party developers
- Hardware Partnerships for plug-and-play restaurant kits
- Global expansion with localized features
- Industry-leading sustainability tracking features
