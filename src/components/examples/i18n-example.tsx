"use client";

import { useI18n, useRegional } from "@/hooks/use-i18n";

/**
 * Example component demonstrating i18n system usage
 * This shows all the different ways to use translations and regional settings
 */
export function I18nExample() {
    const { t, regional, formatCurrency, formatNumber, locale } = useI18n();

    // Example prices for demonstration
    const monthlyPrice = 299;
    const yearlyPrice = 2990;

    return (
        <div className="mx-auto max-w-2xl space-y-8 p-8">
            {/* Current Locale Info */}
            <section className="rounded-lg border border-secondary bg-primary p-6">
                <h2 className="mb-4 text-xl font-semibold">Current Locale</h2>
                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Region:</strong> {locale.region}
                    </p>
                    <p>
                        <strong>Language:</strong> {locale.language}
                    </p>
                    <p>
                        <strong>Country:</strong> {locale.countryName}
                    </p>
                </div>
            </section>

            {/* Regional Settings */}
            <section className="rounded-lg border border-secondary bg-primary p-6">
                <h2 className="mb-4 text-xl font-semibold">Regional Settings</h2>
                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Company Name:</strong> {regional.company.name}
                    </p>
                    <p>
                        <strong>Legal Entity:</strong> {regional.company.legalName}
                    </p>
                    <p>
                        <strong>Based in:</strong> {regional.company.country}
                    </p>
                    <p>
                        <strong>Currency:</strong> {regional.currency.code} ({regional.currency.symbol})
                    </p>
                </div>
            </section>

            {/* Translations */}
            <section className="rounded-lg border border-secondary bg-primary p-6">
                <h2 className="mb-4 text-xl font-semibold">Translations</h2>
                <div className="space-y-3">
                    <div>
                        <h3 className="mb-2 text-sm font-medium text-tertiary">Common Actions</h3>
                        <div className="flex flex-wrap gap-2">
                            <button className="rounded-md bg-bg-brand-solid px-3 py-1.5 text-sm font-medium text-white">
                                {t("common.getStarted")}
                            </button>
                            <button className="rounded-md border border-secondary px-3 py-1.5 text-sm font-medium">
                                {t("common.learnMore")}
                            </button>
                            <button className="rounded-md border border-secondary px-3 py-1.5 text-sm font-medium">
                                {t("common.contactUs")}
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-sm font-medium text-tertiary">Hero Section</h3>
                        <h1 className="mb-2 text-2xl font-bold">{t("hero.title")}</h1>
                        <p className="text-tertiary">{t("hero.subtitle")}</p>
                    </div>
                </div>
            </section>

            {/* Currency Formatting */}
            <section className="rounded-lg border border-secondary bg-primary p-6">
                <h2 className="mb-4 text-xl font-semibold">Currency Formatting</h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-tertiary">Monthly Plan</p>
                        <p className="text-2xl font-bold">
                            {formatCurrency(monthlyPrice)}
                            <span className="text-base font-normal text-tertiary"> per month</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-tertiary">Yearly Plan</p>
                        <p className="text-2xl font-bold">
                            {formatCurrency(yearlyPrice)}
                            <span className="text-base font-normal text-tertiary"> per year</span>
                        </p>
                    </div>
                    <div className="text-sm text-tertiary">
                        Note: Prices automatically format to {regional.currency.code} ({regional.currency.symbol}) in {regional.currency.locale} format
                    </div>
                </div>
            </section>

            {/* Number Formatting */}
            <section className="rounded-lg border border-secondary bg-primary p-6">
                <h2 className="mb-4 text-xl font-semibold">Number Formatting</h2>
                <div className="space-y-2 text-sm">
                    <p>
                        Large number: <strong>{formatNumber(1234567.89)}</strong>
                    </p>
                    <p>
                        Percentage: <strong>{formatNumber(0.75, { style: "percent" })}</strong>
                    </p>
                    <p>
                        Compact: <strong>{formatNumber(1234567, { notation: "compact" })}</strong>
                    </p>
                </div>
            </section>

            {/* Testing Instructions */}
            <section className="rounded-lg border border-brand bg-bg-brand-solid_subtle p-6">
                <h2 className="mb-4 text-xl font-semibold text-fg-brand-primary">Test the System</h2>
                <div className="space-y-2 text-sm text-fg-brand-secondary">
                    <p>Use the country selector in the header to switch between:</p>
                    <ul className="ml-4 list-disc space-y-1">
                        <li>
                            <strong>Global → English:</strong> Maple Close Ltd. (HK), USD pricing
                        </li>
                        <li>
                            <strong>Thailand → English:</strong> Yummi Umami Ltd. (TH), THB pricing
                        </li>
                        <li>
                            <strong>Thailand → ไทย:</strong> Yummi Umami Ltd. (TH), THB pricing, Thai translations (when added)
                        </li>
                    </ul>
                    <p className="mt-3">All changes take effect immediately. This component demonstrates the fallback system in action.</p>
                </div>
            </section>
        </div>
    );
}

/**
 * Simpler example showing just regional settings
 */
export function RegionalExample() {
    const { regional, formatCurrency } = useRegional();

    return (
        <div className="space-y-4 p-6">
            <h3 className="text-lg font-semibold">{regional.company.name}</h3>
            <p className="text-sm text-tertiary">
                Operated by {regional.company.legalName} in {regional.company.country}
            </p>
            <p className="text-2xl font-bold">{formatCurrency(99)}</p>
        </div>
    );
}
