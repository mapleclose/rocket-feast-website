"use client";

import { QrCode01, Package, Users03, Gift01 } from "@untitledui/icons";
import { IPhoneMockup } from "@/components/shared-assets/iphone-mockup";
import { FeatureTextFeaturedIconTopLeft } from "./base-components/feature-text";

export const FeaturesIconsAndMockup01 = () => {
    return (
        <section className="overflow-hidden bg-primary pt-16 lg:py-24">
            <div className="mx-auto w-full max-w-container">
                <div className="flex w-full flex-col px-4 md:px-8 lg:max-w-210">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Complete Platform</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Everything You Need in One System</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        Stop juggling spreadsheets and disconnected apps. Rocket Feast unifies your operation into one platform designed to help teams work faster and guests order easier.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 px-4 md:mt-16 md:gap-16 md:px-8 lg:grid-cols-2 lg:items-start">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12">
                        {[
                            {
                                title: "QR & POS Ordering",
                                subtitle: "Give guests full control of their experience while keeping traditional POS workflows for your team. A single system that powers self-service, quick service, and table operations seamlessly.",
                                icon: QrCode01,
                            },
                            {
                                title: "Smart Inventory Management",
                                subtitle: "Automated purchase orders, prep lists, and low-stock alerts ensure your kitchen always runs efficiently and stays ahead of demand.",
                                icon: Package,
                            },
                            {
                                title: "Staff Automation & Gamification",
                                subtitle: "Turn daily routines into motivating workflows. Keep your team accountable and enthusiastic with task tracking, time-sensitive prompts, and gamified rewards that boost efficiency.",
                                icon: Users03,
                            },
                            {
                                title: "Customer Loyalty & Analytics",
                                subtitle: "Reward regulars automatically and understand your guests with a built-in loyalty programme, performance dashboards, and actionable insights that increase long-term value.",
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
