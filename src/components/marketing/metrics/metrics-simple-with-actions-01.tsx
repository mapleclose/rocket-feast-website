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
                            <h2 className="text-display-sm font-semibold text-primary md:text-display-md">Build something great</h2>
                            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Everything you need to build modern UI and great products.</p>
                        </div>
                        <div className="hidden gap-3.5 md:flex">
                            <Button iconLeading={PlayCircle} color="secondary" size="xl">
                                Demo
                            </Button>
                            <Button size="xl">Get started</Button>
                        </div>
                    </div>

                    <dl className="flex flex-col gap-8 md:flex-row">
                        {[
                            {
                                title: "400+",
                                subtitle: "Projects completed",
                                description: "We've helped build over 400 amazing projects.",
                            },
                            {
                                title: "600%",
                                subtitle: "Return on investment",
                                description: "Our customers have reported an average of ~600% ROI.",
                            },
                            {
                                title: "10k",
                                subtitle: "Global downloads",
                                description: "Our free UI kit has been downloaded over 10k times.",
                            },
                            {
                                title: "200+",
                                subtitle: "5-star reviews",
                                description: "We're proud of our 5-star rating with over 200 reviews.",
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
                            Demo
                        </Button>
                        <Button size="xl"> Get started</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
