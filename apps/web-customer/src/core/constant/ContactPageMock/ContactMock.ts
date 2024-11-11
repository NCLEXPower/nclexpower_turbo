import { StaticImageData } from "next/image";
interface Props {
  icon: StaticImageData;
  title: string;
  subTitle: string;
}

type SelectOption = {
  label: string;
  value: string | number;
  xvalue?: number;
};

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


export const CategoryData: SelectOption[] = [
  {
    label: "sample1",
    value: "sample1",
    xvalue: 0,
  },
  {
    label: "sample2",
    value: "sample2",
    xvalue: 1,
  },
  {
    label: "sample3",
    value: "sample3",
    xvalue: 2,
  },
];