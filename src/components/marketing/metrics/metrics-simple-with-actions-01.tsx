"use client";

import { PlayCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export const MetricsSimpleWithActions01 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col gap-12 md:gap-16">
                    <div className="flex items-start gap-8">
                        <div className="flex flex-1 flex-col">
                            <h2 className="text-display-sm font-semibold text-primary md:text-display-md">Proven Results with Market Leaders</h2>
                            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Rocket Feast delivers measurable impact for forward-thinking operators.</p>
                        </div>
                        <div className="hidden gap-3.5 md:flex">
                            <Button iconLeading={PlayCircle} color="secondary" size="xl">
                                Watch Demo
                            </Button>
                            <Button size="xl">Get Started Free</Button>
                        </div>
                    </div>

                    <dl className="flex flex-col gap-8 md:flex-row md:items-start">
                        {[
                            {
                                title: "41%",
                                subtitle: "Smaller teams",
                                description: "Venues achieve the same output with leaner front-of-house staffing through automated ordering and workflows.",
                            },
                            {
                                title: "22%",
                                subtitle: "Higher average order values",
                                description: "Friction-free reordering and convenience drive more frequent and larger purchases.",
                            },
                            {
                                title: "1.4×",
                                subtitle: "Faster time to delivery",
                                description: "Connected ordering, kitchen, and fulfilment systems cut bottlenecks and reduce guest wait times.",
                            },
                            {
                                title: "96%",
                                subtitle: "Guest satisfaction",
                                description: "Average satisfaction rate from guests using Rocket Feast's digital ordering experience.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-1 flex-col-reverse gap-3 text-center md:text-left">
                                <div className="flex flex-col gap-2">
                                    <dt className="text-lg font-semibold text-primary">{item.subtitle}</dt>
                                    <p className="hidden text-md text-tertiary md:block">{item.description}</p>
                                </div>
                                <dd className="text-display-lg font-semibold text-brand-tertiary_alt md:text-display-xl">{item.title}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="flex flex-col-reverse gap-3 md:hidden">
                        <Button iconLeading={PlayCircle} color="secondary" size="xl">
                            Watch Demo
                        </Button>
                        <Button size="xl">Get Started Free</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
