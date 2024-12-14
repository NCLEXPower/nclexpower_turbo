/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { SettingsSelectionType } from '../../../types';
import { Box, Card } from '@mui/material';
import { Button, DataGrid, TextField } from '../../../../../../../../../../components';


interface Props {
    nextStep(values: Partial<SettingsSelectionType>): void;
    previousStep(): void;
    values: Partial<SettingsSelectionType>;
    previous: () => void;
    reset: () => void;
}

export const CoreTeamManagement: React.FC<Props> = ({
    previousStep,
    previous,
    reset,
}) => {


    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    height: "100dvh",
                    padding: "20px",
                    display: "flex",
                    alignItems: 'center',
                    flexDirection: "column",
                    gap: 5,
                }}
            >
                <Button
                    onClick={previousStep}
                    variant="text"
                    size="small"
                    sx={{ mb: 5 }}
                >
                    Back
                </Button>
                <Box sx=
                    {{
                        width: '100%',
                        padding: "20px",
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#f5f2f9',
                        alignItems: 'center'
                    }}>
                    <Box sx={{ width: '90%', display: 'flex', gap: "10px", paddingY: '25px' }}>
                        <Button sx={{ width: '100%' }}>Create Member</Button>
                        <Button sx={{ width: '100%' }}>Update Member</Button>
                        <Button sx={{ width: '100%' }}>Remove Member</Button>
                    </Box>

                    <Card sx={{ mt: 5, width: "100%", padding: 4 }} elevation={5}>
                        <DataGrid
                            columns={[]}
                            initPageSize={10}
                            rows={[]}
                            isLoading={false}
                            data-testid="data-grid"
                        />
                    </Card>
                </Box>

            </Box>
        </Box>
    );


};
