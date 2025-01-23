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

const ComingSoonPreview = ({
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
    <>
      <Typography
        sx={{ fontWeight: "bold", fontSize: "2rem", color: "#3B0086" }}
      >
        Go Live Timer: On
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", fontSize: "2rem", color: "#3B0086" }}
      >
        Status: Active
      </Typography>
      <Container
        sx={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "#3B0086",
          backgroundColor: "rgba(59, 0, 134, 0.05)",
          padding: "2rem",
          width: "100%",
          height: "100%",
          borderRadius: "15px",
        }}
      >
        <div className="pl-5">
          <div>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#3B0086",
              }}
            >
              Title:
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                fontSize: "2rem",
                color: "#B1B1B1",
                paddingLeft: "1rem",
              }}
            >
              {watchEventName}
            </Typography>
          </div>
          <div className="flex flex-row items-center pt-5">
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#3B0086",
              }}
            >
              Environment:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#B1B1B1",
                paddingLeft: "1rem",
              }}
            >
              {watchEnvironment}
            </Typography>
          </div>
          <div className="h-40">
            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#3B0086",
                marginTop: "1rem",
              }}
            >
              Description:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#B1B1B1",
                paddingLeft: "1rem",
                height: "50px",
              }}
            >
              {watchDescription}
            </Typography>
          </div>
          <div
            className="flex items-center"
            style={{ justifyContent: "space-between" }}
          >
            <Stack spacing={-4}>
              <Checkbox
                label="Post this as an announcement"
                sx={{ fontSize: "12px" }}
                checked={watchAnnouncement}
              />
              <Checkbox
                label="Enable Confetti on Finish"
                sx={{ fontSize: "12px" }}
                checked={watchConfetti}
              />
            </Stack>
            {/* <ConfirmationModal
                  dialogContent="Are you sure you want to Cancel “Coming Soon”?"
                  customButton="Continue"
                  handleSubmit={} //isActive = false
                /> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default ComingSoonPreview;
