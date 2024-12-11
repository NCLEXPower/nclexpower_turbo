import { Box, Typography } from "@mui/material";
import { SectionContent } from "../../../../../../../../../../../../../types";
import { useStyle } from "../../../../../../../../../../../../../../../../hooks";
import { ParsedHtml } from "../../../../../../../../../../../../../../../../components";

export const BackgroundInfo: React.FC<{ content: SectionContent[] }> = ({
  content,
}) => {
  const { wordWrap } = useStyle();

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="24px"
      border="1px solid #0C225C"
      marginTop="-48px"
      height="512px"
      overflow="auto"
      borderRadius="5px"
    >
      {content.length > 0 &&
        content.map((data, index) => (
          <Box key={index} paddingBottom="14px">
            <Typography fontSize="16px" color="#999999" fontWeight="700">
              {`SEQUENCE NO. ${data.seqNum}`}
            </Typography>
            <Typography sx={wordWrap}>
              <ParsedHtml html={data.seqContent} />
            </Typography>
          </Box>
        ))}
    </Box>
  );
};
