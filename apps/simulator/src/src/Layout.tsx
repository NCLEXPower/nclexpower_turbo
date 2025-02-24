import { Footer, Header } from '@/components';
import { LoadablePageContent } from '@/components/LoadablePageContents';
import { PageContainer } from '@/components/PageContainer';
import { ParseContents } from '@/components/parse-contents';
import { useApplicationContext } from '@/core/context/AppContext';
import { SsrMockQuestionaire } from '@/core/types/ssrData';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AlertMessageV2Provider } from 'core-library/contexts/AlertMessageContext';
import { FormSubmissionContextProvider, ToastProvider, useAuthContext } from 'core-library/contexts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ControlledToast } from 'core-library/components';
import { ProgressProvider } from '@/core/context/ProgressContext';
import { MobileDetectionProvider } from 'core-library/contexts/MobileDetectionContext';
import { ToolbarSettingsProvider } from '@/core/context/ToolbarSettingsContext';

interface Props {
  questionaire: SsrMockQuestionaire[];
  data?: any;
}

export const Layout: React.FC<Props> = ({ questionaire, data }) => {
  const { loading, itemselect, hasAccessToken } = useApplicationContext();
  const { logout } = useAuthContext();
  const theme = createTheme();
  const queryClient = new QueryClient({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <MobileDetectionProvider>
          <ProgressProvider>
            <FormSubmissionContextProvider>
              <QueryClientProvider client={queryClient}>
                <div className="min-h-screen flex flex-col bg-slate-100">
                  <AlertMessageV2Provider>
                    <ToolbarSettingsProvider>
                      {hasAccessToken && <Header logout={logout} current={itemselect[0]?.current} />}
                      <PageContainer selectedItem={itemselect}>
                        <div className="min-h-[65dvh] flex flex-col justify-between questionnaire-step-8">
                          <LoadablePageContent loading={loading}>
                            <DndProvider backend={HTML5Backend}>
                              <ControlledToast autoClose={5000} hideProgressBar={false} />
                              {/* Code below must be refactored after case study structure development completed. */}
                              {itemselect.length > 0 && (
                                <ParseContents questionType={itemselect[0].typeOfQuestion} itemSelected={itemselect} />
                              )}
                            </DndProvider>
                          </LoadablePageContent>
                        </div>
                      </PageContainer>
                      {hasAccessToken && (
                        <Footer
                          actionKey={itemselect?.length > 0 ? itemselect[0].actionKey : 'no-action-key'}
                          loading={loading}
                        />
                      )}
                    </ToolbarSettingsProvider>
                  </AlertMessageV2Provider>
                </div>
              </QueryClientProvider>
            </FormSubmissionContextProvider>
          </ProgressProvider>
        </MobileDetectionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
