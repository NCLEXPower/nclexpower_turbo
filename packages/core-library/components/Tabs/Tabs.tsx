import { Box, Collapse, Grid, SxProps } from "@mui/material";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { TabButton } from "../Button/TabButton";
import { useResolution } from "../../hooks";
import { TabsItem } from "../../core/utils/contants/tabs-item";

interface CustomStyleProps {
  background?: string;
  selectedColor?: string;
  defaultColor?: string;
  borderBottom?: string;
  defaultBorderBottom?: string;
}
interface Props {
  id?: string;
  tabsItem: TabsItem[];
  justifyContent?: "flex-start" | "center" | "flex-end";
  width?: string | number;
  selectedTabIndex?: (value: number) => void;
  customStyle?: CustomStyleProps;
  tabBtnSx?: SxProps;
  btnSpacing?: number;
  separateIndex?: number;
  indentBtn?: number;
  contentPaddingTop?: number;
}

export const Tabs: React.FC<Props> = ({
  id,
  tabsItem,
  justifyContent,
  width,
  selectedTabIndex,
  customStyle,
  tabBtnSx,
  btnSpacing = 3,
  separateIndex,
  indentBtn,
  contentPaddingTop,
}) => {
  const { isMobile } = useResolution();
  const [selected, setSelected] = useState<number | null>(1);
  const tabs = tabsHeader(tabsItem);
  const selectedTab = tabs.find((tab) => tab.id === selected);
  const tabsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (selected !== null && selectedTabIndex) {
      selectedTabIndex(selected);
    }
  }, [selected, selectedTabIndex]);

  return (
    <Grid container spacing={12}>
      {!isMobile && (
        <Grid
          container
          item
          xs={12}
          justifyContent={justifyContent}
          spacing={btnSpacing}
        >
          {tabs.map((tab, index) => (
            <Grid item key={tab.id}>
              <TabButton
                width={width}
                ref={(el) => {
                  tabsRef.current[tab.id] = el!;
                }}
                id={`tab-${index + 1}`}
                active={selected === tab.id}
                data-href={`#tab-section-${index + 1}`}
                sx={{
                  ...(tabBtnSx && tabBtnSx),
                  "&:focus": {
                    outline: "none !important",
                    borderBottom:
                      selected === tab.id
                        ? customStyle?.borderBottom
                        : customStyle?.defaultBorderBottom,
                  },
                  "&:hover": {
                    background:
                      selected === tab.id ? customStyle?.background : "default",
                    boxShadow: "none",
                  },
                  width: "auto",
                  background:
                    selected === tab.id ? customStyle?.background : "default",
                  border: "none",
                  color:
                    selected === tab.id
                      ? customStyle?.selectedColor
                      : customStyle?.defaultColor || "default",
                  borderBottom:
                    selected === tab.id
                      ? customStyle?.borderBottom
                      : customStyle?.defaultBorderBottom,
                  marginLeft: tab.id !== 1 ? "-1px" : "unset",
                  px: 2,
                  boxShadow: "none",
                  ...(index === separateIndex && { marginRight: "40px" }),
                  ...(index === 0 && { marginLeft: indentBtn }),
                }}
                onClick={(e) => handleSelected(e, tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                data-testid={`tab-${tab.id}-button`}
              >
                {tab.title}
              </TabButton>
            </Grid>
          ))}
        </Grid>
      )}
      {isMobile ? (
        <Grid item xs={12}>
          <Box>
            {tabs.map((tab) => (
              <Box key={tab.id} mb={4}>
                <TabButton
                  active={selected === tab.id}
                  onClick={() =>
                    setSelected((prev) => (prev === tab.id ? null : tab.id))
                  }
                  sx={{
                    marginRight: "20px",
                    "&:focus": {
                      outline: "none !important",
                      boxShadow: "none",
                      borderBottom:
                        selected === tab.id
                          ? customStyle?.borderBottom
                          : customStyle?.defaultBorderBottom,
                    },
                    "&:hover": {
                      background:
                        selected === tab.id
                          ? customStyle?.background
                          : "default",
                      boxShadow: "none",
                    },
                    width: "100%",
                    background:
                      selected === tab.id ? customStyle?.background : "default",
                    border: "none",
                    color:
                      selected === tab.id
                        ? customStyle?.selectedColor
                        : customStyle?.defaultColor || "default",
                    borderBottom:
                      selected === tab.id ? customStyle?.borderBottom : "none",
                    mb: 4,
                    boxShadow: "none",
                  }}
                >
                  {tab.title}
                </TabButton>
                <Collapse in={selected === tab.id} timeout="auto" unmountOnExit>
                  <Box>{tab.content}</Box>
                </Collapse>
              </Box>
            ))}
          </Box>
        </Grid>
      ) : (
        selectedTab && (
          <Grid item xs={12} style={{ paddingTop: contentPaddingTop }}>
            {selectedTab.content}
          </Grid>
        )
      )}
    </Grid>
  );

  function selectedTabId(id: number) {
    return `tab-section-${tabs.findIndex((tab) => tab.id === id) + 1}`;
  }

  function handleSelected(
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
    id: number
  ) {
    e?.preventDefault();
    setSelected(id);
    tabsRef?.current[id]?.focus();

    const sectionId = tabsRef.current[id]
      ?.getAttribute("data-href")
      ?.substring(1);
    if (sectionId) {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, id: number) {
    const tabsLength = tabs.length;

    switch (e.code) {
      case "ArrowLeft":
        if (id > 1) {
          handleSelected(e, id - 1);
        }
        break;
      case "ArrowRight":
        if (id < tabsLength) {
          handleSelected(e, id + 1);
        }
        break;
      default:
        break;
    }
  }
};

const tabsHeader = (
  tabs: TabsItem[]
): { id: number; title: string; content?: ReactNode | ReactElement }[] =>
  tabs.map((tab, index) => ({
    id: index + 1,
    title: tab.title ?? "",
    content: tab.content,
  }));
