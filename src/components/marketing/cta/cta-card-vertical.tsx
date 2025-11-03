"use client";

import { Button } from "@/components/base/buttons/button";
import { useI18n } from "@/hooks/use-i18n";

export const CTACardVertical = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary pb-16 md:pb-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col items-center rounded-2xl bg-secondary px-6 py-10 text-center lg:p-16">
                    <h2 className="text-display-sm font-semibold text-primary xl:text-display-md">
                        <span className="max-md:hidden">{t("cta.title")}</span>
                        <span className="md:hidden">{t("cta.titleMobile")}</span>
                    </h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 lg:text-xl">{t("cta.subtitle")}</p>
                    <div className="mt-8 flex w-full flex-col-reverse gap-3 md:mt-10 md:w-auto md:flex-row">
                        <Button color="secondary" size="xl">
                            {t("cta.ctaSecondary")}
                        </Button>
                        <Button size="xl">{t("cta.ctaPrimary")}</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
