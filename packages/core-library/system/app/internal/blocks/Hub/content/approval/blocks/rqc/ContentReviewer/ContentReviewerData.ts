export const author = [
  {
    author: "John Doe",
    createdDate: "September 14, 2024",
  },
];

export const mainContent = [
  {
    id: 1,
    type: "Regular Question",
    mainType: "MCQ",
    question:
      "The nurse is caring for a client who is in Buck traction. Which of the following would require immediate intervention?",
    cognitiveLevel: "Knowledge",
    contentArea: "Adult Health: Cardiovascular",
    clientNeeds: "Management of Care",
    mainContentAnswerCollections: [
      { answer: "A pillow is placed under the knee." },
      { answer: "The foot is 2 in (5 cm) away from the foot plate." },
      {
        answer:
          "The weights attached to the pulley are 6 in (15 cm) from the floor.",
      },
      {
        answer:
          "A pillow is placed under the lower leg with the heel off the bed.",
      },
    ],
    answerKey:
      "The weights attached to the pulley are 6 in (15 cm) from the floor.",
  },
];

export const RadioData = [
  { title: "Approve", value: 0 },
  { title: "Comment", value: 1 },
  { title: "Request Changes", value: 2 },
  { title: "Reject", value: 3 },
];

export const contentApprovers = [
  {
    content: "Regular Question",
    approver: "John Doe",
    comment: "Example comment displaying the comment of approver.",
    createdAt: "September 14, 2024",
  },
];
