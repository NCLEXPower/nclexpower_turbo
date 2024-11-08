import { Box, Button } from "@mui/material";

interface Props {
  text: string;
  disabled?: boolean;
  onClick(): void;
}

export const ChatBotOption: React.FC<Props> = ({ text, disabled, onClick }) => (
  <Box alignSelf="flex-end" width="fit-content">
    <Button
      size="small"
      variant="outlined"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  </Box>
);
