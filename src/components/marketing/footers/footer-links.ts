import { SITE_LINKS } from "../../../utils/site-links";

type FooterKey =
    | "footer.company.about"
    | "footer.company.contact"
    | "footer.company.support"
    | "footer.company.documentation"
    | "footer.company.partnerProgram"
    | "footer.company.careers"
    | "footer.legal.terms"
    | "footer.legal.privacy"
    | "footer.legal.cookies";

/** The i18n `t`, narrowed to the keys used here (so `useI18n().t` and a test stub both fit). */
type Translate = (key: FooterKey) => string;

export interface FooterLink {
    label: string;
    href: string;
}

/** The footer's Company column. About, Partner Program and Careers have no page yet. */
export function footerCompanyLinks(t: Translate): FooterLink[] {
    return [
        { label: t("footer.company.about"), href: "#" },
        { label: t("footer.company.contact"), href: SITE_LINKS.contact },
        { label: t("footer.company.support"), href: SITE_LINKS.support },
        { label: t("footer.company.documentation"), href: SITE_LINKS.docsMcp },
        { label: t("footer.company.partnerProgram"), href: "#" },
        { label: t("footer.company.careers"), href: "#" },
    ];
}

/** The legal links under the footer's copyright line. */
export function footerLegalLinks(t: Translate): FooterLink[] {
    return [
        { label: t("footer.legal.terms"), href: SITE_LINKS.terms },
        { label: t("footer.legal.privacy"), href: SITE_LINKS.privacy },
        { label: t("footer.legal.cookies"), href: SITE_LINKS.cookies },
    ];
}
