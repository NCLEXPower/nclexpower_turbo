import { forwardRef } from "react";
import { Button, ButtonProps } from "./Button";

type Props = Omit<ButtonProps, "type">;

export const SecondaryButton = forwardRef<HTMLButtonElement, Props>(
  ({ ...props }, ref) => <Button {...props} type="Secondary" ref={ref} />
);
