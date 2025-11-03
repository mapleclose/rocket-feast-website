import type { I18nConfig } from "@/types/i18n";

/**
 * Base configuration for Global English (global-en)
 * This is the default fallback for all content
 */
export const globalEnConfig: I18nConfig = {
    regional: {
        company: {
            name: "Rocket Feast",
            legalName: "Maple Close Ltd",
            country: "Hong Kong",
        },
        currency: {
            code: "USD",
            symbol: "$",
            locale: "en-US",
        },
        pricing: {
            starter: 0,
            professional: 10,
            enterprise: 30,
        },
    },
    content: {
        common: {
            learnMore: "Learn more",
            getStarted: "Get Started",
            getStartedFree: "Get Started for Free",
            contactUs: "Contact Us",
            signUp: "Sign up",
            signIn: "Sign in",
            logIn: "Log in",
            readMore: "Read more",
            comingSoon: "Coming soon",
            watchDemo: "Watch Demo",
            bookDemo: "Book a Demo",
        },
        nav: {
            products: "Products",
            services: "Services",
            pricing: "Pricing",
            resources: "Resources",
            about: "About",
            aboutUs: "About us",
            press: "Press",
            careers: "Careers",
            legal: "Legal",
            support: "Support",
            contact: "Contact",
            sitemap: "Sitemap",
            cookieSettings: "Cookie settings",
        },
        hero: {
            title: "Great Hospitality, Automated.",
            subtitle: "Serve more guests at higher quality with fewer staff through one connected platform for ordering, payments, and operations.",
            ctaPrimary: "Get Started for Free",
            ctaSecondary: "Watch Demo",
        },
        socialProof: {
            text: "Trusted by leading restaurants and hospitality venues",
        },
        why: {
            badge: "Why Rocket Feast",
            title: "Run Lean. Serve Better.",
            subtitle: "Modern hospitality demands speed, precision, and consistency. Rocket Feast connects your front-of-house, kitchen, and back-office into one intelligent system that helps you serve more guests at a higher standard with fewer staff.",
            guestOrdering: {
                title: "Guest-Centric Ordering",
                description: "QR ordering that feels effortless and personal. Guests browse and customise their meals from their phones while your staff focus on genuine hospitality.",
            },
            operatorPlatform: {
                title: "Operator-First Platform",
                description: "Built by restaurant operators who know the daily challenges. Automate staff workflows, gain real-time visibility, and run your entire operation from a single dashboard.",
            },
        },
        builtFor: {
            badge: "Built for Modern Hospitality",
            title: "Level Up Your Operations",
            subtitle: "Rocket Feast helps modern restaurants, cafes, and hospitality venues eliminate customer friction, deliver faster, and serve smarter. Fewer staff, more throughput, higher customer satisfaction.",
            multiVenue: {
                title: "Multi-Venue Restaurants",
                description: "Unify your brand with centralised workflow automation, inventory control, team accountability infrastructure, and consistent quality enforcement across all locations.",
            },
            highVolume: {
                title: "High-Volume Service Venues",
                description: "Ideal for restaurants, clubs, and hotel venues with fast-moving service. Reduce wait times, speed up fulfilment, and keep guests in control of their own experience.",
            },
            qualityFocused: {
                title: "Quality-Focused Operations",
                description: "Track and improve guest satisfaction in real time with integrated review capture and reporting. Standardise processes, maintain accountability, and scale quality as you grow.",
            },
        },
        metrics: {
            title: "Proven Results with Market Leaders",
            subtitle: "Rocket Feast delivers measurable impact for forward-thinking operators.",
            smallerTeams: {
                value: "41%",
                label: "Smaller teams",
                description: "Venues achieve the same output with leaner front-of-house staffing through automated ordering and workflows.",
            },
            higherAov: {
                value: "22%",
                label: "Higher average order values",
                description: "Friction-free reordering and convenience drive more frequent and larger purchases.",
            },
            fasterDelivery: {
                value: "1.4×",
                label: "Faster time to delivery",
                description: "Connected ordering, kitchen, and fulfilment systems cut bottlenecks and reduce guest wait times.",
            },
            satisfaction: {
                value: "96%",
                label: "Guest satisfaction",
                description: "Average satisfaction rate from guests using Rocket Feast's digital ordering experience.",
            },
        },
        completePlatform: {
            badge: "Complete Platform",
            title: "Everything You Need in One System",
            subtitle: "Stop juggling spreadsheets and disconnected apps. Rocket Feast unifies your operation into one platform designed to help teams work faster and guests order easier.",
            qrPos: {
                title: "QR & POS Ordering",
                description: "Give guests full control of their experience while keeping traditional POS workflows for your team. A single system that powers self-service, quick service, and table operations seamlessly.",
            },
            inventory: {
                title: "Smart Inventory Management",
                description: "Automated purchase orders, prep lists, and low-stock alerts ensure your kitchen always runs efficiently and stays ahead of demand.",
            },
            staffAutomation: {
                title: "Staff Automation & Gamification",
                description: "Turn daily routines into motivating workflows. Keep your team accountable and enthusiastic with task tracking, time-sensitive prompts, and gamified rewards that boost efficiency.",
            },
            loyalty: {
                title: "Customer Loyalty & Analytics",
                description: "Reward regulars automatically and understand your guests with a built-in loyalty programme, performance dashboards, and actionable insights that increase long-term value.",
            },
        },
        howItWorks: {
            badge: "How It Works",
            title: "Seamless Operations from Order to Close",
            subtitle: "Rocket Feast connects every touchpoint in your operation so service flows naturally and data works for you.",
            guestOrdering: {
                title: "Guest Ordering Made Personal",
                description: "Guests scan a QR code to browse a beautifully designed, photo-rich menu filtered by dietary sensitivities. They customise and place orders instantly, and can track progress from preparation to serving.",
                features: [
                    "Photo-optimised menus with filters for allergies and diets",
                    "Real-time menu updates and availability",
                    "Live order progress notifications for guests",
                ],
            },
            kitchen: {
                title: "Kitchen Operations That Flow",
                description: "Orders route automatically to the right stations for faster prep and perfect coordination. Guests stay informed as orders move through the system.",
                features: [
                    "Station-specific kitchen displays for precision workflow",
                    "Automatic prioritisation to prevent bottlenecks",
                    "Instant updates to guests when orders are ready",
                ],
            },
            staff: {
                title: "Staff & Back-Office Automation",
                description: "Keep teams organised and motivated with automated scheduling, checklists, and performance tracking.",
                features: [
                    "Time-sensitive and scheduled tasks with photo verification",
                    "Roster generation and leave tracking",
                    "Gamified performance rewards that drive engagement",
                ],
            },
            customerLoyalty: {
                title: "Customer Loyalty & Analytics",
                description: "Increase lifetime value with a built-in loyalty programme and integrated guest insights.",
                features: [
                    "Points-based rewards based on guest spending",
                    "Guest profiles with order history and personalised menus",
                    "Review funnel integration for major platforms",
                ],
            },
        },
        pricingSection: {
            badge: "Pricing",
            title: "Start Free, Scale When Ready",
            subtitle: "No credit card required. Every plan includes all the essentials for modern hospitality, with powerful upgrades as you grow.",
            starter: {
                title: "Starter",
                description: "Unlimited Users",
                features: [
                    "QR code self-service ordering",
                    "POS for quick service and table management",
                    "Integrated in-app payments ",
                    "Real-time sales analytics",
                    "Customer feedback and review funnel",
                    "Discount codes and vouchers",
                    "Gamified staff task management",
                    "Staff performance tracking",
                    "Roster and leave tracking",
                ],
            },
            professional: {
                title: "Professional",
                description: "Per user, per month",
                features: [
                    "Everything in Starter",
                    "Third-party payment processor integration",
                    "Complete inventory management",
                    "Dietary sensitivity and allergen support",
                ],
            },
            enterprise: {
                title: "Enterprise",
                description: "Per user, per month",
                features: [
                    "Everything in Professional",
                    "Built-in loyalty programme",
                    "Issue tracking and resolution system",
                    "Advanced analytics and reporting",
                    "Custom enterprise integrations",
                ],
            },
        },
        testimonials: {
            reviews: [
                {
                    quote: "Rocket Feast cut our staffing costs almost in half. Guests order faster, spend more, and service never bottlenecks.",
                    author: {
                        name: "Sienna Hewitt",
                        title: "Operations Manager, Sunset Club",
                    },
                },
                {
                    quote: "The kitchen flow is completely transformed. We serve more guests in less time with fewer mistakes.",
                    author: {
                        name: "Caitlyn King",
                        title: "Head Chef, The Garden Cafe",
                    },
                },
                {
                    quote: "Finally, a platform built by people who understand how hospitality really works. The ROI was immediate.",
                    author: {
                        name: "Lulu Meyers",
                        title: "Owner, Baan Coffee Roasters",
                    },
                },
            ],
        },
        cta: {
            badge: "Ready to Transform Your Operation?",
            title: "Start Free and Scale When You're Ready",
            titleMobile: "Start Free Today",
            subtitle: "Join hospitality venues improving efficiency, service speed, quality, and profitability with Rocket Feast. No credit card required. Setup takes minutes.",
            ctaPrimary: "Get Started for Free",
            ctaSecondary: "Book a Demo",
        },
        footer: {
            description: "Rocket Feast is the smart operating system for restaurants, cafes, and hospitality venues. It connects ordering, fulfilment, and staffing into one seamless workflow, helping you serve faster, run leaner, and deliver excellent guest experiences every time.",
            product: {
                label: "Product",
                features: "Features",
                pricing: "Pricing",
                integrations: "Integrations",
                demo: "Demo",
                demoBadge: "Free",
                useCases: "Use Cases",
                caseStudies: "Case Studies",
            },
            company: {
                label: "Company",
                about: "About",
                contact: "Contact",
                support: "Support",
                documentation: "Documentation",
                partnerProgram: "Partner Program",
                careers: "Careers",
            },
            legal: {
                terms: "Terms",
                privacy: "Privacy",
                cookies: "Cookies",
            },
            copyright: "All rights reserved.",
        },
    },
};
