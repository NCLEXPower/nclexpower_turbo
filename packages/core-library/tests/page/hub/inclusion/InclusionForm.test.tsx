import React from 'react';
import { act, screen, render, fireEvent, waitFor } from "../../../common";
import { InclusionForm } from '../../../../system/app/internal/blocks/Hub/Product/inclusion/InclusionForm';

jest.mock("../../../../config", () => ({
  getConfig: jest.fn().mockReturnValue({
    publicRuntimeConfig: { processEnv: {} },
  }),
  config: { value: jest.fn() },
}));

jest.mock("../../../../core/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn()
    },
    replace: jest.fn(),
    back: jest.fn(),
    loading: false,
  })),
}));

jest.mock("../../../../hooks/useKeyDown", () => ({
  useKeyDown: jest.fn(),
}));

describe('InclusionForm', () => {
  const mockOnSubmit = jest.fn().mockImplementation((data) => {
    
    return Promise.resolve(data);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reset form fields after submission', async () => {
    render(<InclusionForm onSubmit={mockOnSubmit} />);

 
    const inclusionInput = screen.getByLabelText(/Add Inclusion/i);
    const descriptionTextarea = screen.getAllByRole('textbox')[1]; 
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    

    fireEvent.change(inclusionInput, { target: { value: 'Test Inclusion' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'Test Description' } });
    
   
    expect(inclusionInput).toHaveValue('Test Inclusion');
    expect(descriptionTextarea).toHaveValue('Test Description');
    

    await act(async () => {
      fireEvent.click(submitButton);
    });

   
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
    

    await waitFor(() => {
      expect(inclusionInput).toHaveValue('');
      expect(descriptionTextarea).toHaveValue('');
    }, { timeout: 3000 });
  });
});
