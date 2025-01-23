export const tableStyle = {
  border: "0.2px solid #B0BEC5",
  boxShadow: "0px 10px 60px 0px rgba(226, 236, 249, 0.50)",
  borderRadius: "8px",
  overflow: "hidden",
  marginX: "auto",
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  ".MuiDataGrid-cell": {
    cursor: "pointer",
  },
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "& .super-app-theme--header": {
    background: "rgba(24, 30, 47, 0.95)",
    outline: "none !important",
    color: "#ffffff",
  },
  "@media (max-width: 1024px)": {
    maxWidth: "700px",
  },
  "@media (max-width: 768px)": {
    maxWidth: "310px",
  },
};
