/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Button, Card, EvaIcon } from "../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import { EnvironmentList } from "../../constants/constants";
import { EnvironmentItem } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEnvironmentSchema } from "./validation";
import { useAtom, useAtomValue } from "jotai";
import { SelectedEnvironment } from "../../../../../../../../../components/Dialog/DialogFormBlocks/inclusion/useAtomic";
import { EnvTextConfirmation } from "./component/EnvTextConfirmation";

interface Props {
  onSubmit: (value: EnvironmentItem) => void;
  currentMaintenance: string[] | undefined;
  isLoading: boolean;
}

export const EnvironmentSelection = ({
  onSubmit,
  currentMaintenance,
  isLoading,
}: Props) => {
  const activeField = useAtomValue<EnvironmentItem | undefined>(
    SelectedEnvironment
  );
  const schema = createEnvironmentSchema(EnvironmentList, activeField?.label);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: EnvironmentList.reduce(
      (acc, env) => ({ ...acc, [`confirmationText_${env.id}`]: "" }),
      {}
    ),
  });

  return isLoading ? (
    "Loading Environment Status"
  ) : (
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
            EnvironmentList.map((Env) => {
              const status =
                currentMaintenance && currentMaintenance.includes(Env.label);
              return (
                <Box
                  key={Env.id}
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
                  <EvaIcon
                    id="close-icon"
                    name={
                      status
                        ? "alert-triangle-outline"
                        : "checkmark-circle-outline"
                    }
                    fill={status ? "#968200" : "#5CB85C"}
                    width={40}
                    height={40}
                    ariaHidden
                  />
                  <Typography
                    fontWeight={700}
                    width="50%"
                    textAlign="center"
                    variant="sublabel"
                    fontSize="1.2em"
                    color={status ? "#d1b819" : "#1a8c07"}
                  >
                    {Env.label.toUpperCase()}
                  </Typography>

                  <StatusButton
                    onSubmit={() => onSubmit(Env)}
                    data={currentMaintenance}
                    Env={Env}
                  />
                </Box>
              );
            })}
        </FormProvider>
      </Box>
    </Card>
  );
};

interface StatusButtonProps {
  onSubmit: (value: EnvironmentItem) => void;
  data: string[] | undefined;
  Env: EnvironmentItem;
}

const StatusButton = ({ onSubmit, data, Env }: StatusButtonProps) => {
  const [env, setEnv] = useAtom(SelectedEnvironment);

  const status = data && data.includes(Env.label);

  return env && env.label == Env.label ? (
    <Box sx={{ width: "70%" }}>
      <EnvTextConfirmation Env={env} onSubmit={onSubmit} />
    </Box>
  ) : (
    <Button
      variant="text"
      onClick={() => {
        setEnv(Env);
      }}
      sx={{
        width: "50%",
        fontSize: "12px",
        padding: "10px",
        height: "50px",
        bgcolor: "#dedeec",
        borderRadius: "15px",
        backgroundColor: status ? "#e5d995" : "#6aba6a",
        color: status ? "#bfa40d" : "#115605",
      }}
    >
      <Typography fontWeight={600} fontSize="12px">
        {status ? "Under Maintenance" : "Active"}
      </Typography>
    </Button>
  );
};
