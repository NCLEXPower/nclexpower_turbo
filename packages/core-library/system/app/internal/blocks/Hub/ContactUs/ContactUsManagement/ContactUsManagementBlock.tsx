/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Container, Box, ListItemButton } from "@mui/material";
import { Alert, Card, DataGrid, ConfirmationDeleteDialog } from "../../../../../../../components";
import { useColumns, useApi, useApiCallback, useModal } from "../../../../../../../hooks";
import { ContactResponseType } from "../../../../../../../api/types";
import { CustomPopover } from "../../../../../../../components/Popover/Popover";
import { GridMoreVertIcon } from "@mui/x-data-grid";
import { useExecuteToast } from "../../../../../../../contexts";

export const ContactUsManagementBlock: React.FC = () => {
    const { open, close, props } = useModal();
    const { executeToast } = useExecuteToast();

    const getContacts = useApi((api) => api.webbackoffice.getAllContacts());
    const deleteContact = useApiCallback((api, id: string) => api.webbackoffice.deleteContact(id));

    const contacts = (getContacts.result?.data as unknown as ContactResponseType[]) ?? [];
    
    async function onDelete(id: string) {
        try {
            await deleteContact.execute(id);
            getContacts.execute();
            executeToast("Contact deleted successfully", 'top-right', true, { type: 'success' });
            close();
        } catch (error) {
            console.error(error);
            executeToast(`Something went wrong during deletion ${error}. Please try again later`, 'top-right', true, { type: 'error' });
        }
    }

    const { columns } = useColumns({
      columns: [
        {
          field: "name",
          headerName: "Name",
          minWidth: 250,
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "phone",
          headerName: "Phone",
          flex: 1,
        },
        {
          field: "message",
          headerName: "Message",
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "Created At",
          flex: 1,
          sortable: true,
          minWidth: 200,
        },
        {
          field: "",
          headerName: "Actions",
          sortable: false,
          width: 100,
          renderCell: ({ row }) => {
            return (
              <Box display="flex" alignItems="center" height={1}>
                <CustomPopover open withIcon={true} label='Actions' iconButton={<GridMoreVertIcon fontSize="small" />}>
                  <ListItemButton
                    sx={{ color: 'black' }}
                    onClick={() => open()}>
                    Delete
                  </ListItemButton>
                  <ConfirmationDeleteDialog
                    isOpen={props.isOpen}
                    handleClose={close}
                    description="Are you sure you want to delete this contact? This action cannot be undone and this will permanently delete the contact information."
                    expectedInput="Delete Contact"
                    handleDelete={() => onDelete(row.id)}
                    loading={deleteContact.loading}
                  />
                </CustomPopover>
              </Box>
            );
          }
        },
      ],
    });
  
    return (
      <Box>
        <Container>
          <Alert
            severity="info"
            title="Contact Us Management"
            description="Access a comprehensive list of all internal users along with their details for streamlined tracking and effective management."
=======
  const getContacts = useApi((api) => api.webbackoffice.getAllContacts());

  const contacts =
    (getContacts.result?.data as unknown as ContactResponseType[]) ?? [];

  const { columns } = useColumns({
    columns: [
      {
        field: "name",
        headerName: "Name",
        minWidth: 250,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "phone",
        headerName: "Phone",
        flex: 1,
      },
      {
        field: "message",
        headerName: "Message",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
        sortable: true,
        minWidth: 200,
      },
    ],
  });

  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Contact Us Management"
          description="Access a comprehensive list of all internal users along with their details for streamlined tracking and effective management."
        />
        <Card sx={{ mt: 5, width: "100%", padding: 4 }} elevation={5}>
          <DataGrid
            columns={columns}
            initPageSize={10}
            rows={contacts}
            isLoading={getContacts.loading}
            data-testid="data-grid"
            disableColumnResize
          />
        </Card>
      </Container>
    </Box>
  );
};
