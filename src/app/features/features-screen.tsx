"use client";

import { useState } from "react";
import { ArrowRight } from "@untitledui/icons";
import { Header } from "@/components/marketing/header-navigation/header";
import { Button } from "@/components/base/buttons/button";
import { FeatureTabHorizontal } from "@/components/marketing/features/base-components/feature-tab";
import { CTASimpleCentered } from "@/components/marketing/cta/cta-simple-centered";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { useI18n } from "@/hooks/use-i18n";

const FeatureTabs = ({ features, title, subtitle, badge }: { features: Array<{ title: string; subtitle: string }>; title: string; subtitle: string; badge: string }) => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <section className="overflow-hidden bg-primary py-16 md:py-24">
            <div className="mx-auto w-full max-w-container px-4 md:px-8">
                <div className="flex w-full flex-col lg:max-w-3xl">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">{badge}</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">{title}</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{subtitle}</p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                    <ul className="flex flex-col">
                        {features.map((item, index) => (
                            <li key={item.title} onClick={() => setCurrentTab(index)}>
                                <FeatureTabHorizontal
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    isCurrent={index === currentTab}
                                    footer={
                                        <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight}>
                                            Learn more
                                        </Button>
                                    }
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="relative -ml-4 flex h-90 w-screen items-start justify-center sm:w-auto lg:h-128">
                        {/* Desktop */}
                        <div className="absolute top-0 left-16 hidden w-max lg:block lg:h-168.5 lg:max-h-168.5">
                            <div className="size-full rounded-[9.03px] bg-primary p-[0.9px] shadow-lg ring-[0.56px] ring-utility-gray-300 ring-inset md:rounded-[26.95px] md:p-[3.5px] md:ring-[1.68px]">
                                <div className="size-full rounded-[7.9px] bg-primary p-0.5 shadow-modern-mockup-inner-md md:rounded-[23.58px] md:p-1 md:shadow-modern-mockup-inner-lg">
                                    <div className="relative size-full overflow-hidden rounded-[6.77px] bg-utility-gray-50 ring-[0.56px] ring-utility-gray-200 md:rounded-[20.21px] md:ring-[1.68px]">
                                        <img
                                            alt="Dashboard mockup showing application interface"
                                            src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-light-01.webp"
                                            className="size-full object-cover object-left-top dark:hidden"
                                        />
                                        <img
                                            alt="Dashboard mockup showing application interface"
                                            src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-dark-01.webp"
                                            className="size-full object-cover object-left-top not-dark:hidden"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="w-max max-w-70 lg:absolute lg:top-26 lg:left-0">
                            <div className="size-full rounded-[23.89px] bg-primary p-[3px] shadow-lg ring-[1.49px] ring-utility-gray-300 ring-inset">
                                <div className="size-full rounded-[20.91px] bg-primary p-1 shadow-modern-mockup-inner-lg">
                                    <div className="relative size-full overflow-hidden rounded-[17.92px] bg-utility-gray-50 ring-[1.49px] ring-utility-gray-200">
                                        <img
                                            alt="Mobile app interface mockup"
                                            src="https://www.untitledui.com/marketing/screen-mockups/dashboard-mobile-mockup-light-01.webp"
                                            className="size-full object-cover object-left-top dark:hidden"
                                        />
                                        <img
                                            alt="Mobile app interface mockup"
                                            src="https://www.untitledui.com/marketing/screen-mockups/dashboard-mobile-mockup-dark-01.webp"
                                            className="size-full object-cover object-left-top not-dark:hidden"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeaturesHeaderSection = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">{t("features.page.badge")}</span>
                    <h1 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">{t("features.page.title")}</h1>
                    <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">{t("features.page.subtitle")}</p>
                </div>
            </div>
        </section>
    );
};

export default function FeaturesScreen() {
    return (
        <div>
            <Header />

            <FeaturesHeaderSection />

            {/* Guest Experience & Ordering */}
            <FeatureTabs
                badge="Guest Experience"
                title="Effortless Ordering, Every Time"
                subtitle="Let guests browse, customize, and order from their phones with zero friction. No app download required."
                features={[
                    {
                        title: "QR Code Self-Service",
                        subtitle: "Guests scan a QR code to instantly access your menu from their phone. Browse, customize, and order without waiting for staff.",
                    },
                    {
                        title: "Real-Time Order Tracking",
                        subtitle: "Guests see exactly where their order is in the preparation process, from kitchen to table.",
                    },
                    {
                        title: "Dietary Filtering & Allergen Support",
                        subtitle: "Filter menu items by dietary preferences and allergies to ensure safe, personalized dining experiences.",
                    },
                ]}
            />

            {/* Loyalty & Rewards */}
            <FeatureTabs
                badge="Loyalty & Rewards"
                title="Turn Guests Into Regulars"
                subtitle="Build lasting relationships with automated loyalty programs that reward repeat visits and drive engagement."
                features={[
                    {
                        title: "Points-Based Rewards",
                        subtitle: "Automatically reward guests with points on every purchase. Set custom redemption rules and tier levels.",
                    },
                    {
                        title: "Guest Profiles & History",
                        subtitle: "Track guest preferences, order history, and spending patterns to deliver personalized experiences.",
                    },
                    {
                        title: "Integrated Review Funnel",
                        subtitle: "Automatically prompt satisfied guests to leave reviews on Google, TripAdvisor, and other platforms.",
                    },
                ]}
            />

            {/* Kitchen & Operations */}
            <FeatureTabs
                badge="Kitchen Operations"
                title="Streamline Your Kitchen Flow"
                subtitle="Connect your front-of-house to your kitchen with real-time order routing and station-specific displays."
                features={[
                    {
                        title: "Kitchen Display System",
                        subtitle: "Route orders automatically to the right prep stations. Track timing and prevent bottlenecks in real time.",
                    },
                    {
                        title: "Inventory Management",
                        subtitle: "Automated stock tracking, low-stock alerts, and purchase order generation keep your kitchen running smoothly.",
                    },
                    {
                        title: "Prep Lists & Planning",
                        subtitle: "Generate daily prep lists based on forecasted demand and historical sales data.",
                    },
                ]}
            />

            {/* Staff Management */}
            <FeatureTabs
                badge="Staff Management"
                title="Empower Your Team"
                subtitle="Automate workflows, gamify tasks, and keep your team motivated with intelligent staff management tools."
                features={[
                    {
                        title: "Gamified Task Management",
                        subtitle: "Turn daily tasks into engaging challenges. Staff earn points and rewards for completing duties on time.",
                    },
                    {
                        title: "Performance Tracking",
                        subtitle: "Monitor individual and team performance with real-time dashboards and accountability metrics.",
                    },
                    {
                        title: "Roster & Leave Management",
                        subtitle: "Automated scheduling, shift swaps, and leave requests keep staffing organized and efficient.",
                    },
                ]}
            />

            <CTASimpleCentered />

            <FooterLarge04 />
        </div>
    );
}
