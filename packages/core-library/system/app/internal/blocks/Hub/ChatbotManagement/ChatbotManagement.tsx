/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  Button,
  ControlledRichTextEditor,
  EvaIcon
} from "core-library/components";
import { SubsequentDialog, EndConversationDialog } from "./ChatbotDialogs";
import { ChatbotParent } from "./ChatbotData";
import { ChatbotOptionType, ChatbotOptionSchema } from './validation'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useModal } from "../../../../../../hooks";

type Props = {
  onSubmit: (data: ChatbotOptionType) => void;
}

export const ChatbotManagement: React.FC<Props> = ({ onSubmit }) => {

  const subsequentDialog = useModal();
  const endConversationDialog = useModal();

  const form = useForm({
    mode: "all",
    resolver: yupResolver(ChatbotOptionSchema),
    defaultValues: { ...ChatbotOptionSchema.getDefault() }
  })

  const { control, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <Box sx={{
        backgroundColor: 'rgba(59, 0, 134, 0.05)',
        paddingX: 10,
        marginBottom: 2,
        display: 'flex',
        gap: 2,
        paddingY: 6
      }}>
        <div>
          <EvaIcon name="alert-circle-outline" fill="#3B0086" width={30} height={30} />
        </div>
        <div className="flex flex-col">
          <Typography sx={{ color: '#3B0086', fontWeight: 'bold' }}>Heads Up!</Typography>
          <Typography sx={{ color: '#3B0086' }}>This is the chatbot management page user interface</Typography>
        </div>
      </Box>
      <Grid container sx={{ width: "100%", display: "flex", height: "100%" }}>
        <Grid
          lg={3}
          sx={{ paddingX: 1 }}
          item
        >
          <Button sx={{
            width: "100%",
            backgroundColor: 'rgba(59, 0, 134, 0.05)',
            marginBottom: 4,
            color: '#030303',
            "&:hover": {
              backgroundColor: "#3B0086",
              color: "#F3F3F3"
            }
          }}>
            Start
          </Button>
        </Grid>
        <Grid
          lg={6}
          item
          sx={{ paddingX: 1 }}
        >
          <Box sx={{
            padding: 8,
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(59, 0, 134, 0.05)',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: '#3B0086', fontWeight: 'bold' }}>Start</Typography>
              <Box sx={{ width: "100%", boxShadow: 1, backgroundColor: "#FFF", paddingX: 4, paddingY: 3, height: 250 }}>
                <ControlledRichTextEditor
                  editorFor="default"
                  placeholder="Add answer here..."
                  name='AnswerText'
                  control={control}
                />
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ color: '#3B0086', fontWeight: 'bold', marginBottom: 2 }}>Options: </Typography>
              {ChatbotParent.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    marginBottom: 2,
                    width: "100%",
                    borderRadius: '10px',
                    backgroundColor: '#FFF',
                    border: "1px solid #606060",
                    color: "#3B0086",
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "space-between",
                    "&:hover": {
                      backgroundColor: "#3B0086",
                      color: "#F3F3F3"
                    },
                  }}
                >
                  {item.parent}
                  <EvaIcon name="trash-2" fill="#F1664B" width={20} height={20} />
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid
          lg={3}
          item
          sx={{ paddingX: 1 }}
        >
          <SubsequentDialog
            open={subsequentDialog.props.isOpen}
            handleClickOpen={subsequentDialog.open}
            handleClose={subsequentDialog.close}
          />
          <Box sx={{ width: "100%", height: "100%", backgroundColor: 'rgba(59, 0, 134, 0.05)' }}>
            <Typography sx={{ color: '#3B0086', fontWeight: 'bold', padding: 4 }}>Subsequent Lists:</Typography>
            <hr />
            {ChatbotParent.map((item, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 2,
                  width: "100%",
                  backgroundColor: 'transparent',
                  color: "#3B0086",
                  padding: 4,
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: "space-between"
                }}
              >
                {item.parent}
                <EvaIcon name="plus-circle-outline" fill="#3B0086" width={20} height={20} />
              </Box>
            ))}
            <Box sx={{ marginTop: 4, paddingX: 4 }}>
              <EndConversationDialog
                open={endConversationDialog.props.isOpen}
                handleClickOpen={endConversationDialog.open}
                handleClose={endConversationDialog.close}
              />
            </Box>
          </Box>
          <Button onClick={handleSubmit(onSubmit)} sx={{
            width: '100%',
            px: 4,
            py: 2,
            backgroundColor: "#3B0086",
            borderRadius: "3px",
            marginY: 3
          }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormProvider >
  );
}
