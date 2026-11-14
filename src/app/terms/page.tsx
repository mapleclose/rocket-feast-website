import { LegalPage, legalMetadata } from "@/components/marketing/legal/legal-page";
import { termsOfService } from "@/components/marketing/legal/terms-of-service";

export const metadata = legalMetadata(termsOfService);

export default function Page() {
    return <LegalPage doc={termsOfService} />;
}
