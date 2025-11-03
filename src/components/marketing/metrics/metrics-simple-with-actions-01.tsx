"use client";

import { PlayCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useI18n } from "@/hooks/use-i18n";

export const MetricsSimpleWithActions01 = () => {
    const { t } = useI18n();

    const metrics = [
        {
            title: t("metrics.smallerTeams.value"),
            subtitle: t("metrics.smallerTeams.label"),
            description: t("metrics.smallerTeams.description"),
        },
        {
            title: t("metrics.higherAov.value"),
            subtitle: t("metrics.higherAov.label"),
            description: t("metrics.higherAov.description"),
        },
        {
            title: t("metrics.fasterDelivery.value"),
            subtitle: t("metrics.fasterDelivery.label"),
            description: t("metrics.fasterDelivery.description"),
        },
        {
            title: t("metrics.satisfaction.value"),
            subtitle: t("metrics.satisfaction.label"),
            description: t("metrics.satisfaction.description"),
        },
    ];

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col gap-12 md:gap-16">
                    <div className="flex items-start gap-8">
                        <div className="flex flex-1 flex-col">
                            <h2 className="text-display-sm font-semibold text-primary md:text-display-md">{t("metrics.title")}</h2>
                            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{t("metrics.subtitle")}</p>
                        </div>
                        <div className="hidden gap-3.5 md:flex">
                            <Button iconLeading={PlayCircle} color="secondary" size="xl">
                                {t("common.watchDemo")}
                            </Button>
                            <Button size="xl">{t("common.getStartedFree")}</Button>
                        </div>
                    </div>

                    <dl className="flex flex-col gap-8 md:flex-row md:items-start">
                        {metrics.map((item, index) => (
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
                            {t("common.watchDemo")}
                        </Button>
                        <Button size="xl">{t("common.getStartedFree")}</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
