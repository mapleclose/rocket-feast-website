/**
 * A small inline markup for the legal and docs pages, so their copy can live as plain data:
 * `**bold**`, `[label](href)`, `` `code` `` and `[[MARC: …]]` placeholders. A placeholder marks a
 * fact the owner has to supply before the text is approved; the page highlights it.
 */

export type InlineToken =
    | { type: "text"; text: string }
    | { type: "bold"; text: string }
    | { type: "code"; text: string }
    | { type: "link"; text: string; href: string }
    | { type: "placeholder"; text: string };

const PLACEHOLDER = /\[\[MARC: [^\]]+\]\]/g;
// Order matters: a placeholder is tried before a link, so `[[MARC: …]]` is never read as one.
const TOKEN = /(\[\[MARC: [^\]]+\]\])|\[([^[\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;

export function parseInline(source: string): InlineToken[] {
    const tokens: InlineToken[] = [];
    let last = 0;
    for (const match of source.matchAll(TOKEN)) {
        const index = match.index ?? 0;
        if (index > last) tokens.push({ type: "text", text: source.slice(last, index) });
        const [whole, placeholder, linkText, href, bold, code] = match;
        if (placeholder) tokens.push({ type: "placeholder", text: placeholder });
        else if (linkText && href) tokens.push({ type: "link", text: linkText, href });
        else if (bold) tokens.push({ type: "bold", text: bold });
        else if (code) tokens.push({ type: "code", text: code });
        last = index + whole.length;
    }
    if (last < source.length) tokens.push({ type: "text", text: source.slice(last) });
    return tokens;
}

export function findPlaceholders(source: string): string[] {
    return source.match(PLACEHOLDER) ?? [];
}
