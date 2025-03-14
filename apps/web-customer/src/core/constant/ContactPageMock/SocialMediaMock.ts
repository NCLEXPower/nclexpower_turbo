import { StaticImageData } from "next/image";
interface Props {
  icon: StaticImageData;
  title: string;
  link: string;
}

import {
  ContactFacebook,
  ContactTwitter,
  ContactInstagram,
} from "core-library/assets";

export const SocialMediaMock: Props[] = [
  {
    icon: ContactFacebook,
    title: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61573493806921",
  },
  {
    icon: ContactInstagram,
    title: "Instagram",
    link: "https://www.instagram.com/ncpreview/",
  },
];
