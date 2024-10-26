/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Grid, Box, Typography } from "@mui/material";
import { accountSetupSchema, AccountSetupType } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMenu } from "core-library/components/GenericDrawerLayout/hooks/useMenu";
import { AccountLevel } from "../../core/constant/accountLevel";
import {
  Button,
  TextField,
  ControlledSelectField,
  MultipleSelectField,
  Card,
  Alert,
} from "core-library/components";
import {
  Settings as SettingsIcon,
  Key as KeyIcon,
  AccountBox as AccountBoxIcon,
} from "@mui/icons-material";

type Props = {
  onSubmit: (value: AccountSetupType) => void;
  isLoading: boolean;
};

export default function InternalUsersForm({ onSubmit, isLoading }: Props) {
  const form = useForm<AccountSetupType>({
    resolver: yupResolver(accountSetupSchema),
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: { ...accountSetupSchema.getDefault() },
  });

  const { routes } = useMenu();
  const { control, handleSubmit, setValue, clearErrors, watch } = form;

  const email = useWatch({ control, name: "email" });

  const internalRoutes = routes?.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  useEffect(() => {
    if (email) {
      setValue("username", email);
    }
  }, [email, setValue]);

  function handleOnChange(selectedValues: string[]) {
    const selectedObjects = selectedValues.map((value) => {
      const selectedOptions = internalRoutes.find(
        (option) => option.value === value
      );
      return { label: selectedOptions?.label || "", value };
    });
    return selectedObjects;
  }

  return (
    <FormProvider {...form}>
      <Alert
        severity="info"
        title="Create Internal Users"
        description="Create internal users with their details information, credentials, and permission routes."
      />
      <Grid
        container
        direction="column"
        rowSpacing={2}
        gap={2}
        sx={{ height: "auto" }}
      >
        <Card
          sx={{
            marginTop: 4,
            height: "auto",
            backgroundColor: "rgba(59, 0, 134, 0.05)",
            gap: 3,
            padding: 4,
          }}
        >
          <div className="flex items-center gap-2 ">
            <Typography sx={{ color: "#3B0086", fontWeight: "bold" }}>
              Basic Information
            </Typography>
            <AccountBoxIcon sx={{ color: "#3B0086" }} />
          </div>
          <Typography
            sx={{ color: "#606060", fontSize: "15px", marginBottom: 3 }}
          >
            Enter the user's basic details
          </Typography>
          <hr className="my-2" />
          <Box
            sx={{
              gap: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Grid item md={6} lg={12}>
              <TextField<AccountSetupType>
                control={control}
                placeholder="Enter first name"
                name="firstname"
                sx={{
                  borderRadius: "5px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={12}>
              <TextField<AccountSetupType>
                control={control}
                placeholder="Enter middle name"
                name="middlename"
                sx={{
                  borderRadius: "5px",
                  width: "100%",
                  backgroundColor: "#FFF",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={12}>
              <TextField<AccountSetupType>
                control={control}
                placeholder="Enter last name"
                name="lastname"
                sx={{
                  borderRadius: "5px",
                  width: "100%",
                  backgroundColor: "#FFF",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />
            </Grid>
          </Box>
          <ControlledSelectField
            control={control}
            name="accessLevel"
            options={AccountLevel ?? []}
            label="Select Access Level"
            sx={{
              borderRadius: "5px",
              width: "100%",
              backgroundColor: "#FFF",
              border: "1px solid #3B0086",
              marginTop: 3,
            }}
          />
        </Card>
        <Card
          sx={{
            marginTop: 4,
            height: "auto",
            backgroundColor: "rgba(59, 0, 134, 0.05)",
            gap: 3,
            padding: 4,
          }}
        >
          <div className="flex items-center gap-2 ">
            <Typography sx={{ color: "#3B0086", fontWeight: "bold" }}>
              Account Credentials
            </Typography>
            <KeyIcon sx={{ color: "#3B0086" }} />
          </div>
          <Typography
            sx={{ color: "#606060", fontSize: "15px", marginBottom: 3 }}
          >
            Set up password and email address
          </Typography>
          <hr />
          <Box
            sx={{
              width: "100%",
              gap: 4,
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              flexDirection: "column",
              marginTop: 3,
            }}
          >
            <Grid item md={6} lg={12}>
              <TextField<AccountSetupType>
                control={control}
                placeholder="Enter email address"
                name="email"
                sx={{
                  borderRadius: "5px",
                  width: 600,
                  backgroundColor: "#Fff",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={6}>
              <TextField<AccountSetupType>
                control={control}
                placeholder="Enter password"
                name="password"
                type="password"
                sx={{
                  borderRadius: "5px",
                  width: 600,
                  backgroundColor: "#Fff",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />
            </Grid>
            <Grid item md={6} lg={6}>
              <TextField<AccountSetupType>
                control={control}
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                sx={{
                  borderRadius: "5px",
                  width: 600,
                  backgroundColor: "#Fff",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />
            </Grid>
          </Box>
        </Card>
        <Card
          sx={{
            marginTop: 4,
            height: "auto",
            backgroundColor: "rgba(59, 0, 134, 0.05)",
            gap: 3,
            padding: 4,
          }}
        >
          <div className="flex items-center gap-2 ">
            <Typography sx={{ color: "#3B0086", fontWeight: "bold" }}>
              Permission Routes
            </Typography>
            <SettingsIcon sx={{ color: "#3B0086" }} />
          </div>
          <Typography
            sx={{ color: "#606060", fontSize: "15px", marginBottom: 3 }}
          >
            Select all available routes for the user
          </Typography>
          <hr />
          <MultipleSelectField
            control={control}
            name="routers"
            label="Set Access Routes"
            options={internalRoutes ?? []}
            multiple
            sx={{
              borderRadius: "5px",
              width: "100%",
              backgroundColor: "#FFF",
              border: "1px solid #3B0086",
              marginTop: 3,
            }}
            onChange={handleOnChange}
          />
        </Card>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
          }}
        >
          <Button
            fullWidth
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            variant="contained"
            sx={{
              marginTop: 2,
              width: 200,
              px: 4,
              py: 2,
              backgroundColor: "#3B0086",
              borderRadius: "6px",
              color: "#F3F3F3",
              "&:hover": {
                backgroundColor: "rgba(59, 0, 134, 0.95)",
              },
            }}
          >
            <Typography sx={{ color: "#FFF" }}>Submit</Typography>
          </Button>
        </Box>
      </Grid>
    </FormProvider>
  );
}
