import { PriceButtonType } from "core-library/api/types";

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

export const PricingDetails = {
  price: 230,
  currency: "Usd",
  productType: "Practical Nurse",
  duration: "23 Days - Standard",
  description: "Transform your learning experience with our comprehensive package, designed specifically to help you excel in patient care and medical practice.",
  inclusions: [
    {
      label:
        "Comprehensive Review: A complete learning package with med cards, engaging videos, an adaptive simulator, and a guided schedule to master patient care.",
    },
    {
      label:
        "Content and Med Cards Included: Dive into detailed, high-quality resources like comprehensive content and medication cards to enhance your understanding and retention.",
    },
    {
      label:
        "Engaging Topic Videos: Stay captivated and informed with expertly crafted videos that bring critical topics to life.",
    },
    {
      label:
        "100% Computer Adaptive Simulator: Test and improve your skills with our advanced simulator that adjusts to your level, providing a personalized learning experience.",
    },
  ],
};
