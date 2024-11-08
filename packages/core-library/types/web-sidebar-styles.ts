import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface WebSidebarStylesType {
    listStyles: {
        sidebarSx: SxProps<Theme>;
        arrowSx: SxProps<Theme>;
        dividerSx: SxProps<Theme>;
        listItemIconSx: SxProps<Theme>;
        paddingSx: SxProps<Theme>;
        activeSx: SxProps<Theme>;
        hovericonSx: SxProps<Theme>;
        opacitySx: SxProps<Theme>;
    };
}
