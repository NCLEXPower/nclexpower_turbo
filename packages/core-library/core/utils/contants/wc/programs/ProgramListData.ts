/**
* Property of the NCLEX Power.
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
    videoPlaceholder,
    authorSample
} from "../../../../../assets";

export const standardProgramList: StandardProgramListType[] = [
    {
        id: "1",
        title: 'Welcome to the Program',
        programStatus: 'completed',
        programImage: WelcomeProgram,
        sections: [
            { sectionId: "1", sectionType: 'document', sectionTitle: 'Welcome to the CORE Zigma System', sectionStatus: 'completed' },
            { sectionId: "2", sectionType: 'document', sectionTitle: 'About the NGN (the current NCLEX)', sectionStatus: 'completed' },
        ],
        disabled: false
    },
    {
        id: "2",
        title: '01 Cardiovascular System',
        programStatus: 'completed',
        programImage: CardioVascular,
        sections: [
            {
                sectionId: "1",
                sectionType: 'video',
                sectionTitle: 'Day 1 Videos',
                sectionStatus: 'completed',
                sectionVideos:
                    [
                        {
                            secVidId: "1", secVidTitle: 'Essential Parts of Cardiovascular System', secVidUrl: "https://www.youtube.com/watch?v=teRcrjGb5kk",
                            secVidPlaceholder: videoPlaceholder,
                            secVidDuration: '4:00',
                            secVidAuthor: 'Arjon Rivera',
                            secVidAuthorImg: authorSample,
                            secVidDescription: "Gain a comprehensive understanding of the intricate parts that make up the cardiovascular system, essential knowledge for every nursing student. This video meticulously explores the anatomy of the heart, detailing its chambers, valves, and major blood vessels. Discover the vital roles played by components like the coronary arteries, veins, and the complex network of capillaries. Learn how each part functions in harmony to facilitate the continuous flow of blood throughout the body. Whether you're a visual learner or seeking to solidify your grasp of cardiac anatomy, this video offers a thorough and engaging exploration.'"
                        },
                        {
                            secVidId: "2",
                            secVidTitle: 'Conduction of the Heart',
                            secVidUrl: "https://www.youtube.com/watch?v=H2jA88pESko",
                            secVidPlaceholder: videoPlaceholder,
                            secVidDuration: '3:00',
                            secVidAuthor: 'JM Sevilla',
                            secVidAuthorImg: authorSample,
                            secVidDescription: "'Conduction of the Heart: Cardiac Knowledge for Nursing Students' explains the heart's electrical conduction system, highlighting key components like the sinoatrial (SA) node, atrioventricular (AV) node, bundle of His, and Purkinje fibers. It helps nursing students understand how electrical impulses regulate the heart's rhythm and blood flow, essential for recognizing and managing cardiac conditions like arrhythmias."
                        }]
            },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 1 Simulator', sectionStatus: 'completed',  },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'completed' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'completed' },
        ],
        disabled: false
    },
    {
        id: "3",
        title: '02 Respiratory System',
        programStatus: 'progress',
        programImage: Respiratory,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 2 Videos', sectionStatus: 'completed',                 sectionVideos:
                [
                    {
                        secVidId: "1", secVidTitle: 'Essential Parts of Cardiovascular System', secVidUrl: "https://www.youtube.com/watch?v=teRcrjGb5kk",
                        secVidPlaceholder: videoPlaceholder,
                        secVidDuration: '4:00',
                        secVidAuthor: 'Arjon Rivera',
                        secVidAuthorImg: authorSample,
                        secVidDescription: "Gain a comprehensive understanding of the intricate parts that make up the cardiovascular system, essential knowledge for every nursing student. This video meticulously explores the anatomy of the heart, detailing its chambers, valves, and major blood vessels. Discover the vital roles played by components like the coronary arteries, veins, and the complex network of capillaries. Learn how each part functions in harmony to facilitate the continuous flow of blood throughout the body. Whether you're a visual learner or seeking to solidify your grasp of cardiac anatomy, this video offers a thorough and engaging exploration.'"
                    }
                ]},
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 2 Simulator', sectionStatus: 'in-progress' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'in-progress' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'in-progress' },
        ],
        disabled: false
    },
    {
        id: "4",
        title: '03 Gastrointestinal System',
        programStatus: 'unavailable',
        programImage: Gastrointestinal,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 3 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 3 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "5",
        title: '04 Nephrology System',
        programStatus: 'unavailable',
        programImage: Nephrology,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 4 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 4 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "6",
        title: '05 Hematology System',
        programStatus: 'unavailable',
        programImage: Hematology,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 5 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 5 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "7",
        title: '06 Infectious Diseases',
        programStatus: 'unavailable',
        programImage: InfectiousDiseases,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 6 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 6 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "8",
        title: '07 Rest Day I',
        programStatus: 'unavailable',
        programImage: RestDayOne,
        sections: [
            { sectionId: "1", sectionType: 'perspective', sectionTitle: 'Perspectives', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'strategy', sectionTitle: 'Continue with Strategies', sectionStatus: 'available' }
        ],
        disabled: true
    },
    {
        id: "9",
        title: '08 Neurology System',
        programStatus: 'unavailable',
        programImage: Neurology,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 8 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 8 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "10",
        title: '09 Endocrine System',
        programStatus: 'unavailable',
        programImage: Endocrine,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 9 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 9 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "11",
        title: '10 Musculoskeletal System',
        programStatus: 'unavailable',
        programImage: Musculoskeletal,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 10 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 10 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "12",
        title: '11 Integumentary/Skin System',
        programStatus: 'unavailable',
        programImage: Integumentary,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 11 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 11 Simulator', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "13",
        title: '12 Oncology System',
        programStatus: 'unavailable',
        programImage: Oncology,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 12 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 12 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "14",
        title: '12 OB/GYN System',
        programStatus: 'unavailable',
        programImage: OBGYN,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 12 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 12 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "15",
        title: '13 Systems CAT',
        programStatus: 'unavailable',
        programImage: SystemsCAT,
        sections: [
            { sectionId: "1", sectionType: 'CAT', sectionTitle: 'Primer on Taking the Systems CAT', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'CAT', sectionTitle: 'Systems CAT Simulator', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "16",
        title: '14 Rest Day II',
        programStatus: 'unavailable',
        programImage: RestDayTwo,
        sections: [
            { sectionId: "1", sectionType: 'perspective', sectionTitle: 'Perspectives', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'strategy', sectionTitle: 'Intro to Patient Units Section', sectionStatus: 'available' }
        ],
        disabled: true
    },
    {
        id: "17",
        title: '15 Mother-Baby',
        programStatus: 'unavailable',
        programImage: MotherBaby,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 15 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 15 Simulator (50 questions)', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "18",
        title: '16 Pediatrics',
        programStatus: 'unavailable',
        programImage: Pediatrics,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 16 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 16 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "19",
        title: '17 Medical-Surgical',
        programStatus: 'unavailable',
        programImage: MedicalSurgical,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 17 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 17 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "20",
        title: '18 Critical Care (ICU)',
        programStatus: 'unavailable',
        programImage: CriticalCare,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 18 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 18 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "21",
        title: '19 Emergency (ER)',
        programStatus: 'unavailable',
        programImage: Emergency,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 19 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 19 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "22",
        title: '20 Mental Health',
        programStatus: 'unavailable',
        programImage: MentalHealth,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 20 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 20 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "23",
        title: '20 Nurse Station',
        programStatus: 'unavailable',
        programImage: NurseStation,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 20 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 20 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "24",
        title: '20 Patient Units CAT',
        programStatus: 'unavailable',
        programImage: PatientUnitsCAT,
        sections: [
            { sectionId: "1", sectionType: 'CAT', sectionTitle: 'Primer on Taking the Units CAT', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'CAT', sectionTitle: 'Systems CAT Simulator (100 questions)', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "25",
        title: '21 Rest Day III',
        programStatus: 'unavailable',
        programImage: RestDayThree,
        sections: [
            { sectionId: "1", sectionType: 'perspective', sectionTitle: 'Perspectives', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'document', sectionTitle: 'What Endurance Means', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "26",
        title: '22 Case Studies',
        programStatus: 'unavailable',
        programImage: CaseStudies,
        sections: [
            { sectionId: "1", sectionType: 'document', sectionTitle: 'About Case Studies', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'document', sectionTitle: 'Guided Practice for Case Studies', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'simulator', sectionTitle: 'Case Studies Simulator', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "27",
        title: '23 Final CAT',
        programStatus: 'unavailable',
        programImage: FinalCAT,
        sections: [
            { sectionId: "1", sectionType: 'CAT', sectionTitle: 'Words on the Final CAT', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'CAT', sectionTitle: 'Final CAT Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'CAT', sectionTitle: 'Post Test: Final Words', sectionStatus: 'available' },
        ],
        disabled: true
    },
];

export const fastrackProgramList: StandardProgramListType[] = [
    {
        id: "1",
        title: 'Welcome to the Program',
        programStatus: 'available',
        programImage: WelcomeProgram,
        sections: [
            { sectionId: "1", sectionType: 'document', sectionTitle: 'Welcome to the Core Zigma System', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'document', sectionTitle: 'The current NCLEX', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'document', sectionTitle: 'Intro to the Fastrack Program', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'content-cards', sectionTitle: 'View Content Cards for Body Systems', sectionStatus: 'available' },
            { sectionId: "5", sectionType: 'med-cards', sectionTitle: 'DL Med Cards for Body Systems', sectionStatus: 'available' },
        ],
        disabled: false
    },
    {
        id: "2",
        title: '01 Mother-Baby',
        programStatus: 'unavailable',
        programImage: MotherBaby,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 1 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 1 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "3",
        title: '02 Pediatrics',
        programStatus: 'unavailable',
        programImage: Pediatrics,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 2 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 2 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "4",
        title: '03 Medical-Surgical',
        programStatus: 'unavailable',
        programImage: MedicalSurgical,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 3 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 3 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "5",
        title: '04 Critical Care (ICU)',
        programStatus: 'unavailable',
        programImage: CriticalCare,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 4 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 4 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "6",
        title: '05 Emergency (ER)',
        programStatus: 'unavailable',
        programImage: Emergency,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 5 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 5 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "7",
        title: '06 Mental Health',
        programStatus: 'unavailable',
        programImage: MentalHealth,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 20 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 20 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
            { sectionId: "4", sectionType: 'med-cards', sectionTitle: 'DL Med Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "8",
        title: '06 Nurse Station',
        programStatus: 'unavailable',
        programImage: NurseStation,
        sections: [
            { sectionId: "1", sectionType: 'video', sectionTitle: 'Day 8 Videos', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'simulator', sectionTitle: 'Day 8 Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'content-cards', sectionTitle: 'View Content Cards', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "9",
        title: '07 Case Studies',
        programStatus: 'unavailable',
        programImage: CaseStudies,
        sections: [
            { sectionId: "1", sectionType: 'document', sectionTitle: 'About Case Studies', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'document', sectionTitle: 'Guided Practice for Case Studies', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'simulator', sectionTitle: 'Case Studies Simulator', sectionStatus: 'available' },
        ],
        disabled: true
    },
    {
        id: "10",
        title: '08 Final CAT',
        programStatus: 'unavailable',
        programImage: FinalCAT,
        sections: [
            { sectionId: "1", sectionType: 'CAT', sectionTitle: 'Words on the Final CAT', sectionStatus: 'available' },
            { sectionId: "2", sectionType: 'CAT', sectionTitle: 'Final CAT Simulator', sectionStatus: 'available' },
            { sectionId: "3", sectionType: 'CAT', sectionTitle: 'Post Test: Final Words', sectionStatus: 'available' },
        ],
        disabled: true
    },
];