import { List, ListItem, Typography, ListItemText } from "@mui/material";
import { CoreZigmaLogo, NCLEXBlueLogo } from "core-library/assets";
import Divider from "core-library/components/Divider/Divider";
import Image from "next/image";
import {
  ContentList,
  SublistItems,
  TermsAndConditions,
  tncData,
} from "./PrivacyMock";
import Link from "next/link";
import { Button, EvaIcon } from "core-library/components";
import { useRouter } from "core-library";
import { useResolution } from "core-library/hooks";
import React from "react";

interface RenderSubListProps {
  items: SublistItems;
  itemIcon: string;
}

const RenderSubList: React.FC<RenderSubListProps> = ({ items, itemIcon }) => {
  return (
    <ul className="pl-2 mb-2 font-ptSansNarrow text-[#4D4C4C]">
      {items.map((item, index) => {
        if (!item) return null;

        if (React.isValidElement(item)) {
          return item;
        } else if (typeof item === "string") {
          return (
            <li key={index}>
              <div className="flex items-start gap-2">
                {itemIcon && (
                  <span className="shrink-0 mt-[5px]">
                    <EvaIcon name={itemIcon} width={16} height={16} />
                  </span>
                )}
                <span>{item}</span>
              </div>
            </li>
          );
        } else {
          const listItem = item as ContentList;
          return (
            <li key={index}>
              <div className="flex items-start gap-2">
                {itemIcon && (
                  <span className="shrink-0 mt-[5px]">
                    <EvaIcon
                      name={listItem.itemIcon || itemIcon}
                      width={16}
                      height={16}
                    />
                  </span>
                )}
                <div>
                  {listItem.description && (
                    <p className="font-semibold text-[#141414] mb-1">
                      {listItem.description}
                    </p>
                  )}
                  {listItem.subDescription && (
                    <span className="text-[#4D4C4C]">
                      {listItem.subDescription}
                    </span>
                  )}
                  {listItem.items && (
                    <RenderSubList items={listItem.items} itemIcon={itemIcon} />
                  )}
                </div>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};

interface RenderSubContentProps {
  block: ContentList;
}

const RenderSubContent: React.FC<RenderSubContentProps> = ({ block }) => {
  const { description, subDescription, items, itemIcon } = block;
  return (
    <div className="pl-8 my-4 flex items-start gap-2 overflow-auto">
      {itemIcon && (
        <span className="shrink-0 mt-[5px]">
          <EvaIcon name={itemIcon} width={16} height={16} />
        </span>
      )}
      <div>
        {description && (
          <span className="font-ptSansNarrow text-[#4D4C4C] font-semibold block">
            {description}
          </span>
        )}
        {subDescription && (
          <span className="font-ptSansNarrow text-[#4D4C4C] block">
            {subDescription}
          </span>
        )}
        {items && (
          <RenderSubList items={items} itemIcon={itemIcon ?? "arrow-right"} />
        )}
      </div>
    </div>
  );
};

interface Props {
  policy?: TermsAndConditions[];
  forPayment?: boolean;
}

export const PrivacyPolicy: React.FC<Props> = ({
  policy = tncData,
  forPayment = false,
}) => {
  const router = useRouter();
  const trimmedPath = `#${router.asPath.split("#")[1]}`;
  const { isMobile } = useResolution();

  return (
    <div className="w-full flex items-start justify-center flex-col ">
      {!forPayment && (
        <div className="w-full bg-white py-6 flex items-center gap-2 ">
          <Button
            variant={"text"}
            onClick={() => router.back()}
            className="flex items-center gap-2"
            sx={{ paddingY: 3 }}
          >
            <EvaIcon
              id="back-icon"
              name="arrow-back-outline"
              fill={"#0F2A71"}
              width={20}
              height={20}
              ariaHidden
            />
            <Typography
              sx={{
                fontFamily: "PT Sans Narrow",
                color: "#4D4C4C",
                fontSize: "1.2rem",
              }}
            >
              Go Back
            </Typography>
          </Button>
        </div>
      )}
      <div className="w-full flex items-start justify-center flex-col px-4 md:px-32 py-4 ">
        <div className="w-full flex flex-col items-start gap-2 my-6">
          <div className="w-full flex items-center gap-4">
            <Image
              src={CoreZigmaLogo}
              alt="CoreZigma"
              style={{
                width: "5.1875rem",
                height: "5.1875rem",
                objectFit: "cover",
              }}
            />
            <Image
              src={NCLEXBlueLogo}
              alt="CoreZigma"
              style={{
                width: "11.375rem",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <h1 className="font-ptSans text-3xl text-darkBlue font-bold ">
            Terms, Policies and Conditions
          </h1>
          <Typography
            sx={{
              fontFamily: "PT Sans Narrow",
              color: "#4D4C4C",
              fontSize: "0.875rem",
              marginBottom: 2,
            }}
          >
            Last updated : February 22, 2025
          </Typography>
        </div>
        <div className="w-full flex items-start h-full justify-center ">
          {!isMobile && (
            <div className="h-full flex items-start justify-center flex-col shrink-0 basis-1/3 overflow-auto sticky top-0">
              <List>
                {policy?.map((item, index) => (
                  <div key={index}>
                    <Link href={`#${item.sectionId}`}>
                      <ListItem sx={{ pl: 0 }}>
                        <ListItemText
                          primary={item.sectionTitle}
                          primaryTypographyProps={{
                            fontFamily: "PT Sans",
                            color:
                              trimmedPath === `#${item.sectionId}`
                                ? "#fff"
                                : "#0F2A7195",
                            fontWeight: "bold",
                          }}
                          sx={{
                            backgroundColor:
                              trimmedPath === `#${item.sectionId}`
                                ? "#0F2A71"
                                : "transparent",
                            color:
                              trimmedPath === `#${item.sectionId}`
                                ? "#fff"
                                : "#0F2A71",
                            paddingY: 3,
                            paddingX: 4,
                            border:
                              trimmedPath === `#${item.sectionId}`
                                ? "1px solid #0F2A71"
                                : "1px solid transparent",
                            borderRadius: "1rem",
                            transition: "all 0.3s ease-in-out",
                            pl: 0,
                          }}
                        />
                      </ListItem>
                    </Link>
                    {item.subSection?.map((subItem, index) => (
                      <Link href={`#${subItem.subSectionId}`}>
                        <ListItem key={index} sx={{ pl: 0 }}>
                          <ListItemText
                            primary={subItem.subSectionTitle}
                            primaryTypographyProps={{
                              fontFamily: "PT Sans Narrow",
                              color:
                                trimmedPath === `#${subItem.subSectionId}`
                                  ? "#0F2A71"
                                  : "#4D4C4C",
                              fontWeight:
                                trimmedPath === `#${subItem.subSectionId}`
                                  ? "bold"
                                  : "normal",
                              paddingLeft: 0,
                            }}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </div>
                ))}
              </List>
            </div>
          )}

          {!isMobile && <Divider orientation="vertical" flexItem />}

          <div className="w-full flex flex-col p-2 md:p-6">
            {policy.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2 p-1">
                <h2
                  className="font-ptSans text-2xl text-darkBlue font-bold mb-2"
                  id={`${item.sectionId}`}
                >
                  {item.sectionTitle}
                </h2>
                {item.subSection.map((subItem) => (
                  <div key={subItem.id}>
                    <h3
                      className="font-ptSansNarrow  text-2xl text-[#141414] font-bold pl-8"
                      id={`${subItem.subSectionId}`}
                    >
                      {subItem.subSectionTitle}
                    </h3>
                    {subItem.subSectionContent.map((item, index) => (
                      <RenderSubContent key={index} block={item} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
