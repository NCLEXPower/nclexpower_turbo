import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { Row } from "@tanstack/react-table";
import { CustomPopover } from "./Popover";
import { EvaIcon } from "../EvaIcon";
import ConfirmationModal from "../Dialog/DialogFormBlocks/RegularQuestion/ConfirmationDialog";
import { MenuItems } from "../../api/types";

interface ActionsPopoverProps {
  row: Row<MenuItems>;
  handleDelete?: (menuId: string) => void;
  handleEdit?: (menuId: string) => void;
  handleAdd?: (menuId: string) => void;
}

const ActionsPopover: React.FC<ActionsPopoverProps> = ({
  row,
  handleDelete,
  handleEdit,
  handleAdd,
}) => {
  const handleDeleteFunction = () => {
    handleDelete && handleDelete(row.original.menuId);
  };

  return (
    <CustomPopover
      open
      label="Actions"
      withIcon
      iconButton={
        <EvaIcon
          name="more-horizontal-outline"
          width={22}
          height={22}
          aria-hidden
        />
      }
    >
      <ListItemButton onClick={() => handleAdd}>Add</ListItemButton>
      <ListItemButton onClick={() => handleEdit}>Edit</ListItemButton>
      {row.original.children.length === 0 && (
        <ConfirmationModal
          customButton="Delete"
          dialogContent={
            <>
              Are you sure you want to delete <b>"{row.original.label}" Menu</b>
              ?
            </>
          }
          confirmButtonText="Delete"
          isLoading={false}
          handleSubmit={handleDeleteFunction}
        />
      )}
    </CustomPopover>
  );
};

export default ActionsPopover;
