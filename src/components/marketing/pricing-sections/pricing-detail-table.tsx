"use client";

import { type FC, Fragment } from "react";
import { HelpCircle, LayersThree01, LayersTwo01, Minus, Zap } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { useI18n } from "@/hooks/use-i18n";
import { cx } from "@/utils/cx";

// Custom checkmark component matching the home page pricing cards
const CheckmarkIcon = () => (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-featured-icon-light-fg-brand">
        <svg width={13} height={11} viewBox="0 0 13 11" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0964 0.390037L3.93638 7.30004L2.03638 5.27004C1.68638 4.94004 1.13638 4.92004 0.736381 5.20004C0.346381 5.49004 0.236381 6.00004 0.476381 6.41004L2.72638 10.07C2.94638 10.41 3.32638 10.62 3.75638 10.62C4.16638 10.62 4.55638 10.41 4.77638 10.07C5.13638 9.60004 12.0064 1.41004 12.0064 1.41004C12.9064 0.490037 11.8164 -0.319963 11.0964 0.380037V0.390037Z"
                fill="currentColor"
            />
        </svg>
    </div>
);

type Tier = {
    name: string;
    key: "starter" | "professional" | "enterprise";
    highlighted?: boolean;
    icon: FC<{ className?: string }>;
};

type FeatureAvailability = {
    starter?: boolean | string;
    professional?: boolean | string;
    enterprise?: boolean | string;
};

type Feature = {
    name: string;
    tooltip: {
        title: string;
        description: string;
    };
    availability: FeatureAvailability;
};

type Section = {
    name: string;
    features: Feature[];
};

