import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../common';
import { InclusionEditForm } from '../../../../components/Dialog/DialogFormBlocks/inclusion/InclusionEditForm';
import { useAtomValue } from 'jotai';
import { useForm } from 'react-hook-form';


jest.mock("../../../../../config", () => ({
  config: { value: jest.fn() },
}));


jest.mock('../../../../components/Dialog/DialogFormBlocks/inclusion/validation', () => ({
  UpdateInclusionSchema: {
    getDefault: jest.fn(() => ({})),
  },
  UpdateInclusionType: {}
}));


jest.mock('@mui/material', () => {
  return {
    Box: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
      <div data-testid="mui-box" {...props}>{children}</div>
    )
  };
});


jest.mock('../../../../components', () => {
  return {
    Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
      <button data-testid="button" onClick={onClick}>{children}</button>
    ),
    TextField: ({ label, name, control }: { label: string; name: string; control: any }) => (
      <input data-testid={`input-${name}`} placeholder={label} />
    ),
  };
});


const mockMutateAsync = jest.fn();
const mockCloseDialog = jest.fn();
const mockExecuteToast = jest.fn();
const mockInvalidateQueries = jest.fn();


jest.mock('../../../../contexts', () => ({
  useBusinessQueryContext: () => ({
    businessQueryUpdateInclusion: () => ({
      mutateAsync: mockMutateAsync
    })
  }),
  useDialogContext: () => ({
    closeDialog: mockCloseDialog
  }),
  useExecuteToast: () => ({
    executeToast: mockExecuteToast
  })
}));


jest.mock('react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: mockInvalidateQueries
  })
}));


jest.mock('@hookform/resolvers/yup', () => ({
  yupResolver: () => ({})
}));


jest.mock('jotai', () => ({
  useAtomValue: jest.fn()
}));


jest.mock('../../../../components/Dialog/DialogFormBlocks/inclusion/useAtomic', () => ({
  InclusionIdAtom: {}
}));


let formSubmitHandler: (data: any) => void;


jest.mock('react-hook-form', () => ({
  useForm: jest.fn(({ defaultValues }) => {
    return {
      control: {},
      handleSubmit: (handler: any) => {
      
        formSubmitHandler = handler;
        
       
        return (e: any) => {
          e?.preventDefault?.();
      
          return handler({
            id: defaultValues.id,
            option: defaultValues.option,
            description: defaultValues.description
          });
        };
      },
      reset: jest.fn()
    };
  })
}));

describe('InclusionEditForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    formSubmitHandler = null as any;
    
   
    (useAtomValue as jest.Mock).mockReturnValue({
      id: '123',
      option: 'Test Inclusion',
      description: 'Test Description'
    });
  });
  
  test('initializes form with correct defaultValues from Inclusion atom', () => {
  
    render(<InclusionEditForm />);
    
 
    expect(useForm).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValues: expect.objectContaining({
          id: '123',
          option: 'Test Inclusion',
          description: 'Test Description'
        })
      })
    );
  });
  
  test('handles empty values correctly in defaultValues', () => {
   
    (useAtomValue as jest.Mock).mockReturnValue({
      id: '123'
   
    });
    
    render(<InclusionEditForm />);
    
    expect(useForm).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultValues: expect.objectContaining({
          id: '123',
          option: '',
          description: ''
        })
      })
    );
  });
  
  test('submits form with correct transformed values', async () => {
    mockMutateAsync.mockResolvedValue({ data: 200 });
    
    render(<InclusionEditForm />);
    
   
    if (formSubmitHandler) {
      await formSubmitHandler({
        id: '123',
        option: 'Test Inclusion',
        description: 'Test Description'
      });
    }
    
 
    expect(mockMutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '123',
        option: 'Test Inclusion',
        description: 'Test Description'
      })
    );
  });
  
  test('ensures id is included even if empty', async () => {
   
    (useAtomValue as jest.Mock).mockReturnValue({
      option: 'Test Inclusion',
      description: 'Test Description'
    });
    
    mockMutateAsync.mockResolvedValue({ data: 200 });
    
    render(<InclusionEditForm />);
    
   
    if (formSubmitHandler) {
      await formSubmitHandler({
        id: undefined,
        option: 'Test Inclusion',
        description: 'Test Description'
      });
    }
    
  
    expect(mockMutateAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '', 
        option: 'Test Inclusion',
        description: 'Test Description'
      })
    );
  });
  
  test('shows error toast when inclusion already exists', async () => {
    mockMutateAsync.mockResolvedValue({ data: 409 });
    
    render(<InclusionEditForm />);
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockExecuteToast).toHaveBeenCalledWith(
        "Inclusion already exist",
        'top-right',
        true,
        { type: 'error' }
      );
    });
  });
  
  test('shows error toast when an exception occurs', async () => {
    mockMutateAsync.mockRejectedValue(new Error('API error'));
    
    render(<InclusionEditForm />);
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockExecuteToast).toHaveBeenCalledWith(
        'Somethin went wrong. Please try again later',
        'top-right', 
        true, 
        { type: 'error' }
      );
    });
  });
  
  test('completes successful submission workflow', async () => {
    mockMutateAsync.mockResolvedValue({ data: 200 });
    
    render(<InclusionEditForm />);
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
      expect(mockCloseDialog).toHaveBeenCalled();
      expect(mockInvalidateQueries).toHaveBeenCalledWith("getAllInclusionApi");
    });
  });
});
