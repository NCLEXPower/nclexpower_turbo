import { createTheme } from "@mui/material";
import { CmsTenant } from "../../types/tenant";
import { ColorGenerator } from "./color-generator";

export const DEFAULT_LOGO = {
  width: 300,
  height: 37,
  src: "",
};

const themeConfigFromTenant = (tenant?: CmsTenant | null) => ({
  primaryColor: tenant?.primaryColor.value ?? "#0c225c",
});

export const appColorsFromPrimary = (primaryColor: string) => {
  const color = new ColorGenerator(primaryColor);
  return {
    primary: color.primary,
    purple: "#6900b7",
    secondary: {
      light: color.lightenColor(20),
      dark: color.darkenColor(20),
      transparentLight: color.lightenColor(20, 20),
      transparentDark: color.darkenColor(20, 20),
    },
    tertiary: {
      light: color.lightenColor(40),
      dark: color.darkenColor(40),
      transparentLight: color.lightenColor(40, 20),
      transparentDark: color.darkenColor(40, 20),
    },
    support60: {
      light: color.lightenColor(60),
      dark: color.darkenColor(60),
      transparentLight: color.lightenColor(60, 20),
      transparentDark: color.darkenColor(60, 20),
    },
    support80: {
      light: color.lightenColor(80),
      dark: color.darkenColor(80),
      transparentLight: color.lightenColor(80, 20),
      transparentDark: color.darkenColor(80, 20),
    },
    essential: {
      1000: "#000000",
      800: "#333333",
      500: "#666666",
      300: "#808080",
      100: "#959595",
    },
    incidental: {
      "075": "#CCCCCC",
      "035": "#EEEEEE",
      "025": "#FAFAFA",
      "000": "#FFFFFF",
    },
    ui_rag: {
      "Red.400": "#CF223F",
      "Red.075": "#ECA7B2",
      "Red.025": "#F9F2F3",
      "Amber.400": "#FCB900",
      "Amber.075": "#FEE399",
      "Amber.025": "#FFFCF5",
      "Green.400": "#429448",
      "Green.075": "#B3D4B6",
      "Green.025": "#F7FBF8",
      "Blue.400": "#0018CC",
      "Blue.075": "#979ED3",
      "Blue.025": "#F1F1FA",
    },
    grey: "#ACACAC",
  };
};

