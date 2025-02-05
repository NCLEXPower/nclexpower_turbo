/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { formatSectionTitle } from "../../../../../../../../../../utils/FormatSectionTitles";
import {
  Button,
  EvaIcon,
  FileUploadField,
  IconButton,
  TextField,
} from "../../../../../../../../../../components";
import Image from "next/image";
import { noVideoImage } from "../../../../../../../../../../assets";
import { SectionFormType } from "../../../validation";

interface EditContentCardsFieldProps {
  topics: { cardTopic: string; cardFaces: File[] }[];
  section?: string;
  control: Control<{
    title: string;
    cards: { cardTopic: string; cardFaces: File[] }[];
  }>;
  handleAddCardFace: (topicIndex: number) => void;
  handleRemoveCardFace: (topicIndex: number, faceIndex: number) => void;
  handleAddTopic: () => void;
  handleRemoveTopic: (topicIndex: number) => void;
  onSave: (values: SectionFormType) => void;
  handleFileChange?: (
    fileList: FileList | null,
    topicIndex: number,
    faceIndex: number
  ) => void;
  getValues: (fieldName?: string) => any;
}

export const EditContentCardsField: React.FC<EditContentCardsFieldProps> = ({
  section,
  onSave,
  control,
  handleFileChange,
  getValues,
  topics,
  handleAddTopic,
  handleRemoveTopic,
  handleAddCardFace,
  handleRemoveCardFace,
}) => {
  const handleSaveClick = () => {
    const values = getValues();
    onSave(values);
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
          Edit {formatSectionTitle(section)} item
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                    ariaLabel="remove-topic"
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
                                alt={`Card Face ${faceIndex + 1}`}
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
                                data-testid={`file-input-${topicIndex}-${faceIndex}`}
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
                                  handleFileChange?.(e, topicIndex, faceIndex)
                                }
                              />

                              {topic.cardFaces.length > 1 && (
                                <IconButton
                                  data-testid={`close-outline-${topicIndex}-${faceIndex}`}
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
                  data-testid="add-card"
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
              data-testid="save-button"
              sx={{
                width: "157px",
                background: "#D40000",
                borderRadius: "10px",
                color: "white",
              }}
              onClick={handleSaveClick}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
