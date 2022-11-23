import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { createTask } from "../../store/actions/task";

function CreateTask(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [daysToUse, setDaysToUse] = React.useState(1);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.createTask({name: data.get("name"), comment: data.get("comment"), daysToUse: data.get("daysToUse")});
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Box textAlign="center">
      <Button sx={{ my: 3 }} variant="contained" color="success" size="large" onClick={handleClickOpen("body")}>Stwórz nowe zadanie</Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle sx={{ mt: 2 }} id="scroll-dialog-title" align="center">
          Utwórz zadanie
        </DialogTitle>
        <Box
            id='my-form'
          component="form"
          sx={{ mt: 1, pl: 4, pr: 4 }}
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nazwa"
            name="name"
            autoComplete="name"
            autoFocus
            variant="standard"
          />
          <TextField
            margin="normal"
            fullWidth
            name="comment"
            label="Komentarz"
            multiline
            id="password"
            autoComplete="current-password"
            variant="standard"
          />
          <TextField
            type="number"
            name="daysToUse"
            label="Dni do użycia"
            variant="standard"
            value={daysToUse}
            onChange={(event) => setDaysToUse(event.target.value)}
          />
        </Box>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" size="large" onClick={handleClose}>
            Anuluj
          </Button>
          <Button type="submit" form="my-form" variant="outlined" size="large">
            Stwórz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (task) => dispatch(createTask(task)),
  };
};

export default connect(null, mapDispatchToProps)(CreateTask);
