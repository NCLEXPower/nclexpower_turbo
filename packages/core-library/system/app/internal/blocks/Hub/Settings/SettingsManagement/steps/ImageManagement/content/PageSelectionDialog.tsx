/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
/**
 * @params fixedImageCount is a boolean that conditionally renders the add image button
 * @returns A JSX component if enabled to allow user to dynamically add images
 */

import { Box, Typography } from "@mui/material";
import { WCGenericRouteWithImages } from "../constant/constant";
import {
  BaseSidebar,
  Card,
  DialogBox,
} from "../../../../../../../../../../components";
import { useEffect, useState } from "react";
import { ImageGallery } from "./ImageGallery";
import { DynamicImagesTypes, ImageCollectionType } from "../types/types";
import { CategoryCardItem } from "./CategoryCardItem";
import { ArxeniusLogoBlue } from "../../../../../../../../../../assets";

interface Props {
  selectedCard: "Web Customer" | "Web Backoffice" | "Image Gallery";
}

export const PageSelectionDialog = ({ selectedCard }: Props) => {
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [imageCollection, setImageCollection] = useState<ImageCollectionType[]>(
    []
  );

  useEffect(() => {
    if (selectedCard === "Web Customer") {
      setImageCollection(WCGenericRouteWithImages);
    }
  }, [selectedCard]);

  return (
    <Box sx={{ display: "flex" }}>
      <BaseSidebar
        logo={ArxeniusLogoBlue}
        menuList={imageCollection}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        sx={{
          position: "sticky",
          top: "0px",
          height: "100%",
          width: "190px",
        }}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingX: "30px",
            }}
          >
            {imageCollection.length > 0 &&
              imageCollection.map((item, index) => (
                <Box key={index}>
                  {item.id == selectedMenu &&
                    item.children.length > 0 &&
                    item.children.map((categoryItem, index) => (
                      <Box key={index} marginY="20px">
                        <Typography fontWeight={700}>
                          {categoryItem.category}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "10px",
                            borderRadius: "10px",
                            bgcolor: "#D9D9D9",
                            padding: "20px",
                            overflowX: "auto",
                            width: "550px",
                          }}
                        >
                          <CategoryCardItem
                            arrayItem={categoryItem.children}
                            type="CardItem"
                            fixedImageCount={categoryItem.fixedCount}
                            setShowGallery={setShowGallery}
                          />
                          <AddImage
                            IsFixedCount={categoryItem.fixedCount}
                            setShowGallery={setShowGallery}
                          />
                        </Box>
                      </Box>
                    ))}
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
      <DialogBox
        handleClose={() => setShowGallery(false)}
        header="Image Gallery"
        open={showGallery}
        borderRadius="16px"
        maxWidth="md"
        ContentHeight="650px"
      >
        <ImageGallery />
      </DialogBox>
    </Box>
  );
};

const AddImage = ({ IsFixedCount, setShowGallery }: DynamicImagesTypes) => {
  IsFixedCount == false;
  return (
    <Card
      onClick={() => setShowGallery(true)}
      sx={{
        minWidth: "100px",
        borderRadius: "10px",
        bgcolor: "#B1B1B1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          lineHeight: "15px",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        + <br /> Add Image
      </Typography>
    </Card>
  );
};
