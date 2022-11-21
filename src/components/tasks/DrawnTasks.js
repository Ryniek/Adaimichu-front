import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchDrawnTasks, drawTask, finishTask } from "../../store/actions/task";
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
} from "@mui/material";

function DrawnTasks(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.fetchDrawnTasks();

    setLoading(false);
  }, []);

  function drawNewTask() {
    props.drawTask();
  }

  const theme = createTheme();
  let tasks = <p>Loading...</p>;
  if (!loading) {
    tasks = props.tasks.map((task) => (
      <Card key={task.id}>
        <CardContent>
        <Typography>{task.name}</Typography>
        </CardContent>
        <CardActions>
            <Button>Zakończ</Button>
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
      <Button onClick={() => drawNewTask()}>Wylosuj nowe zadanie</Button>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDrawnTasks: () => dispatch(fetchDrawnTasks()),
    drawTask: () => dispatch(drawTask()),
    finishTask: (taskId) => dispatch(finishTask(taskId))
  };
};

const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawnTasks);
