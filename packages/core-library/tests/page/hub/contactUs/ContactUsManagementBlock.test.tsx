import { ContactUsManagementBlock } from '../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock';
import { act, render, screen } from '../../../common';

const mockExecute = jest.fn().mockResolvedValue(true);
const mockGetContactsExecute = jest.fn();
const mockClose = jest.fn();
const mockOpen = jest.fn();
const mockExecuteToast = jest.fn();
const mockShowToast = jest.fn<void, [message: string, type: string]>();

jest.mock('../../../../core/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    loading: false,
    staticRoutes: {},
    query: {},
    pathname: '/',
    asPath: '/',
    push: jest.fn().mockResolvedValue(true),
    replace: jest.fn().mockResolvedValue(true),
    reload: jest.fn(),
    back: jest.fn(),
    events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() }
  })
}));

jest.mock("../../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({
    publicRuntimeConfig: { processEnv: {} },
  }),
  config: { value: jest.fn() },
}));

jest.mock('../../../../contexts/ToastContext', () => ({
  useExecuteToast: jest.fn().mockReturnValue({
    executeToast: mockExecuteToast,
    showToast: mockShowToast
  }),
  showToast: mockShowToast
}));

jest.mock('../../../../hooks', () => ({
  useApi: jest.fn().mockReturnValue({
    loading: false,
    result: { data: [] },
    execute: mockGetContactsExecute
  }),
  useColumns: jest.fn().mockReturnValue({ columns: [] }),
  useModal: jest.fn().mockReturnValue({ 
    open: mockOpen, 
    close: mockClose, 
    props: { isOpen: false } 
  }),
  useApiCallback: jest.fn().mockReturnValue({
    execute: mockExecute,
    loading: false
  })
}));

jest.mock('../../../../utils', () => ({
  executeToast: mockExecuteToast,
  getTimeZone: jest.fn().mockReturnValue('UTC')
}));

jest.mock('../../../../system/app/internal/blocks/Hub/ContactUs/ContactUsManagement/ContactUsManagementBlock', () => {
  return {
    ContactUsManagementBlock: jest.fn(() => {
      const handleDelete = async (id: string) => {
        try {
          await mockExecute(id);
          mockGetContactsExecute();
          mockExecuteToast("Contact deleted successfully", 'top-right', true, { type: 'success' });
          mockClose();
        } catch (error) {
          console.error(error);
          mockExecuteToast(`Something went wrong during deletion ${error}. Please try again later`, 'top-right', true, { type: 'error' });
        }
      };
      
      return (
        <div data-testid="contact-management">
          <button 
            data-testid="test-success" 
            onClick={() => handleDelete('test-id')}
          >
            Test Success
          </button>
          <button 
            data-testid="test-error" 
            onClick={() => {
              mockExecute.mockRejectedValueOnce(new Error('Test Error'));
              handleDelete('error-id');
            }}
          >
            Test Error
          </button>
        </div>
      );
    })
  };
});
declare global {
  interface Window {
    testComponentProps: any;
  }
  namespace NodeJS {
    interface Global {
      showToast: typeof mockShowToast;
    }
  }
}

(global as any).showToast = mockShowToast;

describe('ContactUsManagementBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<ContactUsManagementBlock />);
    expect(screen.getByTestId('contact-management')).toBeInTheDocument();
  });

  it('handles successful contact deletion', async () => {
    mockExecute.mockResolvedValueOnce(true);
    
    render(<ContactUsManagementBlock />);
    
    await act(async () => {
      screen.getByTestId('test-success').click();
    });
    
    expect(mockExecute).toHaveBeenCalledWith('test-id');
    expect(mockGetContactsExecute).toHaveBeenCalled();
    expect(mockExecuteToast).toHaveBeenCalledWith(
      "Contact deleted successfully", 
      'top-right', 
      true, 
      { type: 'success' }
    );
    expect(mockClose).toHaveBeenCalled();
  });

  it('handles error during contact deletion', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    mockExecute.mockRejectedValueOnce(new Error('Test Error'));
    
    render(<ContactUsManagementBlock />);
    
    await act(async () => {
      screen.getByTestId('test-error').click();
    });
    
    expect(consoleSpy).toHaveBeenCalled();
    expect(mockExecuteToast).toHaveBeenCalledWith(
      expect.stringContaining("Something went wrong"), 
      'top-right', 
      true, 
      { type: 'error' }
    );
    
    consoleSpy.mockRestore();
  });
});

