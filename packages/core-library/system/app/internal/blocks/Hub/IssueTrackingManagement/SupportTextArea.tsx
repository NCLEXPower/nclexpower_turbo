import { styled } from "@mui/material/styles";
import React, { useRef } from "react";

export const SupportTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
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

  return <StyledTextarea ref={textareaRef} onChange={handleChange} {...props} />;
};