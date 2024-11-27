import { forwardRef } from "react";
import { Button, ButtonProps } from "./Button";

type Props = Omit<ButtonProps, "variant">;

export const TextButton = forwardRef<HTMLButtonElement, Props>(
  ({ ...props }, ref) => <Button {...props} variant="text" ref={ref} />
);
