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

function ResetPassword(props) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  
  function sendResetPasswordEmail() {
    if (!email) return toast.error("Email nie może być pusty");
    axios
      .post("/users/password/reset", null, {
        params: {
          email: email,
        },
      })
      .then((response) => {
        toast.success(
          "Link do zresetowania hasła został wysłany na podany email."
        );
        navigate("/");
      })
      .catch((error) => {
        toast.error("Podano niepoprawny adres email.");
      });
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
          <Typography>
            Wyślij link do zresetowania hasła na podany email
          </Typography>
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <Button
            onClick={() => setVisible(true)}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zresetuj hasło
          </Button>
          <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message="Czy na pewno chcesz wysłać link resetujący hasło na podany email?"
            header="Potwierdzenie"
            icon="pi pi-question-circle"
            acceptLabel="Tak"
            rejectLabel="Nie"
            accept={() => sendResetPasswordEmail()}
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

export default connect(mapStateToProps, null)(ResetPassword);
