export const getLayoutConfig = (isMobile: boolean, index: number) => {
  const configs = [
    {
      top: isMobile ? 65 : 40,
      left: 35,
      size: isMobile ? 50 : 90,
      labelTop: isMobile ? "17%" : "35%",
      labelLeft: isMobile ? "26%" : "42%",
    },
    {
      top: isMobile ? 50 : 20,
      left: isMobile ? 20 : 15,
      size: isMobile ? 80 : 130,
      labelTop: isMobile ? "30%" : "40%",
      labelLeft: isMobile ? "63%" : "72%",
    },
    {
      top: 50,
      left: 20,
      size: 80,
      labelTop: "30%",
      labelLeft: "63%",
    },
  ];
  return configs[index] ?? configs[0];
};
