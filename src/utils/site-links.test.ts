import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { footerCompanyLinks, footerLegalLinks } from "../components/marketing/footers/footer-links";
import { SITE_LINKS } from "./site-links";

const SRC = join(__dirname, "..");
const pageFor = (href: string) => join(SRC, "app", href.split("#")[0], "page.tsx");

describe("SITE_LINKS", () => {
    it("serves the docs, privacy and terms URLs the MCP OAuth metadata advertises", () => {
        // rocket-feast-mcp src/auth/oauth-metadata.ts DEFAULT_LINKS
        expect(SITE_LINKS.docsMcp).toBe("/docs/mcp");
        expect(SITE_LINKS.privacy).toBe("/privacy");
        expect(SITE_LINKS.terms).toBe("/terms");
    });

    it("points every link at a page that exists", () => {
        for (const [name, href] of Object.entries(SITE_LINKS)) expect(existsSync(pageFor(href)), name).toBe(true);
    });
});

describe("footer links", () => {
    const t = (key: string) => key;

    it("wires Contact, Support and Documentation", () => {
        const byLabel = Object.fromEntries(footerCompanyLinks(t).map((link) => [link.label, link.href]));
        expect(byLabel["footer.company.contact"]).toBe(SITE_LINKS.contact);
        expect(byLabel["footer.company.support"]).toBe(SITE_LINKS.support);
        expect(byLabel["footer.company.documentation"]).toBe(SITE_LINKS.docsMcp);
    });

    it("wires Terms, Privacy and Cookies", () => {
        expect(footerLegalLinks(t)).toEqual([
            { label: "footer.legal.terms", href: SITE_LINKS.terms },
            { label: "footer.legal.privacy", href: SITE_LINKS.privacy },
            { label: "footer.legal.cookies", href: SITE_LINKS.cookies },
        ]);
    });
});

describe("contact and FAQ page links", () => {
    // These two pages keep the template's own footers; their legal, support and contact links must not be dead.
    const wired = ["Terms", "Privacy", "Cookies", "Support", "Help centre", "Contact"];

    for (const file of ["app/contact/contact-page-03.tsx", "app/faqs/faq-page-10.tsx"]) {
        it(`${file} has no dead legal, support or contact link`, () => {
            const source = readFileSync(join(SRC, file), "utf8");
            for (const label of wired) expect(source, label).not.toContain(`{ label: "${label}", href: "#" }`);
            for (const label of wired) expect(source, label).toMatch(new RegExp(`\\{ label: "${label}", href: SITE_LINKS\\.\\w+ \\}`));
        });
    }

    it("the contact form's privacy policy link opens /privacy", () => {
        const source = readFileSync(join(SRC, "app/contact/contact-page-03.tsx"), "utf8");
        expect(source).toMatch(/href=\{SITE_LINKS\.privacy\}[\s\S]{0,400}privacy policy\./);
    });
});
