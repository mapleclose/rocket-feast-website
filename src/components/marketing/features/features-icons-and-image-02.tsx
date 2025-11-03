"use client";

import { ArrowRight, Building07, BarChart11, Users03 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeatureTextFeaturedIconLeft } from "./base-components/feature-text";
import { useI18n } from "@/hooks/use-i18n";

export const FeaturesIconsAndImage02 = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto w-full max-w-container px-4 md:px-8">
                <div className="flex w-full flex-col lg:max-w-3xl">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">{t("builtFor.badge")}</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">{t("builtFor.title")}</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        {t("builtFor.subtitle")}
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                        {[
                            {
                                title: t("builtFor.multiVenue.title"),
                                subtitle: t("builtFor.multiVenue.description"),
                                icon: Building07,
                            },
                            {
                                title: t("builtFor.highVolume.title"),
                                subtitle: t("builtFor.highVolume.description"),
                                icon: Users03,
                            },
                            {
                                title: t("builtFor.qualityFocused.title"),
                                subtitle: t("builtFor.qualityFocused.description"),
                                icon: BarChart11,
                            },
                        ].map((item) => (
                            <li key={item.title}>
                                <FeatureTextFeaturedIconLeft
                                    icon={item.icon}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    footer={
                                        <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight}>
                                            {t("common.learnMore")}
                                        </Button>
                                    }
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="h-60 md:-ml-4 md:h-140">
                        <img src="https://www.untitledui.com/marketing/photographer-girl.webp" alt="Photographer girl" className="size-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};
