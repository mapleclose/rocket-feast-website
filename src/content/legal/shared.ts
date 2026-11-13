/**
 * Facts the legal and docs pages share. Where the records give no fact, the value is a
 * `[[MARC: …]]` placeholder for the owner to fill in before the text is approved.
 */

/** Recorded: website regional config (`legalName`) and the launch plan ("Maple Close Ltd (Hong Kong)"). */
export const COMPANY = "Maple Close Ltd";
export const COMPANY_COUNTRY = "Hong Kong";

/** Recorded: the guest Terms and Privacy Notice in the ordering app (rocket-feast-user TermsAndPrivacy.tsx). */
export const PRIVACY_EMAIL = "privacy@rocketfeast.com";
export const PRIVACY_EMAIL_LINK = `[${PRIVACY_EMAIL}](mailto:${PRIVACY_EMAIL})`;

export const COMPANY_NUMBER_PLACEHOLDER = "[[MARC: company registration number]]";
export const ADDRESS_PLACEHOLDER = "[[MARC: registered office address]]";
export const SUPPORT_EMAIL_PLACEHOLDER = "[[MARC: support email address]]";
export const DPA_PLACEHOLDER = "[[MARC: link to the data processing agreement for venues (none exists yet)]]";
export const THAILAND_PLACEHOLDER = "[[MARC: who the customer contracts with, and which terms apply, when buying through Yummi Umami Ltd. in Thailand]]";
