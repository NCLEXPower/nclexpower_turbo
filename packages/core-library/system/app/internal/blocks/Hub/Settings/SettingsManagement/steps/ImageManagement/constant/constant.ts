/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  AboutUsBanner,
  CarouselOne,
  CarouselThree,
  CarouselTwo,
  ContactUsBanner,
  CoreZigmaLogo,
  CroppedCoreZigma,
  FlipCardOne,
  FlipCardOneBack,
  FlipCardThree,
  FlipCardThreeBack,
  FlipCardTwo,
  FlipCardTwoBack,
  LoginBG,
  ArxeniusLogoBlue,
  ArxeniusLogoYellow,
  PNBackground,
  PracticeTest,
  RNBackground,
  StudyCards,
  TransparentCoreZigma,
  WatchVideos,
} from "../../../../../../../../../../assets";
import { CardDataType, ImageCollectionType } from "../types/types";

export const LogoData: CardDataType[] = [
  {
    title: "Dark Logo",
    bgColor: "#404040",
    imgSrc: ArxeniusLogoYellow,
    imgAlt: "ArxeniusLogoYellow",
  },
  {
    title: "White Logo",
    bgColor: "#ffffff",
    imgSrc: ArxeniusLogoBlue,
    imgAlt: "ArxeniusLogoBlue",
  },
  {
    title: "Core Zigma Logo",
    bgColor: "#ffffff",
    imgSrc: CoreZigmaLogo,
    imgAlt: "CoreZigmaLogo",
    imgStyle: { height: "70px", width: "70px" },
  },
];

export const cardItems = [
  { title: "Image Gallery", content: "Images" },
  { title: "Web Customer", content: "Web Customer" },
];

export const WCGenericRouteWithImages: ImageCollectionType[] = [
  {
    id: 1,
    label: "Homepage",
    icon: "",
    children: [
      {
        category: "Revo Banner",
        fixedCount: false,
        children: [
          {
            label: "Carousel 1",
            image: CarouselOne,
          },
          {
            label: "Carousel 2",
            image: CarouselTwo,
          },
          {
            label: "Carousel 3",
            image: CarouselThree,
          },
        ],
      },
      {
        category: "Core Zigma Flippable Cards",
        fixedCount: false,
        children: [
          {
            label: "Flip Card Front 1",
            image: FlipCardOne,
          },
          {
            label: "Flip Card Back 1",
            image: FlipCardOneBack,
          },
          {
            label: "Flip Card Front 2",
            image: FlipCardTwo,
          },
          {
            label: "Flip Card Back 2",
            image: FlipCardTwoBack,
          },
          {
            label: "Flip Card Front 3",
            image: FlipCardThree,
          },
          {
            label: "Flip Card Back 3",
            image: FlipCardThreeBack,
          },
        ],
      },
      {
        category: "How It Works Card",
        fixedCount: false,
        children: [
          {
            label: "Card 1",
            image: WatchVideos,
          },
          {
            label: "Card 2",
            image: StudyCards,
          },
          {
            label: "Card 3",
            image: PracticeTest,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "About Us",
    icon: "",
    children: [
      {
        category: "Hero Banner",
        fixedCount: true,
        children: [
          {
            label: "About Us Banner",
            image: AboutUsBanner,
          },
        ],
      },
      {
        category: "FAQ Background Image",
        fixedCount: true,
        children: [
          {
            label: "Background One",
            image: CroppedCoreZigma,
          },
          {
            label: "Background Two",
            image: TransparentCoreZigma,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Contact",
    icon: "",
    children: [
      {
        category: "Hero Banner",
        fixedCount: true,
        children: [
          {
            label: "Contact Us Banner",
            image: ContactUsBanner,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Login",
    icon: "",
    children: [
      {
        category: "Left Panel Image",
        fixedCount: true,
        children: [
          {
            label: "Login Image",
            image: LoginBG,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Payment Checkout",
    icon: "",
    children: [
      {
        category: "Background Image",
        fixedCount: true,
        children: [
          {
            label: "PN Background",
            image: RNBackground,
          },
          {
            label: "RN Background",
            image: PNBackground,
          },
        ],
      },
    ],
  },
];
