/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useState } from 'react';
import { Button, DialogBox, EvaIcon, TextField } from '../../../../../../components';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubsequentSchema, SubsequentType, } from './validation'

type Props = {
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
}

export const SubsequentDialog: React.FC<Props> = ({
  handleClickOpen,
  handleClose,
  open
}) => {
  const form = useForm({
    mode: "all",
    resolver: yupResolver(SubsequentSchema),
    defaultValues: { ...SubsequentSchema.getDefault() }
  })

  const { control, handleSubmit, clearErrors } = form

  function onSubmit(values: SubsequentType) {
    console.log(values)
  }
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}
        sx={{
          color: '#F3F3F3',
          width: "100%",
          backgroundColor: '#3B0086',
          borderRadius: 6,
          "&:hover": {
            backgroundColor: 'rgba(59, 0, 134, 0.95)',
            color: "#F3F3F3"
          },
        }}>
        Add Subsequent
      </Button>
      <DialogBox
        handleClose={handleClose}
        loading={false}
        maxWidth={"md"}
        open={open}
        sx={{ zIndex: 1 }}
      >
        <Box sx={{
          paddingX: 8,
          width: "100%",
          height: '100%',
          display: 'flex ',
          alignItems: 'start',
          justifyContent: "center",
          flexDirection: "column"
        }}>
          <Typography>
            Subsequent Form
          </Typography>
          <Typography>
            Add items to your list. Click submit when you&apos;re done.
          </Typography>
          <TextField<SubsequentType>
            control={control}
            placeholder="Add subsequent"
            name="subsequent"
            sx={{
              borderRadius: "5px",
              width: "100%",
              backgroundColor: "#FFF",
              border: "1px solid #3B0086",
            }}
            inputProps={{
              style: { padding: 20, borderRadius: "3px" },
            }}
            onBlur={() => clearErrors()}
          />
          <Box sx={{ width: '100%', marginTop: 4, display: 'flex', justifyContent: 'end' }}>
            <Button onClick={handleSubmit(onSubmit)} sx={{
              backgroundColor: '#3B0086',
              border: "1px solid #3B0086",
              borderRadius: 6,
            }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </DialogBox>
    </React.Fragment>
  )
}

export const EndConversationDialog: React.FC<Props> = ({
  handleClickOpen,
  handleClose,
  open
}) => {
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}
        sx={{
          color: '#3B0086',
          width: "100%",
          backgroundColor: 'transparent',
          border: '1px solid #3B0086',
          borderRadius: '10px',
          "&:hover": {
            backgroundColor: '#3B0086',
            color: "#F3F3F3"
          },
        }}>
        End Conversation
      </Button>
      <DialogBox
        handleClose={handleClose}
        loading={false}
        maxWidth={"md"}
        open={open}
        sx={{ zIndex: 1 }}
      >
        <Box sx={{ paddingX: 8, width: "100%", height: '100%', display: 'flex ', alignItems: 'start', justifyContent: "center", flexDirection: "column" }}>
          <div className="flex items-center justify-start gap-2">
            <EvaIcon name="alert-triangle" fill="#F1664B" width={35} height={35} />
            <Typography sx={{ color: "#F1664B", fontSize: '1.5rem', fontWeight: "bold" }}>
              Confirm End of Conversation
            </Typography>
          </div>
          <Typography>
            Are you sure after this subsequent you want to end this conversation?
            This action cannot be undone.
          </Typography>
          <Box sx={{ width: '100%', gap: 3, marginTop: 4, display: 'flex', justifyContent: 'end', alignItems: 'center', flexDirection: 'row-reverse' }}>
            <Button onClick={handleClose} sx={{
              backgroundColor: '#F1664B',
              border: "1px solid #F1664B",
              borderRadius: '6px',
              "&:hover": {
                backgroundColor: 'rgba(241, 102, 75, 0.95)',
                color: "#F3F3F3"
              },
            }}
            >
              Yes, End Conversation
            </Button>
            <Button onClick={handleClose} sx={{
              backgroundColor: 'transparent',
              border: "1px solid #030303",
              borderRadius: '6px',
              color: "#030303",
              "&:hover": {
                backgroundColor: "#606060",
                color: "#F3F3F3"
              },
            }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogBox>
    </React.Fragment>
  );
}


