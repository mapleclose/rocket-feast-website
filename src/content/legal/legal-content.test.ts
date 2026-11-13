import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CLAUDE_ADD_CONNECTOR_URL, MCP_SCOPES, MCP_SERVER_URL, docsMcp } from "./docs-mcp";
import { LEGAL_DOCUMENTS, collectPlaceholders, documentStrings } from "./index";
import { parseInline } from "./inline";
import { privacyPolicy } from "./privacy";
import { support } from "./support";
import { terms } from "./terms";
import type { LegalDocument } from "./types";

const APP_DIR = join(__dirname, "..", "..", "app");

function routeExists(href: string): boolean {
    const path = href.split("#")[0].split("?")[0];
    return existsSync(join(APP_DIR, path, "page.tsx"));
}

function allText(doc: (typeof LEGAL_DOCUMENTS)[number]): string {
    return documentStrings(doc).join("\n");
}

describe("legal and docs documents", () => {
    it("are the four pages the MCP metadata and directories link to", () => {
        expect(LEGAL_DOCUMENTS.map((doc) => doc.path).sort()).toEqual(["/docs/mcp", "/privacy", "/support", "/terms"]);
    });

    it("are each served by a page", () => {
        for (const doc of LEGAL_DOCUMENTS) expect(routeExists(doc.path), doc.path).toBe(true);
    });

    it("have unique kebab-case section ids", () => {
        for (const doc of LEGAL_DOCUMENTS) {
            const ids = doc.sections.map((section) => section.id);
            expect(new Set(ids).size, doc.path).toBe(ids.length);
            for (const id of ids) expect(id, doc.path).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        }
    });

    it("link only to pages and anchors that exist", () => {
        const anchors = new Map(LEGAL_DOCUMENTS.map((doc) => [doc.path, new Set(doc.sections.map((s) => s.id))]));
        for (const doc of LEGAL_DOCUMENTS) {
            const hrefs = documentStrings(doc)
                .flatMap((text) => parseInline(text))
                .flatMap((token) => (token.type === "link" ? [token.href] : []));
            for (const block of doc.sections.flatMap((s) => s.blocks)) {
                if (block.type === "actions") hrefs.push(...block.links.map((link) => link.href));
            }
            for (const href of hrefs.filter((h) => h.startsWith("/") || h.startsWith("#"))) {
                const [path, anchor] = href.startsWith("#") ? [doc.path, href.slice(1)] : href.split("#");
                expect(routeExists(path), `${doc.path} → ${href}`).toBe(true);
                if (anchor && anchors.has(path)) expect(anchors.get(path)?.has(anchor), `${doc.path} → ${href}`).toBe(true);
            }
        }
    });

    it("write every placeholder as [[MARC: …]]", () => {
        for (const doc of LEGAL_DOCUMENTS) {
            const text = allText(doc);
            const opened = text.split("[[").length - 1;
            expect(collectPlaceholders([doc]).length <= opened, doc.path).toBe(true);
            expect(text, doc.path).not.toMatch(/\[\[(?!MARC: [^\]]+\]\])/);
        }
    });

    it("collect the placeholders once each, for the PR and the owner", () => {
        const all = collectPlaceholders(LEGAL_DOCUMENTS);
        expect(new Set(all).size).toBe(all.length);
        expect(all).toContain("[[MARC: registered office address]]");
        expect(all).toContain("[[MARC: governing law and courts]]");
        expect(all).toContain("[[MARC: support email address]]");
    });

    it("scan the meta description for placeholders too", () => {
        const doc: LegalDocument = { ...support, description: "Only here: [[MARC: meta description fact]]", sections: [] };
        expect(collectPlaceholders([doc])).toContain("[[MARC: meta description fact]]");
    });

    it("use Title Case for every heading, table heading and button", () => {
        const SMALL = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to", "with", "via"]);
        const isTitleCase = (text: string) =>
            text
                .replace(/`[^`]+`/g, "Code")
                .split(/\s+/)
                .every((word, index) => {
                    const bare = word.replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, "");
                    if (!bare || /^[\p{Lu}\d]/u.test(bare)) return true;
                    return index > 0 && SMALL.has(bare);
                });
        for (const doc of LEGAL_DOCUMENTS) {
            const headings = [doc.title, doc.badge, ...doc.sections.map((s) => s.title)];
            for (const block of doc.sections.flatMap((s) => s.blocks)) {
                if (block.type === "h3") headings.push(block.text);
                if (block.type === "table") headings.push(...block.head);
                if (block.type === "actions") headings.push(...block.links.map((link) => link.label));
            }
            for (const heading of headings) expect(isTitleCase(heading), `${doc.path}: ${heading}`).toBe(true);
        }
    });

    it("use the registered company name from the guest terms", () => {
        for (const doc of LEGAL_DOCUMENTS) expect(allText(doc), doc.path).not.toContain("Maple Close Ltd");
        expect(allText(privacyPolicy)).toContain("Maple Close Limited");
        expect(collectPlaceholders(LEGAL_DOCUMENTS)).toContain("[[MARC: confirm the registered company name is Maple Close Limited]]");
    });

    it("never limit discount and comp requests to amounts above the approval limit (they are always requests)", () => {
        for (const doc of LEGAL_DOCUMENTS) expect(allText(doc), doc.path).not.toMatch(/above the (venue's )?(approval )?limit/i);
    });

    it("never refuse vouchers outright: applying a guest's own voucher is allowed", () => {
        for (const doc of LEGAL_DOCUMENTS) expect(allText(doc), doc.path).not.toMatch(/points, vouchers/);
    });

    it("never promise that refunds become approval requests (refused while REFUND_REQUESTS_ENABLED is off)", () => {
        for (const doc of LEGAL_DOCUMENTS) {
            for (const sentence of documentStrings(doc).flatMap((text) => text.split(/(?<=[.;:!?])\s+/))) {
                if (/refund/i.test(sentence)) expect(sentence, doc.path).not.toMatch(/request/i);
            }
        }
    });

    it("qualify every 'can't move money' to apps connected through the Rocket Feast sign-in, or Rocket Feast AI", () => {
        for (const doc of LEGAL_DOCUMENTS) {
            for (const sentence of documentStrings(doc).flatMap((text) => text.split(/(?<=[.!?])\s+/))) {
                if (/(can't|cannot|never) move money/i.test(sentence)) {
                    expect(sentence, doc.path).toMatch(/connected through (the )?Rocket Feast sign-in|^(\*\*)?Rocket Feast AI/);
                }
            }
        }
    });

    it("write THB, never the baht sign", () => {
        for (const doc of LEGAL_DOCUMENTS) expect(allText(doc), doc.path).not.toContain("฿");
    });
});

describe("/docs/mcp", () => {
    const text = allText(docsMcp);

    it("gives the production server address and the Claude add-connector link built from it", () => {
        expect(MCP_SERVER_URL).toBe("https://mcp.rocketfeast.com/mcp");
        expect(text).toContain(MCP_SERVER_URL);
        expect(CLAUDE_ADD_CONNECTOR_URL).toBe(
            "https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Rocket%20Feast&connectorUrl=https%3A%2F%2Fmcp.rocketfeast.com%2Fmcp",
        );
    });

    it("describes exactly the scopes the MCP advertises (rocket-feast-mcp oauth-metadata SCOPES_SUPPORTED)", () => {
        // MCP_SCOPES mirrors the MCP repo by hand (this repo can't read it); this pins the copy and the table to it.
        expect(MCP_SCOPES).toEqual(["read", "write"]);
        const scopes = docsMcp.sections.find((s) => s.id === "scopes");
        const table = scopes?.blocks.find((b) => b.type === "table");
        expect(table?.type === "table" && table.rows.map((row) => row[0])).toEqual(["`read`", "`write`"]);
    });

    it("covers each topic the plan names", () => {
        expect(docsMcp.sections.map((s) => s.id)).toEqual(
            expect.arrayContaining(["what-it-does", "claude", "chatgpt", "scopes", "money", "revoke", "data", "contact"]),
        );
        expect(text).toContain("Settings › AI");
        expect(text).toMatch(/approval request/i);
        const money = documentStrings({ ...docsMcp, sections: docsMcp.sections.filter((s) => s.id === "money") }).join(" ");
        // Owner rule 13 Nov: discounts, item discounts and comps from a connected app are always requests,
        // whatever the amount (backend discountApprovalWorkflow.ts:375-385, itemDiscounts.ts:355-358).
        expect(money).toMatch(/are always sent as \*\*approval requests\*\*, whatever the amount/);
        // Applying a guest's own voucher is allowed; only giving or taking back vouchers is refused.
        expect(money).toMatch(/Refunds, payments, points, giving or taking back vouchers.*refused/);
        expect(text).not.toMatch(/as if you had made it yourself|marked as made through a connected app/);
        expect(text).toMatch(/the change history shows when a change came through a connected app/);
        expect(text).toContain("Rocket Feast AI");
        expect(text).toContain("View Only");
        expect(text).toContain("View and Edit");
        expect(text).toContain("No Access");
    });
});

describe("/privacy", () => {
    const text = allText(privacyPolicy);

    it("names the facts on record: AWS in ap-southeast-7, OpenRouter for Rocket Feast AI, Stripe for billing", () => {
        expect(text).toContain("ap-southeast-7");
        expect(text).toContain("OpenRouter");
        expect(text).toContain("Stripe");
        expect(text).toContain("Maple Close Limited");
    });

    it("names the known service providers and where the website runs", () => {
        expect(text).toContain("Twilio");
        expect(text).toContain("AWS Amplify");
        expect(text).toContain("ap-southeast-2");
        expect(text).toMatch(/OpenRouter[^|]*supplier invoices/);
        expect(collectPlaceholders([privacyPolicy]).some((p) => p.startsWith("[[MARC: complete the service-provider list"))).toBe(true);
    });

    it("makes no unsourced promises (reply time) and no claim about IP-based region detection", () => {
        expect(text).not.toMatch(/reply within 30 days/);
        expect(text).not.toMatch(/IP address, to choose/);
        expect(collectPlaceholders([privacyPolicy])).toContain("[[MARC: how quickly we reply to privacy requests, for example 30 days]]");
    });

    it("has the cookies section the footer links to", () => {
        expect(privacyPolicy.sections.some((s) => s.id === "cookies")).toBe(true);
    });
});

describe("/terms and /support", () => {
    it("terms state the included Rocket Feast AI credit in both billing currencies", () => {
        const text = allText(terms);
        expect(text).toContain("THB 500");
        expect(text).toContain("USD 15");
    });

    it("support points to the connector docs and doesn't overstate undo", () => {
        expect(allText(support)).toContain("/docs/mcp");
        expect(allText(support)).not.toMatch(/undo the last one/);
    });
});
