import { SxProps } from "@mui/material";
import { useResolution } from "core-library/hooks";

export const getContentCardModalStyles = () => {
  const { isMobile } = useResolution();

  const dialog: SxProps = {
    "& .MuiPaper-root": {
      borderRadius: isMobile ? 0 : "15px",
      minHeight: isMobile ? "100%" : "700px",
      width: isMobile ? "100%" : "90%",
      padding: isMobile ? "10px" : "20px",
      maxWidth: "1200px",
      maxHeight: "800px",
      margin: 0,
    },

    "& h4": {
      padding: "10px 20px 0 20px",
      textAlign: isMobile ? "left" : "center",
      display: isMobile ? "block" : "flex",
      flexDirection: "row-reverse",
      marginBottom: "20px",
    },

    "& [data-testid='close_button_container']": {
      ...(isMobile && {
        width: "fit-content",
        marginLeft: "auto",
        padding: "5px",
        bgcolor: "#0F2A7121",
        borderRadius: "100%",
      }),
    },

    "& h4>span": {
      whiteSpace: "nowrap",
      fontSize: "clamp(25px,4vw,35px)",
      fontFamily: "PT Sans Narrow",
      fontWeight: "bold",
      marginTop: isMobile ? "10px" : 0,
    },
  };

  const contentBox: SxProps = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    height: { md: "100%" },
    borderRadius: "15px",
    overflow: "hidden",
  };

  const cardSliderBox: SxProps = {
    position: "relative",
    display: "flex",
    flexDirection: isMobile ? "column-reverse" : "row",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    padding: "10px",
    gap: "20px",
    bgcolor: { md: "#D9D9D945" },
  };

  const cardFacesBox: SxProps = {
    position: "relative",
    display: "flex",
    flexDirection: isMobile ? "row" : "column",
    overflow: "auto",
    alignItems: "center",
    height: "100%",
    paddingX: { md: "40px" },
  };

  const cardFacesImage: SxProps = {
    transition: "all 0.3s ease-in-out",
    position: "relative",
    aspectRatio: "110/150",
    minHeight: isMobile ? "80px" : "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    transform: "scale(0.75)",
    filter: "brightness(50%)",
  };

  const cardMainFaceImage: SxProps = {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    width: isMobile ? "70%" : "100%",
    alignItems: "center",
    aspectRatio: "2/3",
    maxWidth: isMobile ? "350px" : "unset",
    marginX: "auto",
    height: { md: "100%" },
    paddingX: "20px",
    borderRadius: "15px",
    bgcolor: isMobile ? "#D9D9D945" : "transparent",
  };

  const cardMainFaceBtn: SxProps = {
    position: isMobile ? "absolute" : "static",
    top: "50%",
    transform: isMobile ? "translateY(-50%)" : "",
  };

  const topicsBarButton: SxProps = {
    width: "100%",
    minHeight: "40px",
    boxShadow: "none",
    borderBottom: "1px solid #0F2A7133",
    color: "black",
    fontFamily: "PT Sans Narrow",
    fontWeight: "bold",
    bgcolor: "transparent",
    borderRight: "none",
  };

  const topicsBarSelectField: SxProps = {
    "& .MuiInputBase-root": {
      height: "40px",
    },
    "& .MuiSelect-select": {
      minWidth: "120px",
      padding: "0 20px",
      fontSize: "12px",
      fontWeight: "bold",
      fontFamily: "PT Sans",
    },
  };

  return {
    dialog,
    contentBox,
    cardSliderBox,
    cardFacesBox,
    cardFacesImage,
    cardMainFaceImage,
    topicsBarButton,
    topicsBarSelectField,
    cardMainFaceBtn,
  };
};
