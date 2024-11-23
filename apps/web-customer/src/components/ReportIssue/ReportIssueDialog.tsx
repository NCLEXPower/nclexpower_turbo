import React, { useState } from 'react';
import { Button } from '@mui/material';
import { DialogBox } from 'core-library/components/Dialog/DialogBox';
import { useBusinessQueryContext } from 'core-library/contexts';
import { ReportIssueType } from 'core-library/api/types';
import ReportIssueForm from './ReportIssueForm';
import { EvaIcon } from 'core-library/components';

export default function ReportIssueDialog() {
  const [open, setOpen] = useState(false);
  const { businessQueryCreateReportIssue } = useBusinessQueryContext();
  const { mutateAsync } = businessQueryCreateReportIssue();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function onSubmit(params: ReportIssueType) {
    await mutateAsync({ ...params });
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} sx={{ color: '#F3F3F3' }}>
            <EvaIcon
                name="alert-circle"
                fill="#F3F3F3"
                width={40}
                height={40}
                ariaHidden
              />
        Report Issue
      </Button>
      <DialogBox
        handleClose={handleClose}
        loading={false}
        maxWidth={"md"}
        open={open}
        header='Report an Issue'
        hideCloseButton={false}
        sx={{ zIndex: 1 }}
      >
        <ReportIssueForm onSubmit={onSubmit} />
      </DialogBox>
    </React.Fragment>
  );
}
