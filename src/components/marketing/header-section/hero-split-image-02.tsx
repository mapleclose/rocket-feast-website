"use client";

import { Fragment } from "react";
import { PlayCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Header } from "@/components/marketing/header-navigation/header";

export const HeroSplitImage02 = () => {
    return (
        <Fragment>
            <Header className="bg-primary" />
            <section className="relative bg-primary py-16 lg:flex lg:min-h-180 lg:items-center lg:py-24">
                <div className="mx-auto w-full max-w-container px-4 md:px-8">
                    <div className="flex flex-col items-start md:max-w-3xl lg:w-1/2 lg:pr-8">
                        <h1 className="text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">
                            Great Hospitality, Automated.
                        </h1>
                        <p className="mt-4 text-lg text-balance text-tertiary md:mt-6 md:text-xl">
                            Serve more guests at higher quality with fewer staff through one connected platform for ordering, payments, and operations.
                        </p>

                        <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-start">
                            <Button color="secondary" size="xl" iconLeading={PlayCircle}>
                                Watch Demo
                            </Button>
                            <Button size="xl">Get Started for Free</Button>
                        </div>
                    </div>
                </div>
                <div className="relative mt-16 h-70 w-full px-4 md:h-96 md:px-8 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-1/2 lg:px-0">
                    <img
                        className="size-full object-cover xl:absolute xl:inset-0 xl:-left-10 xl:w-[calc(100%+40px)] xl:max-w-none xl:[clip-path:polygon(10%_0%,_100%_0%,_100%_100%,_0%_100%)]"
                        src="https://www.untitledui.com/marketing/smiling-girl-5.webp"
                        alt="Image by Good Faces at Unsplash.com"
                    />
                </div>
            </section>
        </Fragment>
    );
};
