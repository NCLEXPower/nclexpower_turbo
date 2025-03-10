import { ChipPropsColorOverrides } from "@mui/material";

type GetStyleReturnType = {
  label: string;
  color:
    | "default"
    | "info"
    | "warning"
    | "error"
    | "success"
    | "primary"
    | "secondary";
};

export const getContentStatusStyle = (status: number): GetStyleReturnType => {
  switch (status) {
    case 0:
      return { label: "Pending", color: "default" };
    case 1:
      return { label: "Ready for Review", color: "info" };
    case 2:
      return { label: "Reviewing", color: "warning" };
    case 3:
      return { label: "Needs Revision", color: "error" };
    case 4:
      return { label: "Approved", color: "success" };
    case 5:
      return { label: "Rejected", color: "error" };
    default:
      return { label: "Unknown", color: "default" };
  }
};
