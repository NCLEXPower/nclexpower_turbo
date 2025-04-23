import React from "react";
import { StyledTextarea } from "./styles/style";

interface SupportTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  "data-testid"?: string;
}

export const SupportTextArea: React.FC<SupportTextAreaProps> = ({
  value,
  onChange,
  placeholder = "Enter notes...",
  "data-testid": testId,
}) => {
  return (
    <StyledTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data-testid={testId}
    />
  );
};