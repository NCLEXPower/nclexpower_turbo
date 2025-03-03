export const StatusStyles: Record<string, React.CSSProperties> = {
  "To Be Reviewed": {
    backgroundColor: "#3C94DE",
    color: "#fff"
  },
  "In Review": {
    backgroundColor: "#AE830F",
    color: "#fff"
  },
  Resolved: {
    backgroundColor: "#479F62",
    color: "#fff"
  },
};

export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      style={{
        ...StatusStyles[status],
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: 500,
        width: "120px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: '"PT Sans Narrow", sans-serif',
      }}
    >
      {status}
    </span>
  );
};
