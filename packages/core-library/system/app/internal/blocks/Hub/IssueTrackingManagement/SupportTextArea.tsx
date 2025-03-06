import { styled } from "@mui/material/styles";
import React, { forwardRef, useRef, useImperativeHandle } from "react";

export const SupportTextArea = React.memo(
  forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { "data-testid"?: string }>(
    ({ "data-testid": testId, ...props }, ref) => {
      const internalRef = useRef<HTMLTextAreaElement>(null);

      useImperativeHandle(ref, () => internalRef.current!);

      const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (internalRef.current) {
          internalRef.current.scrollTop = 0;
        }
        if (props.onChange) {
          props.onChange(event);
        }
      };

      const StyledTextarea = styled("textarea")({
        width: "100%",
        height: "120px",
        maxHeight: "120px",
        padding: "10px",
        fontSize: "12px",
        fontFamily: '"Poppins", sans-serif',
        borderRadius: "5px",
        border: "1px solid #3B00868A",
        backgroundColor: "#F2F2F2",
        color: "#3B0086",
        outline: "none",
        resize: "none",
        overflowY: "auto",
        "&:focus": {
          border: "1px solid #3B00868A",
          boxShadow: "0px 0px 6px rgba(123, 92, 159, 0.6)",
        },
        "&::placeholder": {
          color: "#3B0086",
          opacity: 2,
        },
        "&::-webkit-scrollbar": {
          width: "8px",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#d9d3db",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#8F6FB7",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#7A5C9F",
        },
      });

      return (
        <StyledTextarea
          key="support-text-area"
          ref={internalRef}
          data-testid={testId}
          onChange={handleChange}
          {...props}
        />
      );
    })
);