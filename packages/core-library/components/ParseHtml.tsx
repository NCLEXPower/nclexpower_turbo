import { Box, BoxProps, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { Element } from "domhandler";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { Parser } from "simple-text-parser";
import { useTokenEnrichedValue } from "../contents/cms/inject-tokens";
import { useRouter } from "../core/router";

type EventTarget = React.MouseEvent<HTMLDivElement, MouseEvent>["target"];

interface HTMLBoxEvent extends React.MouseEvent<HTMLDivElement, MouseEvent> {
  target: EventTarget & { tagName: string; href: string; target: string };
}

interface Props extends Omit<BoxProps, "dangerouslySetInnerHTML" | "onClick"> {
  html: string;
  isWithMargin?: boolean;
  smallerFonts?: boolean;
  disableEmptyLineRule?: boolean;
  disableOverrideLinkColors?: boolean;
  alternateTableStyle?: string;
}

const parser = new Parser();

parser.addRule(/<h\d>(.+)<\/h\d>/gi, (text: string) => ({
  type: "text",
  text: text.replace(/<h\d>(.+)<\/h\d>/gi, "<h2>$1</h2>"),
}));

parser.addRule(/<li>(?:(?!<\/li>).)*?\[\[.*?\]\](?:(?!<\/li>).)*?<\/li>/g, ""); // remove li elements which values not injected

parser.addRule(/<li>\s*<\/li>/g, ""); // remove empty li elements

parser.addRule(/<p>\s<\/p>/gi, ""); // remove empty lines

const addColorSwapRule = (color: string = "#000") =>
  parser.addRule(
    /color:\s?(#FF0000|rgb\(\s?255,\s?0,\s?0\s?\))/gi,
    () => `color: ${color}`
  );

export const ParsedHtml: React.FC<Props> = ({
  html,
  isWithMargin = true,
  sx = {},
  smallerFonts = false,
  disableOverrideLinkColors = false,
  disableEmptyLineRule,
  fontSize,
  alternateTableStyle,
  ...props
}) => {
  const router = useRouter();
  const updatedHTML = parse(parser.render(fixImagesInHtml(html!)), {
    replace,
  } as HTMLReactParserOptions);
  const tableHasHeader = Boolean(
    (html.match(/<thead[\s\S]*?<\/thead>/g) ?? []).length
  );
  const isTransparentTableStyle = alternateTableStyle === "Transparent";
  const tableStyles = isTransparentTableStyle
    ? transparentTableStyles()
    : defaultTableStyles(tableHasHeader);

  return (
    <Box
      className="html-container"
      onClick={handleInnerLinkClick}
      sx={
        {
          ...textStyles(smallerFonts, disableOverrideLinkColors, fontSize),
          ...tableStyles,
          ...sx,
          "& p": { display: isWithMargin ? "block" : "inline" },
        } as SxProps<Theme>
      }
      {...props}
    >
      {updatedHTML}
    </Box>
  );
  function replace({ attribs }: Element) {
    if (!attribs) {
      return;
    }

    return null;
  }

  function handleInnerLinkClick(e: HTMLBoxEvent) {
    if (e.target.tagName !== "A") return;
    if (e.target.target !== "_blank") {
      e.preventDefault();
    }
    if (e.target.target === "_self") {
      router.push(new URL(e.target.href).pathname);
    }
  }
};

const fixImagesInHtml = (html: string) =>
  html.replace(
    /<img([^>]+)\ssrc=(['"])([^'"]+)\2/gi,
    `<img$1 src=$2${"http://localhost:5281/api"}/$3$2`
  );

const textStyles = (
  smallerFonts: boolean,
  disableOverrideLinkColors: boolean,
  fontSize: Props["fontSize"]
): SxProps<Theme> => ({
  display: "inline",
  fontSize: fontSize || ((theme) => theme.typography.body1.fontSize),
  lineHeight: (theme) => theme.typography.body1.lineHeight,
  wordWrap: "normal",
  "& h2": {
    fontWeight: "normal",
    fontSize:
      fontSize ||
      ((theme) =>
        (smallerFonts ? theme.typography.body1 : theme.typography.h2).fontSize),
    lineHeight: (theme) =>
      (smallerFonts ? theme.typography.body1 : theme.typography.h2).lineHeight,
    marginBlockStart: 0,
    marginBlockEnd: 6,
    "&:not(:first-of-type)": {
      marginBlockStart: 12,
    },
    "&:last-child": {
      marginBlockEnd: 0,
    },
    "&.info-message-header": {
      fontSize: "inherit",
      fontWeight: "bold",
    },
  },
  "& * + h2": {
    marginBlockStart: 12,
  },
  "& ul, li, p, p>span": {
    fontSize: fontSize || ((theme) => theme.typography.body1.fontSize),
    lineHeight: (theme) => theme.typography.body1.lineHeight,
    marginBlockStart: 0,
    "&:last-child": {
      marginBlockEnd: 0,
    },
  },
  "& li:not(:last-child)": {
    marginBlockEnd: 2,
  },
  "& span, pre": {
    fontSize: fontSize || ((theme) => theme.typography.body2.fontSize),
    lineHeight: (theme) => theme.typography.body2.lineHeight,
    marginBlockStart: 0,
  },
  "& caption": {
    fontSize: fontSize || ((theme) => theme.typography.caption.fontSize),
    lineHeight: (theme) => theme.typography.caption.lineHeight,
    marginBlockStart: 0,
  },
  "& button:not(.MuiTypography-body1)": {
    fontSize: fontSize || ((theme) => theme.typography.button.fontSize),
    lineHeight: (theme) => theme.typography.button.lineHeight,
    marginBlockStart: 0,
  },
  "& a": {
    fontSize: "inherit",
    whiteSpace: "break-spaces",
    "&:not(.MuiButton-contained, .MuiButton-outlined)": {
      color: disableOverrideLinkColors
        ? "inherit !important"
        : (theme) => theme.palette.primary.main + " !important",
    },
  },
  "& img": {
    maxWidth: "100%",
    height: "auto",
  },
  "& .eva-icon-inline": {
    marginBottom: -1.25,
  },
});

const defaultTableStyles = (hasHeader: boolean): SxProps<Theme> => ({
  table: {
    borderCollapse: "collapse",
    thead: {
      tr: {
        borderBottom: (theme) =>
          `1px solid ${theme.palette.appColors.incidental["075"]}`,
        color: (theme) => theme.palette.common.black,

        th: {
          paddingX: (theme) => `${theme.spacing(6)}!important`,
          paddingY: (theme) => `${theme.spacing(2)}!important`,
        },
      },
    },
    tbody: {
      "tr:nth-of-type(odd)": {
        backgroundColor: (theme) =>
          hasHeader
            ? theme.palette?.appColors?.support80.transparentLight
            : theme.palette.common.white,
      },
      "tr:nth-of-type(even)": {
        backgroundColor: (theme) =>
          hasHeader
            ? theme.palette.common.white
            : theme.palette.appColors.support80.transparentLight,
      },
      tr: {
        td: {
          paddingX: (theme) => `${theme.spacing(6)}!important`,
          paddingY: (theme) => `${theme.spacing(3)}!important`,
          borderBottom: (theme) =>
            `1px solid ${theme.palette.appColors.incidental["075"]}`,
        },
        th: {
          paddingX: (theme) => `${theme.spacing(6)}!important`,
          paddingY: (theme) => `${theme.spacing(3)}!important`,
          borderBottom: (theme) =>
            `1px solid ${theme.palette.appColors.incidental["075"]}`,
        },
        "&:hover": {
          backgroundColor: (theme) =>
            theme.palette.appColors.support60.transparentLight,
        },
        "&:active": {
          backgroundColor: (theme) => theme.palette.appColors.primary,
          td: {
            color: (theme) => theme.palette.common.white,
          },
          th: {
            color: (theme) => theme.palette.common.white,
          },
        },
      },
    },
  },
  "& table:not(:last-child)": {
    marginBlockEnd: 6,
  },
});

const transparentTableStyles = (): SxProps<Theme> => ({
  table: {
    borderCollapse: "collapse",
    thead: {
      tr: {
        th: {
          paddingY: (theme) => `${theme.spacing(2)}!important`,
        },
      },
    },
    tbody: {
      tr: {
        td: {
          alignContent: "flex-start",
          paddingY: (theme) => `${theme.spacing(3)}!important`,
        },
        "td:nth-of-type(odd)": {
          paddingRight: (theme) => `${theme.spacing(6)}!important`,
        },
        th: {
          paddingY: (theme) => `${theme.spacing(3)}!important`,
        },
        "th:nth-of-type(odd)": {
          paddingRight: (theme) => `${theme.spacing(6)}!important`,
        },
      },
    },
  },
  "& table:not(:last-child)": {
    marginBlockEnd: 6,
  },
});