export const PricingDetailTable = () => {
    const { t, formatCurrency, regional } = useI18n();

    const tiers: Tier[] = [
        {
            name: t("pricing.table.tiers.starter.name"),
            key: "starter",
            icon: Zap,
        },
        {
            name: t("pricing.table.tiers.professional.name"),
            key: "professional",
            highlighted: true,
            icon: LayersTwo01,
        },
        {
            name: t("pricing.table.tiers.enterprise.name"),
            key: "enterprise",
            icon: LayersThree01,
        },
    ];

    // Build sections from i18n
    const sections: Section[] = [
        {
            name: t("pricing.table.sections.ordering.name"),
            features: [
                {
                    name: t("pricing.table.sections.ordering.features.qrOrdering.name"),
                    tooltip: t("pricing.table.sections.ordering.features.qrOrdering.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.ordering.features.pos.name"),
                    tooltip: t("pricing.table.sections.ordering.features.pos.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.ordering.features.inAppPayments.name"),
                    tooltip: t("pricing.table.sections.ordering.features.inAppPayments.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.ordering.features.thirdPartyPayments.name"),
                    tooltip: t("pricing.table.sections.ordering.features.thirdPartyPayments.tooltip"),
                    availability: { professional: true, enterprise: true },
                },
            ],
        },
        {
            name: t("pricing.table.sections.operations.name"),
            features: [
                {
                    name: t("pricing.table.sections.operations.features.analytics.name"),
                    tooltip: t("pricing.table.sections.operations.features.analytics.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.operations.features.inventory.name"),
                    tooltip: t("pricing.table.sections.operations.features.inventory.tooltip"),
                    availability: { professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.operations.features.dietary.name"),
                    tooltip: t("pricing.table.sections.operations.features.dietary.tooltip"),
                    availability: { professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.operations.features.advancedAnalytics.name"),
                    tooltip: t("pricing.table.sections.operations.features.advancedAnalytics.tooltip"),
                    availability: { enterprise: true },
                },
            ],
        },
        {
            name: t("pricing.table.sections.customer.name"),
            features: [
                {
                    name: t("pricing.table.sections.customer.features.feedback.name"),
                    tooltip: t("pricing.table.sections.customer.features.feedback.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.customer.features.discounts.name"),
                    tooltip: t("pricing.table.sections.customer.features.discounts.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.customer.features.loyalty.name"),
                    tooltip: t("pricing.table.sections.customer.features.loyalty.tooltip"),
                    availability: { enterprise: true },
                },
            ],
        },
        {
            name: t("pricing.table.sections.staff.name"),
            features: [
                {
                    name: t("pricing.table.sections.staff.features.taskManagement.name"),
                    tooltip: t("pricing.table.sections.staff.features.taskManagement.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.staff.features.performance.name"),
                    tooltip: t("pricing.table.sections.staff.features.performance.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.staff.features.roster.name"),
                    tooltip: t("pricing.table.sections.staff.features.roster.tooltip"),
                    availability: { starter: true, professional: true, enterprise: true },
                },
                {
                    name: t("pricing.table.sections.staff.features.issues.name"),
                    tooltip: t("pricing.table.sections.staff.features.issues.tooltip"),
                    availability: { enterprise: true },
                },
            ],
        },
        {
            name: t("pricing.table.sections.integrations.name"),
            features: [
                {
                    name: t("pricing.table.sections.integrations.features.customIntegrations.name"),
                    tooltip: t("pricing.table.sections.integrations.features.customIntegrations.tooltip"),
                    availability: { enterprise: true },
                },
            ],
        },
    ];

    return (
        <section className="overflow-hidden bg-primary">
            <div className="w-full py-16 md:px-8 md:py-24 lg:mx-auto lg:max-w-container">
                {/* Mobile view (xs to lg) */}
                <div className="space-y-16 lg:hidden">
                    {tiers.map((tier) => (
                        <section key={tier.key}>
                            <div className="mb-8 flex flex-col px-4">
                                <FeaturedIcon icon={tier.icon} color="brand" theme="light" size="lg" />
                                <p className="mt-5 flex items-center gap-2 text-xl font-semibold text-brand-secondary">
                                    {tier.name} plan
                                </p>
                                <p className="mt-2 text-display-md font-semibold text-primary">
                                    {formatCurrency(regional.pricing[tier.key])}
                                </p>
                                <p className="mt-2 text-md text-tertiary">{t(`pricing.table.tiers.${tier.key}.description`)}</p>
                                <div className="mt-8 flex flex-col gap-3">
                                    <Button size="xl">{t("common.getStarted")}</Button>
                                </div>
                            </div>

                            {sections.map((section, sectionIndex) => (
                                <table key={section.name} className="mb-8 w-full last:mb-0">
                                    <caption
                                        className={cx(
                                            "px-4 pb-4 text-left text-sm font-semibold text-brand-secondary",
                                            sectionIndex === 0 && "sr-only",
                                        )}
                                    >
                                        {section.name}
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th className="sr-only" scope="col">
                                                Feature
                                            </th>
                                            <th className="sr-only" scope="col">
                                                Included
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.features.map((feature, featureIndex) => {
                                            const value = feature.availability[tier.key];
                                            return (
                                                <tr key={feature.name} className={cx(featureIndex % 2 === 0 && "bg-secondary_alt")}>
                                                    <th className="flex py-4.5 pl-4 text-left text-sm font-medium text-primary" scope="row">
                                                        {feature.name}
                                                    </th>
                                                    <td className="py-4.5 pr-4">
                                                        <div className="flex items-center justify-end text-right">
                                                            {typeof value === "string" ? (
                                                                <span className="block text-sm text-tertiary">{value}</span>
                                                            ) : (
                                                                <>
                                                                    {value === true ? (
                                                                        <CheckmarkIcon />
                                                                    ) : (
                                                                        <Minus className="ml-auto size-5 text-fg-disabled" aria-hidden="true" />
                                                                    )}
                                                                    <span className="sr-only">{value === true ? "Yes" : "No"}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ))}

                            <div className="mt-8 flex flex-col gap-3 px-4">
                                <Button size="xl">{t("common.getStarted")}</Button>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Desktop view (lg+) */}
                <div className="max-lg:hidden">
                    <table className="h-px w-full table-fixed">
                        <caption className="sr-only">Pricing plan comparison</caption>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <span className="sr-only">Feature by plans</span>
                                </th>
                                {tiers.map((tier) => (
                                    <th key={tier.key} className={cx("relative w-1/4 px-6 pt-6 pb-2")} scope="col">
                                        {tier.highlighted && (
                                            <div className="pointer-events-none absolute -inset-x-px inset-y-0 rounded-t-2xl border-x-2 border-t-2 border-brand"></div>
                                        )}
                                        <div className="flex flex-col items-center gap-5 text-center">
                                            <FeaturedIcon icon={tier.icon} color="brand" theme="light" size="lg" />
                                            <p className="inline-flex items-center gap-2 text-xl font-semibold text-brand-secondary">
                                                {tier.name} plan
                                            </p>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                {tiers.map((tier) => (
                                    <td key={tier.key} className={cx("h-full px-6 pb-8 align-top md:pb-10", tier.highlighted && "border-x-2 border-brand")}>
                                        <div className="flex h-full flex-col items-center justify-between text-center">
                                            <div className="flex flex-col">
                                                <p className="text-display-lg font-semibold text-primary">
                                                    {formatCurrency(regional.pricing[tier.key])}
                                                </p>
                                                <p className="mt-2 text-md text-tertiary">{t(`pricing.table.tiers.${tier.key}.description`)}</p>
                                            </div>
                                            <div className="mt-8 flex w-full flex-col gap-3">
                                                <Button size="xl">{t("common.getStarted")}</Button>
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            {sections.map((section, sectionIndex) => (
                                <Fragment key={section.name}>
                                    <tr className={cx(sectionIndex === 0 && "sr-only")}>
                                        <th
                                            scope="colgroup"
                                            className={cx(
                                                sectionIndex > 0 ? "pt-10" : "pt-0",
                                                "px-6 pb-4 text-left text-sm font-semibold text-brand-secondary",
                                            )}
                                        >
                                            {section.name}
                                        </th>
                                        {tiers.map((tier) => (
                                            <td key={tier.key} className={cx("px-6 pb-4", tier.highlighted && "border-x-2 border-brand")}></td>
                                        ))}
                                    </tr>
                                    {section.features.map((feature, featureIndex) => (
                                        <tr key={feature.name} className={cx(featureIndex % 2 === 0 && "bg-secondary_alt")}>
                                            <th className="px-6 py-5.5 text-left text-sm font-medium text-primary" scope="row">
                                                {feature.name}
                                                <Tooltip title={feature.tooltip.title} description={feature.tooltip.description} delay={0} closeDelay={0}>
                                                    <TooltipTrigger className="cursor-pointer text-fg-quaternary transition duration-100 hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover">
                                                        <HelpCircle className="ml-1 inline-block size-4" />
                                                    </TooltipTrigger>
                                                </Tooltip>
                                            </th>
                                            {tiers.map((tier) => {
                                                const value = feature.availability[tier.key];
                                                return (
                                                    <td key={tier.key} className={cx("px-6 py-5", tier.highlighted && "border-x-2 border-brand")}>
                                                        <div className="flex items-center justify-center text-center">
                                                            {typeof value === "string" ? (
                                                                <span className="block text-sm text-tertiary">{value}</span>
                                                            ) : (
                                                                <>
                                                                    {value === true ? (
                                                                        <CheckmarkIcon />
                                                                    ) : (
                                                                        <Minus className="mx-auto size-5 text-fg-disabled" aria-hidden="true" />
                                                                    )}
                                                                    <span className="sr-only">
                                                                        {value === true ? "Included" : "Not included"} in {tier.name}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="sr-only" scope="row">
                                    Choose your plan
                                </th>
                                {tiers.map((tier) => (
                                    <td key={tier.key} className="relative px-6 py-8">
                                        {tier.highlighted && (
                                            <div className="pointer-events-none absolute -inset-x-px inset-y-0 rounded-b-2xl border-x-2 border-b-2 border-brand"></div>
                                        )}
                                        <div className="flex flex-col gap-3">
                                            <Button size="xl">{t("common.getStarted")}</Button>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
    );
};
