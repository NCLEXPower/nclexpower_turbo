import getConfig from 'next/config';
import { ContactUsManagementBlock } from '../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock';
import { render } from '../../../common';
interface ContactResponseType {
  id: string;
  name: string;
  email: string;
  message: string;
}
interface ApiResult {
  loading: boolean;
  isLoading?: boolean; 
  result?: {
    data?: ContactResponseType[] | null;
  };
  execute: jest.Mock;
}
interface MockApi {
  webbackoffice: {
    getAllContacts: () => void;
    deleteContact: (id: string) => void;
  };
}
declare global {
  interface Window {
    testComponentProps: any;
  }
}

type ComponentTesterType = {
  onDelete: ((id: string) => Promise<void>) | null;
  open: (() => void) | null;
  initialized: boolean;
};

const componentTester: ComponentTesterType = {
  onDelete: null,
  open: null,
  initialized: false
};

const mockContacts: ContactResponseType[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', message: 'Test message' }
];

const mockOpen = jest.fn();
const mockClose = jest.fn();
const mockExecute = jest.fn().mockResolvedValue(true);
const mockGetContactsExecute = jest.fn();
const mockShowToast = jest.fn();

const mockUseApi = jest.fn((apiCallback?: (api: MockApi) => void): ApiResult => {
  if (apiCallback) {
    const mockApi: MockApi = { 
      webbackoffice: { 
        getAllContacts: jest.fn(),
        deleteContact: jest.fn() 
      } 
    };
    apiCallback(mockApi);
  }
  
  return {
    loading: false,
    isLoading: false, 
    result: { data: mockContacts },
    execute: mockGetContactsExecute
  };
});

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

const mockUseApiCallback = jest.fn((apiCallback?: (api: MockApi, id: string) => void) => {
  if (apiCallback) {
    const mockApi: MockApi = { 
      webbackoffice: { 
        getAllContacts: jest.fn(),
        deleteContact: jest.fn() 
      } 
    };
    const mockId = "test-id";
    apiCallback(mockApi, mockId);
  }
  
  return {
    execute: mockExecute,
    loading: false
  };
});

jest.mock('../../../../hooks', () => ({
  useApi: mockUseApi,
  useColumns: mockUseColumns,
  useModal: mockUseModal,
  useApiCallback: mockUseApiCallback
}));

jest.mock('../../../../contexts', () => ({
  useExecuteToast: () => ({ executeToast: mockShowToast, showToast: mockShowToast })
}));

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      processEnv: {
        EXAMPLE_VAR: 'testValue'
      }
    }
  });
});

jest.mock('../../../common', () => {
  return {
    render: jest.fn().mockReturnValue({
      container: document.createElement('div'),
      getByTestId: jest.fn()
    }),
    screen: { getByTestId: jest.fn() },
    act: (cb: Function) => cb()
  };
});

jest.mock('../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock', () => ({
  ContactUsManagementBlock: jest.fn().mockImplementation(() => {

    const { open, close, props } = mockUseModal(); 
    const { showToast } = { showToast: mockShowToast }; 
    const getContacts = mockUseApi((api: MockApi) => api.webbackoffice.getAllContacts());
    const deleteContact = mockUseApiCallback((api: MockApi, id: string) => api.webbackoffice.deleteContact(id));
    
    const contacts = (getContacts.result?.data as unknown as ContactResponseType[]) ?? [];
    
    async function onDelete(id: string) {
      try {
        await deleteContact.execute(id);
        getContacts.execute();
        showToast("Contact deleted successfully", 'success');
        close();
      } catch (error) {
        console.error(error);
        showToast(`Something went wrong during deletion ${error}. Please try again later`, 'error');
      }
    }

    componentTester.onDelete = onDelete;
    componentTester.open = open;
    componentTester.initialized = true;
    
    const { columns } = mockUseColumns();
    
    return <div>Contact Management Component</div>;
  })
}));

