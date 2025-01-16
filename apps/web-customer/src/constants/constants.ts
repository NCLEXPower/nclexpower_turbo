import { PriceButtonType } from "core-library/api/types";
import { CoreZigmaLogo, NCLEXBlueLogo, } from "core-library/assets";
import { DialogContents } from "core-library/components";

export const PriceButtonDetails: PriceButtonType[] = [
  {
    acronym: "RN",
    label: "Registered Nurse",
    value: 0,
  },
  {
    acronym: "PN",
    label: "Practical Nurse",
    value: 1,
  },
];

export const dataContent: DialogContents[] = [
  {
    id: 1,
    title: "Welcome to NCLEX Power.",
    image: "", // A placeholder image for now, preparation for resources image.
    contentType: "text",
    content: "Bacon ipsum dolor amet short loin turkey rump, pork flank biltong kevin chislic cow beef ribs picanha alcatra capicola venison shank. Salami brisket porchetta hamburger, pastrami doner pork chop pork flank pancetta tenderloin capicola. ",
  },
  {
    id: 2,
    title: "How to use NCLEX Power.",
    image: CoreZigmaLogo,
    contentType: "video",
    content: "https://www.youtube.com/watch?v=H2jA88pESko"
  },
  {
    id: 3,
    image: CoreZigmaLogo, 
    title: "Start your journey.",
    contentType: "video",
    content: "https://www.youtube.com/watch?v=bTtkRrIlIv0"
  },
  {
    id: 4,
    image: CoreZigmaLogo, 
    title: "Start the tour.",
    contentType: "text",
    content: "Bacon ipsum dolor amet short loin turkey rump, pork flank biltong kevin chislic cow beef ribs picanha alcatra capicola venison shank. Salami brisket porchetta hamburger, pastrami doner pork chop pork flank pancetta tenderloin capicola. ",
  },
]