export const formatSectionTitle = (title: string | undefined): string => {
    if (!title) return "Default";
    if (title.toLowerCase() === "cat") {
      return "CAT";
    }
  
    return title
      .split(/[-\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
