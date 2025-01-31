/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { ReactNode, useState } from "react";
import { Box, Accordion, AccordionSlots, Fade } from "@mui/material";
import { styled } from "@mui/material";
import { CustomAccordionSummary } from "./CustomAccordionSummary";
import { CustomAccordionDetails } from "./CustomAccordionDetails";

interface HeaderProps {
  headerBackgroundColor?: string;
  headerHeight?: string;
  accordionRadius?: string;
  accordionMargin?: string;
}

interface ItemProps {
  id: string | number;
  disabled?: boolean;
}

interface Props<T> extends HeaderProps {
  items: T[];
  renderSummary?: (
    item: T,
    expanded: boolean,
    onToggle: (event?: React.SyntheticEvent, newExpanded?: boolean) => void
  ) => ReactNode;
  renderDetails?: (
    item: T,
    expanded: boolean,
    onToggle: (event?: React.SyntheticEvent, newExpanded?: boolean) => void
  ) => ReactNode;
  noAvailableDataText?: string;
  disabled?: boolean;
}

const StyledAccordion = styled(Accordion)<{
  expanded: boolean;
  accordionRadius?: string;
  accordionMargin?: string;
}>(({ expanded, accordionRadius, accordionMargin }) => ({
  margin: accordionMargin ?? "0px",
  borderRadius: accordionRadius ?? "0px",
  "& .MuiAccordion-region": {
    height: expanded ? "auto" : 0,
  },
  "& .MuiAccordionDetails-root": {
    display: expanded ? "block" : "none",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  "&.Mui-disabled": {
    backgroundColor: "white",
    pointerEvents: "none",
    opacity: 0.5,
  },
  "&.MuiAccordion-root:before": {
    backgroundColor: "transparent",
  },
}));

export const ControlledAccordion = <T extends ItemProps>({
  items,
  renderSummary,
  renderDetails,
  headerBackgroundColor,
  headerHeight,
  noAvailableDataText,
  accordionRadius,
  accordionMargin
}: Props<T>) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event?: React.SyntheticEvent, newExpanded?: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className="flex flex-col gap-4">
      {items.length === 0 ? (
        <h4 className="font-ptSansNarrow text-center text-gray-500 w-full">
          {noAvailableDataText}
        </h4>
      ) : (
        items.map((item) => {
          const { id, disabled } = item;
          const panelId = `panel${id}`;

          return (
            <StyledAccordion
              accordionMargin={accordionMargin}
              accordionRadius={accordionRadius}
              disabled={disabled}
              key={panelId}
              square
              expanded={expanded === panelId}
              slots={{ transition: Fade as AccordionSlots["transition"] }}
              slotProps={{ transition: { timeout: 400 } }}
            >
              <CustomAccordionSummary
                expanded={expanded === panelId}
                onToggle={handleChange(panelId)}
                headerBackgroundColor={headerBackgroundColor}
                headerHeight={headerHeight}
                accordionRadius={accordionRadius}
              >
                {renderSummary ? (
                  renderSummary(
                    item,
                    expanded === panelId,
                    handleChange(panelId)
                  )
                ) : (
                  <Box>
                    <h4 className="text-[16px] font-ptSans">No Available Header...</h4>
                  </Box>
                )}
              </CustomAccordionSummary>
              <CustomAccordionDetails
                expanded={expanded === panelId}
                onToggle={handleChange(panelId)}
              >
                {renderDetails ? (
                  renderDetails(
                    item,
                    expanded === panelId,
                    handleChange(panelId)
                  )
                ) : (
                  <Box>
                    <h4 className="text-[16px] font-ptSans">No Available Details...</h4>
                  </Box>
                )}
              </CustomAccordionDetails>
            </StyledAccordion>
          );
        })
      )}
    </Box>
  );
};
