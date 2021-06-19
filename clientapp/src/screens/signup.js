import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory} from 'react-router-dom'
import Menu from '../components/menu.js'

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(8),
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

export default function SignUp() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("123");
    const history = useHistory();  

    const handleSubmit = () => {      
        history.push("/login")
        console.log('Post method');
        fetch("http://localhost:3000/users/signup", {            
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, username, password})
        })
    }

    return (
        <div>
            <Menu></Menu>
            <Container component="main" maxWidth="xs">                
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            onChange={event => setName(event.target.value)} value={name}
                            autoComplete="name"
                            name="fullName"
                            variant="outlined"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            autoFocus
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            onChange={event => setUsername(event.target.value)} value={username}
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            type="password"
                            onChange={event => setPassword(event.target.value)} value={password}
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </Container>
        </div>
    );
}