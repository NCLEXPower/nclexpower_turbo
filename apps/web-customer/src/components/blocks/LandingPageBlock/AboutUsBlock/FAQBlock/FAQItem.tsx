/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { faqMockData } from "../../../../../core/constant/AboutUsMock/FAQMock";
import {
  ControlledAccordion,
  EvaIcon,
  IconButton,
} from "core-library/components";
import { Box } from "@mui/material";

interface AccordionContentProps {
  description?: string[];
  subDescription?: string[];
}

interface AccordionHeaderProps {
  id: number;
  title: string;
  expanded: boolean;
  onToggle: (event?: React.SyntheticEvent, newExpanded?: boolean) => void;
}
interface FAQItemBlockProps {
  topic: string;
}

const renderListItems = (
  items: string[],
  className: string,
  marginLeft: string
) => (
  <ul
    style={{ listStyleType: "disc", marginLeft }}
    className={`flex flex-col gap-2 ${className}`}
  >
    {items.map((item, idx) => (
      <li
        key={idx}
        className="font-ptSansNarrow text-[14px] lg:text-[16px] font-bold text-[#6C6C6C]"
      >
        {item}
      </li>
    ))}
  </ul>
);

const AccordionContent: React.FC<AccordionContentProps> = ({
  description,
  subDescription,
}) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {description && renderListItems(description, "gap-4", "20px")}
      {subDescription && renderListItems(subDescription, "gap-2", "40px")}
    </div>
  );
};

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  id,
  title,
  expanded,
  onToggle,
}) => {
  return (
    <Box className="w-full flex justify-between px-8 items-center" key={id}>
      <h4 className="text-[16px] font-ptSans text-darkBlue font-bold">
        {title}
      </h4>
      <Box>
        <React.Fragment>
          <IconButton
            onClick={(e) => {
              e?.stopPropagation();
              onToggle(e, !expanded);
            }}
          >
            <Box
              sx={{
                position: "relative",
                "#open-icon": { display: expanded ? "none" : "flex" },
                "#close-icon": { display: expanded ? "flex" : "none" },
              }}
            >
              <EvaIcon
                id="close-icon"
                name="minus-square-outline"
                fill="#0F2A71"
                width={30}
                height={30}
                ariaHidden
              />
              <EvaIcon
                id="open-icon"
                name="plus-square-outline"
                fill="#0F2A71"
                width={30}
                height={30}
                ariaHidden
              />
            </Box>
          </IconButton>
        </React.Fragment>
      </Box>
    </Box>
  );
};

export const FAQItemBlock: React.FC<FAQItemBlockProps> = ({ topic }) => {
  const accordionItems = faqMockData
    .filter((item) => item.topic === topic)
    .map((item) => ({
      id: item.id,
      title: item.question,
      content: (
        <AccordionContent
          description={item.description}
          subDescription={item.subDescription}
        />
      ),
    }));

  return (
    <section className="mt-0 lg:mt-[-20px] h-auto">
      <ControlledAccordion
        accordionRadius="5px"
        headerBackgroundColor="#dbdfea"
        headerHeight="auto"
        items={accordionItems}
        renderSummary={(item, expanded, onToggle) => {
          const { id, title } = item;
          return (
            <AccordionHeader
              id={id}
              title={title}
              expanded={expanded}
              onToggle={onToggle}
            />
          );
        }}
        renderDetails={(item) => (
          <Box className="w-full px-8">{item.content}</Box>
        )}
      />
    </section>
  );
};
