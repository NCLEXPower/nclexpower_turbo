import { SxProps } from '@mui/system';
import { WebSidebarStylesType } from '../types/web-sidebar-styles';
import { useMemo } from 'react';

const wordWrapStyles: SxProps = {
  "& *": {
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    wordBreak: "break-word",
  },
};

export const useStyle = (): WebSidebarStylesType & { wordWrap: SxProps } => {
  const listStyles: WebSidebarStylesType['listStyles'] = {
    sidebarSx: {
      backgroundImage: "linear-gradient(90deg, #0F2A71 0%, #181E2F 100%)",
      margin: "10px",
      color: "white",
      borderRadius: "8px",
    },
    arrowSx: {
      opacity: 1,
    },
    dividerSx: {
      borderBottomWidth: "none !important",
      borderColor: "none !important",
    },
    listItemIconSx: {
      minWidth: "30px",
      display: "flex",
      justifyContent: "center",
    },
    paddingSx: {
      padding: "0 !important",
    },
    activeSx: {
      color: "#F4C501 !important",
      fontWeight: 'bold !important',
      opacity: "1 !important",
      '.MuiSvgIcon-root': {
        color: '#F4C501 !important',
      },
    },
    hovericonSx: {
      '&:hover': {
        color: "#F4C501 !important",
      },
      '&:hover .MuiSvgIcon-root': {
        color: '#F4C501 !important',
      },
    },
    opacitySx: {
      opacity: "1 !important",
    },
  };

  const styles = useMemo(() => ({
    listStyles,
    wordWrap: wordWrapStyles,
  }), []);

  return styles;
};
