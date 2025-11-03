"use client";

import { Heart, LineChartUp03 } from "@untitledui/icons";
import { VideoPlayer } from "@/components/base/video-player/video-player";
import { FeatureTextFeaturedIconLeft } from "./base-components/feature-text";

export const FeaturesIconsAndImage03 = () => {
    return (
        <section className="bg-primary">
            <div className="bg-secondary pt-16 pb-[112px] md:pt-24 md:pb-40">
                <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2 lg:gap-24">
                    <div className="flex w-full flex-col">
                        <span className="text-sm font-semibold text-brand-secondary md:text-md">Why Rocket Feast</span>

                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Run Lean. Serve Better.</h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                            Modern hospitality demands speed, precision, and consistency. Rocket Feast connects your front-of-house, kitchen, and back-office into one intelligent system that helps you serve more guests at a higher standard with fewer staff.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                        {[
                            {
                                title: "Guest-Centric Ordering",
                                subtitle: "QR ordering that feels effortless and personal. Guests browse and customise their meals from their phones while your staff focus on genuine hospitality.",
                                icon: Heart,
                                cta: "Learn more",
                                href: "#",
                            },
                            {
                                title: "Operator-First Platform",
                                subtitle: "Built by restaurant operators who know the daily challenges. Automate staff workflows, gain real-time visibility, and run your entire operation from a single dashboard.",
                                icon: LineChartUp03,
                                cta: "Learn more",
                                href: "#",
                            },
                        ].map((item, index) => (
                            <li key={item.title}>
                                <FeatureTextFeaturedIconLeft key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mx-auto -mt-16 flex w-full max-w-container justify-center px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
                <VideoPlayer
                    size="lg"
                    showThumbnailOverlay
                    thumbnailUrl="https://www.untitledui.com/marketing/smiling-girl-7.webp"
                    src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                    className="aspect-video w-full overflow-hidden rounded-xl shadow-3xl md:max-w-240"
                />
            </div>
        </section>
    );
};
