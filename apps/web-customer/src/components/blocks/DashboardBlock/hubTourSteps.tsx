interface TourStep {
  selector: string;
  content: string | JSX.Element;
}

export const HubTourSteps: TourStep[] = [
  {
    selector: "[data-tour='step-1']",
    content:
      "Welcome to our website! This header is designed to help you navigate and utilize our site efficiently.",
  },
  {
    selector: "[data-tour='step-2']",
    content:
      "This is your user account menu, you can click this and view your user information and many more.",
  },
  {
    selector: "[data-tour='step-3']",
    content:
      "You can also click this search button to quickly find what you are looking for.",
  },
  {
    selector: "[data-tour='step-4']",
    content:
      "Track your current study day and focus area. This section helps you stay on schedule with your study plan.",
  },
  {
    selector: "[data-tour='step-5']",
    content:
      "Monitor your progress for today. Complete more tasks to increase this percentage!",
  },
  {
    selector: "[data-tour='step-6']",
    content:
      "See how many tests you've taken so far. This section provides insights into your test-taking activity for body systems and patient units.",
  },
  {
    selector: "[data-tour='step-7']",
    content:
      "Keep track of the number of case study and final comprehensive tests you've completed. Aim to take more to strengthen your knowledge!",
  },
  {
    selector: "[data-tour='step-8']",
    content:
      "This chart visualizes how much of the study material you've covered. Stay consistent and work towards full completion!",
  },
  {
    selector: "[data-tour='step-9']",
    content:
      "Analyze your Comprehensive CAT performance across different patient needs categories. See which areas need further improvement to help you strengthen your confidence!",
  },
  {
    selector: "[data-tour='step-10']",
    content:
      "This graph breaks down your performance across various topic categories. Use it to track trends and adjust your study approach as needed.",
  },
  {
    selector: "[data-tour='step-11']",
    content:
      "This graph tracks the consistency of your ability estimates (Theta) over multiple Comprehensive CAT tests. A stable trend indicates consistent performance – aim for the passing mark each time and boost your confidence for the actual exam!",
  },
];
