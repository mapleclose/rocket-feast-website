"use client";

import { Header } from "@/components/marketing/header-navigation/header";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { CaseStudySection } from "@/components/marketing/case-studies/case-study-section";
import { CTACardVertical } from "@/components/marketing/cta/cta-card-vertical";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { useI18n } from "@/hooks/use-i18n";

const CaseStudiesHeaderSection = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">{t("caseStudies.page.badge")}</span>
                    <h1 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">{t("caseStudies.page.title")}</h1>
                    <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">{t("caseStudies.page.subtitle")}</p>
                </div>
            </div>
        </section>
    );
};

const BlogPage10 = () => {
    const { t } = useI18n();

    return (
        <div className="bg-primary">
            <Header />

            <CaseStudiesHeaderSection />

            <CaseStudySection
                badge={t("caseStudies.sunsetClub.badge")}
                title={t("caseStudies.sunsetClub.title")}
                imageUrl={t("caseStudies.sunsetClub.imageUrl")}
                author={t("caseStudies.sunsetClub.author")}
                sections={t("caseStudies.sunsetClub.sections")}
                outcomes={t("caseStudies.sunsetClub.outcomes")}
                ctaPrimary={t("caseStudies.sunsetClub.ctaPrimary")}
                ctaSecondary={t("caseStudies.sunsetClub.ctaSecondary")}
            />

            <SectionDivider />

            <CaseStudySection
                badge={t("caseStudies.gardenCafe.badge")}
                title={t("caseStudies.gardenCafe.title")}
                imageUrl={t("caseStudies.gardenCafe.imageUrl")}
                author={t("caseStudies.gardenCafe.author")}
                sections={t("caseStudies.gardenCafe.sections")}
                outcomes={t("caseStudies.gardenCafe.outcomes")}
                ctaPrimary={t("caseStudies.gardenCafe.ctaPrimary")}
                ctaSecondary={t("caseStudies.gardenCafe.ctaSecondary")}
                reverse
            />

            <SectionDivider />

            <CaseStudySection
                badge={t("caseStudies.baanCoffee.badge")}
                title={t("caseStudies.baanCoffee.title")}
                imageUrl={t("caseStudies.baanCoffee.imageUrl")}
                author={t("caseStudies.baanCoffee.author")}
                sections={t("caseStudies.baanCoffee.sections")}
                outcomes={t("caseStudies.baanCoffee.outcomes")}
                ctaPrimary={t("caseStudies.baanCoffee.ctaPrimary")}
                ctaSecondary={t("caseStudies.baanCoffee.ctaSecondary")}
            />

            <CTACardVertical />

            <FooterLarge04 />
        </div>
    );
};

export default BlogPage10;
