"use client";

import { ChartBreakoutSquare, MessageChatCircle, MessageSmileCircle, Zap } from "@untitledui/icons";
import { IPhoneMockup } from "@/components/shared-assets/iphone-mockup";
import { FeatureTextFeaturedIconTopLeft } from "./base-components/feature-text";

export const FeaturesIconsAndMockup01 = () => {
    return (
        <section className="overflow-hidden bg-primary pt-16 lg:py-24">
            <div className="mx-auto w-full max-w-container">
                <div className="flex w-full flex-col px-4 md:px-8 lg:max-w-210">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Features</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Overflowing with useful features</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 px-4 md:mt-16 md:gap-16 md:px-8 lg:grid-cols-2 lg:items-start">
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12">
                        {[
                            {
                                title: "Share team inboxes",
                                subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
                                icon: MessageChatCircle,
                            },
                            {
                                title: "Deliver instant answers",
                                subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
                                icon: Zap,
                            },
                            {
                                title: "Manage your team with reports",
                                subtitle:
                                    "Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
                                icon: ChartBreakoutSquare,
                            },
                            {
                                title: "Connect with customers",
                                subtitle:
                                    "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
                                icon: MessageSmileCircle,
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
