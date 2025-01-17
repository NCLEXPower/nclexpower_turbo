/**
* Property of the NCLEX Power.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { Box, Typography, Chip } from '@mui/material';
import { ControlledCheckbox, TextAreaField, Card, ComponentLoader, DateField } from '../../../../../../../../../../components';
import { Control, FormProvider, useForm, UseFormClearErrors, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { crbSchema, crbType } from './validation';
import { author, mainContent, RadioData } from "./ContentReviewerData";
import { CustomPopover } from '../../../../../../../../../../components/Popover/Popover';
import ConfirmationModal from '../../../../../../../../../../components/Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog';
import React from 'react';

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
};

function MainContent() {
  return (
    <div className="">
      {mainContent.map((item, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: "flex-col", alignItems: 'center', marginBottom: 4, gap: 2 }}>
            <Chip sx={{ backgroundColor: '#560bad', color: '#F3F3F3' }} label={item.type} />
            <Chip sx={{ backgroundColor: 'transparent', color: '#560bad', border: "1px solid #560bad" }} label={item.mainType} />
          </Box>
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: 4, color: "#560bad" }}>
            {item.question}
          </Typography>
          <div className="flex flex-col">
            <Typography sx={{ fontSize: '1rem', color: "#606060" }}>
              Cognitive Level: {item.cognitiveLevel}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: "#606060" }}>
              Content Area: {item.contentArea}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: "#606060" }}>
              Client Needs: {item.clientNeeds}
            </Typography>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: "bold", color: "#560bad", marginTop: 4 }}>
              Answer Options :
            </Typography>
            {item.mainContentAnswerCollections.map((answerItem, idx) => (
              <ol key={idx} className='mb-4'>
                <li>{answerItem.answer}</li>
              </ol>
            ))}
            <Box sx={{ backgroundColor: "#560bad", padding: 4, color: "#F3F3F3" }}>
              Correct Answer: {item.answerKey}
            </Box>
            <hr className='my-4' />
          </div>
        </Box>
      ))}
    </div>
  )
}

export const ContentReviewerForm: React.FC<ContentViewerFormProps> = ({
  control,
  handleSubmit,
  setValue,
  watch,
  isApproved,
  onSubmit,
  contentLoader
}) => {

  const form = useForm<crbType>({
    mode: "all",
    resolver: yupResolver(crbSchema),
  });

  const selectedOption = watch("option");

  if (contentLoader) {
    return <ComponentLoader />
  };

  const selectedDate = watch('date');

  const isDateBeforeToday = selectedDate &&
    new Date(selectedDate).setHours(0, 0, 0, 0)
    < new Date().setHours(0, 0, 0, 0);

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
              sx={{ fontSize: "2rem", fontWeight: "bold", color: "#560bad" }}
            >
              Content Details:
            </Typography>
            {author ? (
              <React.Fragment>
                {author.map((item, index) => (
                  <Box key={index}>
                    <Typography sx={{ fontSize: "1rem", color: "#606060" }}>
                      Author Details:{" "}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#606060" }}>
                      {item.author}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", color: "#606060" }}>
                      {item.createdDate}
                    </Typography>
                  </Box>
                ))}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ fontSize: "1rem", color: "#606060" }}>
                  Author details unavailable...
                </Typography>
              </React.Fragment>
            )}
          </Box>
          {isApproved ? (
            <Chip
              sx={{ backgroundColor: "#16db65", color: "#f3f3f3" }}
              label="Approved"
            />
          ) : (
            <Chip
              sx={{
                backgroundColor: "transparent",
                color: "#560bad",
                border: "1px solid #560bad",
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
              <Typography sx={{ fontSize: "1.4rem", color: "#560bad", marginBottom: 4 }}>
                Write your review
              </Typography>
              <hr />
              <Typography sx={{ marginTop: 4 }}>Select a date for this content to take effect in simulator.</Typography>
              <DateField<crbType>
                name='date'
                control={control}
                placeholder="DD - MM - YYYY"
              />
              <div className="flex flex-col z-0 mt-4">
                <TextAreaField
                  name="comment"
                  control={control}
                  style={{ width: '100%' }}
                  placeholder='Comment here...'
                />
                {RadioData.map((item, index) => (
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
        <MainContent />
      </FormProvider>
    </Box>
  );
};