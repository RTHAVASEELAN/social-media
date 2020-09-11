import React, { Link, useState } from 'react';
import { Container, Grid, TextField, Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { USER_AUTHENTICATED } from '../../react-redux/ActionType/Action';
import { userAuthenticatedAction } from
    '../../react-redux/actions/auth.action';

import './login.scss';

const cookies = new Cookies();

const Login = (props) => {

    const { userAuthenticatedAction } = props;

    const history = useHistory();
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [loginUserPassword, setLoginUserPassword] = useState('');
    const [status, setStatus] = useState('');

    //Error mesage state

    const [loginEmailError, setLoginEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    const loginGetEmail = (e) => {
        setLoginUserEmail(e.target.value);
    }

    const loginGetPassword = (e) => {
        setLoginUserPassword(e.target.value);
    }

    const onclickEmailError = () => {
        if (loginUserEmail == " ") {

            setLoginEmailError("Email Require");
        }
        else {
            setLoginEmailError(" ");
        }
    }


    const onclickPasswordError = () => {
        if (loginUserPassword == " ") {

            setLoginPasswordError("Password Require");
        }
        else {
            setLoginPasswordError(" ");
        }
    }


    const loginSubmit = async () => {
        onclickEmailError();
        onclickPasswordError();

        if (loginUserEmail != "" && loginUserPassword != "") {
            try {

                const url = "http://localhost:4000/login-data"
                const loginData = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({
                        email: loginUserEmail,
                        password: loginUserPassword
                    }),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                })
                const loginStatus = await loginData.json();
                setStatus(loginStatus);

                if (loginStatus.status === "success") {

                    userAuthenticatedAction(loginUserEmail);

                    history.push('/');
                } else {
                    alert("login failed");
                }

            } catch (e) {
                console.log(e)
            }

        }
        else {
            console.log("error")
        }

    }

    return (
        <div>
            <Container maxWidth="sm">

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}

                >
                    <Grid item xs={12}>
                        <Box boxShadow={3} className="form-root">
                            <TextField
                                id="Email"
                                label="Username"
                                variant="outlined"
                                color="secondary"
                                className="username"
                                fullWidth={true}
                                onChange={loginGetEmail}
                                value={loginUserEmail}
                            />
                            <div style={{ color: 'red' }}>{loginEmailError}</div>

                            <TextField
                                id="password"
                                label="password"
                                variant="outlined"
                                color="secondary"
                                className="username"
                                fullWidth={true}
                                onChange={loginGetPassword}
                                value={loginUserPassword}
                            />
                            <div style={{ color: 'red' }}>{loginPasswordError}</div>

                            <Grid className="action-bar" container spacing={3}>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={loginSubmit}>
                                        Login
                            </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
  
    return {

    }
}

const mapDispatchToState = (dispatch) => {
    return {
        userAuthenticatedAction: (sendEmail) => dispatch({
            type: USER_AUTHENTICATED,
            sendEmail
        })
    }

}


export default connect(mapStateToProps, mapDispatchToState)(Login);