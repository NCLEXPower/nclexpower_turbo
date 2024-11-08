import { Box } from "@mui/material";
import { EvaIcon } from "../EvaIcon";

interface Props {
  isOpen: boolean;
  className?: string;
  onOpen(): void;
  onClose(): void;
}

export const ChatBotToggleButton: React.FC<Props> = ({
  isOpen,
  className,
  onOpen,
  onClose,
}) => {
  return (
    <Box
      id="startVirtualAssistant"
      className={className}
      data-testid="chatbot-toggle-button"
      width={48}
      height={48}
      bgcolor="#0c225c"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius={isOpen ? "16px 0px 16px 16px" : "16px 16px 0px 16px"}
      sx={{
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s ease-out",
        boxShadow: (theme) => theme.shadows[3],
        svg: {
          fill: (theme) => theme.palette.primary.contrastText,
          height: 30,
          width: 30,
        },
        "&:hover": { backgroundColor: "#0c225c", transform: "scale(1.1)" },
      }}
      component="button"
      onClick={isOpen ? onClose : onOpen}
      aria-expanded={isOpen}
      aria-label="virtual-assitant-start"
    >
      <Box
        sx={{
          position: "relative",
          svg: { position: "absolute", left: -15, top: -15 },
          "#open-icon": { display: isOpen ? "none" : "flex" },
          "#close-icon": { display: isOpen ? "flex" : "none" },
        }}
      >
        <EvaIcon
          id="close-icon"
          name="arrow-ios-downward-outline"
          width={30}
          height={30}
          ariaHidden
        />
        <EvaIcon
          id="open-icon"
          name="question-mark-outline"
          width={30}
          height={30}
          ariaHidden
        />
      </Box>
    </Box>
  );
};
