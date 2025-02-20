import {
    CompletedWhiteIcon,
    InProgressIcon,
    InProgressWhiteIcon,
    AvailableIcon,
    CompletedIcon,
    DocumentIcon,
    VideosIcon,
    SimulatorIcon,
    CardsIcon,
    PerspectiveIcon,
    StrategyIcon,
    CATIcon,
  } from "../assets";

const statusIcons = {
    completed: CompletedWhiteIcon,
    progress: InProgressWhiteIcon,
    available: AvailableIcon,
  } as const; 
  
  const sectionTypeIcons = {
    document: DocumentIcon,
    video: VideosIcon,
    simulator: SimulatorIcon,
    "content-cards": CardsIcon,
    "med-cards": CardsIcon,
    perspective: PerspectiveIcon,
    strategy: StrategyIcon,
    cat: CATIcon
  } as const;

  const sectionStatusIcons = {
    completed: CompletedIcon,
    "in-progress": InProgressIcon,
    available: AvailableIcon
  } as const;

  export const getStatusIcons = (status: string) => {
    return statusIcons[status as keyof typeof statusIcons] || AvailableIcon;
  };

  export const getSectionTypeIcons = (type: string) => {
    return sectionTypeIcons[type as keyof typeof sectionTypeIcons] || DocumentIcon
  }

  export const getSectionStatusIcons = (status: string) => {
    return sectionStatusIcons[status as keyof typeof sectionStatusIcons] || AvailableIcon;
  }