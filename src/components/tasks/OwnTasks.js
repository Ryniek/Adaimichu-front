import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchOwnedTasks, toggleHidden, deleteTask } from "../../store/actions/task";
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
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dateFormatter from "../../features/converters/dateConverter";
import FlagIcon from "@mui/icons-material/Flag";
import { ConfirmDialog } from "primereact/confirmdialog";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";

function OwnTasks(props) {
  const [loading, setLoading] = useState(true);
  const [taskToDelete, setTaskToDelete] = useState(false);

  useEffect(() => {
    props.fetchOwnedTasks();

    setLoading(false);
  }, []);

  function toggleHandler(id) {
    props.toggleHidden(id);
  }

  function deleteTask() {
    props.deleteTask(taskToDelete);
  }

  const theme = createTheme();
  let tasks = <p>Loading...</p>;
  if (!loading) {
    tasks = props.tasks.map((task) => (
      <Card key={task.id}>
        <CardContent>
          {task.started === true ? (
            <Typography sx={{ color: "#2e7d32", fontSize: 18 }}>
              <FlagIcon fontSize="large" color="success" />
              <b>Rozpoczęte</b>
            </Typography>
          ) : null}
          {task.finished === true ? (
            <Typography sx={{ color: "#d32f2f", fontSize: 18 }}>
              <FlagIcon fontSize="large" color="error" />
              <b>Zakończone</b>
            </Typography>
          ) : null}
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
            <Typography sx={{ fontSize: 16 }}>
                <b>Dni do wykorzystania:</b> {task.daysToUse}
              </Typography>
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
              {task.finishDate ? (
                <Typography sx={{ fontSize: 16 }}>
                  <b>Data zakończenia:</b> {dateFormatter(task.finishDate)}
                </Typography>
              ) : null}
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
          </Grid>
        </CardContent>
        {!task.started && !task.finished ? (
          <CardActions>
            <EditTask taskId={task.id} name={task.name} comment={task.comment} daysToUse={task.daysToUse}></EditTask>
            <Button onClick={() => setTaskToDelete(task.id)} sx={{ color: "#d50000" }}>Usuń</Button>
            <ConfirmDialog
                visible={taskToDelete}
                onHide={() => setTaskToDelete(false)}
                message="Czy na pewno chcesz usunąć zadanie?"
                header="Potwierdzenie"
                icon="pi pi-exclamation-circle"
                acceptLabel="Tak"
                rejectLabel="Nie"
                accept={() => deleteTask()}
              />
            <FormControlLabel
              control={<Switch checked={!task.hidden} onChange={() => toggleHandler(task.id)} />}
              label={task.hidden ? "Obecnie ukryty" : "Obecnie widoczny"}
            />
          </CardActions>
        ) : null}
      </Card>
    ));
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <CreateTask></CreateTask>
        <Stack spacing={3}>{tasks}</Stack>
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOwnedTasks: () => dispatch(fetchOwnedTasks()),
    toggleHidden: (id) => dispatch(toggleHidden(id)),
    deleteTask: (id) => dispatch(deleteTask(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnTasks);
