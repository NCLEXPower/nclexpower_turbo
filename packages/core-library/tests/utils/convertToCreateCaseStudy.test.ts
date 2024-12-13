import { TokenizeInformations } from '../../api/types';
import { ContainedCaseStudyQuestionType } from '../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types';
import { convertToCreateCaseStudy } from '../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/utils/convertToCreateCaseStudy';

type Answer = {
  answer: string;
  answerKey: boolean;
};

type OptionWithAnswers = {
  options?: Answer[]; 
  optionName: string; 
};

type AnswerCaseStudy = Answer[] | OptionWithAnswers[] | undefined;

describe('convertToCreateCaseStudy', () => {
  const mockTokenizeInformations: TokenizeInformations | undefined = {
    id: 'test-id',
    email: 'test@example.com',
    firstname: 'test-firstname',
    middlename: 'test-middlename',
    lastname: 'test-lastname',
    imgurl: 'test-img',
  };

  const mockContainedCaseStudyQuestion: ContainedCaseStudyQuestionType = {
    caseName: ['Test Case Study'],
    main_type: 'Case Study',
    nurseNotes: [
      { seqContent: 'Nurse note 1', seqNum: 1 },
      { seqContent: 'Nurse note 2', seqNum: 2 }
    ],
    hxPhy: [
      { seqContent: 'Medical history 1', seqNum: 1 },
      { seqContent: 'Medical history 2', seqNum: 2 }
    ],
    labs: [
      { seqContent: 'Lab result 1', seqNum: 1 },
      { seqContent: 'Lab result 2', seqNum: 2 }
    ],
    orders: [
      { seqContent: 'Order 1', seqNum: 1 },
      { seqContent: 'Order 2', seqNum: 2 }
    ],
    questionnaires: [
      {
        itemNum: 1,
        itemStem: 'Question 1',
        maxPoints: 10,
        questionType: 'DDC',
        seqNum: 1,
        transitionHeader: 'Transition 1',
        maxAnswer: 1,
        answers: [
          {
            optionName: 'Option 1',
            options: [
              { answer: 'Answer A', answerKey: true },
              { answer: 'Answer B', answerKey: false }
            ]
          },
          {
            optionName: 'Option 2',
            options: [
              { answer: 'Answer C', answerKey: true },
              { answer: 'Answer D', answerKey: false }
            ]
          }
        ] as AnswerCaseStudy
      }
    ]
  };

  it('should convert ContainedCaseStudyQuestionType to correct format', () => {
    const result = convertToCreateCaseStudy(mockContainedCaseStudyQuestion, mockTokenizeInformations);

    expect(result).toEqual({
      email: 'test@example.com',
      contentDto: {
        type: '',
        mainType: 'Case Study',
        mainCaseStudyContentCollectionDtos: [{
          caseName: ["Test Case Study"],
          nurseNotes: [
            { seqContent: 'Nurse note 1', seqNum: 1 },
            { seqContent: 'Nurse note 2', seqNum: 2 }
          ],
          hxPhy: [
            { seqContent: 'Medical history 1', seqNum: 1 },
            { seqContent: 'Medical history 2', seqNum: 2 }
          ],
          labs: [
            { seqContent: 'Lab result 1', seqNum: 1 },
            { seqContent: 'Lab result 2', seqNum: 2 }
          ],
          orders: [
            { seqContent: 'Order 1', seqNum: 1 },
            { seqContent: 'Order 2', seqNum: 2 }
          ],
          questionnaires: [
            {
              itemNum: 1,
              itemStem: 'Question 1',
              maxPoints: 10,
              questionType: 'DDC',
              seqNum: 1,
              transitionHeader: 'Transition 1',
              maxAnswer: 1,
              answers: [
                {
                  optionName: 'Option 1',
                  options: [
                    { answer: 'Answer A', answerKey: true },
                    { answer: 'Answer B', answerKey: false }
                  ]
                },
                {
                  optionName: 'Option 2',
                  options: [
                    { answer: 'Answer C', answerKey: true },
                    { answer: 'Answer D', answerKey: false }
                  ]
                }
              ]
            }
          ]
        }],
        mainContentCollectionsDtos: [],
      }
    });
  });

  it('should throw an error when internal is undefined', () => {
    expect(() => {
      convertToCreateCaseStudy(mockContainedCaseStudyQuestion, undefined);
    }).toThrow('Internal is undefined');
  });

  it('should handle empty arrays in case study question', () => {
    const emptyMockCaseStudyQuestion: ContainedCaseStudyQuestionType = {
      ...mockContainedCaseStudyQuestion,
      nurseNotes: [],
      hxPhy: [],
      labs: [],
      orders: [],
      questionnaires: []
    };

    const result = convertToCreateCaseStudy(emptyMockCaseStudyQuestion, mockTokenizeInformations);

    expect(result.contentDto.mainCaseStudyContentCollectionDtos[0]).toEqual({
      caseName: ["Test Case Study"],
      nurseNotes: [],
      hxPhy: [],
      labs: [],
      orders: [],
      questionnaires: []
    });
  });
});