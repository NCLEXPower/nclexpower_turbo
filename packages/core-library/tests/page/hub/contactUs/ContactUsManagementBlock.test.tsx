import React from 'react';
import { render, screen } from '@testing-library/react';
import { ContactUsManagementBlock } from '../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock';
import * as hooks from '../../../../hooks';
import { ContactResponseType } from '../../../../api/types';

jest.mock('../../../../hooks', () => ({
  useApi: jest.fn(),
  useColumns: jest.fn().mockReturnValue({ columns: [] })
}));


jest.mock('../../../../components', () => ({
  Alert: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
    <div data-testid="alert-component" {...props}>{children}</div>,
  Card: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
    <div data-testid="card-component" {...props}>{children}</div>,
  DataGrid: (props: any) => 
    <div data-testid="data-grid-component" data-rows={JSON.stringify(props.rows)} />
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
});
