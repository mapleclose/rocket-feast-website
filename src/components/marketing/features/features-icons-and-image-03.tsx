"use client";

import { Heart, LineChartUp03 } from "@untitledui/icons";
import { VideoPlayer } from "@/components/base/video-player/video-player";
import { FeatureTextFeaturedIconLeft } from "./base-components/feature-text";
import { useI18n } from "@/hooks/use-i18n";

export const FeaturesIconsAndImage03 = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary">
            <div className="bg-secondary pt-16 pb-[112px] md:pt-24 md:pb-40">
                <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2 lg:gap-24">
                    <div className="flex w-full flex-col">
                        <span className="text-sm font-semibold text-brand-secondary md:text-md">{t("why.badge")}</span>

                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">{t("why.title")}</h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                            {t("why.subtitle")}
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                        {[
                            {
                                title: t("why.guestOrdering.title"),
                                subtitle: t("why.guestOrdering.description"),
                                icon: Heart,
                            },
                            {
                                title: t("why.operatorPlatform.title"),
                                subtitle: t("why.operatorPlatform.description"),
                                icon: LineChartUp03,
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
