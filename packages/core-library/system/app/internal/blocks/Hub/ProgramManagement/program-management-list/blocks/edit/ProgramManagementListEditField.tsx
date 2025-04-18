/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { Control, FieldArrayWithId, UseFormSetValue } from "react-hook-form";
import {
  Button,
  EvaIcon,
  FileUploadField,
  GenericSelectField,
  IconButton,
  MultipleSelectField,
  TextField,
} from "../../../../../../../../../components";
import Image from "next/image";
import { WelcomeProgram } from "../../../../../../../../../assets";
import { getSectionTypeIcons } from "../../../../../../../../../utils/IconUtils";
import Divider from "../../../../../../../../../components/Divider/Divider";
import { SectionListType } from "../../../../../../../../../types/wc/programList";
import { CreateProgramFormType, programTypeAtom } from "../../validation";
import { SectionDataType } from "./ProgramManagementListEditBlock";
import { TimerMockData } from "../../constants";
import { useAtom } from "jotai";

type SectionParamsType = {
  sectionId: string;
  sectionType: string;
  sectionTitle: string;
};

interface Props {
  onSave: () => void;
  handleBack: () => void;
  fileName: string | File[];
  programImage: File[];
  control: Control<CreateProgramFormType>;
  fields: FieldArrayWithId<
    {
      sections?: {
        sectionTitle: string;
        sectionType: string;
        sectionValue: any;
      }[];
      programName: string;
      programImage: File[];
    },
    "sections",
    "id"
  >[];
  sectionList: { label: string; value: string }[];
  handleSectionChange: (index: number, value: string) => void;
  handleAddSection: () => void;
  filteredSectionValuesList: (
    sectionType: string
  ) => { label: string; value: string }[];
  handleMultipleSelectChange: (index: number, value: string) => void;
  selectedSections: Record<number, string>;
  setValue: UseFormSetValue<CreateProgramFormType>;
  showAddSection: boolean;
  sections: SectionListType[] | undefined;
  editingSectionId: string | null;
  editingSectionData: SectionDataType | null;
  handleEditProgramSection: (section: SectionParamsType) => void;
  handleDeleteProgramSection: (sectionId: string) => void;
  handleRemoveSection: (index: number) => void;
  isLoading?: boolean;
  isRemovingProgramSection?: boolean;
  removingSectionId: string | null;
}

