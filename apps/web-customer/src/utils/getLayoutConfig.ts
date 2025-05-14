/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

export const getLayoutConfig = (isMobile: boolean, index: number) => {
  const isFirst = index === 0;
  const isSecond = index === 1;

  return {
    top: !isMobile ? (isFirst ? 40 : isSecond ? 20 : 50) : isFirst ? 65 : 50,

    left: !isMobile ? (isFirst ? 35 : isSecond ? 15 : 20) : isFirst ? 35 : 20,

    progressSize: !isMobile
      ? isFirst
        ? 90
        : isSecond
          ? 130
          : 80
      : isFirst
        ? 50
        : 80,

    labelTop: !isMobile
      ? isFirst
        ? "35%"
        : isSecond
          ? "40%"
          : "30%"
      : isFirst
        ? "17%"
        : "30%",

    labelLeft: !isMobile
      ? isFirst
        ? "42%"
        : isSecond
          ? "72%"
          : "63%"
      : isFirst
        ? "26%"
        : "63%",

    progressColor: index % 2 === 0 ? "#0F2A71" : "#181E2F",
    dividerHeight: !isMobile ? "80px" : "60px",
  };
};
