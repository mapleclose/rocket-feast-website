import { SITE_LINKS } from "../../utils/site-links";
import { MONEY_REFUSED, MONEY_REQUESTS, PRIVACY_EMAIL_LINK, SUPPORT_EMAIL_PLACEHOLDER } from "./shared";
import type { LegalDocument } from "./types";

/** The production server address (rocket-feast-mcp `MCP_DOMAIN` + `/mcp`). */
export const MCP_SERVER_URL = "https://mcp.rocketfeast.com/mcp";

/** The scopes the MCP advertises (rocket-feast-mcp src/auth/oauth-metadata.ts `SCOPES_SUPPORTED`). */
export const MCP_SCOPES = ["read", "write"] as const;

/** Claude's documented add-custom-connector link, with the name and address filled in. */
export const CLAUDE_ADD_CONNECTOR_URL = `https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=${encodeURIComponent(
    "Rocket Feast",
)}&connectorUrl=${encodeURIComponent(MCP_SERVER_URL)}`;

const CHATGPT_PLUGINS_URL = "https://chatgpt.com/plugins";

export const docsMcp: LegalDocument = {
    path: SITE_LINKS.docsMcp,
    badge: "Docs",
    title: "Rocket Feast for Claude and ChatGPT",
    intro: "Connect Claude or ChatGPT to Rocket Feast, then ask about your venue or make changes in plain words, with the same permissions you have in Rocket Feast.",
    updated: "14 November 2026",
    description: "How to connect Claude and ChatGPT to Rocket Feast: install steps, scopes, approvals, revoking access and data handling.",
    sections: [
        {
            id: "what-it-does",
            title: "What the Connector Does",
            blocks: [
                {
                    type: "p",
                    text: "The Rocket Feast connector is a remote MCP server. Once you connect it, Claude or ChatGPT can look up and change your venue's data in Rocket Feast, acting as you. It can only see and do what your Rocket Feast role allows, at the venues you belong to.",
                },
                {
                    type: "p",
                    text: "Each area of Rocket Feast has two tools: one that looks things up and one that makes changes. The areas are:",
                },
                {
                    type: "ul",
                    items: [
                        "menu: products, categories, modifiers, packages and item availability;",
                        "orders and bills, receipts and tax invoices;",
                        "members, points, plans and vouchers;",
                        "staff, roles and teams; rosters, shifts and leave;",
                        "inventory, suppliers, stock and purchasing;",
                        "tables, reservations and sessions; course pacing;",
                        "admissions: registrations, check-in and check-out, and wristbands;",
                        "discounts, taxes and charges, expenses and sales reports;",
                        "tasks and performance, issues, the dashboard and venue settings.",
                    ],
                },
                {
                    type: "p",
                    text: "For example, ask “What sold best last week?”, “Which ingredients are below par?” or “Mark the Pad Thai out of stock”.",
                },
                {
                    type: "p",
                    text: "Using Rocket Feast in Claude or ChatGPT runs on your own Claude or ChatGPT plan. It does not use your venue's monthly Rocket Feast AI credit.",
                },
            ],
        },
        {
            id: "before-you-start",
            title: "Before You Start",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "You need a Rocket Feast staff account.",
                        "Your role needs the **AI** permission set to **View Only** or **View and Edit**. With **No Access** you can't connect an app. Your venue's owner sets it on your role.",
                        "Keep this address handy. It is the same for every venue:",
                    ],
                },
                { type: "copy", label: "Server Address", value: MCP_SERVER_URL },
            ],
        },
        {
            id: "claude",
            title: "Add to Claude",
            blocks: [
                {
                    type: "p",
                    text: "Claude can add Rocket Feast as a custom connector on any plan; the Free plan allows one custom connector.",
                },
                {
                    type: "ol",
                    items: [
                        "In Rocket Feast, open **Settings › AI** and press **Add to Claude**, or use the button below.",
                        `Claude opens with Rocket Feast filled in. Check the address is \`${MCP_SERVER_URL}\` and press **Add**.`,
                        "Press **Connect**. The Rocket Feast sign-in page opens on rocketfeast.com.",
                        "Sign in with your Rocket Feast email and password, then enter your sign-in code.",
                        "Check the request and press **Allow**. You're back in Claude, connected.",
                    ],
                },
                { type: "actions", links: [{ label: "Add to Claude", href: CLAUDE_ADD_CONNECTOR_URL, primary: true }] },
                { type: "h3", text: "Adding It by Hand" },
                {
                    type: "p",
                    text: "In Claude, open **Customize › Connectors**, press **Add**, choose **Add custom connector**, name it Rocket Feast and paste the server address. Then follow steps 3 to 5.",
                },
                { type: "h3", text: "Claude Team and Enterprise" },
                {
                    type: "p",
                    text: "On a Team or Enterprise plan, a Claude owner adds the connector once, in **Organization settings › Connectors**. Each person then presses **Connect** and signs in with their own Rocket Feast account. In **Settings › AI**, **Copy Link for Them** gives you a link to send to your Claude owner.",
                },
                { type: "h3", text: "Claude Code and Other MCP Clients" },
                {
                    type: "p",
                    text: `Any MCP client that supports remote servers with OAuth can use the server address. In Claude Code, run \`claude mcp add --transport http rocket-feast ${MCP_SERVER_URL}\`, then \`/mcp\` to sign in. The sign-in page warns you when an app on your own computer asks for access; allow it only if you started the connection yourself.`,
                },
            ],
        },
        {
            id: "chatgpt",
            title: "Add to ChatGPT",
            blocks: [
                {
                    type: "p",
                    text: "ChatGPT has no link that fills in a server for you, so you paste the address yourself. Custom servers work on ChatGPT on the web, and only on some plans; in a business workspace, an admin may need to allow them first.",
                },
                {
                    type: "ol",
                    items: [
                        `In Rocket Feast, open **Settings › AI** and press **Add to ChatGPT**. It copies the server address and opens [ChatGPT Plugins](${CHATGPT_PLUGINS_URL}).`,
                        "In ChatGPT, on **Plugins**, press **+** and choose **Add Custom MCP Server**.",
                        "Name it Rocket Feast and paste the address into **Server URL**.",
                        "Choose **OAuth**, accept the notice and press **Create**.",
                        "Sign in with your Rocket Feast account and press **Allow**.",
                        "In a chat, mention Rocket Feast with **@** to use it.",
                    ],
                },
                { type: "copy", label: "Server Address", value: MCP_SERVER_URL },
                {
                    type: "note",
                    text: "Once Rocket Feast is listed in Claude's and ChatGPT's directories, **Settings › AI** will open the listing instead, and you'll only need to press **Connect**.",
                },
            ],
        },
        {
            id: "scopes",
            title: "Scopes: Reading and Changing",
            blocks: [
                {
                    type: "p",
                    text: "When you connect, the sign-in page shows what the app will be able to do. Rocket Feast has two scopes:",
                },
                {
                    type: "table",
                    head: ["Scope", "On the Sign-in Page", "What It Allows"],
                    rows: [
                        ["`read`", "View your restaurant data", "The look-up tools, such as `menu_read` and `orders_read`. They never change anything."],
                        [
                            "`write`",
                            "Make changes in Rocket Feast on your behalf",
                            "The change tools, such as `menu_write` and `orders_write`. They are marked as tools that change data, so Claude and ChatGPT can ask before using them.",
                        ],
                    ],
                },
                {
                    type: "ul",
                    items: [
                        "Neither scope gives more than your role allows. If your role can't edit the menu, the app can't either.",
                        "A connection granted only `read` can't make changes.",
                        "Every change is saved in Rocket Feast under your name, marked as made through a connected app.",
                    ],
                },
            ],
        },
        {
            id: "money",
            title: "Money Actions and Approval Requests",
            blocks: [
                {
                    type: "p",
                    text: "Apps connected through the Rocket Feast sign-in (such as Claude and ChatGPT) can't move money.",
                },
                { type: "ul", items: [MONEY_REQUESTS, MONEY_REFUSED] },
            ],
        },
        {
            id: "revoke",
            title: "Revoke Access",
            blocks: [
                {
                    type: "p",
                    text: "Open **Settings › AI** in Rocket Feast. **Connected Apps** lists each app, who connected it and when it was last used. Press **Revoke** to sign it out straight away; the app has to sign in again to come back.",
                },
                {
                    type: "table",
                    head: ["AI Permission", "Connect an App", "See Connected Apps", "Revoke"],
                    rows: [
                        ["No Access", "No", "No", "No"],
                        ["View Only", "Yes", "Everyone's", "Your own"],
                        ["View and Edit", "Yes", "Everyone's", "Anyone's"],
                    ],
                },
                {
                    type: "ul",
                    items: [
                        "Removing someone's AI permission signs out the apps they connected.",
                        "Removing the connector in Claude or ChatGPT stops that app using it. Revoke it in **Settings › AI** as well to end its sign-in on our side.",
                    ],
                },
            ],
        },
        {
            id: "data",
            title: "Data Handling",
            blocks: [
                {
                    type: "ul",
                    items: [
                        "Your password and sign-in code go only to Rocket Feast. Claude and ChatGPT never see them; they get an access token that works only with this connector.",
                        "Our server passes each request to Rocket Feast as you and returns the result to the app. What the app receives is then held by Anthropic or OpenAI under their own terms and your settings with them.",
                        "For each tool call we log the tool and action, the venue, who made it, which app, the outcome and how long it took. We don't log what you asked or the data returned.",
                        "Rocket Feast runs on Amazon Web Services in the Asia Pacific (Thailand) region, ap-southeast-7.",
                    ],
                },
                { type: "p", text: `Our [privacy policy](${SITE_LINKS.privacy}) covers this in full.` },
            ],
        },
        {
            id: "contact",
            title: "Contact",
            blocks: [
                {
                    type: "p",
                    text: `For help connecting or using the connector, email ${SUPPORT_EMAIL_PLACEHOLDER} or see [Support](${SITE_LINKS.support}). For privacy questions, email ${PRIVACY_EMAIL_LINK}.`,
                },
            ],
        },
    ],
};
