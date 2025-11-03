"use client";

import { useState } from "react";
import { MarkerPin02, MessageChatCircle, Phone } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { NativeSelect } from "@/components/base/select/select-native";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Header } from "@/components/marketing/header-navigation/header";
import countries, { phoneCodeOptions } from "@/utils/countries";

const ContactFormAndMap = () => {
    const [selectedCountryPhone, setSelectedCountryPhone] = useState("US");

    return (
        <section className="grid grid-cols-1 bg-primary lg:grid-cols-2">
            <div className="self-center px-4 py-16 md:px-8 md:py-24">
                <div className="mx-auto md:max-w-120">
                    <h2 className="text-display-md font-semibold text-primary md:text-display-lg">Contact us</h2>
                    <p className="mt-4 text-lg whitespace-pre-line text-tertiary md:mt-6 md:text-xl">Our friendly team would love to hear from you.</p>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = Object.fromEntries(new FormData(e.currentTarget));
                            console.log("Form data:", data);
                        }}
                        className="mt-12 flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-x-8 gap-y-6 sm:flex-row">
                                <Input isRequired size="md" name="firstName" label="First name" placeholder="First name" wrapperClassName="flex-1" />
                                <Input isRequired size="md" name="lastName" label="Last name" placeholder="Last name" wrapperClassName="flex-1" />
                            </div>
                            <Input isRequired size="md" name="email" label="Email" type="email" placeholder="you@company.com" />
                            <InputGroup
                                size="md"
                                name="phone"
                                label="Phone number"
                                leadingAddon={
                                    <NativeSelect
                                        aria-label="Country code"
                                        value={selectedCountryPhone}
                                        onChange={(value) => setSelectedCountryPhone(value.currentTarget.value)}
                                        options={phoneCodeOptions.map((item) => ({
                                            label: item.label as string,
                                            value: item.id as string,
                                        }))}
                                    />
                                }
                            >
                                <InputBase
                                    type="tel"
                                    placeholder={countries.find((country) => country.code === selectedCountryPhone)?.phoneMask?.replaceAll("#", "0")}
                                />
                            </InputGroup>
                            <TextArea isRequired label="Message" placeholder="Leave us a message..." rows={5} />
                            <Checkbox
                                name="privacy"
                                size="md"
                                hint={
                                    <>
                                        You agree to our friendly{" "}
                                        <a
                                            href="#"
                                            className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            privacy policy.
                                        </a>
                                    </>
                                }
                            />
                        </div>

                        <Button type="submit" size="xl">
                            Send message
                        </Button>
                    </Form>
                </div>
            </div>

            <iframe
                title="Our address"
                src="https://snazzymaps.com/embed/703719"
                className="hidden h-240 w-full border-none lg:block"
                data-chromatic="ignore"
            />
        </section>
    );
};

