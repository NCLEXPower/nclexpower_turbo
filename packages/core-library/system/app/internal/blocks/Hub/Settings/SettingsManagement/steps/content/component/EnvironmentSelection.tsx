/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  GppMaybeOutlined as GppOutlineIcon,
  TaskAltOutlined as TaskOutlinedIcon,
} from "@mui/icons-material";
import { Card, StatusButton } from "../../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import { EnvironmentList } from "../../../constants/constants";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEnvironmentSchema } from "../../MaintenanceMode/validation";
import { useAtomValue, useSetAtom } from "jotai";
import { SelectedConfirmationObj } from "../../../../../../../../../../components/Dialog/DialogFormBlocks/inclusion/useAtomic";

interface Props {
  onSubmit: (value: string) => void;
  currentMaintenance: string[] | undefined;
  isLoading: boolean;
}

export const EnvironmentSelection = ({
  onSubmit,
  currentMaintenance,
  isLoading,
}: Props) => {
  const setStatus = useSetAtom(SelectedConfirmationObj);
  const activeField = useAtomValue<string | undefined | null>(
    SelectedConfirmationObj
  );
  const schema = createEnvironmentSchema(EnvironmentList, activeField);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: EnvironmentList.reduce(
      (acc, env) => ({ ...acc, [`confirmationText_${env}`]: "" }),
      {}
    ),
  });
  const { reset } = methods;

  const handleSubmit = (TextObj: string) => {
    onSubmit(TextObj);
    reset();
    setStatus(null);
  };

  return (
    <Card
      data-testid="env-selection"
      sx={{ borderRadius: "10px", bgcolor: "#dedeec" }}
    >
      <Typography variant="sublabel" fontSize=".8em">
        Warning : This page handles the Maintenance Mode of Web Customer
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 3,
          height: "fit-content",
          width: "100%",
        }}
      >
        <FormProvider {...methods}>
          {EnvironmentList.length > 0 &&
            EnvironmentList.map((List, index) => {
              const status =
                currentMaintenance && currentMaintenance.includes(List);
              return (
                <Box
                  key={index}
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "80px",
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "space-around",
                    alignItems: "center",
                    cursor: "pointer",
                    bgcolor: "white",
                    boxShadow: "inherit",
                    paddingX: "20px",
                    gap: 5,
                    backgroundColor: status ? "#f9f2c5" : "#bad8ba",
                  }}
                >
                  {status ? (
                    <GppOutlineIcon sx={{ color: "#968200" }} />
                  ) : (
                    <TaskOutlinedIcon sx={{ color: "#5CB85C" }} />
                  )}

                  <Typography
                    fontWeight={700}
                    width="50%"
                    textAlign="center"
                    variant="sublabel"
                    fontSize="1.2em"
                    color={status ? "#d1b819" : "#1a8c07"}
                  >
                    {List.toUpperCase()}
                  </Typography>
                  <StatusButton
                    onSubmit={() => handleSubmit(List)}
                    data={currentMaintenance}
                    Item={List}
                    loading={isLoading}
                  />
                </Box>
              );
            })}
        </FormProvider>
      </Box>
    </Card>
  );
};
