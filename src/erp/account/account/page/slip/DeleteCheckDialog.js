//**************************************** 2020-11-19 최지은 시작 ****************************************
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@material-ui/core';

{
    /* <DeleteCheckDialog open={openDialog} onClose={handleClose} onClick={deleteSlip} /> */
}
export default function DeleteCheckDialog({ open, onClose, onClick }) {
    // const DeleteCheckDialog = ({ open, onClose, onClick }) => {
    const Close = () => {
        onClose(false);
    };
    const deleteSlip = () => {
        onClick();
    };
    //========================================================================
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'삭제 확인'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">정말 삭제 하시겠습니까?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={Close}>
                        닫기
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={deleteSlip}>
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

// export default DeleteCheckDialog;
