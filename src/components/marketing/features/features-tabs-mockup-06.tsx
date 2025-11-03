"use client";

import { useState } from "react";
import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeatureTabHorizontal } from "@/components/marketing/features/base-components/feature-tab";

export const FeaturesTabsMockup06 = () => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <section className="overflow-hidden bg-primary py-16 md:py-24">
            <div className="mx-auto w-full max-w-container px-4 md:px-8">
                <div className="flex w-full flex-col lg:max-w-3xl">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Features</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Everything You Need to Run Modern Hospitality</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        From guest-facing ordering to kitchen automation and staff management, Rocket Feast connects every part of your operation into one intelligent system.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                    <ul className="flex flex-col">
                        {[
                            {
                                title: "Guest Experience & In-App Ordering",
                                subtitle: "Let guests browse beautifully designed menus, customize orders to their preferences, and track progress in real time. No app download required—just scan, order, and enjoy with seamless in-app payment and dietary filtering.",
                            },
                            {
                                title: "Loyalty & Rewards System",
                                subtitle: "Build lasting relationships with automated points-based rewards, personalized guest profiles, and integrated review funnels. Turn one-time visitors into regulars with incentives that drive repeat business and increase lifetime value.",
                            },
                            {
                                title: "Self-Service & Staff Automation",
                                subtitle:
                                    "Empower guests to control their own experience while automating your team's workflows. From QR ordering and kitchen displays to gamified task management and performance tracking, run lean without sacrificing quality.",
                            },
                        ].map((item, index) => (
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
                                        {/* Light mode image (hidden in dark mode) */}
                                        <img
                                            alt="Dashboard mockup showing application interface"
                                            src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-light-01.webp"
                                            className="size-full object-cover object-left-top dark:hidden"
                                        />
                                        {/* Dark mode image (hidden in light mode) */}
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
                                        {/* Light mode image (hidden in dark mode) */}
                                        <img
                                            alt="Mobile app interface mockup"
                                            src="https://www.untitledui.com/marketing/screen-mockups/dashboard-mobile-mockup-light-01.webp"
                                            className="size-full object-cover object-left-top dark:hidden"
                                        />
                                        {/* Dark mode image (hidden in light mode) */}
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
