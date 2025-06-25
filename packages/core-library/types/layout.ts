import { ReactNode } from "react";

export type LayoutType = "guest" | "dashboard";

export interface LayoutComponentProps {
  children: ReactNode;
}

export type NextPageWithLayout<P = {}> = React.FC<P> & {
  layout?: LayoutType;
  auth?: {
    required: boolean;
    redirectTo?: string;
  };
};
