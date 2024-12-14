/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useEffect } from "react";
import { Box, Grid, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SettingsSelectionOptions,
  SettingsSelectionType,
  ChooseSettingsOptions,
} from "../../types";
import { Card, InformationTitle } from "../../../../../../../../../components";
import { AccessLevels } from "../../../../../../../../../core/utils/permission";
import { useAccessControl } from "../../../../../../../../../hooks/useAccessControl";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  accessLevel?: number;
}

const chooseSettingsStepFormSchema = yup.object({
  selection: yup
    .mixed<SettingsSelectionOptions>()
    .oneOf(["DBEXCEL", "QM", "IARM", "CORETEAM", "WEBCUSTOMER"])
    .required(),
  chosen: yup
    .mixed<ChooseSettingsOptions>()
    .oneOf(["CONFIG", "AUTOMATION", "ROUTER", "MAINTENANCE"])
    .required(),
});

type ChooseSettingsStepFormType = yup.InferType<
  typeof chooseSettingsStepFormSchema
>;

export const ChooseProductsConfigurations = (props: {
  nextStep(values: Partial<SettingsSelectionType>): void;
  values: Partial<SettingsSelectionType>;
  accessLevel?: number;
}) => {
  const { reset, setValue } = useForm<ChooseSettingsStepFormType>({
    resolver: yupResolver(chooseSettingsStepFormSchema),
    mode: "all",
    criteriaMode: "all",
  });

  const { accessLevel } = useAccessControl();

  useEffect(() => {
    reset({
      selection: props.values.selection,
      chosen: props.values.chosen,
    });
  }, [props.values.selection, props.values.chosen]);

  const handleSelection = (values: ChooseSettingsStepFormType) => {
    setValue("chosen", values.chosen);
    setValue("selection", values.selection);
    props.nextStep({ chosen: values.chosen, selection: values.selection });
  };

  return (
    <Box sx={{ mb: 5 }}>
      <InformationTitle
        text="Configuration Changes"
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Grid
        justifyContent="center"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {accessLevel === AccessLevels.ADMIN && (
          <>
            <Grid item xs={4}>
              <Card hoverEffect elevation={5} text="Web Customer" />
            </Grid>
            <Grid item xs={4}>
              <Card hoverEffect elevation={5} text="Web BackOffice" />
            </Grid>
          </>
        )}
        {(accessLevel === AccessLevels.ADMIN ||
          accessLevel === AccessLevels.ENCODER) && (
            <Grid item xs={4}>
              <Card
                onClick={() =>
                  handleSelection({ chosen: "CONFIG", selection: "QM" })
                }
                hoverEffect
                elevation={5}
                text="Web Simulator"
                data-testid="web-simulator-card"
              />
            </Grid>
          )}
      </Grid>
    </Box>
  );
};

