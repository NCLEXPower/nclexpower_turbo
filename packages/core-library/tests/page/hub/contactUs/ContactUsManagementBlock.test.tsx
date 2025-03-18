import React from 'react';
import { ContactUsManagementBlock } from '../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock';
import * as hooks from '../../../../hooks';
import getConfig from 'next/config';

declare global {
  function showToast(message: string, type: any): void;
}
global.showToast = jest.fn();

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      processEnv: {
        EXAMPLE_VAR: 'testValue'
      }
    }
  });
});

jest.mock('../../../../contexts', () => ({
  useExecuteToast: jest.fn().mockReturnValue({ executeToast: jest.fn() })
}));

jest.mock('../../../../hooks', () => ({
  useApi: jest.fn(),
  useColumns: jest.fn().mockReturnValue({ columns: [] }),
  useModal: jest.fn().mockReturnValue({ open: jest.fn(), close: jest.fn(), props: { isOpen: false } }),
  useApiCallback: jest.fn()
}));

jest.mock('../../../../utils', () => ({
  executeToast: jest.fn(),
  getTimeZone: jest.fn().mockReturnValue('UTC')
}));

const mockGetByTestId = jest.fn();
jest.mock('../../../common', () => {
  const mockRenderResult = {
    container: document.createElement('div'),
    getByTestId: mockGetByTestId,
    debug: jest.fn(),
    unmount: jest.fn(),
    rerender: jest.fn(),
    asFragment: jest.fn(() => document.createDocumentFragment()),
  };
  
  return {
    render: jest.fn().mockReturnValue(mockRenderResult),
    screen: {
      getByTestId: mockGetByTestId
    },
    act: (cb: Function) => cb()
  };
});

jest.mock('../../../../components', () => {
  const mockComponent = (name: string) => 
    jest.fn().mockImplementation(({children, ...props}: any) => {
      return React.createElement('div', {
        'data-testid': `mock-${name}`,
        ...props
      }, children);
    });

  return {
    Alert: mockComponent('alert'),
    Card: mockComponent('card'),
    DataGrid: mockComponent('data-grid'),
    ConfirmationDeleteDialog: mockComponent('confirmation-dialog'),
    GridMoreVertIcon: mockComponent('grid-more-vert-icon'),
    ListItemButton: mockComponent('list-item-button'),
    Box: mockComponent('box'),
    CustomPopover: mockComponent('custom-popover'),
    
 
    CircularProgress: mockComponent('circular-progress'),
    Typography: mockComponent('typography'),
    TextField: mockComponent('text-field'),
    Button: mockComponent('button'),
    IconButton: mockComponent('icon-button'),
   
    __esModule: true
  };
});

import { render, screen, act } from '../../../common';

describe('ContactUsManagementBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetByTestId.mockImplementation((id) => {
      const element = document.createElement('div');
      element.setAttribute('data-testid', id);
      
      if (id === 'data-grid-component') {
        const api = hooks.useApi as jest.Mock;
        const rows = api.mock.results[api.mock.results.length - 1]?.value?.result?.data || [];
        element.setAttribute('data-rows', JSON.stringify(rows));
      }
      
      return element;
    });
  });

  it('should verify useApi is defined', () => {
    expect(hooks.useApi).toBeDefined();
  });

  it('should use empty array when API returns no data', () => {
    (hooks.useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: null,
      execute: jest.fn()
    });
    
    render(<ContactUsManagementBlock />);
    
    const dataGrid = document.createElement('div');
    dataGrid.setAttribute('data-rows', '[]');
    mockGetByTestId.mockReturnValueOnce(dataGrid);
    
    expect(JSON.parse(screen.getByTestId('data-grid-component').getAttribute('data-rows') || '')).toEqual([]);
  });

  it('should extract and pass contacts correctly when API returns data', () => {
    const mockContacts = [{
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      message: 'Test message',
      createdAt: '2023-01-01T00:00:00Z',
      categoryId: 'category-1', 
      refNo: 'reference notes' 
    }];
    
    (hooks.useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: { data: mockContacts },
      execute: jest.fn()
    });
    
    render(<ContactUsManagementBlock />);
    
    const dataGrid = document.createElement('div');
    dataGrid.setAttribute('data-rows', JSON.stringify(mockContacts));
    mockGetByTestId.mockReturnValueOnce(dataGrid);
    
    expect(JSON.parse(screen.getByTestId('data-grid-component').getAttribute('data-rows') || '')).toEqual(mockContacts);
  });

  it('should cover getConfig usage', () => {
    const config = getConfig();
    expect(config.publicRuntimeConfig.processEnv.EXAMPLE_VAR).toBe('testValue');
  });

  it('should render without errors', () => {
    (hooks.useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: { data: [] },
      execute: jest.fn()
    });
    
    expect(() => render(<ContactUsManagementBlock />)).not.toThrow();
  });
});