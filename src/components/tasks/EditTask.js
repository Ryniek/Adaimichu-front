import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { editTask } from "../../store/actions/task";

function EditTask(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [daysToUse, setDaysToUse] = React.useState(props.daysToUse);
  const [name, setName] = React.useState(props.name);
  const [comment, setComment] = React.useState(props.comment);

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
    props.editTask(props.taskId, {
      name: data.get("name"),
      comment: data.get("comment"),
      daysToUse: data.get("daysToUse"),
    });
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
      <Button onClick={handleClickOpen("body")}>Edytuj</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle sx={{ mt: 2 }} id="scroll-dialog-title" align="center">
          Edytuj zadanie
        </DialogTitle>
        <Box
        noValidate
          id="my-editing-form"
          component="form"
          sx={{ mt: 1, pl: 4, pr: 4 }}
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            value={name}
            fullWidth
            id="name"
            label="Nazwa"
            name="name"
            autoComplete="name"
            autoFocus
            variant="standard"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="normal"
            value={comment}
            fullWidth
            name="comment"
            label="Komentarz"
            multiline
            id="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(event) => setComment(event.target.value)}
          />
          <TextField
            type="number"
            value={daysToUse}
            name="daysToUse"
            label="Dni do użycia"
            variant="standard"
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
          <Button type="submit" form="my-editing-form" variant="outlined" size="large">
            Edytuj
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    editTask: (taskId, task) => dispatch(editTask(taskId, task)),
  };
};

export default connect(null, mapDispatchToProps)(EditTask);
