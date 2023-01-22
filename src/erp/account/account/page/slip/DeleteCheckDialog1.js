import React, {useCallback} from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {Button} from "@mui/material";

const DeleteCheckDialog1 = (props) => {
  console.log(props);
  const open = props.open;
  const close = useCallback(() =>{

    console.log(props.forwardTempDelete);

    if(props.forwardTempDelete){
        props.forwardTempDelete();
    }

    props.close();

},[props]);
return(
  <Dialog
  open={open}
  onClose={close}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {"Use Google's location service?"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Let Google help apps determine location. This means sending anonymous
      location data to Google, even when no apps are running.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Disagree</Button>
    <Button onClick={handleClose} autoFocus>
      Agree
    </Button>
  </DialogActions>
</Dialog>
)
}

export default DeleteCheckDialog1;