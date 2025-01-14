/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import Image from "next/image";
import {
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  Source as SourceIcon,
  AccountCircle as AccountCircleIcon,
  DeleteOutline as DeleteOutlineIcon,
  FindReplace as FindReplaceIcon,
  FiberManualRecord,
} from "@mui/icons-material";

import { keySquare, TRDSqaureWhite, TRDSquare } from "../../../assets";
import { SvgIconProps, SxProps } from "@mui/material";
import { KeySquareIcon } from "../../Icons/KeySquareIcon";

export const IconComponent = (
  iconName: string,
  open?: boolean,
  IconColor: SvgIconProps["color"] = "primary"
): React.ReactNode => {
  switch (iconName) {
    case "DashboardIcon":
      return <DashboardIcon color={IconColor} fontSize="small" />;
    case "FeedIcon":
      return <FeedIcon color={IconColor} fontSize="small" />;
    case "PersonIcon":
      return <PersonIcon color={IconColor} fontSize="small" />;
    case "QuestionManagementIcon":
      return (
        <QuestionAnswerIcon
          color={IconColor}
          fontSize="small"
          data-testid="QuestionManagementIcon"
        />
      );
    case "ResultsIcon":
      return (
        <ReportIcon
          color={IconColor}
          fontSize="small"
          data-testid="ResultsIcon"
        />
      );
    case "SettingsIcon":
      return <SettingsIcon color={IconColor} fontSize="small" />;
    case "SourceIcon":
      return <SourceIcon color={IconColor} fontSize="small" />;
    case "ApprovalIcon":
      return (
        <AccountCircleIcon
          color={IconColor}
          fontSize="small"
          data-testid="ApprovalIcon"
        />
      );
    case "DeleteIcon":
      return (
        <DeleteOutlineIcon
          color={IconColor}
          fontSize="small"
          data-testid="DeleteIcon"
        />
      );
    case "keySquare":
      return (
        <KeySquareIcon />
        // <Image
        //   src={keySquare}
        //   alt="Key-Square Icon"
        //   data-testid="keySquare"
        //   style={{ color: "red" }}
        // />
      );
    case "TRDSquare":
      return (
        <Image
          src={open ? TRDSqaureWhite : TRDSquare}
          alt="TRD-Square Icon"
          data-testid="TRDSquare"
        />
      );
    case "DotsIcon":
      return (
        <FiberManualRecord
          sx={{ color: "white", fontSize: "13px" }}
          data-testid="DotsIcon"
        />
      );
    case "FindReplaceIcon":
      return (
        <FindReplaceIcon
          color={IconColor}
          fontSize="small"
          data-testid="FindReplaceIcon"
        />
      );

    default:
      return <FeedIcon color={IconColor} fontSize="small" />; // Default icon
  }
};

export const IconList = [
  {
    label: "DashboardIcon",
    icon: DashboardIcon,
  },
  {
    label: "FeedIcon",
    icon: FeedIcon,
  },
  {
    label: "PersonIcon",
    icon: PersonIcon,
  },
  {
    label: "QuestionManagementIcon",
    icon: QuestionAnswerIcon,
  },
  {
    label: "ResultsIcon",
    icon: ReportIcon,
  },
  {
    label: "SettingsIcon",
    icon: SettingsIcon,
  },
  {
    label: "SourceIcon",
    icon: SourceIcon,
  },
  {
    label: "ApprovalIcon",
    icon: AccountCircleIcon,
  },
  {
    label: "DeleteIcon",
    icon: DeleteOutlineIcon,
  },
  {
    label: "keySquare",
    icon: (
      <Image src={keySquare} alt="Key-Square Icon" data-testid="keySquare" />
    ),
  },
  {
    label: "TRDSquare",
    icon: (
      <Image
        src={TRDSqaureWhite}
        alt="TRD-Square Icon"
        data-testid="TRDSquare"
      />
    ),
  },
  {
    label: "DotsIcon",
    icon: FiberManualRecord,
  },
  {
    label: "FindReplaceIcon",
    icon: FindReplaceIcon,
  },
];
