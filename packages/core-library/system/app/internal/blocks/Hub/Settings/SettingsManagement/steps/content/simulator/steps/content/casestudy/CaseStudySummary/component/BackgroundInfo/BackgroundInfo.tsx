import { Box, Typography } from "@mui/material";
import { useSanitizedInputs } from "../../../../../../../../../../../../../../../../hooks/useSanitizeInputs";
import { SectionContent } from "../../../../../../../../../../../../../types";
import { useStyle } from "../../../../../../../../../../../../../../../../hooks";

export const BackgroundInfo: React.FC<{ content: SectionContent[] }> = ({
  content,
}) => {
  const { purifyInputs } = useSanitizedInputs({
    config: { RETURN_TRUSTED_TYPE: true },
  });

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
            <Typography
              sx={wordWrap}
              dangerouslySetInnerHTML={{
                __html: purifyInputs(data.seqContent) as TrustedHTML,
              }}
            ></Typography>
          </Box>
        ))}
    </Box>
  );
};
