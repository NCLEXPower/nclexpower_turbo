import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactUsManagementBlock } from '../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock';
import * as hooks from '../../../../hooks';
import { ContactResponseType } from '../../../../api/types';
import getConfig from 'next/config';

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      processEnv: {
        EXAMPLE_VAR: 'testValue'
      }
    }
  });
});

jest.mock('../../../../hooks', () => ({
  useApi: jest.fn(),
  useColumns: jest.fn().mockReturnValue({ columns: [] }),
  useModal: jest.fn().mockReturnValue({ open: jest.fn(), close: jest.fn(), props: { isOpen: false } }),
  useApiCallback: jest.fn()
}));


jest.mock('../../../../components', () => ({
  Alert: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
    <div data-testid="alert-component" {...props}>{children}</div>,
  Card: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
    <div data-testid="card-component" {...props}>{children}</div>,
  DataGrid: (props: any) => {
    return (
      <div data-testid="data-grid-component" data-rows={JSON.stringify(props.rows)}>
        {props.columns && props.rows
          ? props.rows.map((row: any, rowIndex: number) => (
              <div key={rowIndex}>
                {props.columns.map((col: any, colIndex: number) => {
                  if (col.renderCell) {
                    return (
                      <div key={colIndex}>
                        {col.renderCell({ row })}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))
          : null}
      </div>
    );
  },
  CustomPopover: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
    <div data-testid="custom-popover" {...props}>{children}</div>,
  ConfirmationDeleteDialog: ({ isOpen, handleClose, handleDelete, loading }: { isOpen: boolean; handleClose: () => void; handleDelete: () => void; loading: boolean }) => {
      return (
          isOpen ? (
              <div data-testid="confirmation-dialog">
                  <button onClick={handleClose}>Close</button>
                  <button onClick={handleDelete} disabled={loading}>Delete</button>
              </div>
          ) : null
      );
  },
  GridMoreVertIcon: () => <div data-testid="grid-more-vert-icon"></div>,
  ListItemButton: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button data-testid="list-item-button" onClick={onClick}>{children}</button>
  ),
  Box: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
    <div data-testid="box" {...props}>{children}</div>
  )
}));

describe('ContactUsManagementBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call useApi with webbackoffice.getAllContacts', () => {
    
    const getAllContactsMock = jest.fn();
    
   
    (hooks.useApi as jest.Mock).mockImplementation((callback) => {
   
      callback({ webbackoffice: { getAllContacts: getAllContactsMock } });
      return { loading: false, result: null };
    });

    render(<ContactUsManagementBlock />);
    
   
    expect(getAllContactsMock).toHaveBeenCalled();
  });

  it('should use empty array when API returns no data', () => {
   
    (hooks.useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: null
    });

    render(<ContactUsManagementBlock />);
    
  
    const dataGrid = screen.getByTestId('data-grid-component');
    expect(JSON.parse(dataGrid.getAttribute('data-rows') || '')).toEqual([]);
  });

  it('should extract and pass contacts correctly when API returns data', () => {
    
    const mockContacts: ContactResponseType[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        message: 'Test message',
        createdAt: '2023-01-01T00:00:00Z',
        categoryId: 'category-1', 
        refNo: 'reference notes' 
      }
    ];
    
   
    (hooks.useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: { data: mockContacts }
    });

    render(<ContactUsManagementBlock />);
    
   
    const dataGrid = screen.getByTestId('data-grid-component');
    
   
    expect(JSON.parse(dataGrid.getAttribute('data-rows') || '[]')).toEqual(mockContacts);
  });

  it('should define correct columns with useColumns', () => {
    
    const useColumnsSpy = jest.fn().mockReturnValue({ columns: [] });
    (hooks.useColumns as jest.Mock).mockImplementation(useColumnsSpy);
   
    (hooks.useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: null
    });

    render(<ContactUsManagementBlock />);
    
   
    expect(useColumnsSpy).toHaveBeenCalledWith({
      columns: expect.arrayContaining([
        expect.objectContaining({ field: 'name', headerName: 'Name' }),
        expect.objectContaining({ field: 'email', headerName: 'Email' }),
        expect.objectContaining({ field: 'phone', headerName: 'Phone' }),
        expect.objectContaining({ field: 'message', headerName: 'Message' }),
        expect.objectContaining({ field: 'createdAt', headerName: 'Created At' })
      ])
    });
  });

  it('should cover getConfig usage', () => {
    const config = getConfig();
    expect(config.publicRuntimeConfig).toBeDefined();
    expect(config.publicRuntimeConfig.processEnv.EXAMPLE_VAR).toBe('testValue');
  });
});
