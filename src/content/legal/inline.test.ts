import { describe, expect, it } from "vitest";
import { findPlaceholders, parseInline } from "./inline";

describe("parseInline", () => {
    it("returns plain text as one text token", () => {
        expect(parseInline("Plain words.")).toEqual([{ type: "text", text: "Plain words." }]);
    });

    it("parses bold, links, code and placeholders in order", () => {
        expect(parseInline("See **Settings › AI**, [the docs](/docs/mcp), `read` and [[MARC: legal entity name]].")).toEqual([
            { type: "text", text: "See " },
            { type: "bold", text: "Settings › AI" },
            { type: "text", text: ", " },
            { type: "link", text: "the docs", href: "/docs/mcp" },
            { type: "text", text: ", " },
            { type: "code", text: "read" },
            { type: "text", text: " and " },
            { type: "placeholder", text: "[[MARC: legal entity name]]" },
            { type: "text", text: "." },
        ]);
    });

    it("never reads a placeholder as a link", () => {
        expect(parseInline("[[MARC: support email]](x)")).toEqual([
            { type: "placeholder", text: "[[MARC: support email]]" },
            { type: "text", text: "(x)" },
        ]);
    });

    it("keeps mailto and https links", () => {
        expect(parseInline("[privacy@rocketfeast.com](mailto:privacy@rocketfeast.com)")).toEqual([
            { type: "link", text: "privacy@rocketfeast.com", href: "mailto:privacy@rocketfeast.com" },
        ]);
    });
});

describe("findPlaceholders", () => {
    it("lists every placeholder, in order", () => {
        expect(findPlaceholders("A [[MARC: one]] b [[MARC: two]].")).toEqual(["[[MARC: one]]", "[[MARC: two]]"]);
    });

    it("finds none in ordinary text", () => {
        expect(findPlaceholders("No [links](/x) here.")).toEqual([]);
    });
});
