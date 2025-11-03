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
            home: "Home",
            features: "Features",
            caseStudies: "Case Studies",
            pricing: "Pricing",
            faqs: "FAQs",
            contact: "Contact",
            products: "Products",
            services: "Services",
            resources: "Resources",
            about: "About",
            aboutUs: "About us",
            press: "Press",
            careers: "Careers",
            legal: "Legal",
            support: "Support",
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
        features: {
            page: {
                badge: "Features",
                title: "Everything You Need to Run Modern Hospitality",
                subtitle: "From guest ordering to kitchen operations, staff management to loyalty programs—Rocket Feast connects every part of your venue into one intelligent system.",
            },
        },
        pricing: {
            page: {
                badge: "Pricing",
                title: "Start Free, Scale When Ready",
                subtitle: "No credit card required. Every plan includes all the essentials for modern hospitality, with powerful upgrades as you grow.",
            },
            table: {
                tiers: {
                    starter: {
                        name: "Starter",
                        description: "Unlimited Users",
                    },
                    professional: {
                        name: "Professional",
                        description: "Per user, per month",
                    },
                    enterprise: {
                        name: "Enterprise",
                        description: "Per user, per month",
                    },
                },
                sections: {
                    ordering: {
                        name: "Guest Ordering & Payments",
                        features: {
                            qrOrdering: {
                                name: "QR code self-service ordering",
                                tooltip: {
                                    title: "Self-service ordering",
                                    description: "Guests scan QR codes to browse menus and place orders directly from their phones.",
                                },
                            },
                            pos: {
                                name: "POS for quick service and table management",
                                tooltip: {
                                    title: "Point of Sale system",
                                    description: "Integrated POS for staff to take orders and manage table service efficiently.",
                                },
                            },
                            inAppPayments: {
                                name: "Integrated in-app payments",
                                tooltip: {
                                    title: "Built-in payment processing",
                                    description: "Accept payments directly through the app with our integrated payment system.",
                                },
                            },
                            thirdPartyPayments: {
                                name: "Third-party payment processor integration",
                                tooltip: {
                                    title: "External payment gateways",
                                    description: "Connect your preferred payment processor like Stripe, Square, or PayPal.",
                                },
                            },
                        },
                    },
                    operations: {
                        name: "Operations & Analytics",
                        features: {
                            analytics: {
                                name: "Real-time sales analytics",
                                tooltip: {
                                    title: "Live sales insights",
                                    description: "Track sales performance, popular items, and revenue in real-time.",
                                },
                            },
                            inventory: {
                                name: "Complete inventory management",
                                tooltip: {
                                    title: "Stock control system",
                                    description: "Track ingredient levels, automate purchase orders, and generate prep lists.",
                                },
                            },
                            dietary: {
                                name: "Dietary sensitivity and allergen support",
                                tooltip: {
                                    title: "Allergen tracking",
                                    description: "Tag menu items with allergens and dietary information for guest safety.",
                                },
                            },
                            advancedAnalytics: {
                                name: "Advanced analytics and reporting",
                                tooltip: {
                                    title: "Deep business insights",
                                    description: "Comprehensive reports on trends, guest behavior, and operational efficiency.",
                                },
                            },
                        },
                    },
                    customer: {
                        name: "Customer Experience",
                        features: {
                            feedback: {
                                name: "Customer feedback and review funnel",
                                tooltip: {
                                    title: "Review collection",
                                    description: "Automatically prompt satisfied guests to leave reviews on major platforms.",
                                },
                            },
                            discounts: {
                                name: "Discount codes and vouchers",
                                tooltip: {
                                    title: "Promotional tools",
                                    description: "Create and manage discount codes, vouchers, and promotional campaigns.",
                                },
                            },
                            loyalty: {
                                name: "Built-in loyalty programme",
                                tooltip: {
                                    title: "Reward regular guests",
                                    description: "Points-based rewards system with guest profiles and purchase history.",
                                },
                            },
                        },
                    },
                    staff: {
                        name: "Staff Management",
                        features: {
                            taskManagement: {
                                name: "Gamified staff task management",
                                tooltip: {
                                    title: "Engaging task system",
                                    description: "Time-sensitive checklists with gamification to keep staff motivated and accountable.",
                                },
                            },
                            performance: {
                                name: "Staff performance tracking",
                                tooltip: {
                                    title: "Team accountability",
                                    description: "Monitor task completion, service speed, and individual performance metrics.",
                                },
                            },
                            roster: {
                                name: "Roster and leave tracking",
                                tooltip: {
                                    title: "Scheduling system",
                                    description: "Manage staff schedules, time-off requests, and shift assignments.",
                                },
                            },
                            issues: {
                                name: "Issue tracking and resolution system",
                                tooltip: {
                                    title: "Problem management",
                                    description: "Log, track, and resolve operational issues with accountability workflows.",
                                },
                            },
                        },
                    },
                    integrations: {
                        name: "Integrations & Enterprise",
                        features: {
                            customIntegrations: {
                                name: "Custom enterprise integrations",
                                tooltip: {
                                    title: "Bespoke connections",
                                    description: "Custom API integrations with your existing ERP, accounting, or business systems.",
                                },
                            },
                        },
                    },
                },
            },
        },
        caseStudies: {
            page: {
                badge: "Case Studies",
                title: "Real Results from Real Venues",
                subtitle: "See how leading hospitality operators use Rocket Feast to serve more guests, reduce costs, and deliver exceptional experiences.",
            },
            sunsetClub: {
                badge: "Case study",
                title: "How Sunset Club Cut Staffing Costs by 41%",
                imageUrl: "https://www.untitledui.com/marketing/smiling-girl-6.webp",
                author: {
                    name: "Sienna Hewitt",
                    title: "Operations Manager",
                    company: "Sunset Club",
                },
                sections: [
                    "When Sunset Club implemented Rocket Feast's QR ordering and automated workflows, they transformed their operations overnight. Guest self-service meant fewer front-of-house staff were needed, while orders flowed directly to the kitchen with zero errors.",
                    "The results were immediate: average order values increased by 22% as guests felt comfortable reordering throughout their visit. Service speed improved dramatically, and guest satisfaction scores reached an all-time high of 96%.",
                ],
                outcomes: {
                    title: "Measurable Impact",
                    description: "Within the first month, Sunset Club saw transformative results across all operational metrics.",
                },
                ctaPrimary: "Chat to us",
                ctaSecondary: "Read full case study",
            },
            gardenCafe: {
                badge: "Case study",
                title: "The Garden Cafe's Kitchen Revolution",
                imageUrl: "https://www.untitledui.com/marketing/two-people.webp",
                author: {
                    name: "Caitlyn King",
                    title: "Head Chef",
                    company: "The Garden Cafe",
                },
                sections: [
                    "The Garden Cafe was struggling with kitchen bottlenecks during peak hours. Orders were getting lost, tickets were unclear, and the team was stressed. Rocket Feast's station-specific kitchen displays and automatic prioritisation changed everything.",
                    "Now, orders route directly to the right prep stations, timing is perfect, and guests receive live updates on their phones. The kitchen team can handle 40% more orders in the same timeframe, with virtually zero errors.",
                ],
                outcomes: {
                    title: "Operational Excellence",
                    description: "Kitchen efficiency improved across the board, with happier staff and delighted guests.",
                },
                ctaPrimary: "Chat to us",
                ctaSecondary: "Read full case study",
            },
            baanCoffee: {
                badge: "Case study",
                title: "Baan Coffee's Path to Multi-Venue Success",
                imageUrl: "https://www.untitledui.com/blog/two-people.webp",
                author: {
                    name: "Lulu Meyers",
                    title: "Owner",
                    company: "Baan Coffee Roasters",
                },
                sections: [
                    "As Baan Coffee expanded from one location to three, maintaining consistency became increasingly difficult. Different staff, different processes, and no centralised visibility meant quality varied across venues.",
                    "Rocket Feast unified their operations with centralised menu management, inventory tracking, and staff performance monitoring. Now, Lulu can see real-time data from all locations, ensure consistent quality, and identify which venues need support—all from a single dashboard.",
                ],
                outcomes: {
                    title: "Scaling with Confidence",
                    description: "Multi-venue management became effortless, with consistent quality and centralised insights.",
                },
                ctaPrimary: "Chat to us",
                ctaSecondary: "Read full case study",
            },
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
