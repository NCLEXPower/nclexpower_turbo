import { Container, Stack, Typography } from "@mui/material";
import {
  ConfirmationModal,
  ControlledCheckbox,
  ControlledSelectField,
  TextAreaField,
  TextField,
} from "../../../../../../components";
import { ContentDateType } from "./validation";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { TargetEnvironment } from "./ComingSoonMock";
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
  isActive?: boolean;
  isSwitchOn?: boolean;
  handleDeactivate: () => void;
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
  isActive,
  isSwitchOn,
  handleDeactivate,
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
      {isActive ? (
        <ComingSoonPreview
          watchEventName={watchEventName}
          watchEnvironment={watchEnvironment}
          watchDescription={watchDescription}
          watchConfetti={watchConfetti}
          watchAnnouncement={watchAnnouncement}
          handleDeactivate={handleDeactivate}
          isSwitchOn={isSwitchOn}
        />
      ) : (
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
              border: "1px solid #3B0086",
              "& .MuiInputBase-input": {
                color: "black",
              },
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
          <ControlledSelectField
            options={TargetEnvironment}
            name="TargetEnvironment"
            control={control}
            sx={{
              borderRadius: "8px",
              width: "100%",
              backgroundColor: "rgba(59, 0, 134, 0.05)",
              border: "1px solid #3B0086",
              marginTop: 3,
              "& .MuiInputBase-input": {
                color: "black",
              },
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
            style={{
              borderRadius: "8px",
              backgroundColor: "rgba(59, 0, 134, 0.05)",
              width: "100%",
              resize: "none",
              borderColor: "#3B0086",
              borderStyle: "solid",
              outline: "none",
              padding: "10px",
              color: "black",
              fontWeight: "normal",
            }}
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
