import { Fragment } from "react";
import { AlertTriangle, ArrowUpRight, InfoCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { Header } from "@/components/marketing/header-navigation/header";
import { CopyValue } from "@/components/marketing/legal/copy-value";
import { collectPlaceholders } from "@/content/legal";
import { parseInline } from "@/content/legal/inline";
import type { LegalBlock, LegalDocument } from "@/content/legal/types";
import { cx } from "@/utils/cx";

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Renders one string of inline markup (see content/legal/inline.ts). */
const Inline = ({ text, breakCode = true }: { text: string; breakCode?: boolean }) => (
    <>
        {parseInline(text).map((token, index) => {
            switch (token.type) {
                case "text":
                    return <Fragment key={index}>{token.text}</Fragment>;
                case "bold":
                    return (
                        <strong key={index} className="font-semibold text-primary">
                            {token.text}
                        </strong>
                    );
                case "code":
                    return (
                        <code key={index} className={breakCode ? "[overflow-wrap:anywhere]" : undefined}>
                            {token.text}
                        </code>
                    );
                case "link":
                    return (
                        <a
                            key={index}
                            href={token.href}
                            className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            {...(isExternal(token.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                            {token.text}
                        </a>
                    );
                case "placeholder":
                    return (
                        <mark
                            key={index}
                            className="rounded-sm bg-utility-warning-50 px-1 font-medium text-utility-warning-700 ring-1 ring-utility-warning-200 ring-inset"
                        >
                            {token.text}
                        </mark>
                    );
            }
        })}
    </>
);

/** A cell that short stays on one line, so no column is squeezed into broken words. */
const SHORT_CELL = 24;

const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => {
    // Marc's table rule: a table that doesn't fit runs off the right edge of the screen and scrolls;
    // it is never boxed, cropped inside a frame or squeezed. Below lg the scroller reaches the screen
    // edge (it cancels the page gutter); long prose columns keep a readable width.
    const wide = head.length >= 3 && rows.some((row) => row.some((cell) => cell.length > 40));
    const nowrap = (cell: string) => cell.length <= SHORT_CELL || cell.startsWith("`");

    return (
        <div className="not-prose my-6 -mr-4 overflow-x-auto md:-mr-8 lg:mr-0">
            <table className={cx("w-full border-y border-secondary text-left text-sm", wide && "min-w-[40rem]")}>
                <thead className="bg-secondary">
                    <tr>
                        {head.map((cell) => (
                            <th key={cell} scope="col" className={cx("px-4 py-3 text-xs font-semibold text-tertiary", nowrap(cell) && "whitespace-nowrap")}>
                                <Inline text={cell} breakCode={false} />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-t border-secondary">
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={cx(
                                        "px-4 py-3 align-top text-tertiary",
                                        cellIndex === 0 && "font-medium text-primary",
                                        nowrap(cell) && "whitespace-nowrap",
                                    )}
                                >
                                    <span className="[&_code]:rounded-md [&_code]:bg-secondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:font-semibold [&_code]:ring-1 [&_code]:ring-secondary">
                                        <Inline text={cell} breakCode={false} />
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Block = ({ block }: { block: LegalBlock }) => {
    switch (block.type) {
        case "p":
            return (
                <p>
                    <Inline text={block.text} />
                </p>
            );
        case "h3":
            return (
                <h3>
                    <Inline text={block.text} />
                </h3>
            );
        case "ul":
        case "ol": {
            const List = block.type;
            return (
                <List>
                    {block.items.map((item, index) => (
                        <li key={index}>
                            <Inline text={item} />
                        </li>
                    ))}
                </List>
            );
        }
        case "table":
            return <Table head={block.head} rows={block.rows} />;
        case "copy":
            return <CopyValue label={block.label} value={block.value} />;
        case "note":
            return (
                <div className="not-prose my-6 flex gap-3 rounded-xl bg-secondary p-4 ring-1 ring-secondary ring-inset">
                    <InfoCircle className="mt-0.5 size-5 shrink-0 text-fg-brand-primary" aria-hidden="true" />
                    <p className="text-md text-tertiary">
                        <Inline text={block.text} />
                    </p>
                </div>
            );
        case "actions":
            return (
                <div className="not-prose my-6 flex flex-col gap-3 sm:flex-row">
                    {block.links.map((link) => (
                        <Button
                            key={link.href}
                            href={link.href}
                            size="lg"
                            color={link.primary ? "primary" : "secondary"}
                            iconTrailing={isExternal(link.href) ? <ArrowUpRight data-icon /> : undefined}
                            {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                            {link.label}
                        </Button>
                    ))}
                </div>
            );
    }
};

const PageHeader = ({ doc }: { doc: LegalDocument }) => (
    <section className="bg-primary pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-container px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-sm font-semibold text-brand-secondary md:text-md">{doc.badge}</span>
                <h1 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">{doc.title}</h1>
                <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">
                    <Inline text={doc.intro} />
                </p>
                <p className="mt-4 text-sm text-quaternary md:mt-6 md:text-md">
                    Last updated <Inline text={doc.updated} />
                </p>
            </div>
        </div>
    </section>
);

/** Shown while any `[[MARC: …]]` placeholder is left, so a draft is never mistaken for approved text. */
const DraftNotice = ({ count }: { count: number }) => (
    <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="mx-auto mb-12 flex max-w-3xl gap-3 rounded-xl bg-utility-warning-50 p-4 ring-1 ring-utility-warning-200 ring-inset md:mb-16">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-fg-warning-primary" aria-hidden="true" />
            <p className="text-sm text-utility-warning-700 md:text-md">
                <span className="font-semibold">Draft for approval.</span> {count} highlighted {count === 1 ? "item needs" : "items need"} filling in before
                this text is final.
            </p>
        </div>
    </div>
);

export const LegalPage = ({ doc }: { doc: LegalDocument }) => {
    const placeholders = collectPlaceholders([doc]);

    return (
        <div className="bg-primary">
            <Header />

            <PageHeader doc={doc} />

            {placeholders.length > 0 && <DraftNotice count={placeholders.length} />}

            <div className="mx-auto max-w-container px-4 pb-16 md:px-8 md:pb-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
                    <nav aria-label="On this page" className="hidden lg:block">
                        <div className="sticky top-24">
                            <p className="text-sm font-semibold text-brand-secondary">On this page</p>
                            <ul className="mt-4 flex flex-col gap-3 border-l border-secondary">
                                {doc.sections.map((section) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            className="-ml-px block border-l border-transparent pl-4 text-md font-medium text-quaternary outline-focus-ring transition duration-100 ease-linear hover:border-brand hover:text-secondary focus-visible:outline-2"
                                        >
                                            {section.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    <article className="prose max-w-3xl md:prose-lg">
                        {doc.sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-24">
                                <h2>{section.title}</h2>
                                {section.blocks.map((block, index) => (
                                    <Block key={index} block={block} />
                                ))}
                            </section>
                        ))}
                    </article>
                </div>
            </div>

            <FooterLarge04 />
        </div>
    );
};
