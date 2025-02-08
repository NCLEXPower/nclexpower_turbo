import { render, screen } from '../../common';
import { useAtomValue } from 'jotai';
import { EnvironmentSelection } from '../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/component/EnvironmentSelection';

jest.mock('../../../config', () => ({
  config: { value: jest.fn() },
}));

jest.mock('../../../core/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtomValue: jest.fn(),
}));

const mockUseAtomValue = useAtomValue as jest.Mock;

describe('Environment Selection Component', () => {
  const sampleAtom = { id: 1, label: 'dev' };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAtomValue.mockReturnValue(sampleAtom);
  });

  it('renders the form when isLoading is false', () => {
    render(
      <EnvironmentSelection
        onSubmit={jest.fn()}
        currentMaintenance={[]}
        isLoading={false}
      />
    );

    expect(screen.getByTestId('env-selection')).toBeInTheDocument();
  });
});
