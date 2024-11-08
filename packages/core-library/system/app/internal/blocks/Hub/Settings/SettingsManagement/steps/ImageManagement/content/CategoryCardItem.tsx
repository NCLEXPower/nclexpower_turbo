import { CategoryCardItemType } from "../types/types";
import { Card } from "../../../../../../../../../../components";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { IconComponent } from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";

export const CategoryCardItem = ({
  arrayItem,
  type,
  fixedImageCount,
  setShowGallery,
}: CategoryCardItemType) => {
  switch (type) {
    case "CardItem":
      return (
        arrayItem.length > 0 &&
        arrayItem.map((item, index) => (
          <Card
            sx={{
              minWidth: "150px",
              borderRadius: "10px",
              boxShadow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            key={index}
          >
            <Box>
              <Image height={150} src={item.image} alt={item.image} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
                gap: "10px",
              }}
            >
              <Typography variant="subtitle2" lineHeight="15px">
                {item.label}
              </Typography>
              <Typography variant="subtitle2" lineHeight="15px">
                {fixedImageCount ? (
                  <Box onClick={() => setShowGallery(true)}>
                    {IconComponent("FindReplaceIcon", false, "warning")}
                  </Box>
                ) : (
                  IconComponent("DeleteIcon", false, "error")
                )}
              </Typography>
            </Box>
          </Card>
        ))
      );
    default:
      return null;
  }
};