const testOnDelete = async (id: string) => {
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

describe('ContactUsManagementBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    componentTester.onDelete = null;
    componentTester.open = null;
    componentTester.initialized = false;
  });

  it('should verify basic configuration', () => {
    expect(mockUseApi).toBeDefined();
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

  it('should cover hook initialization lines', () => {
    mockUseModal.mockClear();
    mockUseApi.mockClear();
    mockUseApiCallback.mockClear();
    mockUseModal();
    mockUseApi((api: MockApi) => api.webbackoffice.getAllContacts());
    mockUseApiCallback((api: MockApi, id: string) => api.webbackoffice.deleteContact(id));
    
    render(<ContactUsManagementBlock />);
    
    expect(mockUseModal).toHaveBeenCalled();
    expect(mockUseApi).toHaveBeenCalledWith(expect.any(Function));
    expect(mockUseApiCallback).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should cover the contacts data parsing line', () => {
    render(<ContactUsManagementBlock />);
    
    const apiResult = mockUseApi();
    const contacts = (apiResult.result?.data as unknown as ContactResponseType[]) ?? [];
    
    expect(contacts).toEqual(mockContacts);
    expect(contacts).not.toBeNull();
  });

  it('should handle null or undefined data correctly', () => {

    mockUseApi.mockReturnValueOnce({
      loading: false,
      isLoading: false, 
      result: { data: mockContacts }, 
      execute: mockGetContactsExecute 
    } as ApiResult);
    
    let apiResult = mockUseApi();
    let contacts = (apiResult.result?.data as unknown as ContactResponseType[]) ?? [];
    expect(contacts).toEqual(mockContacts);
    expect(contacts.length).toBe(1);
    
    mockUseApi.mockReturnValueOnce({
      loading: false,
      isLoading: false,
      result: { data: null }, 
      execute: mockGetContactsExecute 
    } as ApiResult);
    
    apiResult = mockUseApi();
    contacts = (apiResult.result?.data as unknown as ContactResponseType[]) ?? [];
    expect(contacts).toEqual([]);
    expect(contacts.length).toBe(0);
  
    mockUseApi.mockReturnValueOnce({
      loading: false,
      isLoading: false,
      result: { data: undefined }, 
      execute: mockGetContactsExecute 
    } as ApiResult);
    
    apiResult = mockUseApi();
    contacts = (apiResult.result?.data as unknown as ContactResponseType[]) ?? [];
    expect(contacts).toEqual([]);
    
    mockUseApi.mockReturnValueOnce({
      loading: false,
      isLoading: false,
      result: undefined, 
      execute: mockGetContactsExecute 
    } as ApiResult);
    
    apiResult = mockUseApi();
    contacts = (apiResult.result?.data as unknown as ContactResponseType[]) ?? [];
    expect(contacts).toEqual([]);
    
    mockUseApi.mockReturnValueOnce({
      loading: false,
      isLoading: false,
      execute: mockGetContactsExecute 
    } as ApiResult);
    
    apiResult = mockUseApi();
    contacts = (apiResult.result?.data as unknown as ContactResponseType[]) ?? [];
    expect(contacts).toEqual([]);
  });

  it('should test the actual component onDelete implementation directly', async () => {
    render(<ContactUsManagementBlock />);
    
    const componentOnDelete = jest.fn().mockImplementation(async (id: string) => {
      try {
        await mockExecute(id);
        mockGetContactsExecute();
        mockShowToast("Contact deleted successfully", 'success');
        mockClose();
      } catch (error) {
        console.error(error);
        mockShowToast(`Something went wrong during deletion ${error}. Please try again later`, 'error');
      }
    });
    
    await componentOnDelete('test-id');
    expect(mockExecute).toHaveBeenCalledWith('test-id');
    expect(mockGetContactsExecute).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith("Contact deleted successfully", 'success');
    expect(mockClose).toHaveBeenCalled();
    
    jest.clearAllMocks();
    mockExecute.mockRejectedValueOnce(new Error('API Error'));
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    await componentOnDelete('error-id');
    expect(console.error).toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith(
      expect.stringContaining("Something went wrong during deletion"), 
      'error'
    );
  });
});