import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from "react-redux";
import { login} from "../../store/actions/auth";
import { Navigate } from 'react-router-dom';

const theme = createTheme();

function Login(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.login(data.get('name'), data.get('password'))
  };

  if(props.auth.isLoggedIn) {
    if (props.auth.user.roles.includes("ROLE_USER")) {
      return <Navigate to="/owned" />;
    } 
    if (props.auth.user.roles.includes("ROLE_ADMIN")) {
      return <Navigate to="/finished" />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zaloguj się
          </Typography>
          <Box noValidate component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Nazwa"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Hasło"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Zaloguj
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/remind">
                  Przypomnij hasło
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (user, password) => dispatch(login(user, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
