import { Container, Stack, TextareaAutosize, Typography } from "@mui/material";
import { Checkbox, ConfirmationModal } from "../../../../../../components";

type ComingSoonProps = {
  watchEventName: string;
  watchEnvironment: string;
  watchDescription: string;
  watchConfetti?: boolean;
  watchAnnouncement?: boolean;
  isActive?: boolean;
  isSwitchOn?: boolean;
  handleDeactivate: () => void;
};

const ComingSoonPreview = ({
  watchEventName,
  watchEnvironment,
  watchDescription,
  watchConfetti,
  watchAnnouncement,
  isSwitchOn,
  handleDeactivate,
}: ComingSoonProps) => {
  return (
    <>
      <Typography
        sx={{ fontWeight: "bold", fontSize: "2rem", color: "#3B0086" }}
      >
        Go Live Timer: {isSwitchOn ? "On" : "Off"}
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
            <TextareaAutosize
              value={watchDescription}
              readOnly
              style={{
                fontSize: "1rem",
                color: "#B1B1B1",
                paddingLeft: "1rem",
                width: "100%",
                border: "none",
                resize: "none",
                overflow: "hidden",
                outline: "none",
                backgroundColor: "transparent",
              }}
            />
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
                disabled
              />
              <Checkbox
                label="Enable Confetti on Finish"
                sx={{ fontSize: "12px" }}
                checked={watchConfetti}
                disabled
              />
            </Stack>
            <ConfirmationModal
              dialogContent="Are you sure you want to Cancel “Coming Soon”?"
              customButton="Cancel"
              handleSubmit={handleDeactivate}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default ComingSoonPreview;
