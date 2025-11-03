import { HeroSplitImage02 } from "@/components/marketing/header-section/hero-split-image-02";
import { SocialProofFullWidth } from "@/components/marketing/social-proof/social-proof-full-width";
import { FeaturesIconsAndImage03 } from "@/components/marketing/features/features-icons-and-image-03";
import { FeaturesIconsAndImage02 } from "@/components/marketing/features/features-icons-and-image-02";
import { MetricsSimpleWithActions01 } from "@/components/marketing/metrics/metrics-simple-with-actions-01";
import { FeaturesIconsAndMockup01 } from "@/components/marketing/features/features-icons-and-mockup-01";
import { FeaturesAlternatingLayout01 } from "@/components/marketing/features/features-alternating-layout-01";
import { PricingSimpleIcon } from "@/components/marketing/pricing-sections/pricing-simple-icon";
import { TestimonialAbstractImage } from "@/components/marketing/testimonials/testimonial-abstract-image";
import { CTASplitImage03 } from "@/components/marketing/cta/cta-split-image-03";
import { FooterLarge04 } from "@/components/marketing/footers/footer-large-04";

export const HomeScreen = () => {
    return (
        <div>
            {/* Hero split image 02: main header/banner */}
            <HeroSplitImage02 />

            {/* Social Proof > Full width */}
            <SocialProofFullWidth />

            {/* Icons and image 03: intro video and key value proposition */}
            <FeaturesIconsAndImage03 />

            {/* Icons and image 02: Problem it is solving and who it is for */}
            <FeaturesIconsAndImage02 />

            {/* Metrics simple with actions 01: Value delivered */}
            <MetricsSimpleWithActions01 />

            {/* Icons and mockup 01: Feature summary */}
            <FeaturesIconsAndMockup01 />

            {/* Alternating layout 01: more detailed walk through of key features */}
            <FeaturesAlternatingLayout01 />

            {/* Pricing simple icon: Highlight plans */}
            <PricingSimpleIcon />

            {/* Testimonial abstract image: Testimonials */}
            <TestimonialAbstractImage />

            {/* Split image 03: CTA */}
            <CTASplitImage03 />

            {/* Footer > Large 04: No email needed */}
            <FooterLarge04 />
        </div>
    );
};
