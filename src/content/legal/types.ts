/**
 * Content model for the legal and docs pages (/privacy, /terms, /support, /docs/mcp).
 * Every string may use the inline markup in `./inline.ts`.
 */

export type LegalBlock =
    | { type: "p"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: string[] }
    | { type: "table"; head: string[]; rows: string[][] }
    /** A value people copy, such as the server address; shown with a Copy button. */
    | { type: "copy"; label: string; value: string }
    | { type: "note"; text: string }
    | { type: "actions"; links: { label: string; href: string; primary?: boolean }[] };

export interface LegalSection {
    /** The anchor id (kebab-case), so other pages can link to `#id`. */
    id: string;
    title: string;
    blocks: LegalBlock[];
}

export interface LegalDocument {
    /** The route the page is served at. */
    path: string;
    badge: string;
    title: string;
    intro: string;
    /** Shown as "Last updated …". */
    updated: string;
    /** For the page's `<meta name="description">`. */
    description: string;
    sections: LegalSection[];
}
