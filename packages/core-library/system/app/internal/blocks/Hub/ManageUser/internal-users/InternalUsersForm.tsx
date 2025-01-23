/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { useEffect, useMemo } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { Grid, Box, Typography } from "@mui/material";
import { accountSetupSchema, AccountSetupType } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccountLevel } from "../../core/constant/accountLevel";
import { AccountBox as AccountBoxIcon } from "@mui/icons-material";
import {
  Button,
  TextField,
  ControlledSelectField,
  Alert,
  EvaIcon,
} from "../../../../../../../components";
import { useBusinessQueryContext } from "../../../../../../../contexts";
import { MenuItems } from "../../../../../../../api/types";
import { CreateAccessRoute } from "./CreateAccessRoute";

type Props = {
  onSubmit: (value: AccountSetupType) => void;
  isLoading: boolean;
};

const getUniquePaths = (menuItems: MenuItems[]): MenuItems[] => {
  const seenPaths = new Set<string>();

  const processMenuItem = (item: MenuItems): MenuItems | null => {
    const filteredChildren = item.children
      .map(processMenuItem)
      .filter((child): child is MenuItems => !!child);

    if (item.path === "" || !seenPaths.has(item.path)) {
      if (item.path !== "") {
        seenPaths.add(item.path);
      }
      return { ...item, children: filteredChildren };
    }

    return null;
  };

  return menuItems
    .map(processMenuItem)
    .filter((item): item is MenuItems => !!item)
    .filter((item) => item.children.length || item.path);
};

export default function InternalUsersForm({ onSubmit, isLoading }: Props) {
  const { businessQueryGetAllMenus } = useBusinessQueryContext();
  const {
    data,
    isLoading: menuLoading,
    refetch,
  } = businessQueryGetAllMenus(["getAllMenus"]);
  const form = useForm<AccountSetupType>({
    resolver: yupResolver(accountSetupSchema),
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "all",
    defaultValues: { ...accountSetupSchema.getDefault() },
  });

  const { control, handleSubmit, setValue, clearErrors, watch } = form;
  const email = useWatch({ control, name: "email" });
  const accessLevel = useWatch({ control, name: "accessLevel" });

  const filteredMenu: MenuItems[] | undefined = useMemo(
    () =>
      data
        ?.filter((d) => d.accountLevel === accessLevel)
        ?.flatMap((i) => i.menuItems),
    [data, accessLevel]
  );

  const uniquePaths = getUniquePaths(filteredMenu ?? []);

  const routers = useMemo(
    () =>
      uniquePaths
        ?.flatMap((menu) => [
          {
            label: menu.label,
            value: menu.path,
          },
          ...menu.children.map((m) => ({ label: m.label, value: m.path })),
        ])
        .filter((item) => !!item.value),
    [uniquePaths]
  );

  setValue("routers", routers ?? []);

  useEffect(() => {
    if (email) {
      setValue("username", email);
    }
  }, [email, setValue]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue("accessLevel", Number(e.target.value));
  };

  return (
    <FormProvider {...form}>
      <Alert
        severity="info"
        title="Create Internal Users"
        description="Create internal users with their details information, credentials, and permission routes."
      />

      <Grid
        container
        rowSpacing="50px"
        sx={{ marginTop: "20px", marginBottom: "100px" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          paddingX="20px"
          height="800px"
          minWidth="400px"
        >
          <Box
            sx={{
              backgroundColor: "rgba(59, 0, 134, 0.05)",
              borderRadius: "15px",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Box className="flex items-center gap-2 h-12 bg-[#3B0086] pl-10">
              <Typography sx={{ color: "#FFF", fontWeight: 700 }}>
                Create Internal Access
              </Typography>
              <AccountBoxIcon sx={{ color: "#FFF" }} />
            </Box>
            <Box
              sx={{
                padding: "40px",
              }}
            >
              <Typography sx={{ color: "#3B0086", fontWeight: 700 }}>
                Account Details
              </Typography>
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

              <hr className="my-8 text-[#00173F]" />

              <Typography sx={{ color: "#3B0086", fontWeight: 700 }}>
                Account Credentials
              </Typography>
              <TextField<AccountSetupType>
                control={control}
                placeholder="Enter email address"
                name="email"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#Fff",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />

              <TextField<AccountSetupType>
                control={control}
                placeholder="Enter password"
                name="password"
                type="password"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#Fff",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />

              <TextField<AccountSetupType>
                control={control}
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#Fff",
                  border: "1px solid #3B0086",
                }}
                inputProps={{
                  style: { padding: 20, borderRadius: "3px" },
                }}
                onBlur={() => clearErrors()}
              />

              <hr className="my-8 text-[#00173F]" />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          paddingX="20px"
          height="800px"
          minWidth="400px"
        >
          <Box
            sx={{
              backgroundColor: "rgba(59, 0, 134, 0.05)",
              borderRadius: "15px",
              overflow: "hidden",
              height: "100%",
              width: "100%",
            }}
          >
            <Box className="flex items-center gap-2 h-12 bg-[#3B0086] pl-10">
              <Typography sx={{ color: "#FFF", fontWeight: 700 }}>
                Select Account Level
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "40px",
                paddingBottom: 0,
              }}
            >
              <Typography sx={{ color: "#3B0086", fontWeight: 700 }}>
                Account Level
              </Typography>
              <ControlledSelectField
                control={control}
                name="accessLevel"
                options={AccountLevel ?? []}
                label={!!accessLevel?.toString() ? "" : "Select Access Level"}
                sx={{
                  borderRadius: "5px",
                  width: "100%",
                  backgroundColor: "#FFF",
                  border: "1px solid #3B0086",
                  marginTop: "10px",
                  marginBottom: "30px",
                }}
                onChange={handleOnChange}
              />
              <Typography sx={{ color: "#3B0086", fontWeight: 700 }}>
                Access Route Level [
                {AccountLevel.find(
                  (level) => level.value === watch("accessLevel")
                )?.label ?? "Access Level"}
                ]
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "20px",
                paddingTop: "10px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                overflowY: "auto",
              }}
            >
              <Box
                component="ul"
                sx={{
                  paddingY: "40px",
                  paddingX: {
                    xs: "20px",
                    md: "40px",
                  },
                  marginBottom: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#C9C9E1",
                  minHeight: "250px",
                  maxHeight: "450px",
                  overflowY: "auto",
                }}
                className="space-y-4"
              >
                {uniquePaths && !!uniquePaths.length ? (
                  uniquePaths.map((m) => (
                    <CreateAccessRoute key={m.id} menu={m} />
                  ))
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      minHeight: "200px",
                      backgroundColor: "#B1B1D5",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "30px",
                      borderRadius: "10px",
                      boxShadow: "inset 0 0 10px #00000040",
                    }}
                  >
                    <EvaIcon
                      name="attach"
                      width={40}
                      height={40}
                      fill="#3B0086"
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "24px",
                        color: "#3B0086",
                        maxWidth: "270px",
                        textAlign: "center",
                      }}
                    >
                      Select Account Level to View Access Routes
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
          <Button
            data-testid="submit-btn"
            onClick={handleSubmit(onSubmit)}
            sx={{
              borderRadius: "10px",
              width: "80%",
              marginX: "auto",
              marginTop: "20px",
              backgroundColor: "#3B0086",
              fontWeight: 700,
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
