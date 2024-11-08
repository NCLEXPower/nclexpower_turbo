import { ImageBundleType } from "../types/types";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import {
  Checkbox,
  LottieAnimation,
} from "../../../../../../../../../../components";
import { IconComponent } from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";

export const ImageBundle = ({
  type,
  label,
  compiledAssets,
  IsDeletingMultiple,
  handleMultipleSelection,
  isEditable,
  handleSingleDeletion,
}: ImageBundleType) => {
  return (
    <Box>
      <Typography variant="h2" fontWeight={700}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {compiledAssets.length > 0 &&
          compiledAssets.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "120px",
                bgcolor: "#d9d9d9",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <MultipleCheckboxDelete
                handleMultipleSelection={handleMultipleSelection}
                IsDeletingMultiple={IsDeletingMultiple}
                itemsToDelete={item.id}
              />
              {type == "image" ? (
                <Image
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                  src={item.image}
                  alt={item.label}
                />
              ) : (
                <LottieAnimation
                  animationData={item.image}
                  width={120}
                  height={120}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "10px",
                  gap: "10px",
                }}
              >
                <Typography variant="sublabel" sx={{ lineHeight: "10px" }}>
                  {item.label}
                </Typography>
                {isEditable && (
                  <Typography
                    variant="subtitle2"
                    lineHeight="15px"
                    onClick={() => handleSingleDeletion(item.id)}
                  >
                    {!IsDeletingMultiple &&
                      IconComponent("DeleteIcon", false, "error")}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

interface CheckboxDeleteType {
  handleMultipleSelection: (value: number) => void;
  IsDeletingMultiple: boolean;
  itemsToDelete: number;
}

export const MultipleCheckboxDelete = ({
  handleMultipleSelection,
  IsDeletingMultiple,
  itemsToDelete,
}: CheckboxDeleteType) => {
  return (
    IsDeletingMultiple && (
      <Checkbox onChange={() => handleMultipleSelection(itemsToDelete)} />
    )
  );
};
