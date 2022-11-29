import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { connect } from "react-redux";
import { login } from "../../store/actions/auth";
import { Navigate } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";
import axios from "../../axios-instance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SetPassword(props) {
  const [visible, setVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [token, setToken] = useState(
    window.location.href.substring(window.location.href.lastIndexOf("=") + 1)
  );
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (newPassword.length < 8) {
      setErrorMessage("Minimalna długość hasła to 8 znaków");
    } else if (newPassword !== newPasswordAgain) {
        setErrorMessage("Hasła nie są identyczne");
    } else {
        setErrorMessage("");
    }
  }, [newPassword, newPasswordAgain]);

  function sendNewPasswordSet() {
    axios
      .post("/users/password/reset/set", {
        token: token,
        newPassword: newPassword,
      })
      .then((response) => {
        toast.success("Hasło zostało zresetowane. Zaloguj się.");
        navigate("/");
      })
      .catch((responseError) => {
        toast.error(responseError.response.data[0].message);
      });
  }

  function checkFieldsValidity() {
    if (newPassword !== newPasswordAgain) {
      toast.error("Hasła nie są identyczne");
    } else if (newPassword.length < 8) {
      toast.error("Minimalna długość hasła to 8 znaków");
    } else {
      setVisible(true);
    }
  }

  if (props.auth.isLoggedIn) {
    return <Navigate to="/owned" />;
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
          maxWidth: "300px",
        }}
      >
        <Box noValidate component="form" textAlign="center" sx={{ mt: 1 }}>
          <Typography>Wprowadź nowe hasło</Typography>
          <TextField
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            margin="normal"
            fullWidth
            id="newPassword"
            label="Nowe hasło"
            name="newPassword"
            autoComplete="newPassword"
            type="password"
            autoFocus
          />
          <TextField
            value={newPasswordAgain}
            onChange={(event) => setNewPasswordAgain(event.target.value)}
            margin="normal"
            fullWidth
            id="newPasswordAgain"
            label="Powtórz hasło"
            name="newPasswordAgain"
            type="password"
            autoComplete="newPasswordAgain"
          />
          <Button
            onClick={() => checkFieldsValidity()}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ustaw nowe hasło
          </Button>
          <Typography color="error">{errorMessage}</Typography>
          <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message="Czy na pewno chcesz ustawić nowe hasło?"
            header="Potwierdzenie"
            icon="pi pi-question-circle"
            acceptLabel="Tak"
            rejectLabel="Nie"
            accept={() => sendNewPasswordSet()}
          />
        </Box>
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(SetPassword);
