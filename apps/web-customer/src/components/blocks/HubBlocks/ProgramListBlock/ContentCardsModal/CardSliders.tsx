import { SectionCardsType } from "core-library/types/wc/programList";
import { useEffect, useRef, useState } from "react";
import { getContentCardModalStyles } from "./ContentCardModalStyles";
import { Box, Typography } from "@mui/material";
import { EvaIcon, IconButton } from "core-library/components";
import Image from "next/image";
import { formatNumbering } from "./ContentCardsModal";
import { PhotoSlider } from "react-photo-view";

interface Props {
  card: SectionCardsType;
  activeFace: number;
  setActiveFace: (face: number) => void;
}

export const CardSlider: React.FC<Props> = ({
  card,
  activeFace,
  setActiveFace,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const facesLength = card.cardFaces.length - 1;
  const faceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const {
    cardSliderBox,
    cardFacesBox,
    cardFacesImage,
    cardMainFaceImage,
    cardMainFaceBtn,
  } = getContentCardModalStyles();

  const scrollToFace = (index: number) => {
    faceRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const handleBack = () => {
    const newFace = activeFace < 1 ? facesLength : activeFace - 1;
    setActiveFace(newFace);
  };

  const handleForward = () => {
    const newFace = activeFace >= facesLength ? 0 : activeFace + 1;
    setActiveFace(newFace);
  };

  const handleFacesClick = (index: number) => setActiveFace(index);

  useEffect(() => {
    scrollToFace(activeFace);
  }, [card, activeFace]);

  return (
    <Box sx={cardSliderBox}>
      <PhotoSlider
        images={card.cardFaces.map((item) => ({
          src: item.default.src,
          key: item.default.src,
          width: 10,
          height: 10,
        }))}
        visible={visible}
        onClose={() => setVisible(false)}
        index={activeFace}
        onIndexChange={setActiveFace}
        loop
        maskOpacity={0.3}
      />

      <Box
        className="flex items-center justify-center w-full"
        sx={{
          width: { md: "fit-content" },
          height: { md: "100%" },
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            display: {
              md: "none",
            },
          }}
        >
          <EvaIcon name="arrow-circle-left" />
        </IconButton>

        <Box
          sx={{
            overflow: "auto",
            paddingY: { md: "20px" },
            height: {
              xs: "100px",
              md: "100%",
            },
          }}
        >
          <Box sx={cardFacesBox}>
            {card.cardFaces.map((face, i) => (
              <div key={i} className="flex flex-col items-center">
                <Box
                  ref={(el) => {
                    faceRefs.current[i] = el as HTMLDivElement | null;
                  }}
                  sx={{
                    ...cardFacesImage,
                    ...(i === activeFace && {
                      opacity: 1,
                      transform: "scale(1)",
                      filter: "none",
                    }),
                  }}
                >
                  <Image
                    src={face}
                    alt="card face"
                    fill
                    className="cursor-pointer"
                    objectFit="fill"
                    onClick={() => handleFacesClick(i)}
                  />
                </Box>
                <Typography
                  sx={{
                    display: {
                      xs: "none",
                      md: "block",
                    },
                    fontWeight: "bold",
                    fontFamily: "PT Sans Narrow",
                    fontSize: "32px",
                  }}
                >
                  {formatNumbering(i)}
                </Typography>
              </div>
            ))}
          </Box>
        </Box>

        <IconButton
          onClick={handleForward}
          sx={{
            display: {
              md: "none",
            },
          }}
        >
          <EvaIcon name="arrow-circle-right" />
        </IconButton>
      </Box>
      <Box sx={cardMainFaceImage}>
        <IconButton
          onClick={handleBack}
          disableRipple
          sx={{
            ...cardMainFaceBtn,
            left: {
              xs: "-50px",
              sm: "-80px",
            },
          }}
        >
          <EvaIcon
            name="arrow-ios-back"
            fill="#0F2A71"
            height={50}
            width={50}
          />
        </IconButton>

        <div className="relative h-full w-full flex items-center justify-center ">
          <Image
            src={card.cardFaces[activeFace]}
            alt="active card face"
            fill
            className="object-contain cursor-pointer"
            onClick={() => setVisible(true)}
          />
        </div>

        <IconButton
          onClick={handleForward}
          disableRipple
          sx={{
            ...cardMainFaceBtn,
            right: {
              xs: "-50px",
              sm: "-80px",
            },
          }}
        >
          <EvaIcon
            name="arrow-ios-forward"
            fill="#0F2A71"
            width={50}
            height={50}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
