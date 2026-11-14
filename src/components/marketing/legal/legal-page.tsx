import type { Metadata } from "next";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";
import { Header } from "@/components/marketing/header-navigation/header";
import { LAST_UPDATED, type LegalBlock, type LegalDocument, parseInline } from "./legal-document";

export function legalMetadata(doc: LegalDocument): Metadata {
    return { title: doc.title, description: doc.description };
}

const Inline = ({ text }: { text: string }) => (
    <>
        {parseInline(text).map((part, index) =>
            part.href ? (
                <a key={index} href={part.href}>
                    {part.text}
                </a>
            ) : (
                <span key={index}>{part.text}</span>
            ),
        )}
    </>
);

const Block = ({ block }: { block: LegalBlock }) => {
    if (typeof block === "string") {
        return (
            <p>
                <Inline text={block} />
            </p>
        );
    }
    if (Array.isArray(block)) {
        return (
            <ul>
                {block.map((item, index) => (
                    <li key={index}>
                        <Inline text={item} />
                    </li>
                ))}
            </ul>
        );
    }
    return <h3>{block.subheading}</h3>;
};

export const LegalPage = ({ doc }: { doc: LegalDocument }) => {
    return (
        <div className="bg-primary">
            <Header />

            <section className="bg-primary pt-16 md:pt-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                        <span className="text-sm font-semibold text-brand-secondary md:text-md">Legal</span>
                        <h1 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">{doc.title}</h1>
                        <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">Last updated: {LAST_UPDATED}</p>
                    </div>
                </div>
            </section>

            <main className="bg-primary py-16 md:py-24">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <article className="mx-auto prose max-w-180 md:prose-lg">
                        {doc.intro.map((paragraph, index) => (
                            <p key={index}>
                                <Inline text={paragraph} />
                            </p>
                        ))}
                        {doc.sections.map((section) => (
                            <section key={section.id} id={section.id}>
                                <h2>{section.heading}</h2>
                                {section.blocks.map((block, index) => (
                                    <Block key={index} block={block} />
                                ))}
                            </section>
                        ))}
                    </article>
                </div>
            </main>

            <FooterLarge04 />
        </div>
    );
};
