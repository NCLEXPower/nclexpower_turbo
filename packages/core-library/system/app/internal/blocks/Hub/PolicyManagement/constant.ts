type SubSectionType = {
  id: number;
  subSectionId: string;
  subSectionTitle: string;
  subSectionContent: string;
};

export interface TableColumns extends Record<string, unknown> {
  id: number;
  sectionId: string;
  sectionTitle: string;
  dateReceived: string;
  subSection: SubSectionType[];
}

export const PolicyMockData: TableColumns[] = [
  {
    id: 1,
    sectionId: "training-program-account-registration",
    sectionTitle: "Training Program – Account Registration",
    dateReceived: "2024-12-01T10:00:00.000Z",
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
    ],
  },
  {
    id: 2,
    sectionId: "training-program-course-access",
    sectionTitle: "Training Program – Course Access",
    dateReceived: "2024-12-01T10:00:00.000Z",
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
    ],
  },
];
