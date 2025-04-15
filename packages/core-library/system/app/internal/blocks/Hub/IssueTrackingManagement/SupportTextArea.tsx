import React from "react";
import { StyledTextarea } from "./style";

interface SupportTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const SupportTextArea: React.FC<SupportTextAreaProps> = ({
  value,
  onChange,
  placeholder = "Enter notes...",
}) => {
  return (
    <StyledTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};