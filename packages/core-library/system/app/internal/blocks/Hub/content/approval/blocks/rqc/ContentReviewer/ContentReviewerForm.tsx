/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography, Chip } from "@mui/material";
import {
  ControlledCheckbox,
  TextAreaField,
  Card,
  DateField,
  CustomPopover,
  ConfirmationModal,
  ComponentState,
} from "../../../../../../../../../../components";
import {
  Control,
  FormProvider,
  useForm,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { crbSchema, crbType } from "./validation";
import { author, mainContent, RadioData } from "./ContentReviewerData";
import React, { useEffect, useMemo } from "react";
import { RegularMainContent } from "./RegularMainContent";
import { CSMainContent } from "./CSMainContent";
import { ContainedCaseStudyQuestionType } from "../../../../../Settings/SettingsManagement/steps/content/simulator/types";
import { MainContentCollection } from "../../../../../../../../../../api/types";

type contentType = {
  contentId: string;
  contentAuthorId: string;
};

interface ContentViewerFormProps {
  control: Control<crbType>;
  handleSubmit: UseFormHandleSubmit<crbType>;
  setValue: UseFormSetValue<crbType>;
  watch: UseFormWatch<crbType>;
  clearErrors: UseFormClearErrors<crbType>;
  isApproved?: boolean;
  showModal?: boolean;
  contentLoader?: boolean;
  onSubmit: (values: crbType) => void;
  data: contentType;
  isError?: boolean;
}

export const ContentReviewerForm: React.FC<ContentViewerFormProps> = ({
  control,
  handleSubmit,
  setValue,
  watch,
  isApproved,
  onSubmit,
  contentLoader,
  data,
  isError,
}) => {
  const form = useForm<crbType>({
    mode: "all",
    resolver: yupResolver(crbSchema),
  });

  const mainType = mainContent[0].mainType;
  const baseContent =
    mainType === "Case Study"
      ? mainContent[0].mainCaseStudyContentCollections
      : mainContent[0].mainContentCollections;
  const filteredMainContent = useMemo(() => {
    if (mainType === "Case Study") {
      return baseContent.filter(
        (content) => content.id === data.contentId
      ) as unknown as ContainedCaseStudyQuestionType[];
    } else {
      return baseContent.filter(
        (content) => content.id === data.contentId
      ) as unknown as MainContentCollection[];
    }
  }, [data, mainType]);

  const filteredAuthor = author.filter(
    (content) => content.authorId === data.contentAuthorId
  );

  const selectedOption = watch("option");

  useEffect(() => {
    setValue("contentId", data.contentId);
    setValue("authorId", data.contentAuthorId);
  }, [data]);

  const renderContent = (
    content: MainContentCollection[] | ContainedCaseStudyQuestionType[],
    mainType: string
  ) => {
    if (mainType === "Case Study") {
      return (
        <CSMainContent
          mainContent={content as ContainedCaseStudyQuestionType[]}
        />
      );
    } else {
      return (
        <RegularMainContent mainContent={content as MainContentCollection[]} />
      );
    }
  };

  if (isError || contentLoader) {
    return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          minWidth: "250px",
          width: "100%",
          height: "400px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <ComponentState
          isError={isError as boolean}
          isLoading={contentLoader as boolean}
          isEmpty={false}
        />
      </Box>
    );
  }

  const selectedDate = watch("date");

  const isDateBeforeToday =
    selectedDate &&
    new Date(selectedDate).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0);

  return (
    <Box className="relative">
      <FormProvider {...form}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              Content Details:
            </Typography>
            {filteredAuthor ? (
              <React.Fragment>
                {filteredAuthor.map((item, index) => (
                  <Box key={index}>
                    <Typography sx={{ fontSize: "1rem" }}>
                      Author Details:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem" }}>
                      {item.author}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem" }}>
                      {item.createdDate}
                    </Typography>
                  </Box>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ fontSize: "1rem" }}>
                  Author details unavailable...
                </Typography>
              </React.Fragment>
            )}
          </Box>
          {isApproved ? (
            <Chip
              sx={{ backgroundColor: "#0c215c", color: "#f3f3f3" }}
              label="Approved"
            />
          ) : (
            <Chip
              sx={{
                backgroundColor: "transparent",
                color: "#0c215c",
                border: "1px solid #0c215c",
              }}
              label="Pending"
            />
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            zIndex: 1,
          }}
        >
          <CustomPopover
            icon={<ArrowDropDownIcon />}
            open={true}
            label="Review Changes"
            sx={{
              px: 4,
              py: 2,
              backgroundColor: "#343a40",
              borderRadius: "10px",
              color: "#F3F3F3",
              "&:hover": {
                backgroundColor: "#212529",
              },
              zIndex: 1,
            }}
          >
            <Card
              sx={{
                width: "100%",
                padding: 6,
                border: "1px solid #80ed99",
                zIndex: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  color: "appColors.purple",
                  marginBottom: 4,
                }}
              >
                Write your review
              </Typography>
              <hr />
              <Typography sx={{ marginY: 4 }}>
                Select a date for this content to take effect in simulator.
              </Typography>
              <DateField<crbType>
                name="date"
                control={control}
                placeholder="DD - MM - YYYY"
              />
              <div className="flex flex-col z-0 mt-4">
                <TextAreaField
                  name="comment"
                  control={control}
                  style={{ width: "100%" }}
                  placeholder="Comment here..."
                />
                {RadioData.length > 0 &&
                  RadioData.map((item, index) => (
                    <ControlledCheckbox
                      key={index}
                      name="option"
                      control={control}
                      label={item.title}
                      value={item.value}
                      checked={selectedOption === item.value}
                      onChange={() => setValue("option", item.value)}
                    />
                  ))}
              </div>
              <Box sx={{ zIndex: 4 }}>
                <ConfirmationModal
                  disabled={isDateBeforeToday}
                  customButton="Continue"
                  dialogContent="Are you sure you want to proceed with the selected action"
                  confirmButtonText="Confirm"
                  isLoading={contentLoader ?? false}
                  handleSubmit={handleSubmit(onSubmit)}
                />
              </Box>
            </Card>
          </CustomPopover>
        </Box>
        {renderContent(filteredMainContent, mainType)}
      </FormProvider>
    </Box>
  );
};
