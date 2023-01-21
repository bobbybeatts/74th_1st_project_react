import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Warning from '@material-ui/icons/Warning';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function DeleteCheckDialog(props) {

  const classes = useStyles();

  const itemCode = '';
  const itemName = '';
  const itemGroupCode = '';
  const itemClassification = '';
  const lossRate = '';
  const leadTime = '';
  const standardUnitPrice = '';
  const description = '';

  const [itemList, setItemList] = useState({});

  const onChange = (e) => {
    setItemList({...itemList,[e.target.name]: e.target.value});
    console.log(itemList);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("버튼")
    props.onSubmit();
  }



  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Warning />
        </Avatar>
        <Typography component="h2" variant="h5">
          삭제 하시겠습니까?
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            삭제
          </Button>
        </form>
      </div>
    </Container>
  );
}