import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../../../next.config.mjs";
import { dataDeletion } from "./data-deletion";
import { LAST_UPDATED, LEGAL_CONTACT, LEGAL_ROUTES, type LegalDocument, documentText, inlineLinks } from "./legal-document";
import { privacyPolicy } from "./privacy-policy";
import { termsOfService } from "./terms-of-service";

const documents: Record<string, LegalDocument> = { privacyPolicy, termsOfService, dataDeletion };
const root = process.cwd();

describe("legal routes", () => {
    it("serves the three legal pages at the agreed paths", () => {
        expect(LEGAL_ROUTES).toEqual({ privacy: "/privacy", terms: "/terms", dataDeletion: "/data-deletion" });
        for (const route of Object.values(LEGAL_ROUTES)) {
            expect(existsSync(join(root, "src/app", route, "page.tsx")), `${route}/page.tsx`).toBe(true);
        }
    });

    it("redirects /privacy-policy to /privacy permanently", async () => {
        const redirects = await nextConfig.redirects?.();
        expect(redirects).toContainEqual({ source: "/privacy-policy", destination: "/privacy", permanent: true });
    });

    it("links all three pages from the site footer", () => {
        const footer = readFileSync(join(root, "src/components/marketing/footers/footer-large-04.tsx"), "utf8");
        expect(footer).toContain("LEGAL_ROUTES.privacy");
        expect(footer).toContain("LEGAL_ROUTES.terms");
        expect(footer).toContain("LEGAL_ROUTES.dataDeletion");
    });
});

describe("every legal document", () => {
    it.each(Object.entries(documents))("%s is dated 14 November 2026", (_name, doc) => {
        expect(LAST_UPDATED).toBe("14 November 2026");
        expect(doc.title.length).toBeGreaterThan(0);
        expect(doc.sections.length).toBeGreaterThan(2);
        for (const section of doc.sections) {
            expect(section.id).toMatch(/^[a-z0-9-]+$/);
            expect(section.heading.length).toBeGreaterThan(0);
        }
    });

    it.each(Object.entries(documents))("%s names the operator", (_name, doc) => {
        expect(documentText(doc)).toContain("Maple Close Limited");
    });

    it.each(Object.entries(documents))("%s only links to known pages, mailto or https", (_name, doc) => {
        const allowed = new Set<string>([...Object.values(LEGAL_ROUTES), LEGAL_CONTACT.pageHref]);
        for (const href of inlineLinks(doc)) {
            const [path] = href.split("#");
            const ok = href.startsWith("mailto:") || href.startsWith("https://") || allowed.has(path);
            expect(ok, href).toBe(true);
        }
    });

    it.each(Object.entries(documents))("%s does not invent a mailbox", (_name, doc) => {
        const emails = documentText(doc).match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? [];
        const expected = LEGAL_CONTACT.email ? [LEGAL_CONTACT.email] : [];
        expect(new Set(emails)).toEqual(new Set(expected));
        if (!LEGAL_CONTACT.email) expect(inlineLinks(doc)).toContain(LEGAL_CONTACT.pageHref);
    });
});

describe("privacy policy", () => {
    const text = documentText(privacyPolicy);

    it("covers Thailand's PDPA and Hong Kong's PDPO", () => {
        expect(text).toContain("Personal Data Protection Act");
        expect(text).toContain("Personal Data (Privacy) Ordinance");
        expect(text).toContain("Hong Kong");
    });

    it("explains the controller and processor roles", () => {
        expect(text).toMatch(/venue is the (data )?controller/i);
        expect(text).toMatch(/on the venue's behalf/i);
        expect(text).toMatch(/we are the (data )?controller/i);
    });

    it("leaves a bracketed placeholder for the registered address", () => {
        expect(text).toContain("[Registered address");
    });

    it("describes what Rocket Feast Social stores, who sees it and how long it is kept", () => {
        for (const item of ["message text", "sender ID", "username", "timestamps", "replies", "staff notes", "saved answers"]) {
            expect(text.toLowerCase()).toContain(item.toLowerCase());
        }
        expect(text).toContain("12 months");
        expect(text).toContain("within 30 days");
        expect(text).toMatch(/do not (use .* to )?train/i);
        expect(text).toMatch(/never sell/i);
        expect(text).toMatch(/advertising/i);
        expect(text).toContain(LEGAL_ROUTES.dataDeletion);
    });
});

describe("data deletion instructions", () => {
    const text = documentText(dataDeletion);

    it("says what to include and how long it takes", () => {
        expect(text).toMatch(/Facebook Page or Instagram account/);
        expect(text).toMatch(/phone number or email/);
        expect(text).toMatch(/venue/);
        expect(text).toContain("30 days");
    });

    it("tells guests they can ask the venue directly and venues how to delete or disconnect", () => {
        expect(text).toMatch(/ask the venue directly/i);
        expect(text).toMatch(/delete (a|the) conversation/i);
        expect(text).toMatch(/disconnect/i);
    });
});

describe("terms of service", () => {
    const text = documentText(termsOfService);

    it("covers the Social module and links the privacy policy", () => {
        expect(text).toContain("Rocket Feast Social");
        expect(text).toContain("Meta");
        expect(text).toContain(LEGAL_ROUTES.privacy);
    });
});
