import { SITE_LINKS } from "../../utils/site-links";
import { PRIVACY_EMAIL_LINK, SUPPORT_EMAIL_PLACEHOLDER } from "./shared";
import type { LegalDocument } from "./types";

export const support: LegalDocument = {
    path: SITE_LINKS.support,
    badge: "Support",
    title: "Get help with Rocket Feast",
    intro: "How to reach us, what to send so we can help quickly, and answers to common questions about Rocket Feast AI and the connector for Claude and ChatGPT.",
    updated: "14 November 2026",
    description: "How to contact Rocket Feast support, and help with Rocket Feast AI and the Claude and ChatGPT connector.",
    sections: [
        {
            id: "contact-support",
            title: "Contact support",
            blocks: [
                { type: "p", text: `Email ${SUPPORT_EMAIL_PLACEHOLDER}. [[MARC: support hours and how quickly we reply]]` },
                {
                    type: "p",
                    text: "If you're a guest with a question about an order, a payment or a membership, please ask the venue first; they can see your bill and fix most things on the spot.",
                },
            ],
        },
        {
            id: "what-to-send",
            title: "What to send",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "your venue and your name;",
                        "what you were doing, what you expected, and what happened instead;",
                        "roughly when it happened, and a screenshot if you can;",
                        "for the connector, which app you use (Claude, ChatGPT or another) and any request ID it shows.",
                    ],
                },
                {
                    type: "note",
                    text: "Never send us your password or a sign-in code. We will never ask for them.",
                },
            ],
        },
        {
            id: "claude-and-chatgpt",
            title: "Claude and ChatGPT",
            blocks: [
                {
                    type: "p",
                    text: `Setup, scopes, approvals and revoking are all in the [connector docs](${SITE_LINKS.docsMcp}).`,
                },
                {
                    type: "table",
                    head: ["If…", "Try this"],
                    rows: [
                        ["Sign-in says you can't connect", "Your role needs the AI permission set to View Only or View and Edit. Ask your venue's owner."],
                        [
                            "The app says Rocket Feast is disconnected",
                            "The connection was revoked or has expired. Connect again from the app; you'll be asked to sign in.",
                        ],
                        ["A change is refused", "Your role doesn't allow it. The app can do only what you can do in Rocket Feast."],
                        [
                            "A refund or discount became a request",
                            "That's expected: connected apps raise approval requests, and a person with approval rights decides.",
                        ],
                    ],
                },
                { type: "actions", links: [{ label: "Read the connector docs", href: SITE_LINKS.docsMcp, primary: true }] },
            ],
        },
        {
            id: "rocket-feast-ai",
            title: "Rocket Feast AI",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "Rocket Feast AI runs on your venue's monthly credit. When it runs out, someone with AI View and Edit can use **Add Credit** in **Settings › AI**, or you can use Rocket Feast in Claude or ChatGPT on your own plan.",
                        "Every change it proposes waits for you to confirm, and you can undo the last one.",
                    ],
                },
            ],
        },
        {
            id: "privacy-and-security",
            title: "Privacy and security",
            blocks: [
                {
                    type: "p",
                    text: `For privacy requests, email ${PRIVACY_EMAIL_LINK}. To report a security problem, email [[MARC: security contact for vulnerability reports]]. Read our [privacy policy](${SITE_LINKS.privacy}) and [terms of service](${SITE_LINKS.terms}).`,
                },
            ],
        },
    ],
};
