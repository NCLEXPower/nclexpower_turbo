import { useSetAtom } from 'jotai';
import { EnvironmentSelection } from '../content/component/EnvironmentSelection';
import { SelectedConfirmationObj } from '../../../../../../../../../components/Dialog/DialogFormBlocks/inclusion/useAtomic';
import { SettingsSelectionType } from '../../types';
import { Box, Typography } from '@mui/material';
import {
  Button,
  EvaIcon,
  PageLoader,
} from '../../../../../../../../../components';
import { useMaintenanceMode } from '../../../../../../../../../hooks';
import {
  useBusinessQueryContext,
  useExecuteToast,
} from '../../../../../../../../../contexts';

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}

export const MixPanelTracking: React.FC<Props> = ({ previousStep }) => {
  const { data, loading, refetch } = useMaintenanceMode();
  const setStatus = useSetAtom(SelectedConfirmationObj);
  const { businessQueryCommenceEnvMaintenanceMode } = useBusinessQueryContext();
  const { mutateAsync, isLoading } = businessQueryCommenceEnvMaintenanceMode();
  const { showToast } = useExecuteToast();

  const handleBack = () => {
    setStatus(null);
    previousStep();
  };

  if (loading) {
    return (
      <Box data-testid='fetch-loading'>
        <PageLoader />
      </Box>
    );
  }

  const confirmChange = async (environment: string) => {
    const checker = data?.currentMaintenanceMode.includes(environment);
    await mutateAsync([environment]);
    refetch();
    showToast(
      `${environment.toUpperCase()} Environment is now ${checker ? 'Active' : 'Under Maintenance'} `,
      'success'
    );
  };
  return (
    <Box
      data-testid='mixpanel-mode-id'
      sx={{
        width: '100%',
        height: 'fit-content',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Button
        onClick={handleBack}
        variant='text'
        size='small'
        sx={{
          ml: 5,
          display: 'flex',
          alignSelf: 'self-start',
          bgcolor: '#dedeec',
          padding: 3,
          borderRadius: '15px',
        }}
      >
        <EvaIcon
          id='back-icon'
          name='arrow-ios-back-outline'
          fill='#0F2A71'
          width={20}
          height={20}
          ariaHidden
        />
        Back
      </Button>
      <Box sx={{ width: '80%' }}>
        <Typography color='#3B0086' fontWeight={700} variant='h2'>
          Web Customer : Mix Panel Tracking
        </Typography>
        <EnvironmentSelection
          onSubmit={confirmChange}
          currentMaintenance={data?.currentMaintenanceMode}
          isLoading={isLoading}
        ></EnvironmentSelection>
      </Box>
    </Box>
  );
};
