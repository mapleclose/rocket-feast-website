import { LEGAL_ROUTES, type LegalDocument, contactLink } from "./legal-document";

export const privacyPolicy: LegalDocument = {
    title: "Privacy Policy",
    description:
        "How Rocket Feast, operated by Maple Close Limited, collects, uses and protects personal data, including messages received through Facebook and Instagram.",
    intro: [
        'This policy explains how Rocket Feast handles personal data. Rocket Feast is operated by Maple Close Limited, a company incorporated in Hong Kong (company number 2191307) ("Rocket Feast", "we", "us").',
        'Rocket Feast is a restaurant and venue management platform. We sell it to hospitality businesses ("venues"), such as restaurants, cafés, bars and leisure venues. It covers point of sale, menus, ordering, bills, members, staff, inventory and admissions.',
    ],
    sections: [
        {
            id: "who-we-are",
            heading: "Who we are",
            blocks: [
                "Maple Close Limited, trading as Rocket Feast.",
                "Registered address: No. 5, 17/F, Strand 50, 50 Bonham Strand, Sheung Wan, Hong Kong SAR.",
                `For any question about this policy or your personal data, contact us through ${contactLink}.`,
            ],
        },
        {
            id: "our-role",
            heading: "Our role: the venue or us",
            blocks: [
                "Who is responsible for your data depends on how you use Rocket Feast.",
                { subheading: "When you are a guest of a venue" },
                "If you order, pay, book, visit, join as a member or send a message to a venue that uses Rocket Feast, the venue is the controller of your data. The venue decides what it collects and why. We process that data on the venue's behalf, following its instructions and our agreement with it.",
                "If you have a question about your data as a guest, the quickest route is to ask the venue. You can also contact us and we will pass your request to the venue and help it respond.",
                { subheading: "When you deal with Rocket Feast directly" },
                "We are the controller for:",
                [
                    "Rocket Feast accounts used by venue owners, managers and staff.",
                    "Our own customers, the businesses that buy Rocket Feast, and the people who contact us on their behalf.",
                    "People who visit rocketfeast.com or contact us.",
                ],
                "Records a venue keeps about its team in Rocket Feast, such as shifts, attendance, leave and tasks, belong to the venue: the venue is the controller and we process them on its behalf.",
            ],
        },
        {
            id: "laws",
            heading: "The laws we follow",
            blocks: [
                "Most venues that use Rocket Feast are in Thailand, and we are based in Hong Kong. We follow:",
                [
                    "Thailand's Personal Data Protection Act B.E. 2562 (2019) (PDPA). Under the PDPA, the venue is the data controller for its guests' data and we are its data processor.",
                    "Hong Kong's Personal Data (Privacy) Ordinance (Cap. 486) (PDPO). Under the PDPO, the venue is the \"data user\" for its guests' data and we are its data processor.",
                ],
                "Where other data protection laws apply to a venue or a person, we follow those too.",
            ],
        },
        {
            id: "what-we-collect",
            heading: "What we collect",
            blocks: [
                { subheading: "Guests of venues (on the venue's behalf)" },
                [
                    "Name, phone number, email address and photo, if you give them to the venue.",
                    "Member profiles, memberships, packages and loyalty records the venue keeps.",
                    "Orders, bills, receipts and payment records, such as amount, method and status.",
                    "Bookings, visits, check-ins and admissions.",
                    "Feedback and messages you send to the venue, including through Facebook and Instagram (see Rocket Feast Social below).",
                ],
                { subheading: "Venue owners, managers and staff" },
                [
                    "Name, phone number, email address, role and the venues you work at.",
                    "Sign-in details and security records, such as when and from which device you signed in.",
                    "What you do in Rocket Feast, so the venue can see who made a change.",
                ],
                { subheading: "Our customers and contacts" },
                [
                    "Business contact details: name, role, email address and phone number.",
                    "Billing details and the plans and modules you buy.",
                    "Messages and support requests you send us.",
                ],
                "If you buy Rocket Feast through a reseller, such as Yummi Umami Ltd in Thailand, the reseller also handles your order and billing details, under its own privacy policy.",
                { subheading: "Visitors to rocketfeast.com" },
                [
                    "Technical data such as IP address, browser type and the pages you visit.",
                    "Your chosen region, language and display theme. See Cookies and browser storage below.",
                ],
            ],
        },
        {
            id: "rocket-feast-social",
            heading: "Rocket Feast Social: Facebook and Instagram messages",
            blocks: [
                "Rocket Feast Social lets a venue connect its Facebook Page and Instagram account to Rocket Feast. It helps the venue answer guest messages and comments, and publish posts.",
                { subheading: "What we receive from Meta" },
                "Through Meta's APIs, we receive:",
                [
                    "Messages that guests send to the venue's connected Facebook Page or Instagram account, including photos, videos, voice messages and replies to the venue's stories.",
                    "Comments on the venue's own Facebook and Instagram posts.",
                    "The sender's ID for that Page or account, their name or username, and their profile picture.",
                    "The time each message or comment was sent.",
                    "When a venue connects: the name and Facebook ID of the person who connects, the Pages and Instagram accounts they choose, and access keys that let Rocket Feast act for those accounts. We store access keys encrypted.",
                ],
                "We only receive what guests send to the venue's own connected accounts. We do not read your other conversations or your activity elsewhere on Facebook or Instagram.",
                { subheading: "What we store" },
                [
                    "Message text and comments.",
                    "The sender ID, username or profile name, and profile picture.",
                    "Timestamps.",
                    "Photos and other attachments in guest messages.",
                    "Replies sent to the guest, whether written by the AI assistant or by staff.",
                    "Staff notes about the conversation.",
                    "Saved answers: general facts, such as opening hours or prices, that the AI saves from staff answers so it can answer the same question next time. They are not meant to hold details about a particular guest. The venue's team can see, edit and remove them, and they are kept until the venue removes them or they expire.",
                    "Posts the venue approves, and the photos its team uploads for them.",
                ],
                { subheading: "Why we use it" },
                [
                    "To show the venue's team its guest conversations in one inbox.",
                    "To draft and send replies on the venue's behalf.",
                    "To hand a conversation to a member of staff when it needs a person.",
                    "To keep a record of the conversation so the venue can follow up.",
                    "To publish posts the venue has approved.",
                ],
                "Rocket Feast may link a conversation to your member record at that venue when your name or phone number matches, and the venue's staff can link it themselves.",
                { subheading: "Replies written by AI" },
                "An AI assistant drafts or sends replies for the venue. It follows the rules the venue sets and uses the venue's own information and saved answers. Staff can reply themselves or take over at any time, and you can ask to speak to a person.",
                "To write replies, AI model providers process the message text. We only use providers that have agreed not to use it to train their models.",
                "Please do not send sensitive details, such as health information, by message unless you need to. If you tell a venue about an allergy, it is used to answer you and to serve you safely.",
                { subheading: "Who can see it" },
                [
                    "The venue's authorised staff.",
                    "Rocket Feast staff, only when needed to support the venue, fix a problem or keep the service secure.",
                    "Our service providers, such as cloud hosting and AI model providers, only to provide their service to us.",
                ],
                { subheading: "How we use data from Meta" },
                "We use data we receive from Meta only to provide Rocket Feast Social to the business whose account it came from. We never sell it. We do not use it for advertising, we do not share it with other businesses that use Rocket Feast, and we do not combine it across businesses to build profiles of people.",
                { subheading: "How long we keep it" },
                [
                    "Guest conversations are kept for 90 days after the last message, then deleted, unless the venue deletes them sooner.",
                    "When a venue disconnects its Facebook Page or Instagram account (in its Facebook settings under Business Integrations, or by asking us), or stops using Rocket Feast Social, we delete the data we received from Meta for that account within 30 days.",
                    "Posts that have been published stay on Facebook or Instagram until the venue removes them there.",
                ],
                `To ask for your messages to be deleted, see our [data deletion instructions](${LEGAL_ROUTES.dataDeletion}).`,
                "Meta's own handling of your data is covered by Meta's privacy policy.",
            ],
        },
        {
            id: "how-we-use",
            heading: "How we use personal data",
            blocks: [
                "We use personal data to:",
                [
                    "Provide Rocket Feast to venues and carry out their instructions.",
                    "Create and manage accounts and keep them secure.",
                    "Answer questions and give support.",
                    "Bill our customers and keep financial records.",
                    "Find and fix problems, and prevent fraud and misuse.",
                    "Tell our customers about changes to the service.",
                    "Meet our legal obligations.",
                ],
                "Where we are the controller, we rely on these legal grounds: to perform a contract with you or your business, our legitimate interests in running a secure and reliable service, legal obligations, and your consent where the law requires it, for example for marketing emails. You can withdraw consent at any time.",
                "For guests' data, the venue decides the legal ground and is responsible for telling guests about it.",
            ],
        },
        {
            id: "sharing",
            heading: "Who we share data with",
            blocks: [
                "We share personal data only as needed to run Rocket Feast:",
                [
                    "With the venue, for its guests' and team's data.",
                    "With service providers that work for us, such as cloud hosting (Amazon Web Services), AI model providers and the services that connect us to them, and email and SMS providers.",
                    "With Meta, to receive and send messages and publish posts for venues that use Rocket Feast Social.",
                    "With payment providers and other services a venue chooses to connect.",
                    "With messaging apps a venue turns on for staff alerts, such as Telegram. These alerts say a guest needs a reply and link to Rocket Feast. If the venue chooses, an alert can include the guest's latest message.",
                    "With professional advisers, or with authorities when the law requires it.",
                    "With a buyer or successor if our business is sold or reorganised, under the same protections.",
                ],
                "We never sell personal data.",
            ],
        },
        {
            id: "international-transfers",
            heading: "Data sent to other countries",
            blocks: [
                "We store Rocket Feast data with Amazon Web Services in Thailand (Bangkok). This website is hosted by Amazon Web Services outside Thailand. Some service providers, including AI model providers, process data in other countries, mainly the United States. When data leaves Thailand, we use contracts and our providers' data protection commitments to protect it, as the PDPA requires. We apply the same protections to data from Hong Kong.",
            ],
        },
        {
            id: "retention",
            heading: "How long we keep data",
            blocks: [
                [
                    "We keep a venue's data while it uses Rocket Feast, or until the venue deletes it.",
                    "When a venue stops using Rocket Feast, we delete its data or return it, unless the law requires us to keep it.",
                    "We keep accounting and tax records for as long as the law requires.",
                    "Rocket Feast Social conversations follow the periods in the Rocket Feast Social section above.",
                ],
            ],
        },
        {
            id: "security",
            heading: "How we protect data",
            blocks: [
                "We use technical and organisational measures to protect personal data. These include access controls, encryption in transit and limiting who on our team can see data. No system is completely secure. If a data breach is likely to affect you, we will tell the venue, the authorities and you where the law requires.",
            ],
        },
        {
            id: "your-rights",
            heading: "Your rights",
            blocks: [
                "Depending on the law that applies, you can ask to:",
                [
                    "See the personal data held about you and get a copy.",
                    "Correct data that is wrong or incomplete.",
                    "Delete your data.",
                    "Object to, or limit, how your data is used.",
                    "Move your data to another service.",
                    "Withdraw consent you gave.",
                ],
                `If you are a guest, ask the venue first. Otherwise, contact us through ${contactLink}. We may need to confirm who you are. We reply within 30 days.`,
                "You can also complain to a regulator: in Thailand, the Personal Data Protection Committee; in Hong Kong, the Privacy Commissioner for Personal Data.",
            ],
        },
        {
            id: "cookies",
            heading: "Cookies and browser storage",
            blocks: [
                "rocketfeast.com does not use advertising or analytics cookies. We store your chosen region, language and display theme in your browser so the site remembers them. We may use your IP address to suggest your region. When you sign in, we use a cookie that recognises a device you have used before, to keep your account secure.",
            ],
        },
        {
            id: "children",
            heading: "Children",
            blocks: [
                "Rocket Feast is a tool for businesses and is not meant for children. If a venue records a child's details, for example for a children's admission, the venue is responsible for getting any consent the law requires.",
            ],
        },
        {
            id: "changes",
            heading: "Changes to this policy",
            blocks: [
                "We may update this policy. We will change the date at the top when we do. If a change is significant, we will tell our customers in advance.",
            ],
        },
        {
            id: "contact",
            heading: "Contact",
            blocks: [`Maple Close Limited, trading as Rocket Feast. Registered address: No. 5, 17/F, Strand 50, 50 Bonham Strand, Sheung Wan, Hong Kong SAR. Contact us through ${contactLink}.`],
        },
    ],
};
