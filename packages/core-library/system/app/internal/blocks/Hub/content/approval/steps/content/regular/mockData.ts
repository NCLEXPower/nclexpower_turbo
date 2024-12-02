import { AuthorizedContentsResponseType } from "../../../../../../../../../../api/types";

export const mockData:AuthorizedContentsResponseType[] =[
    {
        id: "3fa12385f21364-5717-4562-b3fc-2c963f66afa16",
        contentApprovers: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                content: "Approval for educational article",
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                approver: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                    accountId: "approver-001",
                    createdDate: "2024-09-21T18:40:52.515Z",
                    updatedDate: "2024-09-21T18:40:52.515Z"
                }
            }
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f166afa9",
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
            accountId: "author-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-21c963f66afaa",
        revisions: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            mainContent: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afab",
                type: "Article",
                mainType: "Text",
                mainContentCollections: [
                    {
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afac",
                        cognitiveLevel: "High",
                        clientNeeds: "Educational Material",
                        contentArea: "Science",
                        question: "What is the scientific method?",
                        mainContentAnswerCollections: [
                            {
                                id: "3fa85f64-5717-4562-b3fc-2c963f66afad",
                                answer: "A systematic process for experimentation.",
                                answerKey: true
                            }
                        ]
                    }
                ],
                createdDate: "2024-09-21T18:40:52.515Z",
                updatedDate: "2024-09-21T18:40:52.515Z"
            },
            adminId: "3fa85f64-5717-4562-b3fc-2c963f66afae",
            highlights: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afaf",
                    highlightedText: "scientific method",
                    comment: "Important concept to clarify.",
                    startPosition: 0,
                    endPosition: 17
                }
            ],
            revisionStatus: 1,
            createdDate: "2024-09-21T18:40:52.515Z"
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c1963f66afag",
        mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afah",
            type: "Article",
            mainType: "Text",
            mainContentCollections: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afai",
                    cognitiveLevel: "Medium",
                    clientNeeds: "Knowledge Acquisition",
                    contentArea: "Mathematics",
                    question: "How do you calculate the area of a circle?",
                    mainContentAnswerCollections: [
                        {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afaj",
                            answer: "Use the formula πr².",
                            answerKey: true
                        }
                    ]
                }
            ],
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "",
        createdDate: "",
        updatedDate: "",
        timeZone: ""
    },
    {
        id: "3f123a85f64-5717-412562-b3fc-2c963f66afak",
        contentApprovers: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afal",
                contentId: "3fa85f64-5717-4562-b3fc-2c963f66afak",
                content: "Approval for technical documentation",
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afam",
                approver: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afam",
                    accountId: "tech-approver-001",
                    createdDate: "2024-09-21T18:40:52.515Z",
                    updatedDate: "2024-09-21T18:40:52.515Z"
                }
            }
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afan",
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afan",
            accountId: "tech-author-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afa0",
        revisions: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa0",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afak",
            mainContent: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
                type: "Guide",
                mainType: "Document",
                mainContentCollections: [
                    {
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
                        cognitiveLevel: "Low",
                        clientNeeds: "Installation Instructions",
                        contentArea: "IT",
                        question: "How to install the software?",
                        mainContentAnswerCollections: [
                            {
                                id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
                                answer: "Download the installer and follow the prompts.",
                                answerKey: true
                            }
                        ]
                    }
                ],
                createdDate: "2024-09-21T18:40:52.515Z",
                updatedDate: "2024-09-21T18:40:52.515Z"
            },
            adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
            highlights: [],
            revisionStatus: 0,
            createdDate: "2024-09-21T18:40:52.515Z"
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
        mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "Guide",
            mainType: "Document",
            mainContentCollections: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                    cognitiveLevel: "Medium",
                    clientNeeds: "Troubleshooting",
                    contentArea: "Support",
                    question: "What to do if the installation fails?",
                    mainContentAnswerCollections: [
                        {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                            answer: "Check the log files for errors and contact support.",
                            answerKey: true
                        }
                    ]
                }
            ],
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "",
        createdDate: "",
        updatedDate: "",
        timeZone: ""
    },
    {
        id: "3fa833533f64-5717-4562-b3fc-2c963f66afa6",
        contentApprovers: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                content: "Approval for educational article",
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                approver: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                    accountId: "approver-001",
                    createdDate: "2024-09-21T18:40:52.515Z",
                    updatedDate: "2024-09-21T18:40:52.515Z"
                }
            }
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
            accountId: "author-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
        revisions: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            mainContent: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afab",
                type: "Article",
                mainType: "Text",
                mainContentCollections: [
                    {
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afac",
                        cognitiveLevel: "High",
                        clientNeeds: "Educational Material",
                        contentArea: "Science",
                        question: "What is the scientific method?",
                        mainContentAnswerCollections: [
                            {
                                id: "3fa85f64-5717-4562-b3fc-2c963f66afad",
                                answer: "A systematic process for experimentation.",
                                answerKey: true
                            }
                        ]
                    }
                ],
                createdDate: "2024-09-21T18:40:52.515Z",
                updatedDate: "2024-09-21T18:40:52.515Z"
            },
            adminId: "3fa85f64-5717-4562-b3fc-2c963f66afae",
            highlights: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afaf",
                    highlightedText: "scientific method",
                    comment: "Important concept to clarify.",
                    startPosition: 0,
                    endPosition: 17
                }
            ],
            revisionStatus: 1,
            createdDate: "2024-09-21T18:40:52.515Z"
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afag",
        mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afah",
            type: "Article",
            mainType: "Text",
            mainContentCollections: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afai",
                    cognitiveLevel: "Medium",
                    clientNeeds: "Knowledge Acquisition",
                    contentArea: "Mathematics",
                    question: "How do you calculate the area of a circle?",
                    mainContentAnswerCollections: [
                        {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afaj",
                            answer: "Use the formula πr².",
                            answerKey: true
                        }
                    ]
                }
            ],
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "",
        createdDate: "",
        updatedDate: "",
        timeZone: ""
    },
    {
        id: "113fa85f64-5717-4562-b3fc-2c963f66afak",
        contentApprovers: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afal",
                contentId: "3fa85f64-5717-4562-b3fc-2c963f66afak",
                content: "Approval for technical documentation",
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afam",
                approver: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afam",
                    accountId: "tech-approver-001",
                    createdDate: "2024-09-21T18:40:52.515Z",
                    updatedDate: "2024-09-21T18:40:52.515Z"
                }
            }
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afan",
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afan",
            accountId: "tech-author-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afa0",
        revisions: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa0",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afak",
            mainContent: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
                type: "Guide",
                mainType: "Document",
                mainContentCollections: [
                    {
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
                        cognitiveLevel: "Low",
                        clientNeeds: "Installation Instructions",
                        contentArea: "IT",
                        question: "How to install the software?",
                        mainContentAnswerCollections: [
                            {
                                id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
                                answer: "Download the installer and follow the prompts.",
                                answerKey: true
                            }
                        ]
                    }
                ],
                createdDate: "2024-09-21T18:40:52.515Z",
                updatedDate: "2024-09-21T18:40:52.515Z"
            },
            adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
            highlights: [],
            revisionStatus: 0,
            createdDate: "2024-09-21T18:40:52.515Z"
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
        mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "Guide",
            mainType: "Document",
            mainContentCollections: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                    cognitiveLevel: "Medium",
                    clientNeeds: "Troubleshooting",
                    contentArea: "Support",
                    question: "What to do if the installation fails?",
                    mainContentAnswerCollections: [
                        {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                            answer: "Check the log files for errors and contact support.",
                            answerKey: true
                        }
                    ]
                }
            ],
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "",
        createdDate: "",
        updatedDate: "",
        timeZone: ""
    },
    {
        id: "113fa85f64-5717-4562-b3fc-2c963f66afa6",
        contentApprovers: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                content: "Approval for educational article",
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                approver: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                    accountId: "approver-001",
                    createdDate: "2024-09-21T18:40:52.515Z",
                    updatedDate: "2024-09-21T18:40:52.515Z"
                }
            }
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
            accountId: "author-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
        revisions: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afaa",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            mainContent: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afab",
                type: "Article",
                mainType: "Text",
                mainContentCollections: [
                    {
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afac",
                        cognitiveLevel: "High",
                        clientNeeds: "Educational Material",
                        contentArea: "Science",
                        question: "What is the scientific method?",
                        mainContentAnswerCollections: [
                            {
                                id: "3fa85f64-5717-4562-b3fc-2c963f66afad",
                                answer: "A systematic process for experimentation.",
                                answerKey: true
                            }
                        ]
                    }
                ],
                createdDate: "2024-09-21T18:40:52.515Z",
                updatedDate: "2024-09-21T18:40:52.515Z"
            },
            adminId: "3fa85f64-5717-4562-b3fc-2c963f66afae",
            highlights: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afaf",
                    highlightedText: "scientific method",
                    comment: "Important concept to clarify.",
                    startPosition: 0,
                    endPosition: 17
                }
            ],
            revisionStatus: 1,
            createdDate: "2024-09-21T18:40:52.515Z"
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afag",
        mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afah",
            type: "Article",
            mainType: "Text",
            mainContentCollections: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afai",
                    cognitiveLevel: "Medium",
                    clientNeeds: "Knowledge Acquisition",
                    contentArea: "Mathematics",
                    question: "How do you calculate the area of a circle?",
                    mainContentAnswerCollections: [
                        {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afaj",
                            answer: "Use the formula πr².",
                            answerKey: true
                        }
                    ]
                }
            ],
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "",
        createdDate: "",
        updatedDate: "",
        timeZone: ""
    },
    {
        id: "3fa85f1312364-5717-4562-b3fc-2c963f66afak",
        contentApprovers: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afal",
                contentId: "3fa85f64-5717-4562-b3fc-2c963f66afak",
                content: "Approval for technical documentation",
                approverId: "3fa85f64-5717-4562-b3fc-2c963f66afam",
                approver: {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afam",
                    accountId: "tech-approver-001",
                    createdDate: "2024-09-21T18:40:52.515Z",
                    updatedDate: "2024-09-21T18:40:52.515Z"
                }
            }
        ],
        contentAuthorId: "3fa85f64-5717-4562-b3fc-2c963f66afan",
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afan",
            accountId: "tech-author-001",
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        contentRevisionsId: "3fa85f64-5717-4562-b3fc-2c963f66afa0",
        revisions: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa0",
            contentId: "3fa85f64-5717-4562-b3fc-2c963f66afak",
            mainContent: {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
                type: "Guide",
                mainType: "Document",
                mainContentCollections: [
                    {
                        id: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
                        cognitiveLevel: "Low",
                        clientNeeds: "Installation Instructions",
                        contentArea: "IT",
                        question: "How to install the software?",
                        mainContentAnswerCollections: [
                            {
                                id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
                                answer: "Download the installer and follow the prompts.",
                                answerKey: true
                            }
                        ]
                    }
                ],
                createdDate: "2024-09-21T18:40:52.515Z",
                updatedDate: "2024-09-21T18:40:52.515Z"
            },
            adminId: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
            highlights: [],
            revisionStatus: 0,
            createdDate: "2024-09-21T18:40:52.515Z"
        },
        contentId: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
        mainContent: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            type: "Guide",
            mainType: "Document",
            mainContentCollections: [
                {
                    id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                    cognitiveLevel: "Medium",
                    clientNeeds: "Troubleshooting",
                    contentArea: "Support",
                    question: "What to do if the installation fails?",
                    mainContentAnswerCollections: [
                        {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afa8",
                            answer: "Check the log files for errors and contact support.",
                            answerKey: true
                        }
                    ]
                }
            ],
            createdDate: "2024-09-21T18:40:52.515Z",
            updatedDate: "2024-09-21T18:40:52.515Z"
        },
        mainContentStatus: 0,
        workflow: 0,
        implementationSchedule: "",
        createdDate: "",
        updatedDate: "",
        timeZone: ""
    },
  ]