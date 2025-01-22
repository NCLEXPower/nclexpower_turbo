import React, { useMemo } from "react";
import { Typography, Container, Stack, Box } from "@mui/material";
import { ReactTable } from "../../../../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailMockData } from "../ComingSoon/ComingSoonMock";
import { contentDateSchema, ContentDateType } from "../ComingSoon/validation";
import ComingSoonSetup from "../ComingSoon/ComingSoonSetup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useForm } from "react-hook-form";
import ContentSetup from "./ContentSetup";
import Chip from "../../../../../../components/Chip/Chip";

export const ComingSoonManagement = () => {
  const form = useForm<ContentDateType>({
    mode: "all",
    resolver: yupResolver(contentDateSchema),
  });

  const { control, handleSubmit } = form;

  const totalCount = useMemo(() => {
    return emailMockData.length;
  }, [emailMockData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "Email",
        accessorFn: (row: { email: string }) => ` ${row.email}`,
      },
      {
        id: "Date Received",
        Header: "Date Received",
        accessorFn: (row: { dateReceived: string }) => ` ${row.dateReceived}`,
      },
      {
        accessorKey: "Count",
        accessorFn: (row: { count: number }) => ` ${row.count}`,
      },
      {
        accessorKey: "Status",
        accessorFn: (row: { status: string }) => ` ${row.status}`,
      },
    ],
    []
  );

  return (
    <Stack direction={"column"} spacing={2}>
      <Stack direction="row" spacing={2} sx={{ height: "550px" }}>
        <ComingSoonSetup />
        <ContentSetup />
      </Stack>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#3B0086",
          paddingTop: "3rem",
        }}
        children={"Emails to Notify :"}
      />
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#3B0086",
          marginTop: "-1rem",
        }}
        children={`Total: ${totalCount} emails`}
      />
      <Container className="flex gap-2">
        <ReactTable columns={columns} data={emailMockData} />
      </Container>
    </Stack>
  );
};
