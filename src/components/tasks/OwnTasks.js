import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchOwnedTasks, toggleHidden } from "../../store/actions/task";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dateFormatter from "../../features/converters/dateConverter";
import FlagIcon from "@mui/icons-material/Flag";

function OwnTasks(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.fetchOwnedTasks();

    setLoading(false);
  }, []);

  function toggleHandler(id) {
    props.toggleHidden(id);
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
          <Typography sx={{ fontSize: 18 }}>
            <b>Nazwa:</b> {task.name}
          </Typography>
          <Typography sx={{ fontSize: 18 }}>
            {task.comment ? (
              <>
                <b>Komentarz:</b> {task.comment}
              </>
            ) : null}
          </Typography>
          <Box display="flex">
            <Typography sx={{ fontSize: 16, padding: 1 }}>
              <b>Data utworzenia:</b> {dateFormatter(task.creationDate)}
            </Typography>
            <Typography sx={{ fontSize: 16, padding: 1 }}>
              <b>Dni do wykorzystania:</b> {task.daysToUse}
            </Typography>
          </Box>
          <Box display="flex">
            {task.expirationDate ? (
              <Typography sx={{ fontSize: 16, padding: 1 }}>
                <b>Data wygaśnięcia:</b> {dateFormatter(task.expirationDate)}
              </Typography>
            ) : null}
            {task.finishDate ? (
              <Typography sx={{ fontSize: 16, padding: 1 }}>
                <b>Data zakończenia:</b> {dateFormatter(task.finishDate)}
              </Typography>
            ) : null}
          </Box>
          {task.drawnUser ? (
            <Box display="flex">
              <Typography sx={{ fontSize: 16, padding: 1 }}>
                <b>Wylosowana przez:</b> {task.drawnUser.name}
              </Typography>
            </Box>
          ) : null}
        </CardContent>
        {!task.started && !task.finished ? (
          <CardActions>
            <Button>Edytuj</Button>
            <Button sx={{ color: "#d50000" }}>Usuń</Button>
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
        <Stack spacing={3}>{tasks}</Stack>
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOwnedTasks: () => dispatch(fetchOwnedTasks()),
    toggleHidden: (id) => dispatch(toggleHidden(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    tasks: state.task.tasks,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnTasks);
