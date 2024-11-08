import * as React from 'react';
import Popover, { PopoverProps } from '@mui/material/Popover';
import { IconButton, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Button } from '../Button/Button';

interface Props extends PopoverProps {
  icon?: React.ReactElement;
  sx?: SxProps<Theme>;
  label?: string;
  iconButton?: any
  withIcon?: boolean
}

export const CustomPopover: React.FC<React.PropsWithChildren<Props>> = ({ label, icon, sx, iconButton, withIcon, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='z-1'>
      {withIcon ? <IconButton onClick={handleClick}>
        {iconButton}
      </IconButton>
        : <Button sx={sx} aria-describedby={id} variant="contained" onClick={handleClick} endIcon={icon}>
          {label}
        </Button>}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ zIndex: 1 }}
      >
        {children}
      </Popover>
    </div>
  );
}