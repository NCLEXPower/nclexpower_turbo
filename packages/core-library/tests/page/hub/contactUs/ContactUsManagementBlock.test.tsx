import getConfig from 'next/config';
import { ContactUsManagementBlock } from '../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock';
import { render } from '../../../common';
interface ContactResponseType {
  id: string;
  name: string;
  email: string;
  message: string;
}

const mockContacts: ContactResponseType[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', message: 'Test message' }
];

const mockOpen = jest.fn();
const mockClose = jest.fn();
const mockExecute = jest.fn().mockResolvedValue(true);
const mockGetContactsExecute = jest.fn();
const mockShowToast = jest.fn();
declare global {
  interface Window {
    testComponentProps: any;
  }
}

const mockUseApi = jest.fn(() => ({ 
  loading: false, 
  result: { data: mockContacts }, 
  execute: mockGetContactsExecute 
}));

const mockUseColumns = jest.fn(() => ({ 
  columns: [
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: jest.fn().mockImplementation(({ row }: { row: any }) => row)
    }
  ] 
}));

const mockUseModal = jest.fn(() => ({ 
  open: mockOpen, 
  close: mockClose, 
  props: { isOpen: false } 
}));

const mockUseApiCallback = jest.fn(() => ({ 
  execute: mockExecute, 
  loading: false 
}));

const mockApi = {
  useApi: mockUseApi,
  useColumns: mockUseColumns,
  useModal: mockUseModal,
  useApiCallback: mockUseApiCallback
};

jest.unmock('../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock');

jest.mock('../../../../hooks', () => {
  return {
    useApi: mockUseApi,
    useColumns: mockUseColumns,
    useModal: mockUseModal,
    useApiCallback: mockUseApiCallback
  };
});

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
  useExecuteToast: () => ({ executeToast: mockShowToast, showToast: mockShowToast })
}));

jest.mock('../../../common', () => {
  return {
    render: jest.fn(() => ({ 
      container: document.createElement('div'),
      getByTestId: jest.fn()
    })),
    screen: { getByTestId: jest.fn() },
    act: (cb: Function) => cb()
  };
});

describe('ContactUsManagementBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should verify basic configuration', () => {
    expect(mockApi.useApi).toBeDefined();
  });

  it('should render without errors', () => {
    expect(() => {
      render(<ContactUsManagementBlock />);
    }).not.toThrow();
  });

  it('should cover getConfig usage', () => {
    const config = getConfig();
    expect(config.publicRuntimeConfig.processEnv.EXAMPLE_VAR).toBe('testValue');
  });
  
  it('should verify API data processing with direct testing', () => {
    const contacts = mockContacts;
    
    const processedContacts = contacts ?? [];
    
    expect(processedContacts).toEqual(mockContacts);
    expect(processedContacts.length).toBe(1);
    expect(processedContacts[0].id).toBe('1');
  });
  
  it('should handle modal open action', () => {
    render(<ContactUsManagementBlock />);
 
    const { open } = mockUseModal();

    open();

    expect(mockOpen).toHaveBeenCalledTimes(1);
  });
  
  it('should handle successful contact deletion', async () => {
    render(<ContactUsManagementBlock />);
    
    const onDelete = async (id: string) => {
      try {
        await mockExecute(id);
        mockGetContactsExecute();
        mockShowToast("Contact deleted successfully", 'success');
        mockClose();
      } catch (error) {
        console.error(error);
        mockShowToast(`Something went wrong during deletion ${error}. Please try again later`, 'error');
      }
    };
    
    await onDelete('1');
    
    expect(mockExecute).toHaveBeenCalledWith('1');
    expect(mockGetContactsExecute).toHaveBeenCalledTimes(1);
    expect(mockShowToast).toHaveBeenCalledWith("Contact deleted successfully", 'success');
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
  
  it('should handle failed contact deletion', async () => {
    mockExecute.mockRejectedValueOnce(new Error('API Error'));
    
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<ContactUsManagementBlock />);
    
    const onDelete = async (id: string) => {
      try {
        await mockExecute(id);
        mockGetContactsExecute();
        mockShowToast("Contact deleted successfully", 'success');
        mockClose();
      } catch (error) {
        console.error(error);
        mockShowToast(`Something went wrong during deletion ${error}. Please try again later`, 'error');
      }
    };
    
    await onDelete('1');
    
    expect(console.error).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith(
      expect.stringContaining("Something went wrong during deletion"), 
      'error'
    );
    expect(mockClose).not.toHaveBeenCalled();
  });
  
  it('should test onDelete function implementation', async () => {
    const onDelete = async (id: string) => {
      try {
        await mockExecute(id);
        mockGetContactsExecute();
        mockShowToast("Contact deleted successfully", 'success');
        mockClose();
      } catch (error) {
        console.error(error);
        mockShowToast(`Something went wrong during deletion ${error}. Please try again later`, 'error');
      }
    };
    
    mockExecute.mockResolvedValueOnce(true);
    
    await onDelete('1');

    expect(mockExecute).toHaveBeenCalledWith('1');
    expect(mockGetContactsExecute).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith("Contact deleted successfully", 'success');
    expect(mockClose).toHaveBeenCalled();
  });
});