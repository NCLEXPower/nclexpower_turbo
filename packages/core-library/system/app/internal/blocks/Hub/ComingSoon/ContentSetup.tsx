import { Container, Stack, Typography } from "@mui/material";
import {
  Button,
  Checkbox,
  GenericSelectField,
  TextAreaField,
  TextField,
} from "../../../../../../components";
import { contentDateSchema, ContentDateType } from "./validation";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { environment } from "./ComingSoonMock";

const ContentSetup = () => {
  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  });

  const { control, watch } = form;
  const [isAnnouncement, setIsAnnouncement] = React.useState(false);
  const [isConfettiEnabled, setIsConfettiEnabled] = React.useState(false);
  const [timer, setTimer] = React.useState(true);

  const title = watch("title", "");
  const environmentValue = watch("environment", "");
  const description = watch("description", "");

  const toggleAnnouncement = () => {
    setIsAnnouncement((isEnable) => !isEnable);
  };

  const toggleConfetti = () => {
    setIsConfettiEnabled((isEnable) => !isEnable);
  };
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
      {/* <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#3B0086",
        }}
        children={"Title: "}
      />
      <TextField
        sx={{
          borderRadius: "8px",
          borderColor: "#3B0086",
          backgroundColor: "rgba(59, 0, 134, 0.05)",
        }}
        control={control}
        placeholder="Input Title"
        name={"title"}
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
        children={"Environment :"}
      />
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
        children={"Description :"}
      />
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
          <Checkbox
            label="Post this as an announcement"
            sx={{ fontSize: "12px" }}
            checked={isAnnouncement}
            onChange={toggleAnnouncement}
          />
          <Checkbox
            label="Enable Confetti on Finish"
            sx={{ fontSize: "12px" }}
            checked={isConfettiEnabled}
            onChange={toggleConfetti}
          />
        </Stack>
        <Button
          sx={{
            bgcolor: "#3B0086",
            borderRadius: "8px",
          }}
          id="continue"
        />
      </div> */}
      <Typography
        sx={{ fontWeight: "bold", fontSize: "2rem", color: "#3B0086" }}
        children={`Go Live Timer : ${timer ? "ON" : "OFF"}`}
      />
      <Typography
        sx={{ fontWeight: "bold", fontSize: "2rem", color: "#3B0086" }}
        children={`Status : Active`}
      />
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
              Title :
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
              {title || "Stay tuned with NCLEX Power!"}
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
              Environment :
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
              {environmentValue || "Pre-Prod"}
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
              Description :
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
              {description ||
                "Stay connected, stay inspired, and stay empowered with NCLEX Power. The journey to success just got a whole lot more exciting. Don’t miss out—keep your eyes peeled!"}
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
                checked={isAnnouncement}
                onChange={toggleAnnouncement}
              />
              <Checkbox
                label="Enable Confetti on Finish"
                sx={{ fontSize: "12px" }}
                checked={isConfettiEnabled}
                onChange={toggleConfetti}
              />
            </Stack>
            <Button
              sx={{
                bgcolor: "#860000",
                borderRadius: "8px",
              }}
              id="back"
              text="Back"
            />
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default ContentSetup;
