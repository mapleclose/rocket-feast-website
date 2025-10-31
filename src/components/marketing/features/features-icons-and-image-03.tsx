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

                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Run Lean. Serve Better</h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                            Modern hospitality demands speed, accuracy, and exceptional guest experience. Rocket Feast eliminates operational chaos by connecting your front-of-house, kitchen, and back-office in one intelligent platform.
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                        {[
                            {
                                title: "Guest-Centric Ordering",
                                subtitle: "QR ordering that feels personal, not automated. Your guests browse, customise, and order from their phones whilst your staff focus on hospitality.",
                                icon: Heart,
                                cta: "Learn more",
                                href: "#",
                            },
                            {
                                title: "Operator-First Platform",
                                subtitle: "Built by restaurant operators who understand your challenges. Real-time insights, automated workflows, and complete visibility across your entire operation.",
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
