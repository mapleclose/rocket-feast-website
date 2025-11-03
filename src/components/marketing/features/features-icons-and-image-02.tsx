"use client";

import { ArrowRight, Building07, BarChart11, Users03 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FeatureTextFeaturedIconLeft } from "./base-components/feature-text";

export const FeaturesIconsAndImage02 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto w-full max-w-container px-4 md:px-8">
                <div className="flex w-full flex-col lg:max-w-3xl">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Built for Modern Hospitality</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Level Up Your Operations</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        Rocket Feast helps modern restaurants, cafes, and hospitality venues eliminate customer friction, deliver faster, and serve smarter. Fewer staff, more throughput, higher customer satisfaction.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                        {[
                            {
                                title: "Multi-Venue Restaurants",
                                subtitle: "Unify your brand with centralised workflow automation, inventory control, team accountability infrastructure, and consistent quality enforcement across all locations.",
                                icon: Building07,
                                cta: "Learn more",
                                href: "#",
                            },
                            {
                                title: "High-Volume Service Venues",
                                subtitle: "Ideal for restaurants, clubs, and hotel venues with fast-moving service. Reduce wait times, speed up fulfilment, and keep guests in control of their own experience.",
                                icon: Users03,
                                cta: "Learn more",
                                href: "#",
                            },
                            {
                                title: "Quality-Focused Operations",
                                subtitle: "Track and improve guest satisfaction in real time with integrated review capture and reporting. Standardise processes, maintain accountability, and scale quality as you grow.",
                                icon: BarChart11,
                                cta: "Learn more",
                                href: "#",
                            },
                        ].map((item) => (
                            <li key={item.title}>
                                <FeatureTextFeaturedIconLeft
                                    icon={item.icon}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    footer={
                                        <Button color="link-color" size="lg" href={item.href} iconTrailing={ArrowRight}>
                                            {item.cta}
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
