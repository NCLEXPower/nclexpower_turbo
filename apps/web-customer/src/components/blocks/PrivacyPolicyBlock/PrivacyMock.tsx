import { Box } from "@mui/material";
import { PolicyGrid } from "core-library/system/app/internal/blocks/Hub/Settings/SettingsManagement/RefundModal/steps/contents/RefundPolicyBlock/RefundPolicyGrid";

export type SublistItems = (ContentList | string | React.ReactNode)[];

export type ContentList = {
  description?: string;
  subDescription?: string;
  itemIcon?: string;
  items?: SublistItems;
};

type TermsAndConditionsContent = {
  id: number;
  subSectionId: string;
  subSectionTitle: string;
  subSectionContent: ContentList[];
};

export type TermsAndConditions = {
  id: number;
  sectionId: string;
  sectionTitle: string;
  subSection: TermsAndConditionsContent[];
};

export const tncData: TermsAndConditions[] = [
  {
    id: 1,
    sectionId: "training-program-account-registration",
    sectionTitle: "Training Program – Account Registration",
    subSection: [
      {
        id: 1,
        subSectionId: "terms-of-use-and-definitions",
        subSectionTitle: "Terms of Use and Definitions",
        subSectionContent: [
          {
            subDescription:
              "By registering for an account to allow the purchase of an Arxenius course or training product (named as Training Program ), you agree that you (also referred to as the Client/Product Buyer ) will comply with the terms and conditions set below (the Terms of Registration ), and that you understand and agree to these terms. Please read these details carefully before continuing with the registration and payment process.",
          },
        ],
      },
      {
        id: 2,
        subSectionId: "applicability",
        subSectionTitle: "Applicability",
        subSectionContent: [
          {
            subDescription:
              "These Terms of Registration apply to the process provided and enacted by Arxenius.com. Client registration and training program product types and other information are made available to the public through the Arxenius.com review main website, www.arxenius.com/nclex. Arxenius, Arxenius Review and the CoreZigma system are owned and managed by Arxon Solutions, LLC.",
          },
        ],
      },
      {
        id: 3,
        subSectionId: "registration-and-payment-process",
        subSectionTitle: "Registration And Payment Process",
        subSectionContent: [
          {
            description:
              "The following steps apply to the entire training program purchase process:",
            items: [
              "Product Selection (from Pricing Section on the Homepage)",
              "Account Creation and Registration",
              "Payment Steps: Screens and Confirmation Page",
            ],
          },
          {
            description: "Product Selection (from Pricing Section on Homepage)",
            subDescription:
              "Client selects particular product from the Pricing Section screen (For each nurse-type [RN] and [PN], there are these program duration-types: 23-day [Standard], and 8-day [Fast Track] Training programs.",
          },
          {
            description: "Account Creation, Registration and Login",
            subDescription:
              "Client is led to a page where the following details are to be provided:",
            items: [
              "Full Name (First and Last Name (required), Middle Name (Optional)",
              "Email Address",
              "Account password (re-type for confirmation)",
              "Acceptance (Checkbox) of Terms and Conditions and Privacy Policy",
            ],
          },
          {
            subDescription:
              "Client is the prompted to login to the newly-created account. The system will then proceed to the payment step screen.",
          },
          {
            description: "Payment Screens and Confirmation Page",
            subDescription:
              "Client is led then to a page with series of details (e.g., step by step screens)",
            items: [
              "Order Summary screen (from product selected)",
              "Payment Terms and Conditions",
              "Payment Details (Card Information)",
              "Payment Success Confirmation screen",
            ],
          },
        ],
      },
      {
        id: 4,
        subSectionId:
          "privacy-policy-terms-of-service-and-use-of-personal-information",
        subSectionTitle:
          "Privacy Policy, Terms of Service, and Use of Personal Information",
        subSectionContent: [
          {
            subDescription:
              "Details obtained from the initial account creation and registration step serve to create a customer data entry record into our system, upon which:",
            items: [
              "It uniquely identifies the client (based on their name and email)",
              "Used as tie-in for other internal sections (i.e., progress for video tutorials, simulator)",
              "Communication (sending of program confirmations and notifications)",
            ],
          },
          {
            subDescription:
              "The following rules and policies apply to the storage and use of data obtained from account creation and registration:",
            items: [
              "Only those fields listed in the page are the actual fields to be collected",
              "Collected data are used for internal purposes only. No data element – in-part or as a whole – are transferred, handed-over, or given to any third-party or external company, person, or entity.",
              "Internal purposes shall include those enumerated above, which include data to appear in the subsequent confirmation screens and user profile section.",
            ],
          },
          {
            subDescription:
              "As such, by clicking on the checkboxes as displayed on the Account Registration page, client agrees to the following:",
            items: [
              "To provide data elements being requested on the form",
              "To allow collection of such data",
              "To acknowledge awareness of collected data being stored as entries into the system's database",
              "To acknowledge and agree that collected data are used for internal purposes ONLY and are NOT sent, sold, transferred or handed over to any external third-party company, person or entity",
              "To acknowledge that such internal use of collected data are a necessary pre-requisite for client identification of various training program sections/sub-sections.",
            ],
          },
          {
            subDescription:
              "Client refusal to click the checkboxes shall halt the account creation and registration process; payment cannot proceed unless client agrees to create their account first before paying for the product being sought after.",
          },
        ],
      },
      {
        id: 5,
        subSectionId: "this-policy-and-continuation-to-product-payment-screen",
        subSectionTitle:
          "This Policy and Continuation to Product Payment Screen",
        subSectionContent: [
          {
            subDescription:
              "The policy statements specified above shall be applied unto the collection and subsequent usage of data elements from the Account Creation and Registration page.",
          },
          {
            subDescription:
              "Separate (but similar) statements are specified for data used and collected in the subsequent screens for the Product Payment Page. Any repetition of stated policies serve as a continuation of such, and does not supersede one after the other unless explicitly stated.",
          },
        ],
      },
      {
        id: 6,
        subSectionId: "authority-by-on-screen-consent",
        subSectionTitle: "Authority by On-screen Consent",
        subSectionContent: [
          {
            subDescription:
              "The client agrees to all appurtenant statements and provisions of this document, as duly captured by client's on-screen response (e.g., checking-off on the checkboxes).",
            items: [
              {
                itemIcon: "checkmark-square",
                subDescription: "I accept Terms of Service and Privacy Policy",
              },
              {
                itemIcon: "checkmark-square",
                subDescription:
                  "I consent to the collection and use of my personal information as described in the Privacy Policy, and agree to the Terms of Service",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    sectionId: "training-program-payment-and-program-usage",
    sectionTitle: "Training Program – Payment and Program Usage",
    subSection: [
      {
        id: 1,
        subSectionId: "terms-of-use-and-definitions-2",
        subSectionTitle: "Terms of Use and Definitions",
        subSectionContent: [
          {
            subDescription:
              "After registering for an account to allow the purchase of an Arxenius course or training product (named as Training Product/Program ), you agree that you (also referred to as the Client/Product Buyer ) will comply with the terms and conditions set below (the Terms of Product Payment and Program Usage ), and that you understand and agree to these terms. Please read these details carefully before continuing with the steps of the payment process.",
          },
        ],
      },
      {
        id: 2,
        subSectionId: "applicability-2",
        subSectionTitle: "Applicability",
        subSectionContent: [
          {
            subDescription:
              "These Terms of Product Payment and Program Usage apply to the process provided and enacted by arxenius.com. Client registration and training program product types and other information are made available to the public through the Arxenius.com review main website, www.arxenius.com/nclex. Arxenius, Arxenius Review and the CoreZigma system are owned and managed by Arxon Solutions, LLC.",
          },
        ],
      },
      {
        id: 3,
        subSectionId: "registration-and-payment-process-2",
        subSectionTitle: "Registration and Payment Process",
        subSectionContent: [
          {
            subDescription:
              "The following steps apply to the entire training program purchase process:",
            items: [
              "Product Selection (from Pricing Section on the Homepage)",
              "Account Creation and Registration",
              "Payment Steps: Screens and Confirmation Page",
            ],
          },
          {
            description: "Product Selection (from Pricing Section on Homepage)",
            subDescription:
              "Client selects particular product from the Pricing Section screen (For each nurse-type [RN] and [PN], there are these program duration-types: 23-day [Standard], and 8-day [Fast Track] Training programs.",
          },
          {
            description: "Account Creation, Registration and Login",
            subDescription:
              "Client is led to a page where the following details are to be provided:",
            items: [
              "Full Name (First and Last Name (required), Middle Name (Optional)",
              "Email Address",
              "Account password (re-type for confirmation)",
              "Acceptance (Checkbox) of Terms and Conditions and Privacy Policy",
            ],
          },
          {
            subDescription:
              "Client is the prompted to login to the newly-created account. The system will then proceed to the payment step screen.",
          },
          {
            description: "Payment Screens and Confirmation Page",
            subDescription:
              "Client is led then to a page with series of details (e.g., step by step screens)",
            items: [
              "Order Summary screen (from product selected)",
              "Payment Terms and Conditions",
              "Payment Details (Card Information)",
              "Payment Success Confirmation screen",
            ],
          },
        ],
      },
      {
        id: 4,
        subSectionId:
          "privacy-policy-terms-of-service-and-other-payment-conditions",
        subSectionTitle:
          "Privacy Policy, Terms of Service and Other Payment Conditions",
        subSectionContent: [
          {
            description: "Payment Process and Privacy Policy",
            subDescription:
              "The following rules and policies apply to the storage and use of data obtained for payment of product and subsequent use:",
            items: [
              "Only those fields listed in the page are the actual fields to be collected.",
              "Collected data are used for internal purposes only.",
              "Data collected from account creation and registration step are displayed onto the subsequent screen of the payment process for verification purposes. No part, portion or totality of this data is transmitted or forwarded to any external third-party entitiy, company or individual.",
              "Details requested on the Payment Details screen are not stored within the system s database; as such, no part or data element or field of this form are kept or stored inside the system – these are obtained as required fields to process payment using the Stripe platform.",
              "The Stripe payment processing platform incorporates industry-grade security procedures and layers (encryption); data obtained from the Payment Details screen are encrypted and transmitted according to Stripe s protocols as outlined in their API documentation: https://docs.stripe.com/api",
              "Clicking the form s Confirm Payment button (after clicking the checkbox agreeing to the Privacy Policy) utilizes code that transmits payment-related data using Stripe secured payment protocols. Stripe servers will process the payment and will send a response depending on the result of their payment processing.",
              {
                subDescription:
                  "A successful payment result will trigger the following:",
                items: [
                  "Moving forward to a Welcome Screen",
                  "System-generated confirmation and payment receipt email",
                  `Update payment status field on client s registered account to "PAID"`,
                ],
              },
              {
                subDescription:
                  "A non-successful (failed) payment will trigger the following:",
                items: [
                  "Moving forward to a Payment Failed announcement screen (with button to redirect back to Product Pricing section of the Homepage)",
                  "System-generated email (sent to the client s account email)",
                  `Update payment status field on client s registered account to "FAILED"`,
                ],
              },
              "All personal and payment data (credit/debit card numbers) transmitted to Stripe are NOT stored in the internal system/database.",
              "Successful payment grants the client access to the product that was purchased for a period of six months (180 days), after which the client would need to re-purchase the product again, if desired (sans the initial account creation and registration).",
              {
                subDescription: `By clicking the checkbox that reads: "By clicking this, I agree to the terms and conditions. :"`,
                items: [
                  "Client agrees to abide by the policies and statements regarding account registration and payment",
                  "Client also agrees to abide by terms and conditions on product usage, copyright, refund and re-purchase",
                  "Client acknowledges that failure to abide by the policies set forth in this document will result in termination of both account and program access, and with payment forfeited (i.e., without refund).",
                ],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        subSectionId: "training-program-usage-and-copyright-2",
        subSectionTitle: "Training Program Usage and Copyright",
        subSectionContent: [
          {
            itemIcon: "arrow-right",
            subDescription: `Client's purchase of any product offered by this website constitute payment for access to the program as a privilege of use (i.e., right to use).`,
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "Therefore, all rights and ownership of the product (in all its forms, sections, parts, and derivatives, whether in-part or in its entirety) and its content (e.g., content cards, videos, audio, logos, caricatures, 2D motion graphics, 3D models and animations) remain exclusively and explicitly as the property of the Product Owner: Arxon Solutions, LLC.",
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "It is therefore NOT to be construed that clients own the product they purchased – instead, they are accorded with usage rights and access to the training program upon their payment.",
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "As such, the following constitute a breach of the terms and conditions of copyright and appropriate product usage:",
            items: [
              "Purposefully giving away one s login credentials to another person for such to gain access (free or paid)",
              "Attempting to, or creating unauthorized copies (digital or physical) of any content portion of the training program (e.g., videos and cards)",
              "Selling or distributing (through any channel, social media or any other means) unauthorized copies of the training program, whether in-part or as a whole",
              "Attempting to reverse-engineer, deconstruct, decompile, or hack system components, contents and resources, including any access or security penetration.",
              "Other acts, whether performed willfully or as an accomplice, paid or pro-bono – that constitute a blatant disregard for copyright and respect of ownership of this product and the statements as specified in this document.",
            ],
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "Any action as enumerated above will be meted with the following sanctions:",
            items: [
              "Discontinuation of service (cease access to the program)",
              "Forfeiture of payment without refund",
              "Depending on severity, filing appropriate legal action, as applied to copyright laws in the United States and locally in the country or territory of purchase.",
            ],
          },
        ],
      },
      {
        id: 6,
        subSectionId: "length-of-program-duration-vs-length-of-access-2",
        subSectionTitle: "Length of Program Duration vs. Length of Access",
        subSectionContent: [
          {
            itemIcon: "arrow-right",
            subDescription:
              "There are currently two (2) product types offered, based on length of the training program as applied to both Nurse types (RN and PN):",
            items: [
              "Standard (23 days) Program",
              "Fast Track (8 days) Program",
            ],
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "The length of the training program is based on days of engagement of the client with the pre-set daily review regimen.",
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "The client, however, is accorded access to the review materials for a period of 6 months (or 180 days) from the date of purchase. This allows the client the flexibility of self-paced learning.",
          },
        ],
      },
      {
        id: 7,
        subSectionId: "refund-policy-2",
        subSectionTitle: "Refund Policy",
        subSectionContent: [
          {
            itemIcon: "arrow-right",
            subDescription:
              "There is no trial account nor trial access provided. Sample videos of the training program and review materials found inside the review system are shown in promotional videos in various social media accounts, to allow potential buyers to see how the system works even before purchasing.",
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "Although we are confident on the quality of our product, we will allow a client to request a refund, subject to the following provisions:",
            items: [
              <Box
                sx={{
                  "& .MuiTypography-root": {
                    fontFamily: "PT Sans Narrow",
                  },
                }}
              >
                <PolicyGrid forTNC />
              </Box>,
            ],
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "Clients are requested to reach out to Technical Support or use the Help Chat for any questions, comments and suggestions they may have, in an attempt to solve any issues before requesting for a refund.",
          },
          {
            itemIcon: "arrow-right",
            subDescription:
              "Breach of privacy policy and copyright terms and conditions shall automatically invalidate any claim to a refund.",
          },
        ],
      },
    ],
  },
];
