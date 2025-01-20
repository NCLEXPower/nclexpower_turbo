import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box } from '@mui/material';
import PricingDetail from './PricingDetail';
import { PricingModalProps } from 'core-library/types/global';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PricingModal({
  handleClickOpen,
  handleClose,
  open,
  cardData,
}: PricingModalProps) {
  return (
    <div className="py-6">
      <p
        className="text-base font-normal cursor-pointer underline text-[#717171]"
        onClick={handleClickOpen}
      >
        View more details
      </p>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="min-h-screen">
          <PricingDetail cardData={cardData} onClose={handleClose} />
        </div>
      </Dialog>
    </div>
  );
}
