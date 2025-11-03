"use client";

import { Header } from "@/components/marketing/header-navigation/header";
import { PricingDetailTable } from "@/components/marketing/pricing-sections/pricing-detail-table";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { useI18n } from "@/hooks/use-i18n";

const PricingHeaderSection = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">{t("pricing.page.badge")}</span>
                    <h1 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">{t("pricing.page.title")}</h1>
                    <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">{t("pricing.page.subtitle")}</p>
                </div>
            </div>
        </section>
    );
};

const PricingPage06 = () => {
    return (
        <div className="bg-primary">
            <Header />

            <PricingHeaderSection />

            <PricingDetailTable />

            <FooterLarge04 />
        </div>
    );
};

export default PricingPage06;
