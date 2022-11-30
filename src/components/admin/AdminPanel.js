import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import authHeader from "../../services/auth-header";
import axios from "../../axios-instance";
import { toast } from "react-toastify";
import { ConfirmDialog } from "primereact/confirmdialog";
import { formatDuration, intervalToDuration } from "date-fns";
import { pl } from "date-fns/locale";

function AdminPanel() {
  const [minutesBetweenDrawing, setMinutesBetweenDrawing] = useState();
  const [resetPasswordTokenValidity, setResetPasswordTokenValidity] =
    useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchGlobalSettings();
  }, []);

  function fetchGlobalSettings() {
    axios.get("/admin/settings", { headers: authHeader() }).then((response) => {
      setMinutesBetweenDrawing(response.data.minutesBetweenDrawing);
      setResetPasswordTokenValidity(response.data.resetPasswordTokenValidity);
    });
  }

  function setGlobalSettings() {
    axios
      .put(
        "/admin/settings",
        {
          minutesBetweenDrawing: minutesBetweenDrawing,
          resetPasswordTokenValidity: resetPasswordTokenValidity,
        },
        { headers: authHeader() }
      )
      .then((response) => {
        toast.success("Globalne ustawienia zapisane");
      })
      .catch((error) => {
        toast.error(error.response.data[0].message);
      });
  }

  function checkFieldsValidity() {
    setVisible(true);
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
          maxWidth: "400px",
        }}
      >
        <Box noValidate component="form" textAlign="center" sx={{ mt: 1 }}>
          <TextField
            value={minutesBetweenDrawing}
            onChange={(event) => setMinutesBetweenDrawing(event.target.value)}
            margin="normal"
            fullWidth
            type="number"
            id="minutesBetweenDrawing"
            label="Liczba minut pomiędzy losowaniem"
            name="minutesBetweenDrawing"
            autoComplete="minutesBetweenDrawing"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
          />
          <Typography variant="overline">
            {minutesBetweenDrawing
              ? formatDuration(
                  intervalToDuration({
                    start: 0,
                    end: minutesBetweenDrawing * 1000 * 60,
                  }),
                  { locale: pl }
                )
              : null}
          </Typography>
          <TextField
            value={resetPasswordTokenValidity}
            onChange={(event) =>
              setResetPasswordTokenValidity(event.target.value)
            }
            margin="normal"
            fullWidth
            type="number"
            id="resetPasswordTokenValidity"
            label="Ważność linku resetującego hasło(w minutach)"
            name="resetPasswordTokenValidity"
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete="resetPasswordTokenValidity"
          />
          <Box>
            <Typography variant="overline">
              {resetPasswordTokenValidity
                ? formatDuration(
                    intervalToDuration({
                      start: 0,
                      end: resetPasswordTokenValidity * 1000 * 60,
                    }),
                    { locale: pl }
                  )
                : null}
            </Typography>
          </Box>
          <Button
            onClick={() => checkFieldsValidity()}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zmień globalne ustawienia
          </Button>
          <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message="Czy na pewno chcesz ustawić nowe ustawienia globalne?"
            header="Potwierdzenie"
            icon="pi pi-question-circle"
            acceptLabel="Tak"
            rejectLabel="Nie"
            accept={() => setGlobalSettings()}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default AdminPanel;
