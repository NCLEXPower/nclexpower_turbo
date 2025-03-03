import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const InfoIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="transparent" 
      stroke="#3B0086A3"
      strokeWidth="2"
    />
    <text
      x="12"
      y="17"
      textAnchor="middle"
      fontSize="14"
      fill="#3B0086A3" 
      fontFamily="Tahoma, sans-serif"
      fontWeight="bold"
    >
      i
    </text>
  </SvgIcon>
);
