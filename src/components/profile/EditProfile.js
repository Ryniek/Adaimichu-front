import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { Box, TextField, Typography } from "@mui/material";
import { setEmail, fetchUserDetails } from "../../store/actions/user";
import { setPassword } from "../../store/actions/auth";
import { CssBaseline, Container } from "@mui/material";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProfile(props) {
  const [email, setEmail] = useState(props.user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  useEffect(() => {
    props.fetchUserDetails();
  }, []);

  useEffect(() => {
    if (newPassword.length < 8) {
      setErrorPasswordMessage("Minimalna długość hasła to 8 znaków");
    } else if (newPassword !== newPasswordAgain) {
      setErrorPasswordMessage("Hasła nie są identyczne");
    } else {
      setErrorPasswordMessage("");
    }
  }, [newPassword, newPasswordAgain]);

  const handleSetEmail = (event) => {
    event.preventDefault();
    setVisible(true);
  };

  const setEmailRequest = () => {
    props.setEmail(email);
  };

  const handleSetPassword = (event) => {
    event.preventDefault();
    if (newPassword !== newPasswordAgain) {
      toast.error("Hasła nie są identyczne.");
    } else {
      setVisible2(true);
    }
  };

  const setPasswordRequest = () => {
    props.setPassword({ oldPassword: oldPassword, newPassword: newPassword });
  };

  if (!props.auth.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          noValidate
          component="form"
          id="my-email-form"
          textAlign="center"
          onSubmit={handleSetEmail}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            variant="standard"
            value={email}
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message="Czy na pewno chcesz zmienić adres email?"
            header="Potwierdzenie"
            icon="pi pi-question-circle"
            acceptLabel="Tak"
            rejectLabel="Nie"
            accept={() => setEmailRequest()}
          />
          <Button
            form="my-email-form"
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zmień email
          </Button>
        </Box>
        <Box
          noValidate
          textAlign="center"
          component="form"
          id="my-password-form"
          onSubmit={handleSetPassword}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="old-password"
            label="Stare hasło"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            name="old-password"
            autoComplete="old-password"
            autoFocus
            type="password"
            variant="standard"
          />
          <TextField
            margin="normal"
            fullWidth
            id="new-password"
            value={newPassword}
            label="Nowe hasło"
            name="new-password"
            autoComplete="new-password"
            onChange={(event) => setNewPassword(event.target.value)}
            autoFocus
            type="password"
            variant="standard"
          />
          <TextField
            margin="normal"
            fullWidth
            value={newPasswordAgain}
            id="new-password-again"
            label="Potwierdź nowe hasło"
            name="new-password-again"
            autoComplete="new-password-again"
            onChange={(event) => setNewPasswordAgain(event.target.value)}
            autoFocus
            type="password"
            variant="standard"
          />
          <Typography color="error">{errorPasswordMessage}</Typography>
          <ConfirmDialog
            visible={visible2}
            onHide={() => setVisible2(false)}
            message="Czy na pewno chcesz zmienić hasło?"
            header="Zmiana hasła"
            icon="pi pi-question-circle"
            acceptLabel="Tak"
            rejectLabel="Nie"
            accept={() => setPasswordRequest()}
          />
          <Button
            form="my-password-form"
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zmień hasło
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserDetails: () => dispatch(fetchUserDetails()),
    setEmail: (email) => dispatch(setEmail(email)),
    setPassword: (passwords) => dispatch(setPassword(passwords)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