export const theme = (tenant?: CmsTenant | null) => {
  const { primaryColor } = themeConfigFromTenant(tenant);
  const appColors = appColorsFromPrimary(primaryColor);
  const divider = "#E3E4E3";
  const paper = "#FFF";
  const info = "#0018CC";
  const infoColors = new ColorGenerator(info);
  const primaryColors = new ColorGenerator(appColors.primary);
  const purple = "#560bad";

  return createTheme({
    spacing: 4,
    sizes: {
      contentWidth: "1440px",
      contentPaddingX: "90px",
      mobileContentPaddingX: "20px",
      errorsTooltip: "244px",
      fieldTooltip: "400px",
      headerHeight: "160px",
      mobileHeaderHeight: "76px",
      stickOutPageWidth: "660px",
    },
    palette: {
      appColors,
      purple: appColors.purple,
      primary: {
        light: primaryColors.lightenColor(80, 20),
        main: appColors.primary,
      },
      background: {
        default: "#FFFFFF",
        paper,
      },
      error: {
        main: appColors.ui_rag["Red.400"],
        light: appColors.ui_rag["Red.025"],
      },
      warning: {
        main: appColors.ui_rag["Amber.400"],
        light: appColors.ui_rag["Amber.025"],
      },
      success: {
        main: appColors.ui_rag["Green.400"],
        light: appColors.ui_rag["Green.025"],
      },
      info: {
        main: appColors.ui_rag["Blue.400"],
        light: appColors.ui_rag["Blue.025"],
      },
      text: {
        secondary: "#525252",
      },
      email: {
        header: "#f5f0e7",
        footer: {
          first: "#f19e00",
          second: "#e9245c",
          third: "#490c64",
          fourth: "#6900b7",
        },
      },
      footer: {
        text: "#ffffff",
        darkText: "#525252",
        light: "#333333",
        dark: "#000000",
      },
      radio: {
        outer: appColors.essential[500],
        focus: appColors.ui_rag["Amber.400"],
      },
      input: {
        hoverBorder: appColors.ui_rag["Amber.400"],
      },
      divider,
    },
    typography: {
      fontFamily: "Inter",
      htmlFontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightBold: 700,
      h1: {
        fontSize: "2.25rem", // 36px
        lineHeight: 1.28,
        fontWeight: 400,
      },
      h2: {
        fontSize: "1.625rem", // 26px
        lineHeight: 1.31,
        fontWeight: 400,
      },
      h3: {
        fontSize: "1.375rem", // 22px
        lineHeight: 1.45454545,
        fontWeight: 400,
      },
      h4: {
        fontSize: "1.25rem", // 20px
        lineHeight: 1.5,
        fontWeight: 400,
      },
      h5: {
        fontSize: "1.125rem", // 18px
        lineHeight: 1.45,
        fontWeight: 400,
      },
      h6: {
        fontSize: "1rem", // 16px
        lineHeight: 1.625,
        fontWeight: 400,
      },
      body1: {
        fontSize: "1.125rem", // 18px
        lineHeight: 1.45,
        fontWeight: 400,
      },
      body2: {
        fontSize: "1rem", // 16px
        lineHeight: 1.625,
        fontWeight: 400,
      },
      caption: {
        fontSize: "0.875rem", // 14px
        lineHeight: 1.215,
        fontWeight: 400,
      },
      button: {
        fontSize: "1.125rem", // 18px
        lineHeight: 1.45,
        fontWeight: 400,
      },
      badge: {
        fontSize: "0.75rem", // 12px
        lineHeight: 1.45,
        fontWeight: 400,
      },
      sublabel: {
        fontSize: "0.625rem", // 10px
        lineHeight: 1.625,
        fontWeight: 400,
      },
      firstLevelValue: {
        fontSize: "1.75rem", // 28px
        lineHeight: 1.28,
        fontWeight: 700,
      },
      secondLevelValue: {
        fontSize: "1.375rem", // 22px
        lineHeight: 1.45,
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: "smooth",
            "[disableScroll] body": {
              height: "100vh",
              overflowY: "hidden",
            },
          },
          p: { marginBlockStart: "1rem", marginBlockEnd: "1rem" },
          "& a": {
            color: appColors.primary,
            "&:focus:not(.MuiButton-root, .MuiListItem-root &, .MuiListItemButton-root &)":
              {
                backgroundColor: appColors.ui_rag["Amber.400"],
                outline: "none!important",
              },
          },
          "& button:focus, a.MuiButton-root:focus": {
            border: "none",
            outlineOffset: "-1px",
            outline: `2px solid ${appColors.ui_rag["Amber.400"]}!important`,
          },
          "& #nprogress": {
            "& .bar": {
              background: appColors.primary,
            },
            "& .peg": {
              boxShadow: `0 0 10px ${appColors.primary}, 0 0 5px ${appColors.primary}`,
            },
            "& .spinner-icon": {
              borderColor: "transparent",
              borderTopColor: appColors.primary,
              borderLeftColor: appColors.primary,
            },
          },
          ".nowrap": {
            whiteSpace: "nowrap",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: "54px",
            outline: "2px solid transparent",
            boxSizing: "border-box",
            "&.Mui-focused": {
              boxShadow: `0 0 0 2px ${appColors.essential["1000"]}`,
              outline: `2px solid ${appColors.ui_rag["Amber.400"]}`,
              backgroundColor: appColors.incidental["000"],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            fieldset: {
              borderColor: appColors.essential[500],
            },
            input: {
              "&::placeholder": { color: appColors.essential[300], opacity: 1 },
            },
            "&.MuiInputBase-multiline": {
              height: "auto",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            transform: "none",
            transition: "none",
            textTransform: "none",
            boxSizing: "border-box",
            outline: "2px solid transparent",
            minHeight: "54px",
            height: "auto",
            "&.MuiButton-sizeSmall": {
              minHeight: "35px",
              height: "auto",
              paddingLeft: "10px",
              paddingRight: "10px",
            },
            "&.Mui-focusVisible": {
              border: "none",
              outlineOffset: "-1px",
              outline: `2px solid ${appColors.ui_rag["Amber.400"]}`,
            },
            "&.loading": {
              color: "transparent !important",
              cursor: "wait",
            },
          },
          contained: {
            backgroundColor: appColors.primary,

            ".button-icon": {
              backgroundColor: appColors.incidental["000"],
            },

            "&.disabled": {
              color: appColors.incidental["000"] + " !important",
              background: appColors.grey + " !important",
              cursor: "not-allowed",
              boxShadow: "unset !important",
              ".button-icon": {
                backgroundColor: appColors.incidental["000"] + " !important",
              },
            },

            "&.loading": {
              color: appColors.incidental["000"],
              cursor: "wait",
              ">#loader": {
                color: appColors.incidental["000"],
              },
              ".button-icon": {
                backgroundColor: appColors.incidental["000"],
              },
            },

            "&:hover, &:active, &.loading": {
              backgroundColor: appColors.secondary.dark,
            },

            "&.PrimaryDarkBG": {
              color: appColors.primary,
              backgroundColor: appColors.incidental["000"],
              ".button-icon": {
                backgroundColor: appColors.primary,
              },
              "&:hover, &:active, &.loading": {
                color: appColors.incidental["000"],
                backgroundColor: appColors.support60.light + " !important",
                ".button-icon": {
                  backgroundColor: appColors.incidental["000"],
                },
              },

              "&.disabled": {
                color: appColors.incidental["000"] + " !important",
                background: appColors.grey + " !important",
                cursor: "not-allowed",
                boxShadow: "unset !important",

                ".button-icon": {
                  backgroundColor: appColors.incidental["000"] + " !important",
                },
              },
            },

            "&.Critical": {
              color: appColors.incidental["000"],
              backgroundColor: appColors.ui_rag["Red.400"],
              ".button-icon": {
                backgroundColor: appColors.incidental["000"],
              },
            },
          },
          outlined: {
            color: appColors.primary,
            borderColor: appColors.primary,

            ".button-icon": {
              backgroundColor: appColors.primary,
            },

            "&.disabled": {
              color: appColors.grey + " !important",
              borderColor: appColors.grey + " !important",
              backgroundColor: "transparent !important",
              cursor: "not-allowed",
              boxShadow: "unset !important",
              ".button-icon": {
                backgroundColor: appColors.grey + " !important",
              },
            },

            "&.loading": {
              borderColor: appColors.tertiary.dark,
              cursor: "wait",
              ">#loader": {
                color: appColors.tertiary.dark,
              },
              ".button-icon": {
                backgroundColor: appColors.tertiary.dark,
              },
            },

            "&:hover, &:active": {
              borderColor: appColors.tertiary.dark,
              backgroundColor: appColors.tertiary.transparentLight,
              ".button-icon": {
                backgroundColor: appColors.tertiary.dark,
              },
            },

            "&.SecondaryDarkBG": {
              color: appColors.incidental["000"],
              borderColor: appColors.incidental["000"],
              ".button-icon": {
                backgroundColor: appColors.incidental["000"],
              },
              "&:hover, &:active": {
                color: appColors.primary,
                borderColor: appColors.incidental["000"],
                backgroundColor: appColors.support80.light,
                ".button-icon": {
                  backgroundColor: appColors.primary,
                },
              },

              "&.loading": {
                borderColor: appColors.incidental["000"],
                cursor: "wait",
                ">#loader": {
                  color: appColors.incidental["000"],
                },
                ".button-icon": {
                  backgroundColor: appColors.incidental["000"],
                },
              },

              "&.disabled": {
                color: appColors.grey + " !important",
                borderColor: appColors.grey + " !important",
                backgroundColor: "transparent !important",
                cursor: "not-allowed",
                boxShadow: "unset !important",
                ".button-icon": {
                  backgroundColor: appColors.grey + " !important",
                },
              },
            },
          },
          text: {
            padding: 0,
            minHeight: "unset",
            textTransform: "none",
          },
        },
      },
      MuiSelect: {
        styleOverrides: { icon: { fill: appColors.primary, fontSize: 32 } },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.125rem",
            boxShadow: `0 4px 8px rgb(0,0,0,0.2)`,
            border: `1px solid ${appColors.primary}`,

            a: {
              color: "#fff",
              textUnderlineOffset: 6,
            },
          },
          tooltipArrow: {
            backgroundColor: appColors.primary,
            borderRadius: "4px",
            color: "#fff",
            padding: 0,
          },
          arrow: {
            fontSize: 30,
            filter: "drop-shadow(0px -2px 1px rgb(0,0,0,0.03))",
            "&:before": {
              backgroundColor: appColors.primary,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "45px !important",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: "black",
            "&:hover": {
              backgroundColor: appColors.support80.transparentLight,
              color: appColors.primary,
              "*": {
                color: appColors.primary,
              },
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: appColors.support80.transparentLight,
              color: appColors.primary,
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            margin: "9px",
            padding: "3px",
            "&:focus, &:hover": {
              borderWidth: 2,
              "& svg": {
                outline: `2px solid ${appColors.ui_rag["Amber.400"]} !important`,
                "& rect": {
                  stroke: "black !important",
                  strokeWidth: "4px !important",
                },
              },
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textUnderlineOffset: "2px",
            "&:hover": {
              textDecoration: "underline",
            },
            "&:disabled": {
              color: appColors.essential[500],
              cursor: "not-allowed",
              svg: {
                fill: appColors.essential[500],
              },
              "&:hover": {
                color: appColors.essential[500],
              },
            },
          },
        },
      },
    },
  });
};
