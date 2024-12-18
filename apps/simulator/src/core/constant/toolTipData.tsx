import { useToolbarSettings } from '../context/ToolbarSettingsContext';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button, CustomTooltip } from 'core-library/components';

const iconStyle = {
  border: '1px solid #f3f3f3',
  margin: 1,
  backgroundColor: '#007AB7',
  color: '#030303',
  '&:hover': {
    color: '#f3f3f3',
  },
};

export const ToolTipIcons = () => {
  const { handleZoomInText, handleZoomOutText, handleResetTextZoom } = useToolbarSettings();
  const data = [
    { icon: <ZoomOutIcon fontSize="medium" />, onClick: handleZoomOutText, title: 'Zoom Out' },
    { icon: <RestartAltIcon fontSize="medium" />, onClick: handleResetTextZoom, title: 'Reset' },
    { icon: <ZoomInIcon fontSize="medium" />, onClick: handleZoomInText, title: 'Zoom In' },
  ];

  return (
    <div className="flex items-center justify-center">
      {data.map((item, index) => (
        <CustomTooltip title={item.title} key={index}>
          <Button sx={iconStyle} onClick={item.onClick}>
            {item.icon}
          </Button>
        </CustomTooltip>
      ))}
    </div>
  );
};
