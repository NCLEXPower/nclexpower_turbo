export const alertStyle = {
  "& .MuiAlert-icon": {
    fontSize: "30px",
    color: "#3B0086A3 !important",
  },
  "& .MuiAlertTitle-root": {
    fontFamily: '"Poppins", sans-serif',
    fontSize: "18px",
  },
  "& .MuiAlert-message": {
    fontFamily: '"Poppins", sans-serif',
    fontSize: "14px",
  },
}

export const tableStyle = {
  backgroundColor: "#fff",
  [`& .MuiDataGrid-cell:focus, 
    & .MuiDataGrid-cell:focus-within, 
    & .MuiDataGrid-columnHeader:focus, 
    & .MuiDataGrid-columnHeader:focus-within, 
    & .MuiButtonBase-root:focus, 
    & .MuiButtonBase-root:focus-visible`]: {
    outline: "none !important",
    boxShadow: "none",
  },
  "& .MuiDataGrid-row": {
    minHeight: "60px !important",
    maxHeight: "60px !important",
    "--height": "60px !important",
    position: "relative",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "8px",
    backgroundColor: "#0000000A",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#E6E6E6",
    },
  },
  "& .MuiDataGrid-row:first-of-type": {
    marginTop: "20px",
  },
  "& .MuiDataGrid-columnHeaders": {
    color: "#8C8C8C",
    fontFamily: '"PT Sans Narrow", sans-serif',
    fontWeight: 400,
    fontSize: "16px",
    borderBottom: "3px solid #C9C9C9",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    justifyContent: "left",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    whiteSpace: "nowrap",
  },

  "& .MuiDataGrid-columnHeaders .MuiDataGrid-row": {
    backgroundColor: "transparent",
    borderRadius: "0px",
  },
};

export const titleStyle = {
  color: "#3B0086",
  fontFamily: '"PT Sans Narrow", sans-serif',
  fontWeight: "bold",
  marginLeft: "10px",
};

export const rowStyle = {
  display: "flex",
  alignItems: "center", 
  height: "100%",
  color: "#707070",
};

export const submitButtonStyle = {
  backgroundColor: "#3B0086",
  color: "#FFFFFF",
  width: "130px",
  height: "45px",
  minHeight: "45px",
  padding: "0px 8px",
  fontSize: "16px",
  fontWeight: 500,
  fontFamily: '"PT Sans Narrow", sans-serif',
  textTransform: "none",
  borderRadius: "6px",
  transition: "background-color 0.3s ease",
  "&:focus, &:focus-visible, &:focus-within": {
    outline: "none !important",
    boxShadow: "none !important",
  },
  "&:hover": {
    backgroundColor: "#31006E",
  }
};

export const modalContainerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "550px",
  bgcolor: "#F2F2F2",
  color: "#3B0086",
  p: 8,
  pr: 12,
  boxShadow: 8,
  borderRadius: "8px",
  overflow: "hidden",
  "& > *": { mb: 1 },
};

export const iconButtonStyle = {
  width: 20,
  height: 20,
  border: "3px solid #3B0086",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  outline: "none !important",
  "&:focus, &:focus-visible, &:focus-within": {
    outline: "none !important",
    boxShadow: "none",
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
};

export const statusDropdownStyle = {
  width: "145px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "6px",
  padding: "0px",
  "&:focus, &:focus-visible, &:focus-within": {
    outline: "none !important",
    boxShadow: "none !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none !important",
  },
};