/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Grid, Typography } from "@mui/material";
import {
  Button,
  ComponentLoader,
  EvaIcon,
  FileUploadField,
  IconButton,
  TextField,
} from "../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contentCardsSchema, SectionFormType } from "../../validation";
import { formatSectionTitle } from "../../../../../../../../../utils/FormatSectionTitles";
import { useState } from "react";
import Image from "next/image";
import { noVideoImage } from "../../../../../../../../../assets";

interface CreateContentCardsProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
}

export const CreateContentCards: React.FC<CreateContentCardsProps> = ({
  section,
  contentLoader,
  onSubmit,
}) => {
  const form = useForm({
    mode: "onSubmit",
    resolver: yupResolver(contentCardsSchema),
    defaultValues: contentCardsSchema.getDefault(),
  });

  const [topics, setTopics] = useState<
    { cardTopic: string; cardFaces: File[] }[]
  >([{ cardTopic: "", cardFaces: [] }]);

  const { control, handleSubmit, getValues, setValue, watch } = form;

  const linkValue = watch("cards");

  if (contentLoader) {
    return <ComponentLoader />;
  }

  const handleAddCardFace = (topicIndex: number) => {
    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics];
      updatedTopics[topicIndex] = {
        ...updatedTopics[topicIndex],
        cardFaces: [
          ...(updatedTopics[topicIndex].cardFaces || []),
          new File([], ""),
        ],
      };
      const currentCards = form.getValues("cards") || [];
      const updatedCards = currentCards.map((card, idx) =>
        idx === topicIndex
          ? {
              ...card,
              cardFaces: [...(card.cardFaces || []), new File([], "")],
            }
          : card
      );
      form.setValue("cards", updatedCards);
      return updatedTopics;
    });
  };

  const handleRemoveCardFace = (topicIndex: number, faceIndex: number) => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((topic, idx) => {
        if (idx === topicIndex) {
          return {
            ...topic,
            cardFaces: topic.cardFaces.filter((_, i) => i !== faceIndex),
          };
        }
        return topic;
      });
      const currentCards = form.getValues("cards") || [];
      const updatedCards = currentCards.map((card, idx) =>
        idx === topicIndex
          ? {
              ...card,
              cardFaces: card.cardFaces.filter((_, i) => i !== faceIndex),
            }
          : card
      );
      form.setValue("cards", updatedCards);
      return updatedTopics;
    });
  };

  const handleAddTopic = () => {
    const newTopic = { cardTopic: "", cardFaces: [] };
    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics, newTopic];
      const currentCards = form.watch("cards") || [];
      form.setValue("cards", [...currentCards, newTopic]);
      return updatedTopics;
    });
  };

  const handleRemoveTopic = (topicIndex: number) => {
    setTopics((prevTopics) => {
      const newTopics = prevTopics.filter((_, idx) => idx !== topicIndex);
      const currentCards = form.watch("cards") || [];
      form.setValue(
        "cards",
        currentCards.filter((_, idx) => idx !== topicIndex)
      );
      return newTopics;
    });
  };

  const handleFileChange = (
    fileList: FileList | null,
    topicIndex: number,
    faceIndex: number
  ) => {
    if (fileList && fileList[0]) {
      const currentFaces =
        form.getValues(`cards.${topicIndex}.cardFaces`) || [];
      const updatedFaces = [...currentFaces];
      updatedFaces[faceIndex] = fileList[0];
      setValue(`cards.${topicIndex}.cardFaces`, updatedFaces, {
        shouldValidate: true,
      });
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingX: 12,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "rgba(59, 0, 134, 0.05)",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{ padding: 4, borderBottom: "2px solid #3B0086" }}
        >
          Create {formatSectionTitle(section)} item
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ color: "#3B0086" }}>Title*:</Typography>
            <TextField
              name="title"
              control={control}
              placeholder="Enter title"
              sx={{
                borderRadius: "10px",
                width: "100%",
                background: "white",
              }}
              inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
            />
          </Box>

          {topics.map((topic, topicIndex) => (
            <Box
              key={topicIndex}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignSelf: { md: "end", xs: "start" },
                width: { md: "95%", xs: "100%" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  mb: 4,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Typography sx={{ color: "#3B0086" }}>
                    Card Topic {topicIndex + 1}*:
                  </Typography>
                  <TextField
                    name={`cards.${topicIndex}.cardTopic`}
                    control={control}
                    placeholder={`Enter card topic ${topicIndex + 1}`}
                    sx={{
                      borderRadius: "10px",
                      width: "100%",
                      background: "white",
                    }}
                    inputProps={{
                      style: { padding: 15, borderRadius: "10px" },
                    }}
                  />
                </Box>

                {topicIndex !== 0 && (
                  <IconButton
                    onClick={() => handleRemoveTopic(topicIndex)}
                    sx={{
                      color: "#f44336",
                      alignSelf: "center",
                      display: "flex",
                      justifyContent: "center",
                      height: "100%",
                      mt: 8,
                    }}
                    data-testid="remove-topic-button"
                  >
                    <EvaIcon
                      name="close-outline"
                      width={24}
                      height={24}
                      fill="#D40000"
                    />
                  </IconButton>
                )}
              </Box>

              <Box
                sx={{
                  background: "rgba(59, 0, 134, 0.05)",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <Grid container spacing={3}>
                  {topic.cardFaces.map((_, faceIndex) => {
                    const cardFaceLink = getValues(
                      `cards.${topicIndex}.cardFaces.${faceIndex}`
                    );
                    const cardFacesFileName =
                      cardFaceLink && cardFaceLink?.name;
                    return (
                      <Grid item xs={12} sm={4} key={faceIndex}>
                        <Box
                          key={faceIndex}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            marginBottom: "16px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              flex: 1,
                              mr: 2,
                            }}
                          >
                            <Typography sx={{ color: "#3B0086", mb: 2 }}>
                              Card Face {faceIndex + 1}*:
                            </Typography>

                            <Box
                              sx={{
                                height: "450px",
                                width: "300px",
                                borderRadius: "10px",
                                background: "gray",
                                border: "1px solid #3B0086",
                                overflow: "hidden",
                                position: "relative",
                              }}
                            >
                              <Image
                                src={
                                  cardFacesFileName
                                    ? URL.createObjectURL(cardFaceLink)
                                    : noVideoImage
                                }
                                alt="program thumbnail"
                                layout="fill"
                                objectFit="cover"
                                style={{
                                  background:
                                    "linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, rgba(0, 0, 0, 0.58) 100%)",
                                }}
                              />
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  bottom: 0,
                                  left: 0,
                                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                                  mixBlendMode: "multiply",
                                }}
                              ></Box>
                              <FileUploadField
                                triggerLabel={
                                  cardFacesFileName ||
                                  `Select card face ${faceIndex + 1}`
                                }
                                control={control}
                                name={`cards.${topicIndex}.cardFaces.${faceIndex}`}
                                sx={{
                                  boxShadow: "none",
                                  fontSize: "12px",
                                  fontWeight: "900",
                                  position: "absolute",
                                  bottom: 0,
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                  background: "transparent",
                                  "&:hover": {
                                    background: "transparent",
                                    boxShadow: "none",
                                  },
                                }}
                                onUpload={(e) =>
                                  handleFileChange(e, topicIndex, faceIndex)
                                }
                              />

                              {topic.cardFaces.length > 1 && (
                                <IconButton
                                  data-testId="remove-card-face"
                                  onClick={() =>
                                    handleRemoveCardFace(topicIndex, faceIndex)
                                  }
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    color: "#f44336",
                                    mt: 2,
                                    mr: 2,
                                    backgroundColor: "#fff",
                                    borderRadius: "50%",
                                    boxShadow:
                                      "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                  }}
                                >
                                  <EvaIcon
                                    name="close-outline"
                                    width={24}
                                    height={24}
                                    fill="#D40000"
                                  />
                                </IconButton>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
                <Button
                  sx={{
                    mt: 2,
                    alignSelf: "flex-end",
                    width: "157px",
                    background: "#3B0086",
                    borderRadius: "10px",
                    color: "white",
                  }}
                  onClick={() => handleAddCardFace(topicIndex)}
                >
                  Add Card
                </Button>
              </Box>
            </Box>
          ))}

          <Box
            sx={{ mt: 4, display: "flex", gap: 4, justifyContent: "flex-end" }}
          >
            <Button
              sx={{
                width: "157px",
                background: "#3B0086",
                borderRadius: "10px",
                color: "white",
              }}
              onClick={handleAddTopic}
            >
              Add Topic
            </Button>

            <Button
              sx={{
                width: "157px",
                background: "#D40000",
                borderRadius: "10px",
                color: "white",
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
