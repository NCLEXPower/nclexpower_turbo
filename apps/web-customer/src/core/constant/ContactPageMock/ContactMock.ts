import { StaticImageData } from "next/image";
interface Props {
  icon: StaticImageData;
  title: string;
  subTitle: string;
}

import { ContactLocation, ContactMail, ContactPhone } from "core-library/assets";

export const ContactMock: Props[] = [
  {
    icon: ContactLocation,
    title: "Location",
    subTitle: "1700 Eureka Rd Ste 155 <br/> Roseville, California 95661"
  },
  {
    icon: ContactPhone,
    title: "Contact Number",
    subTitle: "1-866-800-3030",
  },
  {
    icon: ContactMail,
    title: "Email Address",
    subTitle: "info@nclexpower.com",
  },
]