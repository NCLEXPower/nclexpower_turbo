import { getContentCardModalStyles } from "./ContentCardModalStyles";
import { Box } from "@mui/material";
import { DialogBox } from "core-library/components";
import { SectionDataType } from "core-library/types/wc/programList";
import { useState } from "react";
import { TopicsBar } from "./TopicsBar";
import { CardSlider } from "./CardSliders";

export const formatNumbering = (index: number) =>
  index < 9 ? `0${index + 1}` : `${index + 1}`;

interface Props {
  open: boolean;
  onClose: () => void;
  data: SectionDataType[];
}

export const ContentCardsModal: React.FC<Props> = ({ open, onClose, data }) => {
  if (!data[0] || !data[0].cards) return;
  const { cards } = data[0];
  const [activeTopic, setActiveTopic] = useState(cards[0].cardTopic);
  const [activeFace, setActiveFace] = useState<number>(0);
  const { dialog, contentBox } = getContentCardModalStyles();

  const getActiveCard = () => {
    return cards.filter((c) => c.cardTopic === activeTopic)[0];
  };

  const setTopic = (topic: string) => {
    setActiveTopic(topic);
    setActiveFace(0);
  };

  return (
    <DialogBox
      open={open}
      handleClose={onClose}
      header={data[0].title}
      sx={dialog}
    >
      <Box sx={contentBox}>
        <TopicsBar
          cards={cards || []}
          setTopic={setTopic}
          activeTopic={activeTopic}
        />

        <CardSlider
          card={getActiveCard()}
          activeFace={activeFace}
          setActiveFace={setActiveFace}
        />
      </Box>
    </DialogBox>
  );
};
