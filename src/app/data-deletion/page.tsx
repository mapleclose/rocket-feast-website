import { dataDeletion } from "@/components/marketing/legal/data-deletion";
import { LegalPage, legalMetadata } from "@/components/marketing/legal/legal-page";

export const metadata = legalMetadata(dataDeletion);

export default function Page() {
    return <LegalPage doc={dataDeletion} />;
}
