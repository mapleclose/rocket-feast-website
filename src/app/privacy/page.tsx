import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal/legal-page";
import { privacyPolicy } from "@/content/legal/privacy";

export const metadata: Metadata = {
    title: privacyPolicy.title,
    description: privacyPolicy.description,
};

export default function Page() {
    return <LegalPage doc={privacyPolicy} />;
}