const ContactSectionSimpleIcons04 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                    <div className="w-full max-w-90">
                        <div className="text-sm font-semibold text-brand-secondary md:text-md">Our locations</div>
                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Visit our stores</h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Find us at these locations.</p>
                    </div>

                    <ul className="grid w-full grid-cols-1 gap-x-16 gap-y-6 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 md:gap-y-8 lg:grid-cols-2 lg:px-11">
                        {[
                            {
                                title: "Melbourne",
                                subtitle: "100 Flinders Street\nMelbourne VIC 3000 AU",
                            },
                            {
                                title: "Sydney",
                                subtitle: "100 George Street\nSydney NSW 2000 AU",
                            },
                            {
                                title: "Byron Bay",
                                subtitle: "100 Jonson Street\nByron Bay NSW 2481 AU",
                            },
                            {
                                title: "London",
                                subtitle: "100 Oxford Street\nLondon W1D 1LL UK",
                            },
                            {
                                title: "San Francisco",
                                subtitle: "100 Market Street\nSan Francisco, CA 94105 USA",
                            },

                            {
                                title: "Sweden",
                                subtitle: "Drottninggatan 100\n111 60 Stockholm SE",
                            },
                        ].map((item) => (
                            <li key={item.title} className="flex max-w-sm flex-col">
                                <h3 className="text-lg font-semibold text-primary md:text-xl">{item.title}</h3>
                                <p className="mt-1 text-md whitespace-pre text-tertiary md:mt-2">{item.subtitle}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const ContactSectionIconCards03 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <Badge color="brand" size="lg" className="hidden md:flex">
                        Contact us
                    </Badge>
                    <Badge color="brand" size="md" className="md:hidden">
                        Contact us
                    </Badge>
                    <h2 className="mt-4 text-display-sm font-semibold text-primary md:text-display-md">We'd love to hear from you</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Chat to our friendly team.</p>
                </div>

                <div className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-24">
                    <img
                        src="https://www.untitledui.com/marketing/smiling-girl-11.webp"
                        className="h-60 w-full object-cover md:h-100 lg:h-140"
                        alt="People discussion a topic"
                    />
                    <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
                        {[
                            {
                                title: "Chat to sales",
                                subtitle: "Speak to our friendly team.",
                                href: "mailto:sales@untitledui.com",
                                cta: "sales@untitledui.com",
                                icon: MessageChatCircle,
                            },

                            {
                                title: "Visit us",
                                subtitle: "Visit our office HQ.",
                                href: "https://goo.gl/maps/zTXmPKVdUvCQH9Wd6",
                                cta: "100 Smith Street\nCollingwood VIC 3066 AU",
                                icon: MarkerPin02,
                            },
                            { title: "Call us", subtitle: "Mon-Fri from 8am to 5pm.", href: "tel:+1 (555) 000-0000", cta: "+1 (555) 000-0000", icon: Phone },
                        ].map((item) => (
                            <li key={item.title} className="flex h-full flex-col items-start bg-secondary p-6">
                                <FeaturedIcon size="lg" icon={item.icon} color="brand" theme="dark" />

                                <h3 className="mt-12 text-lg font-semibold text-primary md:mt-16 md:text-xl">{item.title}</h3>
                                <p className="mt-1 text-md text-tertiary md:mt-2">{item.subtitle}</p>
                                <Button color="link-color" size="lg" href={item.href} className="mt-4 whitespace-pre md:mt-5">
                                    {item.cta}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const CardHorizontal = () => {
    return (
        <section className="bg-primary pb-16 md:pb-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col gap-x-8 gap-y-8 rounded-2xl bg-secondary px-6 py-10 lg:flex-row lg:p-16">
                    <div className="flex max-w-3xl flex-1 flex-col">
                        <h2 className="text-display-sm font-semibold text-primary">
                            <span className="hidden md:inline">Start your 30-day free trial</span>
                            <span className="md:hidden">Start your free trial</span>
                        </h2>
                        <p className="mt-4 text-lg text-tertiary lg:text-xl">Join over 4,000+ startups already growing with Untitled.</p>
                    </div>
                    <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start">
                        <Button color="secondary" size="xl">
                            Learn more
                        </Button>
                        <Button size="xl">Get started</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const navList2Brand = [
    {
        title: "Product",
        items: [
            { label: "Overview", href: "#" },
            { label: "Features", href: "#" },
            {
                label: "Solutions",
                href: "#",
                badge: (
                    <Badge type="modern" size="sm" className="ml-1">
                        New
                    </Badge>
                ),
            },
            { label: "Tutorials", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Releases", href: "#" },
        ],
    },
    {
        title: "Company",
        items: [
            { label: "About us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
            { label: "News", href: "#" },
            { label: "Media kit", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        title: "Resources",
        items: [
            { label: "Blog", href: "#" },
            { label: "Newsletter", href: "#" },
            { label: "Events", href: "#" },
            { label: "Help centre", href: "#" },
            { label: "Tutorials", href: "#" },
            { label: "Support", href: "#" },
        ],
    },
    {
        title: "Social",
        items: [
            { label: "Twitter", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Facebook", href: "#" },
            { label: "GitHub", href: "#" },
            { label: "AngelList", href: "#" },
            { label: "Dribbble", href: "#" },
        ],
    },
    {
        title: "Legal",
        items: [
            { label: "Terms", href: "#" },
            { label: "Privacy", href: "#" },
            { label: "Cookies", href: "#" },
            { label: "Licenses", href: "#" },
            { label: "Settings", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
];

const FooterLarge03 = () => {
    return (
        <footer className="dark-mode bg-primary py-12 md:pt-16">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <nav className="flex flex-col-reverse gap-12 md:flex-row md:gap-16">
                    <ul className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                        {navList2Brand.map((category) => (
                            <li key={category.title}>
                                <h4 className="text-sm font-semibold text-primary">{category.title}</h4>
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
                    <div className="w-full md:max-w-[135px]">
                        <h4 className="text-sm font-semibold text-primary">Start growing with Untitled</h4>
                        <div className="mt-4 flex w-max flex-row gap-4 md:flex-col">
                            <AppStoreButton href="#" className="w-[135px]" />
                            <GooglePlayButton href="#" className="w-[135px]" />
                        </div>
                    </div>
                </nav>
                <div className="mt-12 flex flex-col justify-between gap-6 border-t border-secondary pt-8 md:mt-16 md:flex-row md:items-center">
                    <UntitledLogo className="h-8 w-min" />
                    <p className="text-md text-quaternary">© 2077 Untitled UI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const ContactPage03 = () => {
    return (
        <div className="bg-primary">
            <Header />

            <ContactFormAndMap />

            <ContactSectionSimpleIcons04 />

            <ContactSectionIconCards03 />

            <CardHorizontal />

            <FooterLarge03 />
        </div>
    );
};

export default ContactPage03;
