"use client";

import { QrCode01, Package, Users03, Gift01 } from "@untitledui/icons";
import { IPhoneMockup } from "@/components/shared-assets/iphone-mockup";
import { FeatureTextFeaturedIconTopLeft } from "./base-components/feature-text";
import { useI18n } from "@/hooks/use-i18n";

export const FeaturesIconsAndMockup01 = () => {
    const { t } = useI18n();

    return (
        <section className="overflow-hidden bg-primary pt-16 lg:py-24">
            <div className="mx-auto w-full max-w-container">
                <div className="flex w-full flex-col px-4 md:px-8 lg:max-w-210">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">{t("completePlatform.badge")}</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">{t("completePlatform.title")}</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        {t("completePlatform.subtitle")}
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 px-4 md:mt-16 md:gap-16 md:px-8 lg:grid-cols-2 lg:items-start">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12">
                        {[
                            {
                                title: t("completePlatform.qrPos.title"),
                                subtitle: t("completePlatform.qrPos.description"),
                                icon: QrCode01,
                            },
                            {
                                title: t("completePlatform.inventory.title"),
                                subtitle: t("completePlatform.inventory.description"),
                                icon: Package,
                            },
                            {
                                title: t("completePlatform.staffAutomation.title"),
                                subtitle: t("completePlatform.staffAutomation.description"),
                                icon: Users03,
                            },
                            {
                                title: t("completePlatform.loyalty.title"),
                                subtitle: t("completePlatform.loyalty.description"),
                                icon: Gift01,
                            },
                        ].map((item) => (
                            <li key={item.title}>
                                <FeatureTextFeaturedIconTopLeft icon={item.icon} title={item.title} subtitle={item.subtitle} />
                            </li>
                        ))}
                    </ul>

                    <div className="relative -ml-4 hidden w-screen md:ml-0 lg:flex lg:h-128 lg:w-full">
                        {/* Light mode image (hidden in dark mode) */}
                        <img
                            alt="Iphone and Screen Mockup 02"
                            src="https://www.untitledui.com/marketing/screen-mockups/iphone-and-screen-mockup-light-01.webp"
                            className="absolute -top-5 h-183 max-w-none object-contain dark:hidden"
                        />
                        {/* Dark mode image (hidden in light mode) */}
                        <img
                            alt="Iphone and Screen Mockup 02"
                            src="https://www.untitledui.com/marketing/screen-mockups/iphone-and-screen-mockup-dark-01.webp"
                            className="absolute -top-5 h-183 max-w-none object-contain not-dark:hidden"
                        />
                    </div>
                    <div className="relative flex h-90 w-full justify-center lg:hidden">
                        <IPhoneMockup
                            image="https://www.untitledui.com/marketing/screen-mockups/dashboard-mobile-mockup-light-01.webp"
                            imageDark="https://www.untitledui.com/marketing/screen-mockups/dashboard-mobile-mockup-dark-01.webp"
                            className="absolute top-0 w-71 shadow-3xl drop-shadow-iphone-mockup"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
