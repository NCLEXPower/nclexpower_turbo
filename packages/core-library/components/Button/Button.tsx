import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Stack,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useCustomAction } from "../../hooks";
import { ButtonType } from "./button-type";
import { Box } from "@mui/material";
import { FormHelperText } from "../Textfield/TextField";
import { mixpanelTrackButtonClick } from "../../core";

export interface ButtonProps
  extends Pick<
    MuiButtonProps,
    | "className"
    | "children"
    | "fullWidth"
    | "onClick"
    | "sx"
    | "onFocusVisible"
    | "tabIndex"
    | "variant"
    | "role"
    | "onKeyDown"
    | "size"
  > {
  width?: number | string;
  id?: string;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  type?: ButtonType;
  buttonActionType?: MuiButtonProps["type"];
  text?: string;
  customActionKey?: string;
  resetTime?: number;
  error?: boolean;
  helperText?: string;
  "data-testid"?: string;
  endIcon?: MuiButtonProps["endIcon"];
  analyticsKey?: string; // can get from the backend or generic
}

const LOADER_SIZE = 20;

const FormattedTime: React.FC<{ seconds: number }> = ({ seconds }) => {
  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = `${seconds % 60}`.padStart(2, "0");
  const formatted = `${minutes}:${formattedSeconds}`;
  const canResend = seconds <= 0;

  return (
    <FormHelperText
      sx={{
        fontWeight: 560,
        fontSize: "1rem",
        mt: 1,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      {!canResend && `Can resend after : ${formatted}`}
    </FormHelperText>
  );
};

const HelperText: React.FC<
  Pick<ButtonProps, "error" | "helperText"> & {
    seconds: number;
  }
> = ({ seconds, helperText, error }) => {
  return (
    <Stack>
      <FormHelperText error={error}>{helperText}</FormHelperText>
      <FormattedTime seconds={seconds} />
    </Stack>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      text,
      loading,
      disabled,
      className,
      width,
      fullWidth,
      sx,
      id,
      type,
      customActionKey,
      onClick,
      href,
      buttonActionType,
      resetTime,
      endIcon,
      analyticsKey,
      ...props
    },
    ref
  ) => {
    const action = useCustomAction({
      actionKey: customActionKey,
    });
    const [remainingTime, setRemainingTime] = useState<number>(resetTime ?? 0);
    const isLoading = loading || action?.loading;
    const isDisabled = disabled || action?.disabled;
    const isDisabledOrLoading = isLoading || isDisabled;
    const disabledReasonId = `disabledReason-${Math.random().toString(36).substring(2, 15)}`;
    const role = !href ? { role: "button" } : {};

    useEffect(() => {
      if (resetTime !== undefined) {
        setRemainingTime(resetTime);
      }
    }, [resetTime]);

    useEffect(() => {
      let timer: ReturnType<typeof setInterval> | null = null;
      if (remainingTime > 0) {
        timer = setInterval(() => {
          setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
      }

      return () => {
        if (timer) clearInterval(timer);
      };
    }, [remainingTime]);

    const button = (
      <>
        <MuiButton
          ref={ref}
          id={id}
          custom-action-key={customActionKey}
          data-testid={props["data-testid"]}
          analytics-key={analyticsKey}
          className={[
            className,
            type,
            isLoading ? "loading" : null,
            isDisabledOrLoading ? "disabled" : null,
          ]
            .filter(Boolean)
            .join(" ")}
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            width: fullWidth ? "100%" : width,
            minWidth: 140,
            height: "fit-content",
            borderRadius: 0,
            "& #loader": {
              position: "absolute",
              marginY: "auto",
              top: `calc(50% - ${LOADER_SIZE / 2}px)`,
              marginLeft: 1,
            },
            ...sx,
          }}
          fullWidth={fullWidth}
          disabled={disabled}
          aria-label={text}
          aria-disabled={isDisabledOrLoading}
          disableRipple={isDisabledOrLoading}
          aria-describedby={disabledReasonId}
          variant={variantFromType(type)}
          onClick={handleClick}
          href={href}
          type={buttonActionType}
          {...role}
          {...props}
          endIcon={endIcon}
        >
          {remainingTime > 0 ? (
            <HelperText
              helperText="You've reached maximum sent link"
              seconds={remainingTime}
            />
          ) : (
            children || text || "Continue"
          )}
          {isLoading && (
            <Box>
              <CircularProgress
                size={LOADER_SIZE}
                color="inherit"
                id="loader"
                aria-live="assertive"
                thickness={5}
              />
            </Box>
          )}
        </MuiButton>
        {action?.node}
      </>
    );
    return button;

    async function handleClick(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
      if (isDisabledOrLoading) {
        e.preventDefault();
        return;
      }

      if (analyticsKey) {
        mixpanelTrackButtonClick({
          Category: analyticsKey,
        });
      }

      if (action?.execute || onClick) {
        e.preventDefault();
        action && (await action.execute());
        !action?.disableFurtherActions && onClick && onClick(e);
      }
    }
  }
);

const variantFromType = (
  type: ButtonProps["type"]
): MuiButtonProps["variant"] => {
  switch (type) {
    case "Secondary":
    case "SecondaryDarkBG":
      return "outlined";
    case "Primary":
    case "PrimaryDarkBG":
    case "Critical":
    case "Success":
    default:
      return "contained";
  }
};