export const OtherConfigurations = (props: {
  nextStep(values: Partial<SettingsSelectionType>): void;
  values: Partial<SettingsSelectionType>;
}) => {
  const { reset, setValue } = useForm<ChooseSettingsStepFormType>({
    resolver: yupResolver(chooseSettingsStepFormSchema),
    mode: "all",
    criteriaMode: "all",
  });

  useEffect(() => {
    reset({
      selection: props.values.selection,
      chosen: props.values.chosen,
    });
  }, [props.values.selection, props.values.chosen]);

  const handleSelection = (values: ChooseSettingsStepFormType) => {
    setValue("chosen", values.chosen);
    setValue("selection", values.selection);
    props.nextStep({ chosen: values.chosen, selection: values.selection });
  };

  return (
    <Box sx={{ mb: 5 }}>
      <InformationTitle
        text="Server/Automations & Other configurations"
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Grid
        justifyContent="center"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Card
            hoverEffect
            onClick={() =>
              handleSelection({ chosen: "AUTOMATION", selection: "DBEXCEL" })
            }
            elevation={5}
            text="DB & Excel Comparison"
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export const ContentManagementSystemSettings = (props: {
  nextStep(values: Partial<SettingsSelectionType>): void;
  values: Partial<SettingsSelectionType>;
}) => {
  const { reset, setValue } = useForm<ChooseSettingsStepFormType>({
    resolver: yupResolver(chooseSettingsStepFormSchema),
    mode: "all",
    criteriaMode: "all",
  });

  useEffect(() => {
    reset({
      selection: props.values.selection,
      chosen: props.values.chosen,
    });
  }, [props.values.selection, props.values.chosen]);

  const handleSelection = (values: ChooseSettingsStepFormType) => {
    setValue("chosen", values.chosen);
    setValue("selection", values.selection);
    props.nextStep({ chosen: values.chosen, selection: values.selection });
  };

  return (
    <Box>
      <InformationTitle
        text="CMS & Reviewers Configurations"
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Grid
        justifyContent="center"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Card
            hoverEffect
            onClick={() =>
              handleSelection({ chosen: "CMS", selection: "DEFAULTREVIEWER" })
            }
            elevation={5}
            text="Default Reviewer Configuration"
          />
        </Grid>
        <Grid item xs={4}>
          <Card
            hoverEffect
            onClick={() =>
              handleSelection({
                chosen: "CMS",
                selection: "RESOURCEMANAGEMENT",
              })
            }
            elevation={5}
            text="Resource Management"
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export const InAppManagement = (props: {
  nextStep(values: Partial<SettingsSelectionType>): void;
  values: Partial<SettingsSelectionType>;
}) => {
  const { reset, setValue } = useForm<ChooseSettingsStepFormType>({
    resolver: yupResolver(chooseSettingsStepFormSchema),
    mode: "all",
    criteriaMode: "all",
  });

  useEffect(() => {
    reset({
      selection: props.values.selection,
      chosen: props.values.chosen,
    });
  }, [props.values.selection, props.values.chosen]);

  const handleSelection = (values: ChooseSettingsStepFormType) => {
    setValue("chosen", values.chosen);
    setValue("selection", values.selection);
    props.nextStep({ chosen: values.chosen, selection: values.selection });
  };

  return (
    <Box>
      <InformationTitle
        text="Content Management"
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Grid
        justifyContent="center"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Card
            hoverEffect
            onClick={() =>
              handleSelection({ chosen: "ROUTER", selection: "IARM" })
            }
            elevation={5}
            data-testid="in-app-router-card"
            text="In App Router Management"
          />

        </Grid>
        <Grid item xs={4}>
          <Card
            hoverEffect
            onClick={() =>
              handleSelection({ chosen: "ROUTER", selection: "CORETEAM" })
            }
            elevation={5}
            data-testid="core-team-management"
            text="Core Team Management"
          />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};


export const MaintenanceMode = (props: {
  nextStep(values: Partial<SettingsSelectionType>): void;
  values: Partial<SettingsSelectionType>;
}) => {
  const { reset, setValue } = useForm<ChooseSettingsStepFormType>({
    resolver: yupResolver(chooseSettingsStepFormSchema),
    mode: "all",
    criteriaMode: "all",
  });

  useEffect(() => {
    reset({
      selection: props.values.selection,
      chosen: props.values.chosen,
    });
  }, [props.values.selection, props.values.chosen]);

  const handleSelection = (values: ChooseSettingsStepFormType) => {
    setValue("chosen", values.chosen);
    setValue("selection", values.selection);
    props.nextStep({ chosen: values.chosen, selection: values.selection });
  };

  return (
    <Box>
      <InformationTitle
        text="Product Maintenance"
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <Grid
        justifyContent="center"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={4}>
          <Card
            hoverEffect
            onClick={() =>
              handleSelection({
                chosen: "MAINTENANCE",
                selection: "WEBCUSTOMER",
              })
            }
            elevation={5}
            text="Web Customer"
          />
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export const SettingsManagement: React.FC<Props> = ({ nextStep, values }) => {
  const { hasAccess } = useAccessControl();
  return (
    <Card sx={{ mt: 5, p: 5 }}>
      {hasAccess("ChooseProductsConfigurations") && (
        <ChooseProductsConfigurations nextStep={nextStep} values={values} />
      )}
      {hasAccess("OtherConfigurations") && (
        <>
          <Divider>Other Configurations</Divider>
          <OtherConfigurations nextStep={nextStep} values={values} />
          <Divider>Content Management System</Divider>
        </>
      )}

      {hasAccess("ContentManagementSystemSettings") && (
        <>
          <ContentManagementSystemSettings
            nextStep={nextStep}
            values={values}
          />
          <Divider>In App Routing</Divider>
        </>
      )}

      {hasAccess("InAppManagement") && (
        <InAppManagement nextStep={nextStep} values={values} />
      )}

      {hasAccess("MaintenanceMode") && (
        <>
          <Divider>Maintenance Mode</Divider>
          <MaintenanceMode nextStep={nextStep} values={values} />
        </>
      )}
    </Card>
  );
};
