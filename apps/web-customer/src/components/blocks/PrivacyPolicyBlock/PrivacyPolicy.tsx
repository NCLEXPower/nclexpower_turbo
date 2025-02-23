import {
  List,
  ListItem,
  Typography,
  ListItemText
} from "@mui/material"
import { CoreZigmaLogo, NCLEXBlueLogo } from "core-library/assets";
import Divider from "core-library/components/Divider/Divider";
import Image from "next/image";
import { mockData } from "./PrivacyMock";
import Link from "next/link";
import { Button, EvaIcon } from "core-library/components";
import { useRouter } from "core-library";
import { useResolution } from "core-library/hooks";

export const PrivacyPolicy = () => {
  const router = useRouter();
  const trimmedPath = `#${router.asPath.split('#')[1]}`
  const { isMobile } = useResolution();

  return (
    <div className="w-full flex items-start justify-center flex-col bg-[#EFEFEF]">
      <div className="w-full bg-white md:px-32 py-6 flex items-center gap-2 ">
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
              fontFamily: 'PT Sans Narrow',
              color: '#4D4C4C',
              fontSize: '1.2rem',
            }}
          >
            Go Back
          </Typography>
        </Button>
      </div>
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
            Privacy Policy
          </h1>
          <Typography
            sx={{
              fontFamily: 'PT Sans Narrow',
              color: '#4D4C4C',
              fontSize: '1.2rem',
              fontWeight: "bold"
            }}
          >
            We value your privacy and are committed to protecting your personal information.</Typography>
          <Typography
            sx={{
              fontFamily: 'PT Sans Narrow',
              color: '#4D4C4C',
              fontSize: '0.875rem',
              marginBottom: 2
            }}
          >
            Last updated : February 22, 2025
          </Typography>
        </div>
        <div className="w-full flex items-start h-full justify-center ">
          {!isMobile ? (
            <div className="w-1/3 flex items-start justify-center flex-col overflow-y-auto sticky top-0">
              <List>
                {mockData?.map((item, index) => (
                  <div key={index}>
                    <Link href={`#${item.sectionId}`}>
                      <ListItem>
                        <ListItemText
                          primary={item.sectionTitle}
                          primaryTypographyProps={{
                            fontFamily: "PT Sans",
                            color: trimmedPath === `#${item.sectionId}` ? "#fff" : "#0F2A7195",
                            fontWeight: "bold",
                          }}
                          sx={{
                            backgroundColor: trimmedPath === `#${item.sectionId}` ? "#0F2A71" : "transparent",
                            color: trimmedPath === `#${item.sectionId}` ? "#fff" : "#0F2A71",
                            paddingY: 3,
                            paddingX: 4,
                            border: trimmedPath === `#${item.sectionId}` ? "1px solid #0F2A71" : "1px solid transparent",
                            borderRadius: "1rem",
                            transition: "all 0.3s ease-in-out",
                          }}
                        />
                      </ListItem>
                    </Link>
                    {item.subSection?.map((subItem, index) => (
                      <Link href={`#${subItem.subSectionId}`} >
                        <ListItem key={index}>
                          <ListItemText
                            primary={subItem.subSectionTitle}
                            primaryTypographyProps={{
                              fontFamily: "PT Sans Narrow",
                              color: trimmedPath === `#${subItem.subSectionId}` ? "#0F2A71" : "#4D4C4C",
                              fontWeight: trimmedPath === `#${subItem.subSectionId}` ? "bold" : "normal",
                              paddingLeft: 4
                            }}
                          />
                        </ListItem>
                      </Link>
                    ))}
                  </div>
                ))}
              </List>
            </div>
          ) : null}
          {!isMobile ? (
            <Divider orientation="vertical" flexItem />
          ) : null}
          <div className="w-full flex flex-col p-2 md:p-6">
            {mockData?.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2 p-1">
                <h2
                  className="font-ptSans text-2xl text-darkBlue font-bold mb-2"
                  id={`${item.sectionId}`}
                >
                  {item.sectionTitle}
                </h2>
                {item.subSection?.map((subItem, index) => (
                  <div key={index}>
                    <h3
                      className="font-ptSansNarrow  text-xl text-[#141414] font-bold pl-8"
                      id={`${subItem.subSectionId}`}
                    >
                      {subItem.subSectionTitle}
                    </h3>
                    <p className="font-ptSansNarrow text-[#4D4C4C] pl-8"
                    >
                      {subItem.subSectionContent}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}