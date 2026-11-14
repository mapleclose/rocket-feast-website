import { LEGAL_ROUTES, type LegalDocument, contactLink } from "./legal-document";

export const dataDeletion: LegalDocument = {
    title: "Data Deletion Instructions",
    description: "How to ask Rocket Feast to delete your personal data, including messages received through Facebook and Instagram.",
    intro: [
        "This page explains how to ask Rocket Feast to delete your personal data. This includes messages and comments a venue received through its Facebook Page or Instagram account using Rocket Feast Social.",
        "Rocket Feast is operated by Maple Close Limited (Hong Kong company number 2191307), a company incorporated in Hong Kong.",
    ],
    sections: [
        {
            id: "guests",
            heading: "If you are a guest of a venue",
            blocks: [
                "The venue you contacted controls your data. You can ask the venue directly: speak to its staff, or send a message to the same Facebook Page or Instagram account. The venue can have your conversation deleted.",
                "You can also ask us, and we will work with the venue to delete it.",
                "Even if you do not ask, guest conversations are kept for 90 days after the last message, then deleted, unless the venue deletes them sooner.",
            ],
        },
        {
            id: "how-to-ask",
            heading: "How to ask us",
            blocks: [
                `Contact us through ${contactLink} with the subject "Delete my data". Please include:`,
                [
                    "Your name.",
                    "The Facebook Page or Instagram account you messaged, and your Facebook name or Instagram username.",
                    "Or, if you did not use Facebook or Instagram, the phone number or email you gave the venue.",
                    "The venue's name, and the branch if you know it.",
                    "Whether you want all your data deleted, or only certain conversations.",
                ],
                "We may ask you to confirm that the request comes from you. We will never ask for your password.",
            ],
        },
        {
            id: "what-happens",
            heading: "What happens next",
            blocks: [
                [
                    "We confirm that we have received your request.",
                    "If the venue controls the data, we tell the venue and help it act on your request.",
                    "The data is deleted within 30 days of your request, and we confirm when it is done.",
                    "If the law requires us or the venue to keep some records, such as tax records for a bill you paid, we tell you what we kept and why.",
                ],
            ],
        },
        {
            id: "venues",
            heading: "If you run a venue",
            blocks: [
                "You can remove data received from Meta at any time:",
                [
                    `To delete a conversation, or all data from a Facebook Page or Instagram account, contact us through ${contactLink}. We delete it within 30 days.`,
                    "To stop Rocket Feast receiving data from your Page and Instagram account, remove Rocket Feast Social in your Facebook settings under Business Integrations. We delete the data we received from Meta for that account within 30 days after it is disconnected.",
                ],
                "Posts you have already published stay on Facebook or Instagram until you remove them there.",
            ],
        },
        {
            id: "staff-and-customers",
            heading: "Venue staff and Rocket Feast customers",
            blocks: [
                `To delete your Rocket Feast account or other data we hold about you, contact us through ${contactLink}. We reply within 30 days. We keep invoices and other records only for as long as the law requires.`,
            ],
        },
        {
            id: "more",
            heading: "More information",
            blocks: [`Our [Privacy Policy](${LEGAL_ROUTES.privacy}) explains what we collect, why, and how long we keep it.`],
        },
    ],
};
