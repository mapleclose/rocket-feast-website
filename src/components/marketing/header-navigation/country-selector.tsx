"use client";

import { Fragment } from "react";
import { ChevronDown, Globe01 } from "@untitledui/icons";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { useLocale } from "@/providers/locale-provider";
import { LOCALE_CONFIGS } from "@/types/locale";
import { cx } from "@/utils/cx";

export const CountrySelector = () => {
    const { locale, setLocale, isLoading } = useLocale();

    if (isLoading) {
        return null;
    }

    return (
        <AriaDialogTrigger>
            <AriaButton
                className={({ isFocusVisible, isHovered }) =>
                    cx(
                        "flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-secondary outline-focus-ring transition duration-100 ease-linear",
                        isHovered && "bg-primary_hover text-secondary_hover",
                        isFocusVisible && "outline-2 outline-offset-2",
                    )
                }
            >
                <Globe01 className="size-4 stroke-[2.5px]" />
                <span className="max-md:hidden">{locale.countryName}</span>
                <ChevronDown className="size-3.5 stroke-[2.625px] text-fg-quaternary transition duration-100 ease-linear in-aria-expanded:-rotate-180" />
            </AriaButton>

            <AriaPopover
                className={({ isEntering, isExiting }) =>
                    cx(
                        "w-72 origin-top-right will-change-transform",
                        isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1 zoom-in-95",
                        isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1 zoom-out-95",
                    )
                }
                offset={8}
                placement="bottom end"
            >
                <AriaDialog className="rounded-xl border border-secondary bg-primary p-1.5 shadow-lg outline-hidden">
                    <div className="flex flex-col gap-1">
                        <div className="px-2.5 py-2 text-xs font-semibold text-tertiary">Select region and language</div>

                        {/* Global */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-4 rounded-lg px-2.5 py-2">
                                <span className="text-sm font-semibold text-primary">Global</span>
                                <div className="flex items-center gap-1.5">
                                    {LOCALE_CONFIGS.global.map((option) => (
                                        <button
                                            key={`${option.region}-${option.language}`}
                                            onClick={() => setLocale(option.region, option.language)}
                                            className={cx(
                                                "rounded-md px-2.5 py-1 text-sm font-medium transition duration-100 ease-linear",
                                                locale.region === option.region && locale.language === option.language
                                                    ? "bg-bg-brand-solid_subtle text-fg-brand-primary"
                                                    : "text-tertiary hover:bg-primary_hover hover:text-primary",
                                            )}
                                        >
                                            {option.languageDisplay}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Thailand */}
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-4 rounded-lg px-2.5 py-2">
                                <span className="text-sm font-semibold text-primary">Thailand</span>
                                <div className="flex items-center gap-1.5">
                                    {LOCALE_CONFIGS.th.map((option) => (
                                        <button
                                            key={`${option.region}-${option.language}`}
                                            onClick={() => setLocale(option.region, option.language)}
                                            className={cx(
                                                "rounded-md px-2.5 py-1 text-sm font-medium transition duration-100 ease-linear",
                                                locale.region === option.region && locale.language === option.language
                                                    ? "bg-bg-brand-solid_subtle text-fg-brand-primary"
                                                    : "text-tertiary hover:bg-primary_hover hover:text-primary",
                                            )}
                                        >
                                            {option.languageDisplay}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </AriaDialog>
            </AriaPopover>
        </AriaDialogTrigger>
    );
};
