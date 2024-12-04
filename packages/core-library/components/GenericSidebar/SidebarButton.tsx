import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from '../../core';
import { MenuItems } from '../../api/types';
import { IconComponent } from '../GenericDrawerLayout/utils/icon-component';
import { WebSidebarStylesType } from '../../types/web-sidebar-styles';

export interface SidebarButtonProps extends Partial<WebSidebarStylesType> {
  navigation: MenuItems;
  pathname: string;
  isAuthenticated: boolean;
  onNavigate: () => void;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  navigation,
  pathname,
  isAuthenticated,
  listStyles,
  onNavigate,
}) => {
  const router = useRouter();
  const path = router?.pathname;

  const isActive = navigation.path === path;

  const handleNavigate = () => {
    router.push({
      pathname: navigation.path ?? '/',
    });
    onNavigate();
  };

  return (
    <Box width='100%' p={1} sx={isAuthenticated ? listStyles?.paddingSx : null}>
      <Box overflow='hidden' borderRadius={3} sx={listStyles?.hovericonSx}>
        <ListItemButton
          disabled={navigation.path === path}
          component='a'
          onClick={handleNavigate}
          sx={isAuthenticated && isActive ? listStyles?.activeSx : {}}
        >
          <ListItemIcon
            sx={isAuthenticated ? listStyles?.listItemIconSx : null}
          >
            {IconComponent(navigation.icon, false)}
          </ListItemIcon>
          <ListItemText>
            <Typography variant='body2' fontSize={13}>
              {navigation.label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </Box>
    </Box>
  );
};
