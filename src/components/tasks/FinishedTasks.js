import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchFinishedTasks} from "../../store/actions/task";
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
        <Typography>{task.name}</Typography>
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