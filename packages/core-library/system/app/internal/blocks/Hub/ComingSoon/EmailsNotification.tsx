import React, { useMemo } from "react";
import { Typography, Container } from "@mui/material";
import { ReactTable } from "../../../../../../components";
import { emailMockData } from "./ComingSoonMock";

export const EmailsNotification = () => {
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
    <Container>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#3B0086",
          paddingTop: "3rem",
        }}
      >
        Emails to Notify
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: "bold",
          color: "#3B0086",
        }}
        children={`Total: ${totalCount} emails`}
      />
      <Container className="flex gap-2">
        <ReactTable
          columns={columns}
          data={emailMockData}
        />
      </Container>
    </Container>
  );
};