import { screen, render, fireEvent } from '../common';
import { SidebarListButton } from '../../components/GenericSidebar/SidebarListButton';
import { MenuItemsChildren } from '../../api/types';
import { IconComponent } from '../../components/GenericDrawerLayout/utils/icon-component';

jest.mock('../../config', () => ({
  config: { value: jest.fn() },
}));

jest.mock('../../core/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../components/GenericDrawerLayout/utils/icon-component', () => ({
  IconComponent: jest.fn(),
}));

const mockNavigation = {
  id: 'test-id',
  children: [
    {
      id: 'child-id',
      label: 'Child',
      path: '/child-path',
      icon: 'ChildIcon',
      menuId: 'child-menu-id',
      parentId: 'test-id',
      children: [],
    },
  ],
  icon: 'FeedIcon',
  label: 'Test Label',
  menuId: 'test-menu-id',
  parentId: 'test-parent-id',
  path: '/test-path',
} as MenuItemsChildren;

describe('SidebarListButton', () => {
  beforeEach(() => {
    (IconComponent as jest.Mock).mockReturnValue(<span>FeedIcon</span>);
  });

  it('should render the component with the provided props', () => {
    render(
      <SidebarListButton
        navigation={mockNavigation}
        pathname='/'
        isAuthenticated={true}
        isOpen={() => {}}
      />
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should call IconComponent with the correct icon name for FeedIcon', () => {
    render(
      <SidebarListButton
        navigation={mockNavigation}
        pathname='/'
        isAuthenticated={true}
        isOpen={() => {}}
      />
    );

    expect(IconComponent).toHaveBeenCalledWith('FeedIcon', expect.any(Boolean));
  });

  it('should call IconComponent with the correct icon name for ChildIcon', () => {
    render(
      <SidebarListButton
        navigation={mockNavigation}
        pathname='/'
        isAuthenticated={true}
        isOpen={() => {}}
      />
    );

    expect(IconComponent).toHaveBeenCalledWith(
      'ChildIcon',
      expect.any(Boolean)
    );
  });
});
