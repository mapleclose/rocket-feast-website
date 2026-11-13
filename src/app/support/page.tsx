import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal/legal-page";
import { support } from "@/content/legal/support";

export const metadata: Metadata = {
    title: support.title,
    description: support.description,
};

export default function Page() {
    return <LegalPage doc={support} />;
}
