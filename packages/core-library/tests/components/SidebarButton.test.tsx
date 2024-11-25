import { act, fireEvent, renderHook, screen } from '../common';
import { useAuthContext } from '../../contexts';
import { useRouter } from '../../core';
import { SidebarButton } from '../../components/GenericSidebar/SidebarButton';
import { render } from '@testing-library/react';
import { MenuItemsChildren } from '../../api/types';

jest.mock('../../config', () => ({
  config: { value: jest.fn() },
}));

jest.mock('../../core/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../contexts', () => ({
  useAuthContext: jest.fn(),
}));

const mockFn = jest.fn();

describe('Web Customer Sidebar', () => {
  const config = { value: { BASEHUB: '/hub' } };
  const navigation = { path: '' };
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockFn });
  });

  it('should navigate to authenticated link', () => {
    const { result } = renderHook(() => useRouter());
    const { push } = result.current;

    act(() => {
      const handleNavigate = () => {
        const fullPath = `${config.value.BASEHUB}${navigation.path}`;
        push({ pathname: fullPath });
      };
      handleNavigate();
    });
    expect(push).toHaveBeenCalledWith({ pathname: '/hub' });
  });

  it('should navigate to unauthenticated link', () => {
    const { result } = renderHook(() => useRouter());
    const { push } = result.current;

    act(() => {
      const handleNavigate = () => {
        const fullPath = navigation.path;
        push({ pathname: fullPath });
      };
      handleNavigate();
    });
    expect(push).toHaveBeenCalledWith({ pathname: '' });
  });

  it('should return true is isAuthenticated exist', () => {
    (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: true });
    const { result } = renderHook(() => useAuthContext());
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('should return false is isAuthenticated exist', () => {
    (useAuthContext as jest.Mock).mockReturnValue({ isAuthenticated: false });
    const { result } = renderHook(() => useAuthContext());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should navigate to the correct path when clicked', () => {
    const mockPush = jest.fn();
    const navigationMock = {
      id: 'test-id',
      children: [{}],
      icon: 'FeedIcon',
      label: 'Test Label',
      menuId: 'test menu id',
      parentId: 'test parent id',
      path: '/test-path',
    } as MenuItemsChildren;

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(
      <SidebarButton
        navigation={navigationMock}
        pathname='/'
        isAuthenticated={true}
        onNavigate={() => {}}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: navigationMock.path,
    });
  });
});
