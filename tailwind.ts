import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      primary: "Playfair Display",
      body: "Work Sans",
      logo: "Proxima Nova",
      main: "Abyssinica SIL",
      subtitle: "Roboto Slab",
      ptSans: ["PT Sans", "sans-serif"],
      ptSansNarrow: ["PT Sans Narrow", "sans-serif"],
      Rajdhani: ["Rajdhani", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "3rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#ffffff", // white
        secondary: "#fdf9ff", // light gray
        gray: "#eff0f5", // gray
        darkGray: "#969696", // dark gray
        curveGray: "#202731", // dark gray
        hoverBlue: "#00173F", // dark blue login
        curveBlue: "#3c31dd", // blue
        sideBar: "#051e34", // dark blue
        sideBarTab: "#122c44", // light gray
        sideBarTabHover: "#253d53", // white gray
        blue: "#1a73e8", // blue
        softGrayBlue: "#f0f2f8", // Light Grayish Blue
        darkBlue: "#0F2A71;", // login blue
        mainBlue: "#102973",
        yellow: "#F4C501", // yellow
        accent: {
          DEFAULT: "#bd321c", // red
          hoverToRed: "#bd321c", // red
          hoverToBlack: "#000000", // black
          hoverToWhite: "#ffffff", // white
        },
        paragraph: "#878e99",
      },
      backgroundImage: {
        "core-zigma": "url('../assets/CoreZigmaBG.png')",
        "how-it-works": "url('../assets/ModifiedHowitWorkBG.png')",
        pricing: "url('../assets/PricingBGLogo.jpg')",
        login: "url('../assets/LoginBG.png')",
        "success-payment": "url('../assets/SuccessPaymentBG.png')",
        PN: "url('../assets/PNBackground.png')",
        RN: "url('../assets/RNBackground.png')",
      },
    },
  },
  plugins: [forms],
};

export default config;
