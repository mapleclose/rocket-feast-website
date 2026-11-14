import { LEGAL_ROUTES, type LegalDocument, contactLink } from "./legal-document";

export const termsOfService: LegalDocument = {
    title: "Terms of Service",
    description: "The terms for businesses that use Rocket Feast, the restaurant and venue management platform operated by Maple Close Limited.",
    intro: [
        'These terms are an agreement between Maple Close Limited, a company incorporated in Hong Kong (company number 2191307) and trading as Rocket Feast ("Rocket Feast", "we", "us"), and the business that signs up to use Rocket Feast ("you"). They also apply to everyone who uses Rocket Feast on that business\'s behalf.',
        "If you have a separate signed agreement or order form with us, it takes priority where it differs from these terms.",
        "If you buy Rocket Feast through an authorised reseller, such as Yummi Umami Ltd in Thailand, your order and billing are with the reseller, and these terms govern your use of Rocket Feast with us.",
    ],
    sections: [
        {
            id: "the-service",
            heading: "The service",
            blocks: [
                "Rocket Feast is a restaurant and venue management platform. It covers point of sale, menus, ordering, bills, members, staff, inventory, admissions and optional modules such as Rocket Feast Social.",
                "We keep improving Rocket Feast, so features may change. If we remove a paid feature you rely on, we will tell you in advance.",
            ],
        },
        {
            id: "accounts",
            heading: "Your account",
            blocks: [
                [
                    "The person who signs up must be authorised to accept these terms for the business.",
                    "Give us accurate details and keep them up to date.",
                    "Keep sign-in details safe and do not share accounts.",
                    "You are responsible for the people you invite to your account and what they do in it.",
                    "Tell us straight away if you think someone has used your account without permission.",
                ],
            ],
        },
        {
            id: "your-data",
            heading: "Your data and your guests' data",
            blocks: [
                "You own the data you and your guests put into Rocket Feast. You allow us to store and process it to provide the service to you.",
                `For your guests' personal data, you are the controller and we process it on your behalf. You are responsible for having a lawful basis to collect it and for telling your guests how you use it, including that you use AI to help answer messages. Our [Privacy Policy](${LEGAL_ROUTES.privacy}) explains how we handle personal data.`,
                "When we process your guests' personal data for you, we: process it only to provide Rocket Feast and on your instructions; keep it confidential and limit access to people who need it; protect it with appropriate security; use service providers bound by similar duties (our current providers are listed in our Privacy Policy); tell you without undue delay about a breach that affects it; help you answer guests' requests; and delete or return it when you stop using Rocket Feast, unless the law requires us to keep it.",
            ],
        },
        {
            id: "acceptable-use",
            heading: "Acceptable use",
            blocks: [
                "You must not use Rocket Feast to:",
                [
                    "Break the law, or help anyone else do so.",
                    "Send spam or marketing messages without the consent the law requires.",
                    "Upload content that is unlawful, misleading or infringes someone else's rights.",
                    "Try to break, probe or overload our systems, or get around security or usage limits.",
                    "Copy, reverse engineer or resell Rocket Feast, unless we agree in writing.",
                ],
                "We may suspend access that puts other customers, guests or our systems at risk.",
            ],
        },
        {
            id: "rocket-feast-social",
            heading: "Rocket Feast Social and Meta",
            blocks: [
                "Rocket Feast Social connects your Facebook Page and Instagram account to Rocket Feast so you can answer guest messages and comments and publish posts. When you use it:",
                [
                    "You must have the right to manage the Page and account you connect.",
                    "You must follow Meta's terms and policies, including its rules on messaging and the time limits for replies.",
                    "You set the rules the AI assistant follows, and you can review, edit or remove the saved answers it learns. You are responsible for the replies and posts sent from your accounts.",
                    "We publish only posts that someone on your team has approved.",
                    "You can disconnect your accounts at any time, in your Facebook settings or by asking us. We then delete the data we received from Meta for those accounts within 30 days.",
                ],
                "We use data from Meta only to provide Rocket Feast Social to you. We never sell it or use it for advertising.",
            ],
        },
        {
            id: "ai-features",
            heading: "AI features",
            blocks: [
                "Some features use AI to draft replies, answer questions or suggest actions. AI can make mistakes. Check anything important before you rely on it, such as prices, allergens and opening hours. Do not rely on AI replies for allergy, health or safety information: your team must confirm it.",
            ],
        },
        {
            id: "third-party-services",
            heading: "Other services you connect",
            blocks: [
                "Rocket Feast works with services run by others, such as Meta, payment providers and messaging apps. Their own terms apply when you use them. We are not responsible for their services, outages or changes.",
            ],
        },
        {
            id: "fees",
            heading: "Fees and payment",
            blocks: [
                [
                    "Some features are free. Paid plans and modules cost what is shown when you subscribe, or what is in your order form.",
                    "Unless we agree otherwise, fees are billed in advance for each billing period. Taxes are added where they apply.",
                    "If a payment is late, we may suspend paid features after telling you.",
                    "When a free trial ends, the feature stops unless you subscribe.",
                    "Unless we agree otherwise or the law requires, fees already paid are not refundable.",
                    "We will tell you before we change prices. New prices apply from your next billing period.",
                ],
            ],
        },
        {
            id: "intellectual-property",
            heading: "Our software",
            blocks: [
                "We own Rocket Feast and everything we build for it. While your subscription is active, you may use Rocket Feast for your business. If you send us feedback or ideas, we may use them without owing you anything.",
            ],
        },
        {
            id: "availability",
            heading: "Availability and support",
            blocks: [
                "We work to keep Rocket Feast available and to fix problems quickly. We cannot promise it will always be available or free of errors. We may need to pause the service for maintenance, and we will try to do this at quiet times.",
            ],
        },
        {
            id: "ending",
            heading: "Ending your use",
            blocks: [
                [
                    "You can stop using Rocket Feast at any time. Paid features stay active until the end of the period you have paid for.",
                    "We may suspend or close your account if you seriously or repeatedly break these terms, do not pay, put our systems at risk, or if the law requires it. Where we can, we will warn you first.",
                    "Before your account closes, you can ask us for a copy of your data. After it closes, we delete your data as our Privacy Policy explains, unless the law requires us to keep it.",
                ],
            ],
        },
        {
            id: "responsibility",
            heading: "Your responsibilities",
            blocks: [
                "You are responsible for running your business, including checking that your prices, receipts, tax invoices and reports meet the rules that apply to you. If a claim is made against us because of your content, how you handle your guests' data, or your breach of the law or Meta's terms, you will cover our reasonable costs of dealing with it.",
            ],
        },
        {
            id: "liability",
            heading: "Limits on our liability",
            blocks: [
                [
                    'Rocket Feast is provided "as is", as far as the law allows.',
                    "We are not liable for indirect or consequential losses, such as lost profits, lost revenue or lost data you could have backed up.",
                    "Our total liability to you in any 12 months is limited to the fees you paid us in those 12 months.",
                    "Nothing in these terms limits liability that the law does not allow us to limit.",
                ],
            ],
        },
        {
            id: "changes",
            heading: "Changes to these terms",
            blocks: [
                "We may update these terms. We will change the date at the top when we do. If a change is significant, we will tell you in advance by email or in Rocket Feast. If you keep using Rocket Feast after a change takes effect, the new terms apply.",
            ],
        },
        {
            id: "law",
            heading: "Governing law",
            blocks: [
                "These terms are governed by the law of Hong Kong. The courts of Hong Kong will decide any dispute, unless the law where you are says otherwise.",
            ],
        },
        {
            id: "general",
            heading: "General",
            blocks: [
                [
                    "You may not transfer this agreement without our written consent. We may transfer it if our business is sold or reorganised.",
                    "If part of these terms cannot be enforced, the rest still applies.",
                    "If we do not enforce a right straight away, we can still enforce it later.",
                    "We are not responsible for delays caused by events outside our reasonable control.",
                ],
            ],
        },
        {
            id: "guests",
            heading: "Guests of venues",
            blocks: [
                "These terms are for businesses that use Rocket Feast. If you are a guest using a venue's menu, ordering, payment or booking pages, the venue is responsible for its products, prices and service.",
            ],
        },
        {
            id: "contact",
            heading: "Contact",
            blocks: [`Maple Close Limited, trading as Rocket Feast. Registered address: No. 5, 17/F, Strand 50, 50 Bonham Strand, Sheung Wan, Hong Kong SAR. Contact us through ${contactLink}.`],
        },
    ],
};
