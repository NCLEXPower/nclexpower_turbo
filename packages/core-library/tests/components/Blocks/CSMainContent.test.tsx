import { render, screen } from "../../common";
import { CSMainContent } from "../../../system/app/internal/blocks/Hub/content/approval/blocks/rqc/ContentReviewer/CSMainContent";
import { BackgroundInfoContent } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/BackgroundInfo/BackgroundInfoContent";
import { ItemContent } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/ItemContent";
import { ContainedCaseStudyQuestionType } from "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types";

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core", () => ({
  useRouter: jest.fn(),
}));

jest.mock(
  "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/BackgroundInfo/BackgroundInfoContent",
  () => ({
    BackgroundInfoContent: jest.fn(() => <div>Background Info Content</div>),
  })
);

jest.mock(
  "../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/steps/content/casestudy/CaseStudySummary/component/Items/ItemContent",
  () => ({
    ItemContent: jest.fn(() => <div>Item Content</div>),
  })
);

describe("CSMainContent", () => {
  const mockMainContent: ContainedCaseStudyQuestionType[] = [
    {
      formId: "",
      main_type: "Case Study",
      orders: [
        {
          seqNum: 1,
          seqContent:
            "<p><strong>@1420 Nurse’s Notes:</strong></p><p>Client states, “I feel like I became paralyzed for no reason. I can’t</p><p>walk without crutches now and I can’t feel the urge to pee and do a</p><p>‘number two.”</p><p>Client reports that he started having tingling sensations and</p><p>numbness on both of his feet which quickly ascended to both of his</p><p>palms within 24 hours, and on the following day when he awoke</p><p>from his sleep, he claimed that he could no longer stand up and</p><p>walk to the bathroom without holding on to surfaces for support.</p><p>After two days, he had lost control of his bladder and bowel</p><p>sensation.</p><p>H&amp;P Hx of COVID-19 last month.</p><p>V/S:</p><p>HR 120 bpm , RR 29 , BP 130/50, Temp 37, O2 Sat 90% on RA</p><p>Client appears to have difficulty of breathing and malaise.</p>",
        },
      ],
      labs: [
        {
          seqNum: 1,
          seqContent:
            "<p><strong>@1420 Nurse’s Notes:</strong></p><p>Client states, “I feel like I became paralyzed for no reason. I can’t</p><p>walk without crutches now and I can’t feel the urge to pee and do a</p><p>‘number two.”</p><p>Client reports that he started having tingling sensations and</p><p>numbness on both of his feet which quickly ascended to both of his</p><p>palms within 24 hours, and on the following day when he awoke</p><p>from his sleep, he claimed that he could no longer stand up and</p><p>walk to the bathroom without holding on to surfaces for support.</p><p>After two days, he had lost control of his bladder and bowel</p><p>sensation.</p><p>H&amp;P Hx of COVID-19 last month.</p><p>V/S:</p><p>HR 120 bpm , RR 29 , BP 130/50, Temp 37, O2 Sat 90% on RA</p><p>Client appears to have difficulty of breathing and malaise.</p>",
        },
      ],
      hxPhy: [
        {
          seqNum: 1,
          seqContent:
            "<p><strong>@1420 Nurse’s Notes:</strong></p><p>Client states, “I feel like I became paralyzed for no reason. I can’t</p><p>walk without crutches now and I can’t feel the urge to pee and do a</p><p>‘number two.”</p><p>Client reports that he started having tingling sensations and</p><p>numbness on both of his feet which quickly ascended to both of his</p><p>palms within 24 hours, and on the following day when he awoke</p><p>from his sleep, he claimed that he could no longer stand up and</p><p>walk to the bathroom without holding on to surfaces for support.</p><p>After two days, he had lost control of his bladder and bowel</p><p>sensation.</p><p>H&amp;P Hx of COVID-19 last month.</p><p>V/S:</p><p>HR 120 bpm , RR 29 , BP 130/50, Temp 37, O2 Sat 90% on RA</p><p>Client appears to have difficulty of breathing and malaise.</p>",
        },
      ],
      nurseNotes: [
        {
          seqNum: 1,
          seqContent:
            "<p><strong>@1420 Nurse’s Notes:</strong></p><p>Client states, “I feel like I became paralyzed for no reason. I can’t</p><p>walk without crutches now and I can’t feel the urge to pee and do a</p><p>‘number two.”</p><p>Client reports that he started having tingling sensations and</p><p>numbness on both of his feet which quickly ascended to both of his</p><p>palms within 24 hours, and on the following day when he awoke</p><p>from his sleep, he claimed that he could no longer stand up and</p><p>walk to the bathroom without holding on to surfaces for support.</p><p>After two days, he had lost control of his bladder and bowel</p><p>sensation.</p><p>H&amp;P Hx of COVID-19 last month.</p><p>V/S:</p><p>HR 120 bpm , RR 29 , BP 130/50, Temp 37, O2 Sat 90% on RA</p><p>Client appears to have difficulty of breathing and malaise.</p>",
        },
      ],
      caseName: ["test", "Clear Up All"],
      questionnaires: [
        {
          maxPoints: 1,
          seqNum: 1,
          itemNum: 1,
          itemStem:
            "<p>For each client finding below, click or check to specify if the finding is consistent with</p><p>the disease process of Appendicitis, Rhabdomyolysis, or Pneumothorax.</p><p>Each finding may support more than one disease process</p>",
          transitionHeader: "",
          questionType: "MatrixWithGrp",
          columns: [
            {
              label: "Patient Findings",
            },
            {
              label: "Appendicitis",
            },
            {
              label: "Rhabdomyolysis",
            },
            {
              label: "Pneumothorax",
            },
          ],
          rows: [
            {
              rowTitle: "Nausea/Vomiting",
              rowIndexPos: 0,
              choices: [
                {
                  value: true,
                  choiceIndexPos: 0,
                },
                {
                  value: false,
                  choiceIndexPos: 1,
                },
                {
                  value: false,
                  choiceIndexPos: 2,
                },
              ],
            },
            {
              rowTitle: "Abdominal Pain",
              rowIndexPos: 1,
              choices: [
                {
                  value: true,
                  choiceIndexPos: 0,
                },
                {
                  value: false,
                  choiceIndexPos: 1,
                },
                {
                  value: false,
                  choiceIndexPos: 2,
                },
              ],
            },
            {
              rowTitle: "Low Grade Fever",
              rowIndexPos: 2,
              choices: [
                {
                  value: true,
                  choiceIndexPos: 0,
                },
                {
                  value: true,
                  choiceIndexPos: 1,
                },
                {
                  value: false,
                  choiceIndexPos: 2,
                },
              ],
            },
            {
              rowTitle: "Malaise/Weakness",
              rowIndexPos: 3,
              choices: [
                {
                  value: true,
                  choiceIndexPos: 0,
                },
                {
                  value: true,
                  choiceIndexPos: 1,
                },
                {
                  value: false,
                  choiceIndexPos: 2,
                },
              ],
            },
            {
              rowTitle: "Tachypnea",
              rowIndexPos: 4,
              choices: [
                {
                  value: true,
                  choiceIndexPos: 0,
                },
                {
                  value: true,
                  choiceIndexPos: 1,
                },
                {
                  value: true,
                  choiceIndexPos: 2,
                },
              ],
            },
          ],
          rationale: "",
        },
        {
          maxPoints: 1,
          seqNum: 1,
          itemNum: 1,
          itemStem:
            "<p>Which of the following observational findings in the nurse notes require</p><p>immediate follow-up?</p><p>Select by highlighting the words and/or phrases from the box below.</p>",
          transitionHeader: "",
          questionType: "Highlight",
          hcpContent:
            '<p><strong>@1420 Nurse’s Notes:</strong></p><p>Client states, “<hcp-highlighter name="highlighted-v6mubiqzapk" class="hcp-highlighter" style=" cursor: pointer;">I feel like I became paralyzed for no reason. </hcp-highlighter><hcp-highlighter name="highlighted-947t9w0rn7" class="hcp-highlighter" style=" cursor: pointer;">I can’t walk without crutches now and I can’t feel the urge to pee and do a</hcp-highlighter></p><p>‘number two.”</p><p>Client reports that he started having tingling sensations and</p><p>numbness on both of his feet which quickly ascended to both of his</p><p>palms within 24 hours, and on the following day when he awoke</p><p><hcp-highlighter name="highlighted-i10eqaukt5h" class="hcp-highlighter" style=" cursor: pointer;">from his sleep, he claimed that he could no longer stand up and</hcp-highlighter></p><p>walk to the bathroom without holding on to surfaces for support.</p><p><hcp-highlighter name="highlighted-k08cih9wh3m" class="hcp-highlighter" style=" cursor: pointer;">After two days, he had lost control of his bladder and bowel sensation.</hcp-highlighter></p><p>H&amp;P Hx of COVID-19 last month.</p><p>V/S:</p><p><hcp-highlighter name="highlighted-eikokgrumvf" class="hcp-highlighter" style=" cursor: pointer;">HR 120 bpm , RR 29 , BP 130/50, Temp 37, O2 Sat 90% on RA</hcp-highlighter></p><p><hcp-highlighter name="highlighted-qxwg9lzoxup" class="hcp-highlighter" style=" cursor: pointer;">Client appears to have difficulty of breathing and malaise.</hcp-highlighter></p>',
          answers: [
            {
              answer: "I feel like I became paralyzed for no reason. ",
              answerKey: false,
              attrName: "highlighted-v6mubiqzapk",
            },
            {
              answer:
                "I can’t walk without crutches now and I can’t feel the urge to pee and do a",
              answerKey: false,
              attrName: "highlighted-947t9w0rn7",
            },
            {
              answer:
                "from his sleep, he claimed that he could no longer stand up and",
              answerKey: false,
              attrName: "highlighted-i10eqaukt5h",
            },
            {
              answer:
                "After two days, he had lost control of his bladder and bowel sensation.",
              answerKey: false,
              attrName: "highlighted-k08cih9wh3m",
            },
            {
              answer:
                "HR 120 bpm , RR 29 , BP 130/50, Temp 37, O2 Sat 90% on RA",
              answerKey: true,
              attrName: "highlighted-eikokgrumvf",
            },
            {
              answer:
                "Client appears to have difficulty of breathing and malaise.",
              answerKey: true,
              attrName: "highlighted-qxwg9lzoxup",
            },
          ],
          rationale: "",
        },
        {
          transitionHeader: "",
          itemStem:
            "<p>Complete the diagram by dragging from the choices below to specify: the primary adverse effect</p><p>of apixaban, two teaching points that the nurse would use to teach the client (left), and two</p><p>statements that indicate client understanding post-teaching (right).</p>",
          itemNum: 3,
          seqNum: 1,
          maxPoints: 1,
          questionType: "Bowtie",
          answers: [],
          rightSection: [
            {
              isAnswer: false,
              container: "Client Understands",
              value: "I need to have by blood checked twice weekly",
            },
            {
              value:
                "If I bruise easily or note any blood in my urine, I’ll call my doctor",
              isAnswer: true,
              container: "Client Understands",
            },
            {
              value:
                "Reactions are rare but if I do get a rash I should have it checked",
              isAnswer: true,
              container: "Client Understands",
            },
            {
              isAnswer: false,
              container: "Client Understands",
              value:
                "I really hope I don’t end up getting gall stones from this drug",
            },
            {
              isAnswer: false,
              container: "Client Understands",
              value: "Troponin-T and CKMB",
            },
          ],
          centerSection: [
            {
              isAnswer: false,
              container: "Primary Adverse Effect",
              value: "Renal impairment",
            },
            {
              value: "Bleeding",
              isAnswer: true,
              container: "Primary Adverse Effect",
            },
            {
              isAnswer: false,
              container: "Primary Adverse Effect",
              value: "Hypertension",
            },
            {
              isAnswer: false,
              container: "Primary Adverse Effect",
              value: "Gallbladder stones",
            },
          ],
          leftSection: [
            {
              isAnswer: false,
              container: "Teaching point",
              value: "Left-side pain radiating to the shoulder is common",
            },
            {
              value: "Nosebleeds or gum bleeding is a concern",
              isAnswer: true,
              container: "Teaching point",
            },
            {
              isAnswer: false,
              container: "Teaching point",
              value: "Headaches are an expected and common side-effect",
            },
            {
              value: "Persistent tiredness should be reported to the physician",
              isAnswer: true,
              container: "Teaching point",
            },
            {
              isAnswer: false,
              container: "Teaching point",
              value: "Neuro test q15 mins",
            },
          ],
          rightLabelName: "Client Understands",
          centerLabelName: "Primary Adverse Effect",
          leftLabelName: "Teaching point",
          rationale: "",
        },
        {
          maxPoints: 1,
          seqNum: 1,
          itemNum: 4,
          itemStem:
            '<p>Complete the following table by choosing the potential nursing intervention per body system that the nurse</p><p>should implement from the lists of options. </p><table style="min-width: 50px" class="tiptap-table"><colgroup><col><col></colgroup><tbody><tr class="tiptap-row"><th rowspan="1" colspan="1" class="tiptap-th"><p>Body System</p></th><th rowspan="1" colspan="1" class="tiptap-th"><p>Potential Intervention</p></th></tr><tr class="tiptap-row"><td rowspan="1" colspan="1" class="tiptap-cell"><p>Neurologic</p></td><td rowspan="1" colspan="1" class="tiptap-cell"><p>[[Neuro test q15 mins]]</p></td></tr><tr class="tiptap-row"><td rowspan="1" colspan="1" class="tiptap-cell"><p>Respiratory</p></td><td rowspan="1" colspan="1" class="tiptap-cell"><p>[[Incentive Spirometry]]</p></td></tr><tr class="tiptap-row"><td rowspan="1" colspan="1" class="tiptap-cell"><p>Cardiovascular</p></td><td rowspan="1" colspan="1" class="tiptap-cell"><p>[[Troponin-T and CKMB]]</p></td></tr></tbody></table>',
          transitionHeader: "",
          questionType: "DDTable",
          answers: [
            {
              options: [
                {
                  answer: "Neuro test q15 mins",
                  answerKey: true,
                },
                {
                  answer: "Chest X-ray PRN",
                  answerKey: false,
                },
                {
                  answer: "Troponin-T and CKMB",
                  answerKey: false,
                },
              ],
              optionName: "Neuro test q15 mins",
            },
            {
              options: [
                {
                  answer: "Chest X-ray PRN",
                  answerKey: true,
                },
                {
                  answer: "Neuro test q15 mins",
                  answerKey: false,
                },
                {
                  answer: "Troponin-T and CKMB",
                  answerKey: false,
                },
              ],
              optionName: "Incentive Spirometry",
            },
            {
              options: [
                {
                  answer: "Troponin-T and CKMB",
                  answerKey: true,
                },
                {
                  answer: "Chest X-ray PRN",
                  answerKey: false,
                },
                {
                  answer: "Troponin-T and CKMB",
                  answerKey: false,
                },
              ],
              optionName: "Troponin-T and CKMB",
            },
          ],
          rationale: "",
        },
        {
          transitionHeader: "",
          itemStem:
            "<p>Complete the following table by choosing the potential nursing intervention per body system that the nurse</p><p>should implement from the lists of options.</p>",
          itemNum: 6,
          seqNum: 1,
          maxPoints: 1,
          questionType: "MatrixWithGrp",
          answers: [],
          rows: [
            {
              rowIndexPos: 0,
              rowTitle: "Client agrees to ambulate 6-8 hours post-op",
              choices: [
                {
                  choiceIndexPos: 0,
                  value: true,
                },
                {
                  choiceIndexPos: 1,
                  value: false,
                },
              ],
            },
          ],
          columns: [
            {
              label: "Client Outcomes",
            },
            {
              label: "Expected",
            },
            {
              label: "Not Expected",
            },
          ],
          rationale: "",
        },
      ],
      caseType: "UNFOLDING",
      caseNum: 0,
    },
  ];

  it("renders BackgroundInfoContent and ItemContent with correct data", () => {
    render(<CSMainContent mainContent={mockMainContent} />);

    expect(screen.getByText("Background Info Content")).toBeInTheDocument();
    expect(screen.getByText("Item Content")).toBeInTheDocument();

    expect(screen.getByText("BACKGROUND INFO :")).toBeInTheDocument();
    expect(screen.getByText("ITEMS :")).toBeInTheDocument();
  });

  it("renders the correct data passed through mainContent", () => {
    render(<CSMainContent mainContent={mockMainContent} />);

    expect(BackgroundInfoContent).toHaveBeenCalledWith(
      { values: mockMainContent[0] },
      {}
    );
    expect(ItemContent).toHaveBeenCalledWith(
      { values: mockMainContent[0] },
      {}
    );
  });
});
