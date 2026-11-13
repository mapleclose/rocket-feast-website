import { SITE_LINKS } from "../../utils/site-links";
import {
    ADDRESS_PLACEHOLDER,
    COMPANY,
    COMPANY_COUNTRY,
    COMPANY_NAME_PLACEHOLDER,
    COMPANY_NUMBER_PLACEHOLDER,
    DPA_PLACEHOLDER,
    MONEY_REFUSED,
    MONEY_REQUESTS,
    PRIVACY_EMAIL_LINK,
    PRIVACY_MAILBOX_PLACEHOLDER,
    THAILAND_PLACEHOLDER,
} from "./shared";
import type { LegalDocument } from "./types";

export const privacyPolicy: LegalDocument = {
    path: SITE_LINKS.privacy,
    badge: "Legal",
    title: "Privacy Policy",
    intro: "How Rocket Feast collects, uses and protects personal data when you use our website, the Rocket Feast apps, Rocket Feast AI and the connector for Claude and ChatGPT.",
    updated: "[[MARC: effective date]]",
    description:
        "How Rocket Feast collects, uses and protects personal data across the website, the apps, Rocket Feast AI and the Claude and ChatGPT connector.",
    sections: [
        {
            id: "who-we-are",
            title: "Who We Are",
            blocks: [
                {
                    type: "p",
                    text: `Rocket Feast is operated by **${COMPANY}**, a company incorporated in ${COMPANY_COUNTRY} (company number ${COMPANY_NUMBER_PLACEHOLDER}), whose registered office is at ${ADDRESS_PLACEHOLDER}. In this policy, “we” and “us” mean ${COMPANY}. ${COMPANY_NAME_PLACEHOLDER}`,
                },
                {
                    type: "p",
                    text: `In Thailand, Rocket Feast is sold by Yummi Umami Ltd. as our reseller. ${THAILAND_PLACEHOLDER}`,
                },
                { type: "p", text: `For anything about this policy or your data, email ${PRIVACY_EMAIL_LINK}.` },
            ],
        },
        {
            id: "scope",
            title: "What This Policy Covers",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "this website, rocketfeast.com, including its sign-in page;",
                        "the Rocket Feast admin app and staff accounts;",
                        "Rocket Feast AI, the assistant inside the admin app;",
                        `the Rocket Feast connector for Claude, ChatGPT and other MCP clients ([docs](${SITE_LINKS.docsMcp})).`,
                    ],
                },
                {
                    type: "p",
                    text: "If you order from or join as a member of a venue that uses Rocket Feast, the **Guest Terms and Privacy Notice** shown in that venue's ordering app applies to you instead. The venue is responsible for your data there.",
                },
            ],
        },
        {
            id: "roles",
            title: "Our Role",
            blocks: [
                {
                    type: "p",
                    text: `Venues decide what they put into Rocket Feast about their guests, staff and business. For that data the venue is the controller and we process it on the venue's behalf, under ${DPA_PLACEHOLDER}.`,
                },
                {
                    type: "p",
                    text: "We are the controller for the data we need to run our own business: Rocket Feast accounts, billing, support, security records and this website.",
                },
            ],
        },
        {
            id: "data-we-collect",
            title: "Data We Collect",
            blocks: [
                {
                    type: "table",
                    head: ["What", "Examples"],
                    rows: [
                        ["Account data", "Your name, email address, phone number, role and venues, and sign-in records such as the device you used."],
                        ["Venue data", "What a venue enters or creates: menus, bills and payments, members, rosters, stock, tasks, reports and settings."],
                        ["Billing data", "Your plan, the venues and staff it covers, invoices, and Rocket Feast AI credit and top-ups."],
                        [
                            "Rocket Feast AI data",
                            "Your messages and attachments, what Rocket Feast AI looked up or proposed, what you confirmed, and the cost of each model call.",
                        ],
                        [
                            "Connector data",
                            "A record of each tool call from Claude, ChatGPT or another app: the tool, action, venue, user, app, outcome and duration.",
                        ],
                        ["Website data", "Messages you send us, and the standard logs our hosting keeps: IP address, browser and the pages requested."],
                    ],
                },
                {
                    type: "p",
                    text: "Card details are handled by our payment processor; we don't store card numbers.",
                },
            ],
        },
        {
            id: "how-we-use",
            title: "How We Use It",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "to provide Rocket Feast and the features you use, under our contract with your business;",
                        "to keep accounts and data secure, prevent abuse and investigate problems (our legitimate interest);",
                        "to bill for plans and Rocket Feast AI credit, and keep tax and accounting records (legal obligation);",
                        "to answer your questions and support requests;",
                        "to improve Rocket Feast, using usage figures that don't identify you.",
                    ],
                },
                {
                    type: "p",
                    text: "We don't sell personal data, and we don't use it for advertising.",
                },
            ],
        },
        {
            id: "rocket-feast-ai",
            title: "Rocket Feast AI",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "Rocket Feast AI sends your message, the screen you're on and the data it looks up to a language model through **OpenRouter**, which passes it to the model's provider. The model we use today is from OpenAI.",
                        "We send every request with OpenRouter's setting to use only model providers that do not collect user data.",
                        "Rocket Feast AI acts as you. It can only see and change what your role allows, and every change waits for your confirmation.",
                        `Rocket Feast AI can't move money. ${MONEY_REQUESTS} ${MONEY_REFUSED}`,
                        "Conversations are kept for 24 hours after the last message, then deleted. There is no chat history.",
                        "For each model call we record who used it, at which venue, when, and its cost, to measure the venue's monthly credit.",
                    ],
                },
            ],
        },
        {
            id: "connector",
            title: "Claude, ChatGPT and Other Connected Apps",
            blocks: [
                {
                    type: "p",
                    text: "When you connect Claude, ChatGPT or another MCP client, you choose to share Rocket Feast data with that app. What it receives is held by its provider, such as Anthropic or OpenAI, under their terms and your settings with them, not this policy.",
                },
                {
                    type: "p",
                    text: `Your password and sign-in code go only to us. We log each tool call but not what you asked or the data returned. You can revoke a connection at any time in **Settings › AI**. See [Data handling](${SITE_LINKS.docsMcp}#data) in the connector docs.`,
                },
            ],
        },
        {
            id: "sharing",
            title: "Who We Share It With",
            blocks: [
                { type: "p", text: "We use these service providers. Each processes data only to provide its service to us." },
                {
                    type: "table",
                    head: ["Provider", "What For"],
                    rows: [
                        ["Amazon Web Services", "Hosting, databases and backups, email and text messages."],
                        [
                            "AWS Amplify",
                            "Hosting this website, including the sign-in page you use to connect an app, which passes what you type on to Rocket Feast without storing it.",
                        ],
                        ["Twilio", "Sending sign-in codes."],
                        [
                            "OpenRouter, and the model provider it routes to",
                            "Running Rocket Feast AI, reading supplier invoices when stock is received, and reading the menus, files and links a venue shares during setup.",
                        ],
                        ["Stripe", "Subscription billing and tax."],
                    ],
                },
                {
                    type: "p",
                    text: "[[MARC: complete the service-provider list (anything else that processes personal data), and confirm Stripe billing is live when this is published]]",
                },
                {
                    type: "p",
                    text: "We may also disclose data when the law requires it, or to a buyer if our business is sold, under the same protections.",
                },
            ],
        },
        {
            id: "where",
            title: "Where Your Data Is Stored",
            blocks: [
                {
                    type: "p",
                    text: "Rocket Feast data is stored on Amazon Web Services in the Asia Pacific (Thailand) region, ap-southeast-7. Backup copies are kept in the Asia Pacific (Singapore) region, ap-southeast-1.",
                },
                {
                    type: "p",
                    text: "This website runs on AWS Amplify in the Asia Pacific (Sydney) region, ap-southeast-2.",
                },
                {
                    type: "p",
                    text: "Some providers, such as Twilio, OpenRouter and the model providers, may process data in other countries. Where data leaves the country it was collected in, we use [[MARC: the transfer safeguards to name, such as standard contractual clauses]].",
                },
            ],
        },
        {
            id: "retention",
            title: "How Long We Keep It",
            blocks: [
                {
                    type: "table",
                    head: ["Data", "Kept For"],
                    rows: [
                        ["Rocket Feast AI conversations", "24 hours after the last message."],
                        ["Connected-app sign-ins", "Until revoked or expired, and at most 90 days."],
                        ["Account and venue data", "While the account is open, then [[MARC: retention period after a venue account closes]]."],
                        ["Billing and Rocket Feast AI credit records", "[[MARC: retention period for billing and credit records]]."],
                        ["Logs, including connector tool calls", "[[MARC: log retention period]]."],
                        ["Database backups", "Restorable for 30 days; backup copies [[MARC: backup copy retention period]]."],
                    ],
                },
            ],
        },
        {
            id: "security",
            title: "Security",
            blocks: [
                {
                    type: "p",
                    text: "Data is encrypted in transit. Access inside Rocket Feast follows each person's role and permissions, connecting an app needs a sign-in code as well as a password, and connected apps receive tokens that work only with the connector. No system is perfectly secure; if we learn of a breach that affects your data, we will tell you and the authorities as the law requires.",
                },
            ],
        },
        {
            id: "your-rights",
            title: "Your Rights",
            blocks: [
                {
                    type: "p",
                    text: "Depending on where you live, you can ask to access, correct, delete or receive a copy of your data, object to or restrict how we use it, and withdraw consent you have given.",
                },
                {
                    type: "p",
                    text: `Email ${PRIVACY_EMAIL_LINK}. We may need to confirm who you are first, and we reply within [[MARC: how quickly we reply to privacy requests, for example 30 days]]. If the data belongs to a venue, we pass your request to that venue. You can also complain to your local data protection authority.`,
                },
            ],
        },
        {
            id: "cookies",
            title: "Cookies and Browser Storage",
            blocks: [
                { type: "p", text: "This website uses no advertising or analytics cookies. It uses only:" },
                {
                    type: "table",
                    head: ["Name", "Purpose", "Kept For"],
                    rows: [
                        [
                            "`__Host-rf_mcp_device` (cookie)",
                            "Set when you sign in to connect an app, so our sign-in recognises your browser and sign-in limits apply to it alone.",
                            "90 days",
                        ],
                        ["`user-locale` (browser storage)", "Remembers the region and language you chose.", "Until you clear it"],
                    ],
                },
                {
                    type: "p",
                    text: "The Rocket Feast apps use the cookies and browser storage they need to keep you signed in.",
                },
            ],
        },
        {
            id: "children",
            title: "Children",
            blocks: [{ type: "p", text: "Rocket Feast is a service for businesses and is not meant for children." }],
        },
        {
            id: "changes",
            title: "Changes to This Policy",
            blocks: [
                {
                    type: "p",
                    text: "We'll post any change here and update the date at the top. If a change matters, we'll also tell account owners by email or in the app before it takes effect.",
                },
            ],
        },
        {
            id: "contact",
            title: "Contact",
            blocks: [
                {
                    type: "p",
                    text: `Email ${PRIVACY_EMAIL_LINK}, or write to ${COMPANY}, ${ADDRESS_PLACEHOLDER}. [[MARC: name a data protection officer or local representative, if the law requires one]] ${PRIVACY_MAILBOX_PLACEHOLDER}`,
                },
            ],
        },
    ],
};
