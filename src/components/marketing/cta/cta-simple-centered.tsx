"use client";

import { Button } from "@/components/base/buttons/button";
import { useI18n } from "@/hooks/use-i18n";

export const CTASimpleCentered = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col justify-center text-center">
                    <h2 className="text-display-sm font-semibold text-primary md:text-display-md">
                        <span className="max-md:hidden">{t("cta.title")}</span>
                        <span className="md:hidden">{t("cta.titleMobile")}</span>
                    </h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{t("cta.subtitle")}</p>
                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:mt-8 md:flex-row md:self-center">
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
