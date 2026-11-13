import { SITE_LINKS } from "../../utils/site-links";
import { ADDRESS_PLACEHOLDER, COMPANY, COMPANY_COUNTRY, DPA_PLACEHOLDER, THAILAND_PLACEHOLDER } from "./shared";
import type { LegalDocument } from "./types";

export const terms: LegalDocument = {
    path: SITE_LINKS.terms,
    badge: "Legal",
    title: "Terms of Service",
    intro: "The terms for businesses that use Rocket Feast, including Rocket Feast AI and the connector for Claude and ChatGPT.",
    updated: "[[MARC: effective date]]",
    description: "The terms of service for businesses that use Rocket Feast, Rocket Feast AI and the Claude and ChatGPT connector.",
    sections: [
        {
            id: "agreement",
            title: "Who these terms are between",
            blocks: [
                {
                    type: "p",
                    text: `These terms are between **${COMPANY}**, a company incorporated in ${COMPANY_COUNTRY} (“we”), and the business that signs up for Rocket Feast (“you”). By creating an account or using Rocket Feast you accept them. If you accept for a business, you confirm you are allowed to bind it.`,
                },
                { type: "p", text: THAILAND_PLACEHOLDER },
                {
                    type: "p",
                    text: "Guests who order from your venue or join as members accept the Guest Terms shown in the ordering app; these terms don't apply to them.",
                },
            ],
        },
        {
            id: "service",
            title: "The service",
            blocks: [
                {
                    type: "p",
                    text: `Rocket Feast is software for running hospitality venues: ordering, payments, staff, stock and operations, with the plans and modules described on our [pricing page](/pricing). We improve Rocket Feast all the time and may change or retire features; if a change takes away something you rely on, we'll tell you in advance.`,
                },
            ],
        },
        {
            id: "accounts",
            title: "Accounts and staff",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "The account owner decides who gets access and what each role can do, and is responsible for what staff do in Rocket Feast.",
                        "Each person uses their own account. Keep passwords and sign-in codes private, and tell us straight away if you think an account has been misused.",
                        "Give accurate business details, including the legal name and address that appear on receipts and tax invoices.",
                    ],
                },
            ],
        },
        {
            id: "your-data",
            title: "Your data",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "You own the data you put into Rocket Feast. You let us host, process and back it up to provide the service, as our [privacy policy](/privacy) describes.",
                        `For personal data about your guests and staff, you are the controller and we process it for you under ${DPA_PLACEHOLDER}.`,
                        "You are responsible for having the right to collect that data and for telling your guests and staff how you use it.",
                    ],
                },
            ],
        },
        {
            id: "acceptable-use",
            title: "Acceptable use",
            blocks: [
                { type: "p", text: "Don't use Rocket Feast to:" },
                {
                    type: "ul",
                    items: [
                        "break the law, or collect or use personal data unlawfully;",
                        "try to get into accounts, venues or data you aren't allowed to see;",
                        "probe, overload or disrupt Rocket Feast, or get around its limits or security;",
                        "copy, resell or reverse-engineer Rocket Feast, unless we agree in writing;",
                        "reach Rocket Feast by automated means other than the ways we provide: the connector, service keys and our apps.",
                    ],
                },
            ],
        },
        {
            id: "rocket-feast-ai",
            title: "Rocket Feast AI and credit",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "Each venue gets monthly Rocket Feast AI credit in its billing currency: **THB 500** or **USD 15**. The credit pays for the language model behind Rocket Feast AI, at its real cost. It resets each month, and unused credit does not carry over.",
                        "**Add Credit** buys more for the current month, from THB 300 or USD 10. It is charged on your Rocket Feast bill. [[MARC: whether an unused top-up is refunded or simply ends with the month]]",
                        "When the credit runs out, Rocket Feast AI stops taking new questions until the next month or a top-up. Confirming, cancelling and undoing changes still work.",
                        "Rocket Feast AI can be wrong. It shows each change before it is made and only makes it when you confirm, so check what it proposes. You are responsible for the changes you confirm.",
                        "Rocket Feast AI never moves money. Refunds, discounts and comps it raises are approval requests for a person to decide.",
                    ],
                },
            ],
        },
        {
            id: "connected-apps",
            title: "Claude, ChatGPT and other connected apps",
            blocks: [
                {
                    type: "ul",
                    items: [
                        `You can connect Claude, ChatGPT or another MCP client to Rocket Feast, as our [connector docs](${SITE_LINKS.docsMcp}) explain. The app acts as the person who connected it, with that person's permissions, and what it does counts as that person's action.`,
                        "Your use of the app itself is between you and its provider, such as Anthropic or OpenAI, under their terms. It runs on your own plan with them and doesn't use your Rocket Feast AI credit.",
                        "Connected apps can't move money: refunds, discounts and comps become approval requests.",
                        "People with the AI permission can see and revoke connections in **Settings › AI**.",
                    ],
                },
            ],
        },
        {
            id: "fees",
            title: "Fees and billing",
            blocks: [
                {
                    type: "p",
                    text: "Prices are on our [pricing page](/pricing) or in your order. We bill through Stripe, which also calculates and collects tax where it applies. [[MARC: billing cycle, payment terms, what happens on late payment, and the notice we give before a price change]]",
                },
            ],
        },
        {
            id: "availability",
            title: "Availability and support",
            blocks: [
                {
                    type: "p",
                    text: `We work to keep Rocket Feast running and fix problems quickly, but we don't promise it will be uninterrupted or error-free, and there is no service-level guarantee unless we agree one in writing. See [Support](${SITE_LINKS.support}) for how to reach us.`,
                },
            ],
        },
        {
            id: "ending",
            title: "Ending the service",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "You can stop using Rocket Feast at any time. [[MARC: how to cancel a paid plan, and whether anything is refunded]]",
                        "We may suspend or close an account that breaks these terms, puts others at risk or isn't paid, and we'll tell you why unless the law or a security risk prevents it.",
                        "When an account closes: [[MARC: how a venue gets its data out, and when it is deleted]]",
                    ],
                },
            ],
        },
        {
            id: "ownership",
            title: "Ownership",
            blocks: [
                {
                    type: "p",
                    text: "We own Rocket Feast, its software and its brand. These terms give you the right to use it while your account is open, nothing more. If you send us ideas or feedback, we may use them freely.",
                },
            ],
        },
        {
            id: "liability",
            title: "Warranties and liability",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "Rocket Feast is provided as it is. To the extent the law allows, we give no promise beyond these terms that it suits a particular purpose.",
                        "Neither side is liable for indirect or consequential loss, such as lost profit or goodwill.",
                        "Our total liability is limited to [[MARC: liability cap, for example the fees paid in the last 12 months]].",
                        "Nothing here limits liability that the law does not allow to be limited.",
                    ],
                },
            ],
        },
        {
            id: "changes",
            title: "Changes to these terms",
            blocks: [
                {
                    type: "p",
                    text: "We may update these terms. We'll post the new version here and tell account owners about important changes before they take effect. If you keep using Rocket Feast after that, the new terms apply.",
                },
            ],
        },
        {
            id: "law",
            title: "Governing law",
            blocks: [{ type: "p", text: "These terms are governed by [[MARC: governing law and courts]]." }],
        },
        {
            id: "contact",
            title: "Contact",
            blocks: [
                {
                    type: "p",
                    text: `${COMPANY}, ${ADDRESS_PLACEHOLDER}. Email [[MARC: email address for legal notices]].`,
                },
            ],
        },
    ],
};
