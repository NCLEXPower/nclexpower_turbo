export const getStatusLabel = (status: number): string => {
  switch (status) {
    case 0:
      return "To Be Reviewed";
    case 1:
      return "In Review";
    case 2:
      return "Resolved";
    default:
      return "Unknown";
  }
};
