import { Container, Stack, Typography } from "@mui/material";
import {
  Checkbox,
  ConfirmationModal,
  ControlledCheckbox,
  GenericSelectField,
  TextAreaField,
  TextField,
} from "../../../../../../components";
import { ContentDateType } from "./validation";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { environment } from "./ComingSoonMock";
import ComingSoonPreview from "./ComingSoonPreview";

type ComingSoonProps = {
  control: Control<ContentDateType>;
  handleSubmit: UseFormHandleSubmit<ContentDateType>;
  onSubmit: (data: ContentDateType) => void;
  watchEventName: string;
  watchEnvironment: string;
  watchDescription: string;
  watchConfetti?: boolean;
  watchAnnouncement?: boolean;
  showPreview?: boolean;
};

const ComingSoonForm = ({
  control,
  handleSubmit,
  onSubmit,
  watchEventName,
  watchEnvironment,
  watchDescription,
  watchConfetti,
  watchAnnouncement,
  showPreview,
}: ComingSoonProps) => {
  return (
    <Container
      sx={{
        fontWeight: "bold",
        fontSize: "2rem",
        color: "#3B0086",
        width: "100%",
        height: "90%",
        paddingTop: "2rem",
      }}
    >
      {showPreview ? (
        /** Preview Section separate */
        <ComingSoonPreview
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          watchEventName={watchEventName}
          watchEnvironment={watchEnvironment}
          watchDescription={watchDescription}
          watchConfetti={watchConfetti}
          watchAnnouncement={watchAnnouncement}
          showPreview={showPreview}
        />
      ) : (
        /** Form Section */
        <>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#3B0086" }}
          >
            Title:
          </Typography>
          <TextField
            sx={{
              borderRadius: "8px",
              borderColor: "#3B0086",
              backgroundColor: "rgba(59, 0, 134, 0.05)",
            }}
            control={control}
            placeholder="Input Title"
            name={"eventName"}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#3B0086",
              paddingTop: "1rem",
            }}
          >
            Environment:
          </Typography>
          <GenericSelectField
            options={environment}
            name="environment"
            control={control}
            sx={{
              width: "100%",
              height: "50%",
              borderColor: "#3B0086",
              borderRadius: "8px",
            }}
            variant="outlined"
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#3B0086",
              paddingTop: "2rem",
            }}
          >
            Description:
          </Typography>
          <TextAreaField
            placeholder="Enter description here"
            name="description"
            control={control}
          />
          <div
            className="flex items-center"
            style={{ justifyContent: "space-between" }}
          >
            <Stack spacing={-4}>
              <ControlledCheckbox
                control={control}
                name="announcement"
                label="Post this as an announcement"
                sx={{ fontSize: "12px" }}
              />
              <ControlledCheckbox
                control={control}
                label="Enable Confetti on Finish"
                name="confetti"
                sx={{ fontSize: "12px" }}
              />
            </Stack>
            <ConfirmationModal
              dialogContent="Are you sure you want to Activate “Coming Soon”?"
              customButton="Continue"
              handleSubmit={handleSubmit(onSubmit)}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default ComingSoonForm;
