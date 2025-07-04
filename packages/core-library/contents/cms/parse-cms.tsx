import { HeaderTitleBlock, TextBlock, PanelBlock } from "../../components";
import { appColorsFromPrimary } from "../theme/theme";
import { Typography } from "@mui/material";
import { CallToAction } from "../../types/common";
import {
  CmsPage,
  PageContentValues,
  ThemeBackgroundColorSelection,
} from "../../types/page";
import { CmsTenant } from "../../types/tenant";

export const parseContent = (
  contents: PageContentValues[],
  page: CmsPage,
  tenant: CmsTenant | null,
  queryParams = {}
) => {
  return contents.map((content) => {
    const type = (content?.elements?.formKey?.value || content?.type).trim();
    const elements = content?.elements;

    /* all blocks should go here.. */
    switch (type) {
      case "Panel": {
        return (
          <PanelBlock
            id={type}
            page={page}
            tenant={tenant}
            header={elements.header}
            layout={elements.layout}
            columns={elements.columns}
            reverseStacking={elements.reverseStacking}
            panelKey={elements.panelKey?.value}
          />
        );
      }
      case "authentication_form": {
        return (
          // <LoginFormBlock
          //   id={type}
          //   parameters={content?.elements?.parameters}
          // />
          <></>
        );
      }
      case "account_setup_form": {
        // return (
        //   // <AccountSetupBlock
        //   //   // id={type}
        //   //   // parameters={content?.elements?.parameters}
        //   // />
        // );
      }
      case "Content HTML block": {
        return (
          <TextBlock
            id={elements.contentBlockKey?.value ?? type}
            header={elements.header?.value}
            blockHeader={elements.blockHeader}
            subHeader={elements.subHeader?.value}
            backgroundColor={parseBackgroundColor(
              tenant,
              content.elements.themeColorForBackround
            )}
            insideHeroBlock={isHeroBlockContent(elements, page)}
            html={elements?.content?.value}
          />
        );
      }
      default:
        return (
          <Typography data-testid="default-component" id={type}>
            {content?.elements?.panelNameLabel?.value}
          </Typography>
        );
    }
  });
};
const isHeroBlockContent = (
  elements: PageContentValues["elements"],
  page: CmsPage
) => {
  return (
    page.heroBlocks?.values?.[0]?.elements?.heroContent?.value?.elements?.header
      ?.value === elements.header?.value
  );
};
export const parseButtonProps = (
  element: Partial<NonNullable<PageContentValues["elements"]>>
) => {
  return {
    customActionKey: element.customActionKey?.value,
    linkKey: element.pageKey?.value,
    link: element.buttonLink?.value,
    type: element.buttonType?.value?.selection,
    text: element.buttonText?.value,
    icon: element.icon,
    iconName: element.iconName?.value,
    rightSideIcon: element.rightSideIcon?.value,
    notification: element.notification?.value,
    reuseUrlParameters: element.reuseUrlParameters?.value,
    openInTheNewTab: element.openInTheNewTab?.value,
    widthPercentage: element.widthPercentage?.value,
    disabledReason: element.disabledReason?.value,
    analyticsKey: element.analyticsKey?.value,
    fastForwardComparisonPageKey: element.fastForwardComparisonPageKey?.value,
    fastForwardRedirectPageKey: element.fastForwardRedirectPageKey?.value,
    postRequestUrl: element.postToEndpoint?.value,
    largeIcon: element.largeIcon?.value,
  };
};

export const callToActionValuesToCmsButtons = (
  buttons: CallToAction["values"]
) => {
  return buttons?.map((button) => ({
    link: button.elements?.buttonLink?.value,
    linkKey: button.elements?.pageKey?.value,
    text: button.elements?.buttonText?.value,
    key: button.elements?.buttonKey?.value,
    type: button.elements?.buttonType?.value?.selection,
    pageKey: button.elements?.pageKey?.value,
    disabledReason: button.elements?.disabledReason?.value,
    customActionKey: button.elements?.customActionKey?.value,
  }));
};

export const parseBackgroundColor = (
  tenant?: CmsTenant | null,
  themeColorSelection?: ThemeBackgroundColorSelection | null
) => {
  const primaryColor = tenant?.primaryColor.value;
  const selection = themeColorSelection?.value?.selection;
  if (!primaryColor) {
    return;
  }

  const appColors = appColorsFromPrimary(primaryColor);

  switch (selection) {
    case "Primary":
      return appColors.primary;
    case "Secondary":
      return appColors.secondary.transparentLight;
    case "Tertiary":
      return appColors.tertiary.transparentLight;
    case "Support60":
      return appColors.support60.transparentLight;
    case "Support80":
      return appColors.support80.transparentLight;
    default:
      return undefined;
  }
};
