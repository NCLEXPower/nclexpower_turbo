import React, { useMemo } from "react";
import Chip from "../../../../../../components/Chip/Chip";
import { getContentStatusStyle } from "./utils/getContentStatusStyle";

type Props = {
  status: number;
};

export const CaseListChip: React.FC<Props> = ({ status }) => {
  const contentStyle = useMemo(() => getContentStatusStyle(status), [status]);

  return (
    <Chip
      data-testid="caselist-chip"
      label={contentStyle.label}
      color={contentStyle.color}
    />
  );
};
