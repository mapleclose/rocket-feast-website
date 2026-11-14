/**
 * Shared shape and constants for the public legal pages (/privacy, /terms, /data-deletion).
 *
 * Content is plain data so it can be checked by tests and rendered by `LegalPage`.
 * Inline links use Markdown syntax: [label](href).
 */

export const LAST_UPDATED = "14 November 2026";

export const LEGAL_ROUTES = {
    privacy: "/privacy",
    terms: "/terms",
    dataDeletion: "/data-deletion",
} as const;

/**
 * Where people reach us about privacy and legal questions.
 * Privacy and deletion requests go to privacy@mapleclose.com (owner's choice, 14 Nov 2026).
 * If `email` is ever unset, the pages fall back to the contact page.
 */
export const LEGAL_CONTACT: { email: string | undefined; pageHref: string } = {
    email: "privacy@mapleclose.com",
    pageHref: "/contact",
};

/** A Markdown link to the privacy contact, for use inside content strings. */
export const contactLink = LEGAL_CONTACT.email ? `[${LEGAL_CONTACT.email}](mailto:${LEGAL_CONTACT.email})` : `our [contact page](${LEGAL_CONTACT.pageHref})`;

/** A paragraph, a bullet list, or a subheading inside a section. */
export type LegalBlock = string | string[] | { subheading: string };

export interface LegalSection {
    id: string;
    heading: string;
    blocks: LegalBlock[];
}

export interface LegalDocument {
    title: string;
    /** Used for the page's meta description. */
    description: string;
    /** Opening paragraphs shown under the title. */
    intro: string[];
    sections: LegalSection[];
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function blockText(block: LegalBlock): string[] {
    if (typeof block === "string") return [block];
    if (Array.isArray(block)) return block;
    return [block.subheading];
}

/** Every string in a document, in reading order. */
export function documentStrings(doc: LegalDocument): string[] {
    return [doc.title, doc.description, ...doc.intro, ...doc.sections.flatMap((section) => [section.heading, ...section.blocks.flatMap(blockText)])];
}

/** The whole document as one string, for searching. */
export function documentText(doc: LegalDocument): string {
    return documentStrings(doc).join("\n");
}

/** Every inline link target in a document. */
export function inlineLinks(doc: LegalDocument): string[] {
    return documentStrings(doc).flatMap((text) => Array.from(text.matchAll(LINK_PATTERN), (match) => match[2]));
}

/** Splits a string into text and link parts for rendering. */
export function parseInline(text: string): Array<{ text: string; href?: string }> {
    const parts: Array<{ text: string; href?: string }> = [];
    let last = 0;
    for (const match of text.matchAll(LINK_PATTERN)) {
        const index = match.index ?? 0;
        if (index > last) parts.push({ text: text.slice(last, index) });
        parts.push({ text: match[1], href: match[2] });
        last = index + match[0].length;
    }
    if (last < text.length) parts.push({ text: text.slice(last) });
    return parts;
}
