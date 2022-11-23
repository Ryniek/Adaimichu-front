import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { setEmail, fetchUserDetails } from "../../store/actions/user";
import { setPassword } from "../../store/actions/auth";
import { CssBaseline, Container } from "@mui/material";
import { ConfirmDialog } from "primereact/confirmdialog";

function EditProfile(props) {
  const [email, setEmail] = useState(props.user.email);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    props.fetchUserDetails();

  }, []);

  const handleSetEmail = (event) => {
    event.preventDefault();
    setVisible(true);
  };

  const setEmailRequest = () => {
    props.setEmail(email);
  }

  const handleSetPassword = (event) => {
    event.preventDefault();
  };

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
          component="form"
          id="my-email-form"
          onSubmit={handleSetEmail}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
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
            Zaloguj
          </Button>
        </Box>
        <Box component="form" onSubmit={handleSetPassword()} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            id="name"
            label="Nazwa"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            id="name"
            label="Nazwa"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            id="name"
            label="Nazwa"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Zaloguj
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
