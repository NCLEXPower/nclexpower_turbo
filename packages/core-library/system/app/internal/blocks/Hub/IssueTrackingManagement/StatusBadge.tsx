import { getStatusLabel } from "../../../../../../utils/statusHelpers";
import { badgeBgColor } from "./styles/style";

export const StatusBadge = ({ status }: { status: number }) => {
  return (
    <span
      style={{
        ...badgeBgColor[getStatusLabel(status)],
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: 500,
        width: "120px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"PT Sans Narrow", sans-serif',
        color: "#fff",
      }}
    >
      {getStatusLabel(status)}
    </span>
  );
};
