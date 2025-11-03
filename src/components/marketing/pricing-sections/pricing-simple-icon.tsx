"use client";

import { LayersThree01, LayersTwo01, Zap } from "@untitledui/icons";
import { PricingTierCardIcon } from "@/components/marketing/pricing-sections/base-components/pricing-tier-card";
import { useI18n } from "@/hooks/use-i18n";

export const PricingSimpleIcon = () => {
    const { t, formatCurrency, regional } = useI18n();

    const plans = [
        {
            title: t("pricingSection.starter.title"),
            subtitle: formatCurrency(regional.pricing.starter),
            description: t("pricingSection.starter.description"),
            features: t("pricingSection.starter.features"),
            icon: Zap,
        },
        {
            title: t("pricingSection.professional.title"),
            subtitle: formatCurrency(regional.pricing.professional),
            description: t("pricingSection.professional.description"),
            features: t("pricingSection.professional.features"),
            icon: LayersTwo01,
        },
        {
            title: t("pricingSection.enterprise.title"),
            subtitle: formatCurrency(regional.pricing.enterprise),
            description: t("pricingSection.enterprise.description"),
            features: t("pricingSection.enterprise.features"),
            icon: LayersThree01,
        },
    ];
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex w-full max-w-3xl flex-col">
                    <p className="text-sm font-semibold text-brand-secondary md:text-md">{t("pricingSection.badge")}</p>
                    <h2 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">{t("pricingSection.title")}</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">
                        {t("pricingSection.subtitle")}
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
