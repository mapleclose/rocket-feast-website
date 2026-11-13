import { docsMcp } from "./docs-mcp";
import { findPlaceholders } from "./inline";
import { privacyPolicy } from "./privacy";
import { support } from "./support";
import { terms } from "./terms";
import type { LegalBlock, LegalDocument } from "./types";

export const LEGAL_DOCUMENTS: LegalDocument[] = [privacyPolicy, terms, support, docsMcp];

function blockStrings(block: LegalBlock): string[] {
    switch (block.type) {
        case "p":
        case "h3":
        case "note":
            return [block.text];
        case "ul":
        case "ol":
            return block.items;
        case "table":
            return [...block.head, ...block.rows.flat()];
        case "copy":
            return [block.label, block.value];
        case "actions":
            return block.links.map((link) => link.label);
    }
}

/** Every string on the page that may carry inline markup, in reading order. */
export function documentStrings(doc: LegalDocument): string[] {
    return [doc.title, doc.intro, doc.updated, ...doc.sections.flatMap((section) => [section.title, ...section.blocks.flatMap(blockStrings)])];
}

/** The owner's open placeholders across the given documents, each once, in reading order. */
export function collectPlaceholders(docs: LegalDocument[]): string[] {
    return [...new Set(docs.flatMap((doc) => documentStrings(doc).flatMap(findPlaceholders)))];
}
