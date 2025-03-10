import React from 'react';
import { Tooltip, TooltipProps} from '@mui/material';

interface CustomTooltipProps extends TooltipProps {
  title: React.ReactNode;
}

export const CustomTooltip: React.FC<React.PropsWithChildren<CustomTooltipProps>> = ({ title, children, ...rest }) => {
  return (
    <Tooltip title={title} {...rest}>
      {children}
    </Tooltip>
  );
};
