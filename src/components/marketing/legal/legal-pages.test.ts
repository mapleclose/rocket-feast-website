import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import nextConfig from "../../../../next.config.mjs";
import { dataDeletion } from "./data-deletion";
import { LAST_UPDATED, LEGAL_CONTACT, LEGAL_ROUTES, type LegalDocument, documentText, inlineLinks } from "./legal-document";
import { privacyPolicy } from "./privacy-policy";
import { termsOfService } from "./terms-of-service";

const documents: Record<string, LegalDocument> = { privacyPolicy, termsOfService, dataDeletion };
const root = process.cwd();
// Approved integration plan (social_messages retention: 90 days).
const REGISTERED_ADDRESS = "No. 5, 17/F, Strand 50, 50 Bonham Strand, Sheung Wan, Hong Kong SAR";
const COMPANY_NUMBER = "(Hong Kong company number 2191307)";
const GUEST_RETENTION = "kept for 90 days after the last message, then deleted, unless the venue deletes them sooner";

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

function sourceFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) return sourceFiles(path);
        return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
    });
}

describe("legal links across the site", () => {
    const files = sourceFiles(join(root, "src/app"));

    it("has no Terms, Privacy or Cookies link pointing at #", () => {
        const offenders = files.filter((file) => {
            const code = readFileSync(file, "utf8");
            return (
                /label:\s*"(Terms|Privacy|Cookies)"\s*,\s*href:\s*"#"/.test(code) ||
                /href="#"[^>]*>\s*(terms|privacy|cookies)/i.test(code)
            );
        });
        expect(offenders).toEqual([]);
    });

    it.each(["src/app/contact/contact-page-03.tsx", "src/app/faqs/faq-page-10.tsx"])("%s footer links Data deletion", (file) => {
        const code = readFileSync(join(root, file), "utf8");
        expect(code).toContain("LEGAL_ROUTES.dataDeletion");
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

    it.each(Object.entries(documents))("%s has no unfinished placeholders", (_name, doc) => {
        expect(documentText(doc)).not.toMatch(/\[[^\]]*to be added/);
    });

    it.each(Object.entries(documents))("%s gives the company number", (_name, doc) => {
        expect(documentText(doc)).toContain(`Maple Close Limited ${COMPANY_NUMBER}`);
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

    it("sends privacy and deletion requests to privacy@mapleclose.com", () => {
        expect(LEGAL_CONTACT.email).toBe("privacy@mapleclose.com");
    });

    it.each(Object.entries(documents))("%s links the privacy mailbox", (_name, doc) => {
        expect(inlineLinks(doc)).toContain("mailto:privacy@mapleclose.com");
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

    it("gives the registered address", () => {
        expect(text).toContain(REGISTERED_ADDRESS);
    });

    it("does not point people at in-product controls that do not exist", () => {
        for (const doc of Object.values(documents)) {
            const t = documentText(doc);
            expect(t).not.toContain("Social › Inbox");
            expect(t).not.toContain("Social › Settings");
        }
    });

    it("discloses profile pictures, attachments, access keys and Business Integrations", () => {
        expect(text).toMatch(/profile picture/i);
        expect(text).toMatch(/photos/i);
        expect(text).toMatch(/attachments/i);
        expect(text).toMatch(/access keys/i);
        expect(text).toContain("Business Integrations");
    });

    it("does not claim the PDPO requires cross-border protections", () => {
        expect(text).not.toMatch(/PDPA and PDPO require/);
        expect(text).not.toMatch(/PDPO require/);
        expect(text).toContain("Thailand (Bangkok)");
    });

    it("describes what Rocket Feast Social stores, who sees it and how long it is kept", () => {
        for (const item of ["message text", "sender ID", "username", "timestamps", "replies", "staff notes", "saved answers"]) {
            expect(text.toLowerCase()).toContain(item.toLowerCase());
        }
        expect(text).toContain(GUEST_RETENTION);
        expect(text).not.toContain("12 months");
        expect(text).toContain("within 30 days");
        expect(text).toMatch(/agreed not to use it to train/i);
        expect(text).toMatch(/never sell/i);
        expect(text).toMatch(/advertising/i);
        expect(text).toContain(LEGAL_ROUTES.dataDeletion);
    });
});

describe("data deletion instructions", () => {
    const text = documentText(dataDeletion);

    it("states the 90-day guest conversation retention", () => {
        expect(text).toContain(GUEST_RETENTION);
        expect(text).not.toContain("12 months");
    });

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

    it("gives the registered address", () => {
        expect(text).toContain(REGISTERED_ADDRESS);
    });

    it("sets out processor clauses", () => {
        expect(text).toContain("only to provide Rocket Feast and on your instructions");
    });

    it("explains that reseller orders are billed by the reseller", () => {
        expect(text).toContain("authorised reseller, such as Yummi Umami Ltd in Thailand");
    });
});
