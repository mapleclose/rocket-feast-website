import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CLAUDE_ADD_CONNECTOR_URL, MCP_SCOPES, MCP_SERVER_URL, docsMcp } from "./docs-mcp";
import { LEGAL_DOCUMENTS, collectPlaceholders, documentStrings } from "./index";
import { parseInline } from "./inline";
import { privacyPolicy } from "./privacy";
import { support } from "./support";
import { terms } from "./terms";

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
        expect(text).toContain("Maple Close Ltd");
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

    it("support points to the connector docs", () => {
        expect(allText(support)).toContain("/docs/mcp");
    });
});
