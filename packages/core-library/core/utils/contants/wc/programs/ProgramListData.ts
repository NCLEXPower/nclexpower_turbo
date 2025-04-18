/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { StandardProgramListType } from "../../../../../types/wc/programList";
import {
  WelcomeProgram,
  CardioVascular,
  Respiratory,
  Gastrointestinal,
  Nephrology,
  Hematology,
  InfectiousDiseases,
  RestDayOne,
  Neurology,
  Endocrine,
  Musculoskeletal,
  Integumentary,
  Oncology,
  OBGYN,
  SystemsCAT,
  RestDayTwo,
  MotherBaby,
  Pediatrics,
  MedicalSurgical,
  CriticalCare,
  Emergency,
  MentalHealth,
  NurseStation,
  PatientUnitsCAT,
  RestDayThree,
  CaseStudies,
  FinalCAT,
} from "../../../../../assets";

export const standardProgramList: StandardProgramListType[] = [
  {
    id: "1",
    title: "Welcome to the Program",
    programStatus: "completed",
    programImage: WelcomeProgram,
    sections: [
      {
        sectionId: "1",
        sectionType: "document",
        sectionTitle: "Welcome to the CORE Zigma System",
        sectionStatus: "completed",
        sectionTimer: "",
        sectionData: [
          {
            sectionDataId: "f00f8127-fadb-4691-c6cc-08dd4c1b4b40",
            title: "Test Document Updated",
            link: "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/med-cards/documents/198495e5-8b76-4a9e-957e-4f3cdeb4e99a.pdf",
            contentArea: null,
            guided: null,
            unguided: null,
            practice: null,
            catSimulator: null,
            contentAreaCoverage: [],
            cards: [],
          },
        ],
      },
      {
        sectionId: "2",
        sectionType: "document",
        sectionTitle: "About the NGN (the current NCLEX)",
        sectionStatus: "completed",
        sectionTimer: "",
        sectionData: [
          {
            sectionDataId: "f00f8127-fadb-4691-c6cc-abcdefghjk",
            title: "Test Document Updated",
            link: "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/med-cards/documents/198495e5-8b76-4a9e-957e-4f3cdeb4e99a.pdf",
            contentArea: null,
            guided: null,
            unguided: null,
            practice: null,
            catSimulator: null,
            contentAreaCoverage: [],
            cards: [],
          },
        ],
      },
    ],
    disabled: false,
  },
  {
    id: "2",
    title: "01 Cardiovascular System",
    programStatus: "completed",
    programImage: CardioVascular,
    sections: [
      {
        sectionId: "15d6d8bc-1bb4-4bb2-20fd-08dd60566a69",
        sectionType: "video",
        sectionTitle: "What is Core Zigma",
        sectionStatus: "available",
        sectionTimer: "",
        sectionData: [
          {
            secVidId: "e0863720-02e5-4199-745c-08dd60566a6b",
            secVidTitle: "Welcome to NCLEX Power",
            secVidUrl:
              "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/video/videos/f22d8f0f-73f7-4d40-86b6-fa528efc83a5.mp4",
            secVidPlaceholder:
              "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/video/thumbnails/f9711632-6cb0-4c61-82a1-212c714eb20a.png",
            secVidAuthor: "NCLEX Nurse Division",
            secVidAuthorImg:
              "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/video/authors/7ba2e2d9-fa42-4495-a524-dc0816a4dc1e.png",
            secVidDescription: "<p>Sample Description nclex power</p>",
          },
        ],
      },
      {
        sectionId: "5c422144-6ab6-4958-2106-08dd60566a69",
        sectionType: "video",
        sectionTitle: "What is Core Zigma",
        sectionStatus: "available",
        sectionTimer: "",
        sectionData: [
          {
            secVidId: "d6321f96-09f1-4d7f-7465-08dd60566a6b",
            secVidTitle: "Welcome to the Core Zigma",
            secVidUrl:
              "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/video/videos/6ec6084e-3a44-47f2-9aab-66bc55d584c9.mp4",
            secVidPlaceholder:
              "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/video/thumbnails/c96f984e-c2ff-42ef-93af-6dab4885f51d.png",
            secVidAuthor: "NCLEX Nurse Division",
            secVidAuthorImg:
              "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/video/authors/37659a99-cb76-465c-8177-d629f3ad246c.png",
            secVidDescription:
              "<p>Sample Description welcome to core zigma</p>",
          },
        ],
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 1 Simulator",
        sectionStatus: "completed",
        sectionTimer: "",
      },
      {
        sectionId: "22301c65-064c-4b1c-2103-08dd60566a69",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
        sectionData: [
          {
            sectionDataId: "7a1cfa1e-fb5a-45f5-7462-08dd60566a6b",
            title: "Cardio Cards",
            cards: [
              {
                cardId: "6f882df1-f71f-4634-e48f-08dd605ad0a8",
                cardTopic: "Hypertension",
                cardFaces: [
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/0691423b-5327-46b8-be4b-9e025aceab58.png",
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/cc151c0e-8711-4c36-9ed6-44d739910618.png",
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/8ee5a93c-fffe-4008-9ae9-b7a09d31db10.png",
                ],
              },
              {
                cardId: "21da6be6-97e1-482a-e490-08dd605ad0a8",
                cardTopic: "Coronary Artery Disease",
                cardFaces: [
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/f36abbc4-d670-4b99-93fa-8cbd15405a24.png",
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/c610cd19-533a-4abe-8e1c-4c83094f47e5.png",
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/1504b3f7-889f-48f7-9a7f-ba0f818707bd.png",
                ],
              },
              {
                cardId: "8b6dd505-c267-4562-e491-08dd605ad0a8",
                cardTopic: "Congestive Heart Failure",
                cardFaces: [
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/ca183b69-18f2-49e8-90cc-5144c7ee1026.png",
                  "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/content-cards/cards/25ca10c9-63e3-4223-8cca-61375cfa0a2d.png",
                ],
              },
            ],
            contentArea: null,
            guided: null,
            unguided: null,
            practice: null,
            catSimulator: null,
            contentAreaCoverage: [],
          },
        ],
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "completed",
        sectionTimer: "",
        sectionData: [
          {
            sectionDataId: "f00f8127-fadb-4691-c6cc-abcdefghjk",
            title: "Test Document Updated",
            link: "https://storage.googleapis.com/nclexpowerdev.appspot.com/sections/med-cards/documents/9f6504b5-fdd6-4527-a6da-92cbc36941d6.zip",
            contentArea: null,
            guided: null,
            unguided: null,
            practice: null,
            catSimulator: null,
            contentAreaCoverage: [],
            cards: [],
          },
        ],
      },
    ],
    disabled: false,
  },
  {
    id: "3",
    title: "02 Respiratory System",
    programStatus: "progress",
    programImage: Respiratory,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 2 Videos",
        sectionStatus: "completed",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 2 Simulator",
        sectionStatus: "in-progress",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "in-progress",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "in-progress",
        sectionTimer: "",
      },
    ],
    disabled: false,
  },
  {
    id: "4",
    title: "03 Gastrointestinal System",
    programStatus: "unavailable",
    programImage: Gastrointestinal,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 3 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 3 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "5",
    title: "04 Nephrology System",
    programStatus: "unavailable",
    programImage: Nephrology,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 4 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 4 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "6",
    title: "05 Hematology System",
    programStatus: "unavailable",
    programImage: Hematology,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 5 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 5 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "7",
    title: "06 Infectious Diseases",
    programStatus: "unavailable",
    programImage: InfectiousDiseases,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 6 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 6 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "8",
    title: "07 Rest Day I",
    programStatus: "unavailable",
    programImage: RestDayOne,
    sections: [
      {
        sectionId: "1",
        sectionType: "perspective",
        sectionTitle: "Perspectives",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "strategy",
        sectionTitle: "Continue with Strategies",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "9",
    title: "08 Neurology System",
    programStatus: "unavailable",
    programImage: Neurology,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 8 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 8 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "10",
    title: "09 Endocrine System",
    programStatus: "unavailable",
    programImage: Endocrine,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 9 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 9 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "11",
    title: "10 Musculoskeletal System",
    programStatus: "unavailable",
    programImage: Musculoskeletal,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 10 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 10 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "12",
    title: "11 Integumentary/Skin System",
    programStatus: "unavailable",
    programImage: Integumentary,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 11 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 11 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "13",
    title: "12 Oncology System",
    programStatus: "unavailable",
    programImage: Oncology,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 12 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 12 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "14",
    title: "12 OB/GYN System",
    programStatus: "unavailable",
    programImage: OBGYN,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 12 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 12 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "15",
    title: "13 Systems CAT",
    programStatus: "unavailable",
    programImage: SystemsCAT,
    sections: [
      {
        sectionId: "1",
        sectionType: "CAT",
        sectionTitle: "Primer on Taking the Systems CAT",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "CAT",
        sectionTitle: "Systems CAT Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "16",
    title: "14 Rest Day II",
    programStatus: "unavailable",
    programImage: RestDayTwo,
    sections: [
      {
        sectionId: "1",
        sectionType: "perspective",
        sectionTitle: "Perspectives",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "strategy",
        sectionTitle: "Intro to Patient Units Section",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "17",
    title: "15 Mother-Baby",
    programStatus: "unavailable",
    programImage: MotherBaby,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 15 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 15 Simulator (50 questions)",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "18",
    title: "16 Pediatrics",
    programStatus: "unavailable",
    programImage: Pediatrics,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 16 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 16 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "19",
    title: "17 Medical-Surgical",
    programStatus: "unavailable",
    programImage: MedicalSurgical,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 17 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 17 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "20",
    title: "18 Critical Care (ICU)",
    programStatus: "unavailable",
    programImage: CriticalCare,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 18 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 18 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "21",
    title: "19 Emergency (ER)",
    programStatus: "unavailable",
    programImage: Emergency,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 19 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 19 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "22",
    title: "20 Mental Health",
    programStatus: "unavailable",
    programImage: MentalHealth,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 20 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 20 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "23",
    title: "20 Nurse Station",
    programStatus: "unavailable",
    programImage: NurseStation,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 20 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 20 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "24",
    title: "20 Patient Units CAT",
    programStatus: "unavailable",
    programImage: PatientUnitsCAT,
    sections: [
      {
        sectionId: "1",
        sectionType: "CAT",
        sectionTitle: "Primer on Taking the Units CAT",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "CAT",
        sectionTitle: "Systems CAT Simulator (100 questions)",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "25",
    title: "21 Rest Day III",
    programStatus: "unavailable",
    programImage: RestDayThree,
    sections: [
      {
        sectionId: "1",
        sectionType: "perspective",
        sectionTitle: "Perspectives",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "document",
        sectionTitle: "What Endurance Means",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "26",
    title: "22 Case Studies",
    programStatus: "unavailable",
    programImage: CaseStudies,
    sections: [
      {
        sectionId: "1",
        sectionType: "document",
        sectionTitle: "About Case Studies",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "document",
        sectionTitle: "Guided Practice for Case Studies",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "simulator",
        sectionTitle: "Case Studies Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "27",
    title: "23 Final CAT",
    programStatus: "unavailable",
    programImage: FinalCAT,
    sections: [
      {
        sectionId: "1",
        sectionType: "CAT",
        sectionTitle: "Words on the Final CAT",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "CAT",
        sectionTitle: "Final CAT Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "CAT",
        sectionTitle: "Post Test: Final Words",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
];

export const fastrackProgramList: StandardProgramListType[] = [
  {
    id: "1",
    title: "Welcome to the Program",
    programStatus: "available",
    programImage: WelcomeProgram,
    sections: [
      {
        sectionId: "1",
        sectionType: "document",
        sectionTitle: "Welcome to the Core Zigma System",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "document",
        sectionTitle: "The current NCLEX",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "document",
        sectionTitle: "Intro to the Fastrack Program",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards for Body Systems",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "5",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards for Body Systems",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: false,
  },
  {
    id: "2",
    title: "01 Mother-Baby",
    programStatus: "unavailable",
    programImage: MotherBaby,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 1 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 1 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "74638192374852",
    title: "Welcome to the Program",
    programStatus: "available",
    programImage: WelcomeProgram,
    sections: [
      {
        sectionId: "827465928412",
        sectionType: "document",
        sectionTitle: "Welcome to the CORE Zigma System",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 2 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "627485960212",
        sectionType: "video",
        sectionTitle: "Day 1 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: false,
  },
  {
    id: "777222641823",
    title: "Day 1 Cardio",
    programStatus: "available",
    programImage: CardioVascular,
    sections: [
      {
        sectionId: "677653218723",
        sectionType: "document",
        sectionTitle: "Welcome to the CORE Zigma System",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 3 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "5",
    title: "04 Critical Care (ICU)",
    programStatus: "unavailable",
    programImage: CriticalCare,
    sections: [
      {
        sectionId: "987654237465",
        sectionType: "video",
        sectionTitle: "Day 1 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 4 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "876952637461",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "6",
    title: "05 Emergency (ER)",
    programStatus: "unavailable",
    programImage: Emergency,
    sections: [
      {
        sectionId: "246387812345",
        sectionType: "CAT",
        sectionTitle: "Body System Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 5 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "7",
    title: "06 Mental Health",
    programStatus: "unavailable",
    programImage: MentalHealth,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 20 Videos",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 20 Simulator",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
      {
        sectionId: "4",
        sectionType: "med-cards",
        sectionTitle: "DL Med Cards",
        sectionStatus: "available",
        sectionTimer: "",
      },
    ],
    disabled: true,
  },
  {
    id: "8",
    title: "06 Nurse Station",
    programStatus: "unavailable",
    programImage: NurseStation,
    sections: [
      {
        sectionId: "1",
        sectionType: "video",
        sectionTitle: "Day 8 Videos",
        sectionStatus: "available",
      },
      {
        sectionId: "2",
        sectionType: "simulator",
        sectionTitle: "Day 8 Simulator",
        sectionStatus: "available",
      },
      {
        sectionId: "3",
        sectionType: "content-cards",
        sectionTitle: "View Content Cards",
        sectionStatus: "available",
      },
    ],
    disabled: true,
  },
  {
    id: "9",
    title: "07 Case Studies",
    programStatus: "unavailable",
    programImage: CaseStudies,
    sections: [
      {
        sectionId: "1",
        sectionType: "document",
        sectionTitle: "About Case Studies",
        sectionStatus: "available",
      },
      {
        sectionId: "2",
        sectionType: "document",
        sectionTitle: "Guided Practice for Case Studies",
        sectionStatus: "available",
      },
      {
        sectionId: "3",
        sectionType: "simulator",
        sectionTitle: "Case Studies Simulator",
        sectionStatus: "available",
      },
    ],
    disabled: true,
  },
];
