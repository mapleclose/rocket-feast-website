import { LegalPage, legalMetadata } from "@/components/marketing/legal/legal-page";
import { privacyPolicy } from "@/components/marketing/legal/privacy-policy";

export const metadata = legalMetadata(privacyPolicy);

export default function Page() {
    return <LegalPage doc={privacyPolicy} />;
}
