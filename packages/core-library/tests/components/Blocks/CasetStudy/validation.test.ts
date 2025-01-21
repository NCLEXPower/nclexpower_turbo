import {
  regularQuestionsFormSchema,
  containedCaseStudyQuestionSchema,
  mcqGroupAnswerSchema,
} from "./../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/validation";

jest.mock("../../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock(
  "./../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/utils/generateQuestionErrorMessage",
  () => ({
    generateQuestionErrorMessage: jest
      .fn()
      .mockImplementation((path, message) => message),
  })
);

describe("Regular Questions Form Schema", () => {
  it("should validate valid data", async () => {
    const validData = {
      questionnaires: [
        {
          cognitiveLevel: "Level 1",
          clientNeeds: "Client Need 1",
          contentArea: "Content Area 1",
          question: "What is the capital of France?",
          answers: [
            { answer: "Paris", answerKey: true },
            { answer: "London", answerKey: false },
          ],
        },
      ],
    };

    await expect(regularQuestionsFormSchema.isValid(validData)).resolves.toBe(
      true
    );
  });

  it("should return error when cognitiveLevel is missing", async () => {
    const invalidData = {
      questionnaires: [
        {
          clientNeeds: "Client Need 1",
          contentArea: "Content Area 1",
          question: "What is the capital of France?",
          answers: [
            { answer: "Paris", answerKey: true },
            { answer: "London", answerKey: false },
          ],
        },
      ],
    };

    await expect(regularQuestionsFormSchema.isValid(invalidData)).resolves.toBe(
      false
    );
  });

  it("should return error when answer is missing", async () => {
    const invalidData = {
      questionnaires: [
        {
          cognitiveLevel: "Level 1",
          clientNeeds: "Client Need 1",
          contentArea: "Content Area 1",
          question: "What is the capital of France?",
          answers: [{ answer: "", answerKey: true }],
        },
      ],
    };

    await expect(regularQuestionsFormSchema.isValid(invalidData)).resolves.toBe(
      false
    );
  });
});

describe("Contained Case Study Question Schema", () => {
  it("should validate valid data", async () => {
    const validData = {
      caseName: ["Case 1"],
      formId: "form123",
      nurseNotes: [{ seqNum: 1, seqContent: "Nurse Note 1" }],
      hxPhy: [{ seqNum: 1, seqContent: "Physical Exam" }],
      labs: [{ seqNum: 1, seqContent: "Lab Test" }],
      orders: [{ seqNum: 1, seqContent: "Order 1" }],
      type: "Case Study",
      main_type: "Case Study",
      questionnaires: [
        {
          maxPoints: 5,
          seqNum: 1,
          questionType: "DDC",
          itemNum: 1,
          itemStem: "What is the capital of France?",
          transitionHeader: "Test Question",
          answers: [{ answer: "Paris", answerKey: true }],
        },
      ],
    };

    await expect(
      containedCaseStudyQuestionSchema.isValid(validData)
    ).resolves.toBe(false);
  });

  it("should return error when formId is missing", async () => {
    const invalidData = {
      caseName: ["Case 1"],
      nurseNotes: [{ seqNum: 1, seqContent: "Nurse Note 1" }],
      hxPhy: [{ seqNum: 1, seqContent: "Physical Exam" }],
      labs: [{ seqNum: 1, seqContent: "Lab Test" }],
      orders: [{ seqNum: 1, seqContent: "Order 1" }],
      type: "Case Study",
      main_type: "Case Study",
      questionnaires: [
        {
          maxPoints: 5,
          seqNum: 1,
          questionType: "DDC",
          itemNum: 1,
          itemStem: "What is the capital of France?",
          transitionHeader: "Test Question",
          answers: [{ answer: "Paris", answerKey: true }],
        },
      ],
    };

    await expect(
      containedCaseStudyQuestionSchema.isValid(invalidData)
    ).resolves.toBe(false);
  });

  it("should return error when columns are missing", async () => {
    const invalidData = {
      questionType: "MCQGROUP",
      rows: [
        {
          rowId: 1,
          rowTitle: "Row 1",
          choices: [{ value: true, choiceId: 1 }],
        },
      ],
    };

    await expect(mcqGroupAnswerSchema.isValid(invalidData)).resolves.toBe(
      false
    );
  });

  it("should return error when rows are missing", async () => {
    const invalidData = {
      questionType: "MCQGROUP",
      columns: [{ label: "Column 1" }],
    };

    await expect(mcqGroupAnswerSchema.isValid(invalidData)).resolves.toBe(
      false
    );
  });

  it("should return error when rowTitle is missing", async () => {
    const invalidData = {
      questionType: "MCQGROUP",
      columns: [{ label: "Column 1" }],
      rows: [
        {
          rowId: 1,
          choices: [{ value: true, choiceId: 1 }],
        },
      ],
    };

    await expect(mcqGroupAnswerSchema.isValid(invalidData)).resolves.toBe(
      false
    );
  });

  it("should return error when caseName is missing", async () => {
    const invalidData = {
      formId: "form123",
      nurseNotes: [{ seqNum: 1, seqContent: "Nurse Note 1" }],
      hxPhy: [{ seqNum: 1, seqContent: "Physical Exam" }],
      labs: [{ seqNum: 1, seqContent: "Lab Test" }],
      orders: [{ seqNum: 1, seqContent: "Order 1" }],
      type: "Case Study",
      main_type: "Case Study",
      questionnaires: [
        {
          maxPoints: 5,
          seqNum: 1,
          questionType: "DDC",
          itemNum: 1,
          itemStem: "What is the capital of France?",
          transitionHeader: "Test Question",
          answers: [{ answer: "Paris", answerKey: true }],
        },
      ],
    };

    await expect(
      containedCaseStudyQuestionSchema.isValid(invalidData)
    ).resolves.toBe(false);
  });

  it("should return error when itemStem is missing", async () => {
    const invalidData = {
      caseName: ["Case 1"],
      formId: "form123",
      nurseNotes: [{ seqNum: 1, seqContent: "Nurse Note 1" }],
      hxPhy: [{ seqNum: 1, seqContent: "Physical Exam" }],
      labs: [{ seqNum: 1, seqContent: "Lab Test" }],
      orders: [{ seqNum: 1, seqContent: "Order 1" }],
      type: "Case Study",
      main_type: "Case Study",
      questionnaires: [
        {
          maxPoints: 5,
          seqNum: 1,
          questionType: "DDC",
          itemNum: 1,
          transitionHeader: "Test Question",
          answers: [{ answer: "Paris", answerKey: true }],
        },
      ],
    };

    await expect(
      containedCaseStudyQuestionSchema.isValid(invalidData)
    ).resolves.toBe(false);
  });
});
