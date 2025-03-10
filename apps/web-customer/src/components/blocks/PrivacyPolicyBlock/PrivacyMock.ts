type SubSectionType = {
  id: number;
  subSectionId: string;
  subSectionTitle: string;
  subSectionContent: string;
};

type PrivacyPolicyBlockType = {
  id: number;
  sectionId: string;
  sectionTitle: string;
  subSection: SubSectionType[];
};

export const mockData: PrivacyPolicyBlockType[] = [
  {
    id: 1,
    sectionId: "training-program-account-registration",
    sectionTitle: "Training Program – Account Registration",
    subSection: [
      {
        id: 1,
        subSectionId: "terms-of-use-and-definitions",
        subSectionTitle: "Terms of Use and Definitions",
        subSectionContent: `By ordering or registering for an account to allow purchase of an NCLEXPOWER course or training 
product (named as Training Program), you agree that you (also referred to as the Enrollee/Client) will comply with the terms and conditions below (the Terms of Registration), that you understand and 
agree to these terms. Please read these Terms of Use carefully before continuing with the registration process.`,
      },
      {
        id: 2,
        subSectionId: "applicability",
        subSectionTitle: "Applicability",
        subSectionContent: `These Terms of Registration apply to the process provided and enacted by NCLEXPower.com. Client registration and training program information are made available to the public through NCLEXPower’s main website, www.nclexpower.com. NCLEXPower is owned and managed by Nth Core ProSolutions, LLC.`,
      },
      {
        id: 3,
        subSectionId: "registration-process",
        subSectionTitle: "Registration Process",
        subSectionContent: `By ordering or registering for an account to allow purchase of an NCLEXPOWER course or training 
product (named as Training Program), you agree that you (also referred to as the Enrollee/Client) will comply with the terms and conditions below (the Terms of Registration), that you understand and 
agree to these terms. Please read these Terms of Use carefully before continuing with the registration process.`,
      },
      {
        id: 4,
        subSectionId:
          "privacy-policy-terms-of-service-use-of-personal-information",
        subSectionTitle:
          "Privacy Policy, Terms of Service, and Use of Personal Information",
        subSectionContent: `These Terms of Registration apply to the process provided and enacted by NCLEXPower.com. Client registration and training program information are made available to the public through NCLEXPower’s main website, www.nclexpower.com. NCLEXPower is owned and managed by Nth Core ProSolutions, LLC.`,
      },
      {
        id: 5,
        subSectionId: "policy-and-continuation-to-product-payment-screen",
        subSectionTitle:
          "This Policy and Continuation to Product Payment Screen",
        subSectionContent: `By ordering or registering for an account to allow purchase of an NCLEXPOWER course or training 
product (named as Training Program), you agree that you (also referred to as the Enrollee/Client) will comply with the terms and conditions below (the Terms of Registration), that you understand and 
agree to these terms. Please read these Terms of Use carefully before continuing with the registration process.`,
      },
      {
        id: 6,
        subSectionId: "authority-by-on-screen-consent",
        subSectionTitle: "Authority by On-screen Consent",
        subSectionContent: `These Terms of Registration apply to the process provided and enacted by NCLEXPower.com. Client registration and training program information are made available to the public through NCLEXPower’s main website, www.nclexpower.com. NCLEXPower is owned and managed by Nth Core ProSolutions, LLC.`,
      },
    ],
  },
  {
    id: 2,
    sectionId: "training-program-course-access",
    sectionTitle: "Training Program – Course Access",
    subSection: [
      {
        id: 1,
        subSectionId: "terms-of-use-and-definitions-2",
        subSectionTitle: "Terms of Use and Definitions",
        subSectionContent: `Access to NCLEXPOWER courses is limited to individuals who have successfully completed the registration process. Users must provide accurate and up-to-date information during sign-up.`,
      },
      {
        id: 2,
        subSectionId: "applicability-2",
        subSectionTitle: "Applicability",
        subSectionContent: `Course access requires full payment or an active subscription. Refunds are subject to the NCLEXPower refund policy, which can be accessed on the website.`,
      },
      {
        id: 3,
        subSectionId: "registration-and-payment-process",
        subSectionTitle: "Registration and Payment Process",
        subSectionContent: `By ordering or registering for an account to allow purchase of an NCLEXPOWER course or training 
product (named as Training Program), you agree that you (also referred to as the Enrollee/Client) will comply with the terms and conditions below (the Terms of Registration), that you understand and 
agree to these terms. Please read these Terms of Use carefully before continuing with the registration process.`,
      },
      {
        id: 4,
        subSectionId:
          "privacy-policy-terms-of-service-other-payment-process-conditions",
        subSectionTitle:
          "Privacy Policy, Terms of Service, and Other Payment Process Conditions",
        subSectionContent: `These Terms of Registration apply to the process provided and enacted by NCLEXPower.com. Client registration and training program information are made available to the public through NCLEXPower’s main website, www.nclexpower.com. NCLEXPower is owned and managed by Nth Core ProSolutions, LLC.`,
      },
      {
        id: 5,
        subSectionId: "training-program-usage-and-copyright",
        subSectionTitle: "Training Program Usage and Copyright",
        subSectionContent: `Access to NCLEXPOWER courses is limited to individuals who have successfully completed the registration process. Users must provide accurate and up-to-date information during sign-up.`,
      },
      {
        id: 6,
        subSectionId: "allowed-device-usage",
        subSectionTitle: "Allowed Device Usage",
        subSectionContent: `Course access requires full payment or an active subscription. Refunds are subject to the NCLEXPower refund policy, which can be accessed on the website.`,
      },
      {
        id: 7,
        subSectionId: "length-of-program-duration-vs-length-of-access",
        subSectionTitle: "Length of Program Duration vs. Length of Access",
        subSectionContent: `By ordering or registering for an account to allow purchase of an NCLEXPOWER course or training 
product (named as Training Program), you agree that you (also referred to as the Enrollee/Client) will comply with the terms and conditions below (the Terms of Registration), that you understand and 
agree to these terms. Please read these Terms of Use carefully before continuing with the registration process.`,
      },
      {
        id: 8,
        subSectionId: "refund-policy",
        subSectionTitle: "Refund Policy",
        subSectionContent: `These Terms of Registration apply to the process provided and enacted by NCLEXPower.com. Client registration and training program information are made available to the public through NCLEXPower’s main website, www.nclexpower.com. NCLEXPower is owned and managed by Nth Core ProSolutions, LLC.`,
      },
      {
        id: 9,
        subSectionId: "other-policies",
        subSectionTitle: "Other Policies",
        subSectionContent: `By ordering or registering for an account to allow purchase of an NCLEXPOWER course or training 
product (named as Training Program), you agree that you (also referred to as the Enrollee/Client) will comply with the terms and conditions below (the Terms of Registration), that you understand and 
agree to these terms. Please read these Terms of Use carefully before continuing with the registration process.`,
      },
      {
        id: 10,
        subSectionId: "authority-by-on-screen-consent-2",
        subSectionTitle: "Authority by On-Screen Consent",
        subSectionContent: `These Terms of Registration apply to the process provided and enacted by NCLEXPower.com. Client registration and training program information are made available to the public through NCLEXPower’s main website, www.nclexpower.com. NCLEXPower is owned and managed by Nth Core ProSolutions, LLC.`,
      },
    ],
  },
];
