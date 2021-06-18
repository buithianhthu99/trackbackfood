import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Menu() {
  const classes = useStyles();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem("account") !== null) {
        setIsLogin(true);
    }
    else {
        setIsLogin(false);
    }
  },[])

  const handleClick = () => {
      if (isLogin) {
          localStorage.removeItem("account");
          setIsLogin(false);
          history.push("/login");
      }
      else {
          history.push("/login");
      }
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trackback Food
          </Typography>
          <Button color="inherit" onClick={handleClick}>
              {isLogin ? "Logout" : ""}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}