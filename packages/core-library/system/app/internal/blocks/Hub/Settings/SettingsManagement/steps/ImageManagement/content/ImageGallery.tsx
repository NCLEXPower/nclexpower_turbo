/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import { Button } from "../../../../../../../../../../components";
import { useRef, useState } from "react";
import { ImageLists, LottieLists } from "../../../../../../../../../../assets";
import Divider from "../../../../../../../../../../components/Divider/Divider";
import { ImageBundle } from "./ImageBundle";

interface Props {
  isEditable?: boolean;
}

export const ImageGallery = ({ isEditable = false }: Props) => {
  const [IsDeletingMultiple, setIsDeletingMultiple] = useState<boolean>(false);
  const [toDelete, setToDelete] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMultipleDelete = () => {
    setIsDeletingMultiple(false);
    console.log("Deleting : ", toDelete);
  };

  const handleSingleDeletion = (ImageId: number) => {
    console.log("Single Deleting : ", ImageId);
  };

  const handleMultipleSelection = (item: number) => {
    setToDelete((prev) => {
      if (prev.includes(item)) {
        return prev.filter((id) => id !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log(files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {isEditable && (
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button
            onClick={handleButtonClick}
            sx={{
              borderRadius: "10px",
              width: "120px",
              lineHeight: "20px",
            }}
          >
            Upload Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, application/json, image/svg+xml"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Button
            onClick={() => {
              IsDeletingMultiple
                ? handleMultipleDelete()
                : setIsDeletingMultiple(true);
            }}
            sx={{
              borderRadius: "10px",
              width: "120px",
              lineHeight: "20px",
              bgcolor: "red",
              "&:hover": {
                bgcolor: "#aa0000",
              },
            }}
          >
            {IsDeletingMultiple ? "Confirm Delete" : "Delete Multiple"}
          </Button>
        </Box>
      )}
      <Divider />
      <ImageBundle
        label="Images"
        type="image"
        IsDeletingMultiple={IsDeletingMultiple}
        compiledAssets={ImageLists}
        handleMultipleSelection={handleMultipleSelection}
        handleSingleDeletion={handleSingleDeletion}
        isEditable={isEditable}
      />
      <Divider />
      <ImageBundle
        label="Lottie Animations"
        type="lottie"
        IsDeletingMultiple={IsDeletingMultiple}
        compiledAssets={LottieLists}
        handleMultipleSelection={handleMultipleSelection}
        handleSingleDeletion={handleSingleDeletion}
        isEditable={isEditable}
      />
    </Box>
  );
};
