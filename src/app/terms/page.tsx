import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal/legal-page";
import { terms } from "@/content/legal/terms";

export const metadata: Metadata = {
    title: terms.title,
    description: terms.description,
};

export default function Page() {
    return <LegalPage doc={terms} />;
}
