import { LEGAL_ROUTES, type LegalDocument, contactLink } from "./legal-document";

export const dataDeletion: LegalDocument = {
    title: "Data Deletion Instructions",
    description: "How to ask Rocket Feast to delete your personal data, including messages received through Facebook and Instagram.",
    intro: [
        "This page explains how to ask Rocket Feast to delete your personal data. This includes messages and comments a venue received through its Facebook Page or Instagram account using Rocket Feast Social.",
        "Rocket Feast is operated by Maple Close Limited, a company incorporated in Hong Kong.",
    ],
    sections: [
        {
            id: "guests",
            heading: "If you are a guest of a venue",
            blocks: [
                "The venue you contacted controls your data. You can ask the venue directly: speak to its staff, or send a message to the same Facebook Page or Instagram account. The venue can delete your conversation in Rocket Feast.",
                "You can also ask us, and we will work with the venue to delete it.",
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
                    "We delete the data within 30 days and confirm when it is done.",
                    "If the law requires us or the venue to keep some records, such as tax records for a bill you paid, we tell you what we kept and why.",
                ],
            ],
        },
        {
            id: "venues",
            heading: "If you run a venue",
            blocks: [
                "You can remove data received from Meta yourself:",
                [
                    "To delete a conversation, open it in Social › Inbox in Rocket Feast and delete it.",
                    "To remove all data from a Facebook Page or Instagram account, disconnect the account in Social › Settings › Accounts. We delete the data we received from Meta for that account within 30 days.",
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
