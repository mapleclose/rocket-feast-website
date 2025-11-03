import type { I18nConfig } from "@/types/i18n";

/**
 * Thailand Thai language configuration (th-th)
 * Regional config (company, currency, pricing) is inherited from th-en
 * Only add Thai language translations here
 */
export const thThConfig: Partial<I18nConfig> = {
    // Regional settings (company, currency, pricing) inherit from th-en
    // No need to duplicate - they're the same for both English and Thai in Thailand

    // TODO: Add Thai translations here as they become ready
    // For now, everything falls back to English
    // Uncomment and add translations as needed:
    /*
    content: {
        common: {
            learnMore: "เรียนรู้เพิ่มเติม",
            getStarted: "เริ่มต้นใช้งาน",
            contactUs: "ติดต่อเรา",
            signUp: "สมัครสมาชิก",
            signIn: "เข้าสู่ระบบ",
            readMore: "อ่านเพิ่มเติม",
            comingSoon: "เร็วๆ นี้",
        },
        // ... add other sections as needed
    },
    */
};
