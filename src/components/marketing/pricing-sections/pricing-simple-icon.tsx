"use client";

import { LayersThree01, LayersTwo01, Zap } from "@untitledui/icons";
import { PricingTierCardIcon } from "@/components/marketing/pricing-sections/base-components/pricing-tier-card";
import { useI18n } from "@/hooks/use-i18n";

export const PricingSimpleIcon = () => {
    const { formatCurrency, regional } = useI18n();

    const plans = [
        {
            title: "Starter",
            subtitle: formatCurrency(regional.pricing.starter),
            description: "Forever Free",
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
            icon: Zap,
        },
        {
            title: "Professional",
            subtitle: formatCurrency(regional.pricing.professional),
            description: "Per user, per month",
            features: [
                "Everything in Starter",
                "Third-party payment processor integration",
                "Complete inventory management",
                "Dietary sensitivity and allergen tracking",
            ],
            icon: LayersTwo01,
        },
        {
            title: "Enterprise",
            subtitle: formatCurrency(regional.pricing.enterprise),
            description: "Per user, per month",
            features: [
                "Everything in Professional",
                "Built-in loyalty programme",
                "Issue tracking and resolution system",
                "Advanced analytics and reporting",
                "Custom enterprise integrations",
            ],
            icon: LayersThree01,
        },
    ];
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex w-full max-w-3xl flex-col">
                    <p className="text-sm font-semibold text-brand-secondary md:text-md">Pricing</p>
                    <h2 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">Start Free, Scale When Ready</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">
                        No credit card required. Every plan includes all the essentials for modern hospitality, with powerful upgrades as you grow.
                    </p>
                </div>

                <div className="mt-16 grid w-full grid-cols-1 gap-4 md:mt-24 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                    {plans.map((plan) => (
                        <PricingTierCardIcon key={plan.title} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};
