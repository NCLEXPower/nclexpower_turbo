import { SectionCardsType } from "core-library/types/wc/programList";
import { formatNumbering } from "./ContentCardsModal";
import { programTopicShortHand } from "@/constants/constants";
import { useResolution } from "core-library/hooks";
import { Button, SelectField } from "core-library/components";
import { getContentCardModalStyles } from "./ContentCardModalStyles";

interface Props {
  cards: SectionCardsType[];
  setTopic: (topic: string) => void;
  activeTopic: string;
}

export const TopicsBar: React.FC<Props> = ({
  cards,
  setTopic,
  activeTopic,
}) => {
  const topics = cards.map((c, i) => ({
    label: `${formatNumbering(i)} ${programTopicShortHand[c.cardTopic]}`,
    value: c.cardTopic,
  }));

  const activeIndex = cards.findIndex((c) => c.cardTopic === activeTopic);

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };
  const { isMobile } = useResolution();
  const { topicsBarButton, topicsBarSelectField } = getContentCardModalStyles();

  return (
    <>
      {isMobile ? (
        <div className="flex items-end px-2 pb-5 gap-5 font-ptSansNarrow">
          <div className="flex flex-col mr-auto font-bold whitespace-nowrap">
            <span className="text-base">Topic:</span>
            <span className="text-[30px]">
              {formatNumbering(activeIndex)}{" "}
              {programTopicShortHand[activeTopic]}
            </span>
          </div>
          <SelectField
            value={activeTopic}
            options={topics}
            onChange={handleSelectChange}
            sx={topicsBarSelectField}
            listSx={{
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
        </div>
      ) : (
        <div className="h-full w-[180px] bg-[#0F2A7133] flex flex-col">
          <h2 className="font-bold h-20 grid place-items-center bg-[#0F2A7133] border-b-[#0F2A7133] border-b text-[28px] font-ptSansNarrow">
            Topics
          </h2>
          <div className="grow overflow-y-auto">
            {cards &&
              !!cards.length &&
              cards.map((c, i) => {
                const isActive = activeTopic === c.cardTopic;
                return (
                  <Button
                    key={i}
                    onClick={() => setTopic(c.cardTopic)}
                    sx={{
                      ...topicsBarButton,
                      ...(isActive && {
                        bgcolor: "#0F2A7133",
                        borderRight: "2px solid black",
                      }),
                    }}
                  >
                    {formatNumbering(i)} {programTopicShortHand[c.cardTopic]}
                  </Button>
                );
              })}
          </div>
          <div className="bg-[#0F2A7133] h-20" />
        </div>
      )}
    </>
  );
};
