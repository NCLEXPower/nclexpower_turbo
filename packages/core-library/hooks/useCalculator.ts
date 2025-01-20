import { useState, useEffect } from "react";

export const useCalculator = () => {
  const allowedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "/",
    "*",
    "-",
    "+",
    "Enter",
    "Delete",
    "Backspace",
  ];
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | string>("");
  const [pressedEqual, setPressedEqual] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isOperator = (value: string) => ["/", "*", "-", "+"].includes(value);

  const handleClick = (value: string) => {
    if (!modalOpen) return;
    if (value === "Enter" || value === "=") {
      handleEquals();
    } else if (pressedEqual && (value === "." || !isNaN(Number(value)))) {
      if (value !== "." || !input.includes(".")) {
        setInput(value);
        setPressedEqual(false);
      }
    } else if (isOperator(value) && isOperator(input.slice(-1))) {
      setInput((prevInput) => prevInput.slice(0, -1) + value);
    } else {
      setInput((prevInput) => prevInput + value);
      setPressedEqual(false);
    }
  };

  const handleClear = () => {
    if (!modalOpen) return;
    setInput("");
    setResult("");
    setPressedEqual(false);
  };

  const handleBack = () => {
    if (!modalOpen) return;
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleEquals = () => {
    if (!modalOpen) return;
    try {
      const sanitizedInput = input.replace(/[^0-9+\-*/().]/g, "");
      const result = eval(sanitizedInput);
      setResult(result.toString());
      setPressedEqual(true);
    } catch (error) {
      setResult("Error");
      setPressedEqual(false);
    }
  };

  useEffect(() => {
    if (pressedEqual) {
      setInput(result.toString());
    }
  }, [result]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!modalOpen) return;
      if (allowedKeys.includes(event.key) || event.key === "Enter") {
        event.preventDefault();
        if (event.key === "Delete") {
          handleClear();
        } else if (event.key === "Backspace") {
          handleBack();
        } else if (event.key === "Enter") {
          handleEquals();
        } else {
          handleClick(event.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleClick, handleClear, handleBack, handleEquals, modalOpen]);

  return {
    input,
    result,
    handleClick,
    handleClear,
    handleBack,
    setInput,
    setModalOpen,
  };
};
