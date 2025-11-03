"use client";

import { Button } from "@/components/base/buttons/button";
import { useI18n } from "@/hooks/use-i18n";

export const CTASplitImage03 = () => {
    const { t } = useI18n();

    return (
        <section className="bg-primary">
            <div className="bg-secondary pt-16 pb-[112px] md:pt-24 md:pb-40">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                        <p className="text-sm font-semibold text-brand-secondary md:text-md">{t("cta.badge")}</p>
                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                            <span className="max-md:hidden">{t("cta.title")}</span>
                            <span className="md:hidden">{t("cta.titleMobile")}</span>
                        </h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">{t("cta.subtitle")}</p>
                        <div className="mt-8 flex w-full flex-col-reverse gap-3 md:w-auto md:flex-row">
                            <Button color="secondary" size="xl">
                                {t("cta.ctaSecondary")}
                            </Button>
                            <Button size="xl">{t("cta.ctaPrimary")}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto -mt-16 max-w-container px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
                <img alt="Conversation" src="https://www.untitledui.com/marketing/conversation.webp" className="h-70 w-full object-cover md:h-129" />
            </div>
        </section>
    );
};
