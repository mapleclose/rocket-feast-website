"use client";

import type { FC } from "react";
import { Button } from "@/components/base/buttons/button";
import { StarIcon } from "@/components/foundations/rating-stars";

interface CaseStudySectionProps {
    badge: string;
    title: string;
    imageUrl: string;
    author: {
        name: string;
        title: string;
        company: string;
    };
    sections: [string, string];
    outcomes: {
        title: string;
        description: string;
    };
    ctaPrimary: string;
    ctaSecondary: string;
    reverse?: boolean;
}

export const CaseStudySection: FC<CaseStudySectionProps> = ({
    badge,
    title,
    imageUrl,
    author,
    sections,
    outcomes,
    ctaPrimary,
    ctaSecondary,
    reverse = false,
}) => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2">
                <div className={`flex flex-col ${reverse ? "lg:order-last" : ""}`}>
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">{badge}</span>
                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">{title}</h2>
                    <div className="prose mt-12 md:prose-lg">
                        <p>{sections[0]}</p>
                        <p>{sections[1]}</p>

                        <h3 className="mb-4! text-display-xs! font-semibold md:mt-8">{outcomes.title}</h3>
                        <p>{outcomes.description}</p>
                    </div>
                    <div className="mt-12 hidden gap-3 md:flex">
                        <Button color="secondary" size="xl">
                            {ctaPrimary}
                        </Button>
                        <Button size="xl">{ctaSecondary}</Button>
                    </div>
                </div>

                <div className="relative h-140 lg:h-160">
                    <img src={imageUrl} className="size-full object-cover" alt={author.name} />

                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/40 to-black/0 pt-16 md:pt-20 lg:pt-24">
                        <div className="relative flex flex-col gap-1.5 bg-primary/30 p-4 pb-5 backdrop-blur-[10px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-alpha-white/30 md:gap-2 md:p-6">
                            <div className="flex flex-col-reverse justify-between gap-4 md:flex-row">
                                <p className="text-xl font-semibold whitespace-nowrap text-white md:text-display-xs">{author.name}</p>

                                <div aria-hidden="true" className="flex gap-1">
                                    <StarIcon className="text-white" />
                                    <StarIcon className="text-white" />
                                    <StarIcon className="text-white" />
                                    <StarIcon className="text-white" />
                                    <StarIcon className="text-white" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <p className="text-md font-semibold text-white">{author.title}, {author.company}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 md:hidden">
                    <Button size="xl">{ctaSecondary}</Button>
                    <Button color="secondary" size="xl">
                        {ctaPrimary}
                    </Button>
                </div>
            </div>
        </section>
    );
};
