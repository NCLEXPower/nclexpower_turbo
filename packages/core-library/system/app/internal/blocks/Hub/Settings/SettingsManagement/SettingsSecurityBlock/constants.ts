import { PasswordAndSecurityItem } from "../types";

export const passwordAndSecurityItems: PasswordAndSecurityItem[] = [
  {
    id: 1,
    label: "Change Password",
    icon: "lock-outline",
    isBtn: true,
    btnLabel: "Update",
  },
  {
    id: 2,
    label: "Two-Factor Authentication",
    icon: "shield-outline",
    isBtn: false,
  },
  {
    id: 3,
    label: "Authentication App",
    subLabel: "Google auth app",
    isBtn: true,
    btnLabel: "Setup",
  },
  {
    id: 4,
    label: "Primary Email",
    subLabel: "E-mail used to send notifications",
    isBtn: true,
    btnLabel: "Setup",
  },
];
