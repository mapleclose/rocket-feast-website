/**
 * Internal links the footers, contact page and FAQ share. `/docs/mcp`, `/privacy` and `/terms` are
 * also the defaults the Rocket Feast MCP advertises in its OAuth metadata
 * (rocket-feast-mcp src/auth/oauth-metadata.ts), so they must keep these paths.
 */
export const SITE_LINKS = {
    contact: "/contact",
    support: "/support",
    docsMcp: "/docs/mcp",
    privacy: "/privacy",
    terms: "/terms",
    cookies: "/privacy#cookies",
} as const;
