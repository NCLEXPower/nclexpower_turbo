import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Button, LinearProgress } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useCountdown } from 'core-library/hooks/useCountdown';
import { CalculatorModal } from '../CalculatorModal/CalculatorUI';
import { ReportIssueDialog } from '../Dialog/ReportIssue/ReportIssueDialog';
import { ToolbarSettings } from '../Toolbar/Toolbar';
import { IRTsModal } from '../Dialog/IrtModal/IRTModal';
import { useTour } from '@reactour/tour';
import { useLocalStorage } from 'core-library/hooks';
import { useApplicationContext } from '../../core/context/AppContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { CustomTooltip } from 'core-library/components';

export const buttonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  fontSize: 'small',
  IconStyle: {
    pr: 2,
  },
};

type Props = {
  logout: () => void;
  current: number;
};

export const Header: React.FC<Props> = ({ logout, current }) => {
  const { timeRemaining, duration: timeDuration } = useCountdown({ timeRemaining: '00:04:00:00', duration: '00:01:00:00' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsOpen } = useTour();
  const { getItem, setItem } = useLocalStorage<string>('TourKey');
  const { refresh } = useApplicationContext();

  useEffect(() => {
    const Tour = getItem();
    if (!Tour) {
      setIsOpen(true);
      setItem('true');
    }
  }, [setIsOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="header-step-1">
        <AppBar position="static">
          <div style={{ padding: 10, backgroundColor: '#007AB7' }}>
            <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Box fontWeight="bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <Box className="header-step-2 p-0">
                    Time Remaining :<span className="ml-2">{timeRemaining}</span>
                  </Box>
                </Box>
                <Box fontSize={14} fontWeight="bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <Box className="header-step-3">
                    Duration :
                    <Typography component={'span'} className="ml-2">
                      {timeDuration}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box className="header-step-4">
                  <Typography textAlign="center" style={{ fontFamily: 'Arial, sans-serif' }}>
                    QID:
                  </Typography>
                  <Typography style={{ fontFamily: 'Arial, sans-serif' }}>NCLEX Sample Tutor</Typography>
                </Box>
              </Box>
              <Box flexGrow={0}>
                <div className="header-step-5">
                  <CustomTooltip title="current page">
                    <Button sx={{ color: 'white', fontSize: 'small' }}>
                      <AutoStoriesIcon
                        fontSize="small"
                        style={{ fontFamily: 'Arial, sans-serif', marginRight: '2px' }}
                      />{' '}
                      : {current}
                    </Button>
                  </CustomTooltip>
                </div>
              </Box>
            </Toolbar>
          </div>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            height={35}
            pl={7}
            pr={7}
            gap={5}
            bgcolor={'#86BCEA'}
          >
            <div className="header-step-6">
              <Button sx={buttonStyle} style={{ fontFamily: 'Arial, sans-serif' }} onClick={openModal}>
                <CalculateIcon fontSize="large" sx={buttonStyle.IconStyle} />
                Calculator
              </Button>
              <Button sx={buttonStyle} style={{ fontFamily: 'Arial, sans-serif' }}>
                <FormatClearIcon fontSize="large" sx={buttonStyle.IconStyle} />
                Clear
              </Button>
              <ReportIssueDialog />
            </div>
            <div className="header-step-7 flex items-center">
              <CustomTooltip title="Refresh">
                <Button onClick={refresh} sx={{ color: '#F3F3F3' }}>
                  <RefreshIcon fontSize="medium" />
                </Button>
              </CustomTooltip>
              <IRTsModal />
              <ToolbarSettings />
              <CustomTooltip title="Exit">
                <ExitToAppIcon onClick={logout} className="cursor-pointer" />
              </CustomTooltip>
            </div>
          </Box>
        </AppBar>
      </div>
      <CalculatorModal open={isModalOpen} onClose={closeModal} />
    </Box>
  );
};
