/**
 * Facts the legal and docs pages share. Where the records give no fact, the value is a
 * `[[MARC: …]]` placeholder for the owner to fill in before the text is approved.
 */

/** As the guest Terms and Privacy Notice and the launch plan's decision table write it; Marc confirms the registered name. */
export const COMPANY = "Maple Close Limited";
export const COMPANY_NAME_PLACEHOLDER = "[[MARC: confirm the registered company name is Maple Close Limited]]";
export const COMPANY_COUNTRY = "Hong Kong";

/** Recorded: the guest Terms and Privacy Notice in the ordering app (rocket-feast-user TermsAndPrivacy.tsx). */
export const PRIVACY_EMAIL = "privacy@rocketfeast.com";
export const PRIVACY_EMAIL_LINK = `[${PRIVACY_EMAIL}](mailto:${PRIVACY_EMAIL})`;
/** Sourced, but nothing shows the mailbox delivers (review L3). */
export const PRIVACY_MAILBOX_PLACEHOLDER = `[[MARC: confirm ${PRIVACY_EMAIL} receives mail]]`;

export const COMPANY_NUMBER_PLACEHOLDER = "[[MARC: company registration number]]";
export const ADDRESS_PLACEHOLDER = "[[MARC: registered office address]]";
export const SUPPORT_EMAIL_PLACEHOLDER = "[[MARC: support email address]]";
export const DPA_PLACEHOLDER = "[[MARC: link to the data processing agreement for venues (none exists yet)]]";
export const THAILAND_PLACEHOLDER = "[[MARC: who the customer contracts with, and which terms apply, when buying through Yummi Umami Ltd. in Thailand]]";

/**
 * What apps connected through the Rocket Feast sign-in (Claude, ChatGPT and other MCP clients) and
 * Rocket Feast AI may do with money, exactly as the backend does it today (serviceSessionGuard
 * isRequestOnlyMoneySession / refuseMoneyRequestOnlySession; refundApprovalGate refuses refunds while
 * REFUND_REQUESTS_ENABLED is off). Kept as separate sentences so refunds are never tied to a request.
 */
export const MONEY_REQUESTS =
    "Bill discounts, item discounts and comps above the venue's approval limit are sent as **approval requests** for a person with approval rights to approve or decline in Rocket Feast.";
export const MONEY_REFUSED =
    "Refunds, payments, points, vouchers, reopening or merging bills, and expenses are refused. Staff do them in Rocket Feast, and approving or declining requests is also left to staff.";
