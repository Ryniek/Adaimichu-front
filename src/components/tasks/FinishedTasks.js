import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchFinishedTasks } from "../../store/actions/task";
import dateFormatter from "../../features/converters/dateConverter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import {
  CssBaseline,
  Stack,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Grid,
} from "@mui/material";
import { spacing } from "@mui/system";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function FinishedTasks(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.fetchFinishedTasks();

    setLoading(false);
  }, []);

  const theme = createTheme();
  let tasks = <p>Loading...</p>;
  if (!loading) {
    tasks = props.tasks.map((task) => (
      <Card key={task.id}>
        <CardContent>
          {task.finishDate ? (
            <Typography sx={{ color: "#2e7d32", fontSize: 18 }}>
              <SentimentSatisfiedAltIcon fontSize="large" color="success" />
              <b>Wykorzystana</b>
            </Typography>
          ) : (
            <Typography sx={{ color: "#d32f2f", fontSize: 18 }}>
              <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />
              <b>Niewykorzystana</b>
            </Typography>
          )}
          <Typography sx={{ fontSize: 20 }}>
            <b>Nazwa:</b> {task.name}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>
            {task.comment ? (
              <>
                <b>Komentarz:</b> {task.comment}
              </>
            ) : null}
          </Typography>
          <Grid container justify="center" sx={{ ml: {sm: 3} }} spacing={2}>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              <Typography sx={{ fontSize: 16 }}>
                <b>Data utworzenia:</b> {dateFormatter(task.creationDate)}
              </Typography>
            </Grid>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              {task.finishDate ? (
                <Typography sx={{ fontSize: 16 }}>
                  <b>Data zakończenia:</b> {dateFormatter(task.finishDate)}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
          <Grid container justify="center" sx={{ ml: {sm: 3} }} spacing={2}>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              {task.expirationDate ? (
                <Typography sx={{ fontSize: 16 }}>
                  <b>Data wygaśnięcia:</b> {dateFormatter(task.expirationDate)}
                </Typography>
              ) : null}
            </Grid>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              <Typography sx={{ fontSize: 16 }}>
                <b>Dni do wykorzystania:</b> {task.daysToUse}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" sx={{ ml: {sm: 3} }} spacing={2}>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              {task.drawnUser ? (
                <Typography sx={{ fontSize: 16, color:"DarkGreen" }}>
                  <b>Wylosowana przez:</b> {task.drawnUser.name}
                </Typography>
              ) : null}
            </Grid>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              <Typography sx={{ fontSize: 16 }}>
                <b>Utworzona przez:</b> {task.creator.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Stack spacing={3}>{tasks}</Stack>
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFinishedTasks: () => dispatch(fetchFinishedTasks()),
  };
};

const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishedTasks);