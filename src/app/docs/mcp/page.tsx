import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal/legal-page";
import { docsMcp } from "@/content/legal/docs-mcp";

export const metadata: Metadata = {
    title: docsMcp.title,
    description: docsMcp.description,
};

export default function Page() {
    return <LegalPage doc={docsMcp} />;
}
