"use client";

import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { useI18n } from "@/hooks/use-i18n";

export const FooterLarge04 = () => {
    const { t, regional } = useI18n();

    const footerNavList = [
        {
            label: t("footer.product.label"),
            items: [
                {
                    label: t("footer.product.features"),
                    href: "#",
                },
                {
                    label: t("footer.product.pricing"),
                    href: "#",
                },
                {
                    label: t("footer.product.integrations"),
                    href: "#",
                },
                {
                    label: t("footer.product.demo"),
                    href: "#",
                    badge: (
                        <Badge size="sm" type="modern" className="ml-1">
                            {t("footer.product.demoBadge")}
                        </Badge>
                    ),
                },
                {
                    label: t("footer.product.useCases"),
                    href: "#",
                },
                {
                    label: t("footer.product.caseStudies"),
                    href: "#",
                },
            ],
        },
        {
            label: t("footer.company.label"),
            items: [
                {
                    label: t("footer.company.about"),
                    href: "#",
                },
                {
                    label: t("footer.company.contact"),
                    href: "#",
                },
                {
                    label: t("footer.company.support"),
                    href: "#",
                },
                {
                    label: t("footer.company.documentation"),
                    href: "#",
                },
                {
                    label: t("footer.company.partnerProgram"),
                    href: "#",
                },
                {
                    label: t("footer.company.careers"),
                    href: "#",
                },
            ],
        },
    ];

    return (
        <footer className="bg-primary py-12 md:pt-16">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col gap-12 md:gap-16 xl:flex-row">
                    <div className="flex w-full flex-col gap-6 md:max-w-xs md:gap-8">
                        <UntitledLogo className="h-8 w-min shrink-0" />
                        <p className="text-md text-tertiary">{t("footer.description")}</p>
                    </div>
                    <nav className="flex flex-1 flex-col-reverse gap-12 md:flex-row md:gap-8 xl:justify-end">
                        <ul className="grid w-full grid-cols-2 gap-8 md:max-w-xs">
                            {footerNavList.map((category) => (
                                <li key={category.label}>
                                    <h4 className="text-sm font-semibold text-primary">{category.label}</h4>
                                    <ul className="mt-4 flex flex-col gap-3">
                                        {category.items.map((item) => (
                                            <li key={item.label}>
                                                <Button color="link-color" size="lg" href={item.href} iconTrailing={item.badge} className="gap-1">
                                                    {item.label}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="mt-12 flex flex-col-reverse justify-between gap-4 border-t border-secondary pt-8 md:mt-16 md:flex-row md:gap-6">
                    <p className="text-md text-quaternary">
                        © {new Date().getFullYear()} {regional.company.legalName}. {t("footer.copyright")}
                    </p>

                    <ul className="flex gap-4">
                        {[
                            {
                                label: t("footer.legal.terms"),
                                href: "#",
                            },
                            {
                                label: t("footer.legal.privacy"),
                                href: "#",
                            },
                            {
                                label: t("footer.legal.cookies"),
                                href: "#",
                            },
                        ].map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="rounded-xs text-md text-quaternary outline-focus-ring transition duration-100 ease-linear hover:text-tertiary focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};