export const ProgramManagementListEditField: React.FC<Props> = ({
  isLoading,
  onSave,
  handleBack,
  fileName,
  programImage,
  control,
  fields,
  sectionList,
  handleSectionChange,
  handleAddSection,
  filteredSectionValuesList,
  handleMultipleSelectChange,
  selectedSections,
  setValue,
  showAddSection,
  sections,
  editingSectionId,
  editingSectionData,
  handleEditProgramSection,
  handleDeleteProgramSection,
  handleRemoveSection,
  isRemovingProgramSection,
  removingSectionId,
}) => {
  const [atomProgramType] = useAtom(programTypeAtom);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: { md: "10px", xs: "20px" },
      }}
    >
      <form onSubmit={onSave}>
        <Box
          sx={{
            height: "46px",
            background: "#3B0086",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleBack} data-testid="back-button">
            <EvaIcon name="arrow-back-outline" fill="#ffffff" />
          </IconButton>
          <Typography variant="h6" sx={{ color: "white" }}>
            Edit{" "}
            {atomProgramType === 0
              ? "Standard (23-Day) Program"
              : "Fast Track (8-Day) Program"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "20px",
            p: "20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              variant="h6"
              sx={{ fontSize: "16px", color: "#3B0086" }}
            >
              Program Thumbnail
            </Typography>

            <Box sx={{ display: "flex", gap: "60px" }}>
              <Box
                sx={{
                  height: "143px",
                  width: "218px",
                  borderRadius: "10px",
                  background: "gray",
                  position: "relative",
                  border: "1px solid #3B0086",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={
                    typeof fileName === "string"
                      ? fileName.startsWith("http")
                        ? fileName
                        : URL.createObjectURL(programImage[0])
                      : WelcomeProgram
                  }
                  alt="program thumbnail"
                  fill
                  style={{
                    objectFit: "cover",
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
                  acceptTypes={["png", "jpeg", "jpg", "gif", "webp"]}
                  data-testid="file-upload-input"
                  triggerLabel="Replace Image"
                  control={control}
                  name="programImage"
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
                  onUpload={(file) => {
                    if (file) {
                      setValue("programImage", Array.from(file));
                    }
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                    color: "#3B0086",
                    fontWeight: "bold",
                  }}
                >
                  Program Details
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    color: "#3B0086",
                    fontWeight: "bold",
                  }}
                >
                  Program Name
                </Typography>
                <TextField
                  name="programName"
                  control={control}
                  placeholder="Enter Program Name"
                  sx={{ borderRadius: "10px", width: "100%" }}
                  inputProps={{ style: { padding: 15, borderRadius: "10px" } }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: "31px",
            background: "rgba(59, 0, 134, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: "40px",
            mb: "20px",
          }}
        >
          <Typography variant="h6" sx={{ color: "black" }}>
            Section
          </Typography>

          <Typography variant="h6" sx={{ color: "black" }}>
            Action
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, paddingX: 6 }}
        >
          {sections &&
            Array.isArray(sections) &&
            sections.map((section: SectionListType) => {
              if (section.sectionId === editingSectionId) {
                return null;
              }
              const {
                sectionId,
                sectionType,
                sectionTitle,
                sectionData,
                sectionTimer,
              } = section;

              return (
                <Box
                  key={sectionId}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Image
                      src={getSectionTypeIcons(sectionType)}
                      alt={`${sectionType} Icon`}
                    />
                    <Typography>
                      {sectionType === "video" &&
                      sectionData &&
                      "secVidId" in sectionData[0]
                        ? sectionData?.[0]?.secVidTitle
                        : sectionType === "cat"
                          ? `${sectionTitle} (${sectionTimer ?? 0} ${Number(sectionTimer) > 1 ? "hrs" : "hr"})`
                          : sectionTitle}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      disabled={
                        fields.length > 0 || Boolean(editingSectionData)
                      }
                      onClick={() => handleEditProgramSection(section)}
                      data-testid="edit-section-button"
                    >
                      <EvaIcon name="edit-outline" />
                    </IconButton>
                    {isRemovingProgramSection &&
                    removingSectionId === sectionId ? (
                      <CircularProgress
                        size={20}
                        color="inherit"
                        id="loader"
                        aria-live="assertive"
                        thickness={5}
                        sx={{ "&:focus": { outline: "none !important" } }}
                      />
                    ) : (
                      <IconButton
                        onClick={() => handleDeleteProgramSection(sectionId)}
                        data-testid="delete-section-button"
                      >
                        <EvaIcon name="trash-outline" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              );
            })}
          <Divider
            sx={{
              my: 4,
              width: "100%",
              height: "2px",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {fields.map((item, index) => {
            return (
              <Grid
                key={item.id}
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Section Title"
                  name={`sections.${index}.sectionTitle`}
                  control={control}
                  placeholder="Enter Section Title"
                  sx={{ width: "100%" }}
                  inputProps={{ style: { padding: 15 } }}
                />

                <Box className="flex gap-2">
                  <GenericSelectField
                    control={control}
                    name={`sections.${index}.sectionType`}
                    options={sectionList}
                    label="Select Section Type"
                    onChange={(e) => handleSectionChange(index, e)}
                    data-testid="section-type-select"
                  />

                  <IconButton
                    onClick={() => handleRemoveSection(index)}
                    sx={{
                      mt: 8,
                      backgroundColor: "#fff",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    data-testid="remove-section-button"
                  >
                    <EvaIcon name="close-outline" />
                  </IconButton>
                </Box>

                {selectedSections[index] &&
                filteredSectionValuesList(selectedSections[index]).length >
                  0 ? (
                  <Grid item sx={{ gridColumn: "span 2", marginTop: 2 }}>
                    {selectedSections[index] === "video" ? (
                      <>
                        <MultipleSelectField
                          control={control}
                          name={`sections.${index}.sectionValue`}
                          label={`Select in ${selectedSections[index]} section`}
                          options={filteredSectionValuesList(
                            selectedSections[index]
                          )}
                          multiple
                          sx={{
                            borderRadius: "5px",
                            width: "100%",
                            backgroundColor: "#FFF",
                            border: "1px solid #3B0086",
                            marginTop: 3,
                          }}
                          onChange={(e) => handleMultipleSelectChange(index, e)}
                          data-testid="multiple-select-field"
                        />
                        <Divider
                          sx={{
                            my: 4,
                            width: "100%",
                            height: "2px",
                          }}
                        />
                      </>
                    ) : selectedSections[index] === "cat" ? (
                      <>
                        <Grid
                          key={item.id}
                          sx={{
                            display: "grid",
                            gap: 2,
                            gridTemplateColumns: "1fr 1fr",
                            alignItems: "center",
                          }}
                        >
                          <GenericSelectField
                            control={control}
                            name={`sections.${index}.sectionValue`}
                            options={filteredSectionValuesList(
                              selectedSections[index]
                            )}
                            label={`Select in ${selectedSections[index]} section`}
                          />
                          <GenericSelectField
                            control={control}
                            name="sectionTimer"
                            options={TimerMockData}
                            label="Select CAT Timer"
                          />
                        </Grid>
                        <Divider
                          sx={{
                            my: 4,
                            width: "100%",
                            height: "2px",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <GenericSelectField
                          control={control}
                          name={`sections.${index}.sectionValue`}
                          options={filteredSectionValuesList(
                            selectedSections[index]
                          )}
                          label={`Select in ${selectedSections[index]} section`}
                          data-testid="generic-select-field"
                        />
                        <Divider
                          sx={{
                            my: 4,
                            width: "100%",
                            height: "2px",
                          }}
                        />
                      </>
                    )}
                  </Grid>
                ) : null}
              </Grid>
            );
          })}
        </Box>
        {showAddSection && (
          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "176px",
              height: "35px",
              background: "rgba(51, 51, 51, 0.11)",
              mt: "20px",
              borderRadius: "5px",
              "&:hover": {
                background: "none",
              },
            }}
            onClick={handleAddSection}
            data-testid="add-section-button"
          >
            <EvaIcon name="plus-outline" fill="#6C6C6C" />
            <Typography variant="h6" sx={{ color: "#6C6C6C" }}>
              Add Section
            </Typography>
          </Button>
        )}

        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "176px",
            height: "35px",
            background: "#3B0086",
            mt: "20px",
            borderRadius: "10px",
          }}
          loading={isLoading}
          onClick={onSave}
          data-testid="submit-button"
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Update
          </Typography>
        </Button>
      </form>
    </Box>
  );
};
