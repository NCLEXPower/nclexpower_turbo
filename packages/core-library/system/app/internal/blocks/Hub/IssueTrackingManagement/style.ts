import { styled } from "@mui/material/styles";

export const DescriptionBoxStyle = styled("div")({
  marginTop: "16px",
  width: "100%",
  height: "90px",
  maxHeight: "170px",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  backgroundColor: "#F2F2F2",
  color: "#3B0086",
  outline: "none",
  resize: "none",
  overflowY: "auto",
  "&::placeholder": {
    color: "#3B0086", 
    opacity: 2, 
  },
  "&::-webkit-scrollbar": {
    width: "8px",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#d9d3db",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#8F6FB7", 
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#7A5C9F", 
  },
});

export const StyledTextarea = styled("textarea")({
  width: "100%",
  height: "120px",
  maxHeight: "120px",
  padding: "10px",
  fontSize: "12px",
  fontFamily: '"Poppins", sans-serif',
  borderRadius: "5px",
  border: "1px solid #3B00868A",
  backgroundColor: "#F2F2F2",
  color: "#3B0086",
  outline: "none",
  resize: "none",
  overflowY: "auto",
  "&:focus": {
    border: "1px solid #3B00868A",
    boxShadow: "0px 0px 6px rgba(123, 92, 159, 0.6)",
  },
  "&::placeholder": {
    color: "#3B0086",
    opacity: 2,
  },
  "&::-webkit-scrollbar": {
    width: "8px",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#d9d3db",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#8F6FB7",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#7A5C9F",
  },
});

export const customModalBackdrop: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  zIndex: 1200,
};

export const customModalContent: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '16px',
  borderRadius: '8px',
  zIndex: 1300,
  WebkitFontSmoothing: 'antialiased',
};

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
    outline: "none",
    boxShadow: "none",
  },
  '& .MuiDataGrid-cell': {
      display: 'flex',
      alignItems: 'center',
    },
  "& .MuiDataGrid-row": {
    display: 'flex',
    alignItems: 'center',
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
  "& .MuiDataGrid-row:last-of-type": {
    marginBottom: "20px",
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
  width: "560px",
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