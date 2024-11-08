import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { CSSProperties } from "react";

export type ImageManagementCategoryTypes = "Logo" | "Images" | "Web Customer";

export type categoryToDisplayType = {
  category: ImageManagementCategoryTypes;
  logoContainer?: string | StaticImport;
  bgColorContainer?: string;
  logoSxContainer: CSSProperties | undefined;
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
};

interface ImageType {
  id: number;
  label: string;
  image: string;
}

export interface ImageBundleType {
  type: "lottie" | "image";
  label: string;
  compiledAssets: ImageType[];
  IsDeletingMultiple: boolean;
  handleMultipleSelection: (value: number) => void;
  isEditable: boolean;
  handleSingleDeletion: (value: number) => void;
}

export interface DynamicImagesTypes {
  IsFixedCount: boolean;
  setShowGallery: (value: boolean) => void;
}

export interface SidebarType {
  selectedCard: "Image Gallery" | "Web Customer" | "Web Backoffice";
  imageCollection: ImageCollectionType[] | undefined;
  selectedMenu: number;
  setSelectedMenu: (value: number) => void;
}

export interface CategoryCardItemType {
  arrayItem: List[];
  type: string;
  fixedImageCount: boolean;
  setShowGallery: (value: boolean) => void;
}

export type CardDataType = {
  title: string;
  bgColor: string;
  imgSrc: string | StaticImport;
  imgAlt: string;
  imgStyle?: React.CSSProperties; // Optional, as imgStyle might not be present in all objects
};

export interface ImageCollectionType {
  id: number;
  label: string;
  icon: string;
  path?: string;
  children: Content[];
}

interface Content {
  category: string;
  fixedCount: boolean;
  children: List[];
}

export interface List {
  label: string;
  image: string;
}

export interface LogoSelectProps {
  image: string | StaticImport;
  bgColor: string;
  imgStyle: CSSProperties | undefined;
}

export type AssetCardDisplayType = {
  handleLogoSelect: (value: LogoSelectProps) => void;
  handleCardDialog: (value: string) => void;
};
