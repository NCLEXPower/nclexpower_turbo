import React from "react";
import {
  Dashboard as DashboardIcon,
  Feed as FeedIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  Source as SourceIcon,
  AccountCircle as AccountCircleIcon,
  ContactPhone as ContactPhoneIcon,
} from "@mui/icons-material";
import { NavigationType } from "../../types/navigation";
import { useAuthNavigation } from "../../core/hooks/useAuthNavigation";
import { useMenu } from "./hooks/useMenu";
import { useRouter } from "../../core";
import { AuthorizedRoutes, MenuItems } from "../../api/types";

/**
 * @deprecated menus should be consumed dynamically. This utilization will be deprecated.
 * Effective Date : Today 9/9/2024
 */
const AuthenticatedMenu: NavigationType[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: <DashboardIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 1,
        label: "Performance",
        path: "/",
      },
    ],
  },
  {
    id: 2,
    label: "Manage Exams",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 2,
        label: "Question Management",
        path: "/qm/manage-questions",
      },
    ],
  },
  {
    id: 3,
    label: "Category Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 4,
        label: "Create Category",
        path: "/category/create-category",
      },
      {
        id: 5,
        label: "Create Regular Q-Type",
        path: "/category/create-rq-type",
      },
    ],
  },
  {
    id: 4,
    label: "Product Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 5,
        label: "Create/List Product",
        path: "/products/create-product",
      },
      {
        id: 6,
        label: "Create/List Pricing",
        path: "/products/create-pricing",
      },
    ],
  },
  {
    id: 3,
    label: "Content Management",
    icon: <FeedIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 4,
        label: "Content Approval",
        path: "/acam/question-approval",
      },
    ],
  },
  {
    id: 5,
    label: "Results",
    path: "/",
    icon: <SourceIcon color="primary" fontSize="small" />,
  },
  {
    id: 6,
    label: "Manage Users",
    icon: <PersonIcon color="primary" fontSize="small" />,
    children: [
      {
        id: 7,
        label: "Create Internal User",
        path: "/mu/manage-users",
      },
      {
        id: 8,
        label: "Manage Internal User",
        path: "/mu/view-users",
      },
    ],
  },
  {
    id: 7,
    label: "Contact Us Management",
    icon: <ContactPhoneIcon color="primary" fontSize="small" />,
    path: "/contactus/contact-us-view",
  },
  {
    id: 9,
    label: "Settings",
    path: "/settings/internal-application-settings",
    icon: <SettingsIcon color="primary" />,
  },

  {
    id: 10,
    label: "Reports",
    path: "/reports/reported-issues",
    icon: <ReportIcon color="primary" />,
  },
];

const UnauthencatedMenu: NavigationType[] = [
  {
    id: 1,
    label: "Home",
    path: "/home",
  },
  {
    id: 2,
    label: "About Us",
    path: "/about-us",
  },
  {
    id: 3,
    label: "Contact Us",
    path: "/contact-us",
  },
  {
    id: 4,
    label: "Login",
    path: "/login",
  },
];

export type PrepareMenu = {
  isAuthenticated: boolean;
  menus: MenuItems[];
  loading: boolean;
};

export const normalizePath = (path: string) =>
  path.replace(/\/+$/, "").toLowerCase();

export const pathExists = (
  routes: AuthorizedRoutes[],
  path: string
): boolean => {
  const basePath = "/hub";

  const findPath = (items: AuthorizedRoutes[]): boolean => {
    for (const item of items) {
      const fullPath = normalizePath(`${basePath}${item.value}`);
      if (fullPath === normalizePath(path)) {
        return true;
      }
    }
    return false;
  };

  return findPath(routes);
};

export const prepareMenus = (props: PrepareMenu) => {
  const { isAuthenticated, loading, menus } = props;

  if (isAuthenticated && !loading) {
    return useAuthNavigation(menus);
  }
  return [];
};
