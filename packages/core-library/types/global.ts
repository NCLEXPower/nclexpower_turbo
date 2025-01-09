/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  BooleanValue,
  ButtonElements,
  CallToAction,
  DialogElement,
  NumberValue,
  SelectionValue,
  StringValue,
} from "./common";
import { PanelListItem } from "./page";

export interface CmsGlobals {
  buttons?: ButtonsEntity[] | null;
  tooltips?: TooltipsEntity[] | null;
  labels?: LabelsEntity[] | null;
  errors?: ErrorsEntity[] | null;
  messages?: MessagesEntity[] | null;
  modals?: ModalsEntity[] | null;
  dialogs?: DialogElement["value"][] | null;
  contentHtmlBlocks?: ContentBlockEntity[] | null;
  classifiers?: ClassifierEntity[] | null;
  icons?: IconsEntity[] | null;
}

export type PreloadedGlobals = Pick<CmsGlobals, "labels">;
interface ClassifierEntity {
  elements: {
    classifierKey?: StringValue;
    classifierItem: { values: { key: StringValue; value: StringValue }[] };
    assetItems: {
      values: {
        key: StringValue;
        value: {
          url: string;
        };
      }[];
    };
  };
  type: "Classifier";
}

interface ModalsEntity {
  elements: {
    header: StringValue;
    linkText: StringValue;
    text: StringValue;
    callToAction: CallToAction;
    modalInformationKey: StringValue;
    showInAlternateStyle: BooleanValue;
    panel: { value: PanelListItem };
  };
  type: string;
}

interface ButtonsEntity {
  elements: ButtonElements;
  type: string;
}

interface TooltipsEntity {
  elements: {
    contentText: StringValue;
    headerText: StringValue;
    linkText: StringValue;
    tooltipKey: StringValue;
  };
  type: string;
}

interface LabelsEntity {
  elements: {
    labelKey: StringValue;
    labelText: StringValue;
    linkTarget: StringValue;
  };
  type: string;
}

interface ErrorsEntity {
  elements?: {
    alternateTexts: StringValue;
    errorKey: StringValue;
    text: StringValue;
  };
  type: string;
}

interface MessagesEntity {
  elements: {
    text: StringValue;
    header: StringValue;
    type: SelectionValue;
    messageKey: StringValue;
    callToAction: CallToAction;
  };
  type: string;
}

interface ContentBlockEntity {
  elements: {
    content: StringValue;
    contentBlockKey: StringValue;
    header: StringValue;
    headerLink: StringValue;
    subHeader?: StringValue;
    themeColorForBackground: StringValue;
  };
  type: string;
}

interface IconsEntity {
  elements: {
    iconKey: StringValue;
    iconName: StringValue;
    width: NumberValue;
    height: NumberValue;
    color: StringValue;
    svgData?: StringValue;
  };
  type: string;
}

interface ItemProp {
  label: string;
  path: string;
}
interface ColumnProp {
  items: ItemProp[];
}
interface InfoProp {
  address: string;
  phone: string;
  website: string;
}
export interface FooterProps {
  list: ColumnProp[];
  info: InfoProp;
}

export interface SliderConfigType {
  sliderConfig: {
    infinite: boolean;
    slidesToShow: number;
    slidesToScroll: number;
    autoplay: boolean;
    speed: number;
    autoplaySpeed: number;
    cssEase: string;
    fade?: boolean;
    arrows?: boolean;
  };
}

export interface SelectedProductType {
  pricingId: string;
  productId: string;
  amount: number;
  currency: string;
  productName: string;
  productDescription: string;
  programTitle: number;
  programType: number;
  inclusions: {
    features: string[];
  };
}
export interface ProductCardType {
  id: string;
  productName: string;
  productDescription: string;
  programType: number;
  programTitle: number;
  pricingId: string;
  pricing: {
    price: number;
    currency: string;
  };
  inclusions: {
    // temporarily placed just to addressed the ticket. https://app.clickup.com/t/86epzggjz
    features: string[];
  };
}

export type NavigationItemType = {
  id: number;
  label: string;
  path?: string;
  icon?: React.ReactNode;
  subItem?: NavigationItemType[];
};

export type IntentValueType = string | undefined | null;

export type MaintenanceSsr = {
  id: string;
  currentMaintenanceMode: string[];
  createdDate: string;
  updatedDate: string;
};

type MaintenanceMode = string[] | undefined;

export type ChatBotSsr = {
  mode: number,
  createdDate: string,
  updatedDate: string
}

export type SsrTypes = {
  MaintenanceStatus: { currentMaintenanceMode: MaintenanceMode };
  endpoints?: { endpoint: string; keyUrl: string }[];
  hasGoLive: boolean;
  ChatBotMode: ChatBotSsr
};
