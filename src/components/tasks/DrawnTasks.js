import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchDrawnTasks,
  drawTask,
  finishTask,
} from "../../store/actions/task";
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
  Grid,
  Box,
} from "@mui/material";
import { ConfirmDialog } from "primereact/confirmdialog";

function DrawnTasks(props) {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [taskToFinish, setTaskToFinish] = useState(false);

  useEffect(() => {
    props.fetchDrawnTasks();

    setLoading(false);
  }, []);

  function drawNewTask() {
    props.drawTask();
  }

  function finishTask() {
    props.finishTask(taskToFinish);
  }

  const theme = createTheme();
  let tasks = <p>Loading...</p>;
  if (!loading) {
    tasks = props.tasks.map((task) => (
      <Card key={task.id}>
        <CardContent>
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
          <Grid container justify="center" sx={{ ml: { sm: 3 } }} spacing={2}>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              <Typography sx={{ fontSize: 16 }}>
                <b>Data wygaśnięcia:</b> {dateFormatter(task.expirationDate)} (
                {new Date(task.expirationDate).getDate() - new Date().getDate()}{" "}
                dni)
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" sx={{ ml: { sm: 3 } }} spacing={2}>
            <Grid item lg={3} sm={12} md={6} xs={12}>
              {task.drawnUser ? (
                <Typography sx={{ fontSize: 16, color: "DarkGreen" }}>
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
        <CardActions>
          {task.drawnUser ? (
            <>
              <Button
                onClick={() => setTaskToFinish(task.id)}
                variant="contained"
                disabled={task.drawnUser.name !== props.auth.user.name}
              >
                Zakończ zadanie
              </Button>
              <ConfirmDialog
                visible={taskToFinish}
                onHide={() => setTaskToFinish(false)}
                message="Czy na pewno chcesz zakończyć zadanie?"
                header="Potwierdzenie"
                icon="pi pi-question-circle"
                acceptLabel="Tak"
                rejectLabel="Nie"
                accept={() => finishTask()}
              />
            </>
          ) : null}
        </CardActions>
      </Card>
    ));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Stack spacing={3}>{tasks}</Stack>
      </Container>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Czy na pewno chcesz wylosować kolejne zadanie?"
        header="Potwierdzenie"
        icon="pi pi-question-circle"
        acceptLabel="Tak"
        rejectLabel="Nie"
        accept={() => drawNewTask()}
      />
      <Button onClick={() => setVisible(true)}>Wylosuj nowe zadanie</Button>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDrawnTasks: () => dispatch(fetchDrawnTasks()),
    drawTask: () => dispatch(drawTask()),
    finishTask: (taskId) => dispatch(finishTask(taskId)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawnTasks);
