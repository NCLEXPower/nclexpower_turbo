/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { EvaIcon, IconButton } from "../../../../../../../../components";
import { formatSectionTitle } from "../../../../../../../../utils/FormatSectionTitles";

interface ProgramSectionHeaderProps {
  sectionImage: string;
  sectionTitle: string;
  sectionType: string;
  handleCreateSection?: (sectionTitle: string, sectionType: string) => void;
  handleEditSection?: (sectionTitle: string, sectionType: string) => void;
  handleDeleteSection?: () => void;
  showHeaderButtons?: boolean;
  showAddButton?: boolean;
}

export const ProgramSectionHeader: React.FC<ProgramSectionHeaderProps> = ({
  sectionImage,
  sectionTitle,
  sectionType,
  handleCreateSection,
  handleEditSection,
  handleDeleteSection,
  showHeaderButtons,
  showAddButton,
}) => {
  const renderButton = (
    action: (() => void) | undefined,
    background: string,
    icon: string,
    hoverBackground?: string
  ) => (
    <IconButton
      onClick={action ?? (() => {})}
      sx={{
        background,
        borderRadius: "5px",
        "&:hover": { background: hoverBackground ?? background },
      }}
    >
      <EvaIcon name={icon} fill="#ffffff" width={18} height={18} />
    </IconButton>
  );

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          paddingX: 12,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "80px",
            alignContent: "center",
            height: "80px",
            background: "rgba(59, 0, 134, 0.05)",
            borderRadius: "10px",
          }}
        >
          <Image
            alt="section image"
            src={sectionImage}
            width={22}
            height={22}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
            padding: "0 20px",
            background: "rgba(59, 0, 134, 0.05)",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h4"
            className="font-ptSansNarrow font-regular text-[20px] text-[#6C6C6C]"
          >
            {formatSectionTitle(sectionTitle)} Section
          </Typography>

          {showAddButton &&
            renderButton(
              handleCreateSection
                ? () => handleCreateSection(sectionTitle, sectionType)
                : undefined,
              "#5ABC36",
              "plus-outline",
              "#6FCC48"
            )}

          {showHeaderButtons && (
            <Box sx={{ display: "flex", gap: "5px" }}>
              {renderButton(
                handleCreateSection
                  ? () => handleCreateSection(sectionTitle, sectionType)
                  : undefined,
                "#5ABC36",
                "plus-outline",
                "#6FCC48"
              )}
              {renderButton(
                handleDeleteSection,
                "#D40000",
                "trash-outline",
                "#E56666"
              )}
            </Box>
          )}
        </Box>

        {showAddButton && (
          <IconButton
            onClick={
              handleEditSection
                ? () => handleEditSection(sectionTitle, sectionType)
                : () => {}
            }
            sx={{
              background: "#F5F2F9",
              borderRadius: "5px",
              "&:hover": { background: "#F5F2F9" },
            }}
          >
            <EvaIcon name="chevron-right-outline" fill="#3B0086" />
          </IconButton>
        )}
      </Box>
    </section>
  );
};
