import { Box, Container, Grid, Typography } from "@mui/material";
import { RegularQuestionTypeFormBlock } from "./form/RegularQuestionTypeFormBlock";
import { Alert, Card } from '../../../../../../../../components';

export const CreateRegularQuestionTypeBlock = () => {
  return (
    <Box>
      <Container>
        <Alert
          severity="info"
          title="Regular Question Type Management"
          description="You can create regular question type on this page."
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Card sx={{ mt: 5, width: "100%" }} elevation={5}>
              <Typography variant="button">
                Regular Question Type Form
              </Typography>
              <RegularQuestionTypeFormBlock />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ mt: 5, width: "100%" }} elevation={5}></Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
