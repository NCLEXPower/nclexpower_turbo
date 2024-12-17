import { Box, Typography } from '@mui/material'
import React from 'react'
import {
  Button,
  ControlledRichTextEditor,
  FileUploadField,
  TextField
} from '../../../../../../components'
import { AnnouncementSchema, AnnouncementType } from './validation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const AnnouncementPage: React.FC = () => {
  const method = useForm<AnnouncementType>({
    mode: "all",
    resolver: yupResolver(AnnouncementSchema),
    defaultValues: { ...AnnouncementSchema.getDefault() }
  })

  const { control, handleSubmit, clearErrors } = method;

  const onSubmit = (params: AnnouncementType) => {
    console.log(params);
  }

  return (
    <FormProvider {...method}>
      <Box sx={{ width: "100%", padding: 4 }}>
        <TextField<AnnouncementType>
          control={control}
          name="title"
          label="Title Content"
          placeholder="Add the content title here...."
          onBlur={() => clearErrors()}
          sx={{ borderRadius: '5px', marginBottom: 6 }}
          inputProps={{ style: { padding: 15, borderRadius: '5px' } }}
        />
        <Box sx={{ width: "100%", boxShadow: 1, backgroundColor: "#FFF", paddingX: 4, paddingY: 3, height: 'auto', marginBottom: 4 }}>
          <Typography sx={{ fontSize: '1.5rem', color: "#3B0086", fontWeight: "bold", marginBottom: 6 }}>Content</Typography>
          <ControlledRichTextEditor
            editorFor="questions"
            placeholder="Add content here..."
            name='content'
            control={control}
          />
        </Box>
        <Box sx={{ width: "100%", display: "flex", alignItems: "start", justifyContent: "flex-start" }}>
          <FileUploadField control={control} name="image" />
        </Box>
        <Button onClick={handleSubmit(onSubmit)}
          sx={{
            color: '#F3F3F3',
            width: '100%',
            backgroundColor: '#3B0086',
            borderRadius: 6,
            "&:hover": {
              backgroundColor: 'rgba(59, 0, 134, 0.95)',
              color: "#F3F3F3"
            },
          }}>
          Submit
        </Button>
      </Box >
    </FormProvider >
  )
}