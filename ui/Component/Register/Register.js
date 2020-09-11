import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Box, Button, TextareaAutosize }
    from '@material-ui/core';
// import Checkbox from '@material-ui/core/Checkbox';

import './register.scss';
// import ErrorMessage from './ErrorMessage';

const Register = (props) => {
    console.log(props)
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRePassword, setUserRePassword] = useState('');
    const [userOriginal, setuserOriginal] = useState('');


    const [userGender, setGender] = useState("male");
    const [userDate, setDate] = useState('2017-05-24');

    // error message state
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('')

    const getUserName = (e) => {
        setUserName(e.target.value);
    }

    const getPassword = (e) => {
        setUserPassword(e.target.value);
    }

    const getRePassword = (e) => {
        setUserRePassword(e.target.value);
    }

    const getEmai = (e) => {
        setUserEmail(e.target.value);
    }

    const checkOne = (e) => {
        if (e.target.checked == true) {
            setGender("male")
        }
    }

    const checkTwo = (e) => {
        if (e.target.checked == true) {
            setGender("fe-male")
        }
    }

    const toDatayDate = (e) => {
        setDate(e.target.defaultValue)

    }

    const validateName = () => {

        if (userName == '') {
            debugger
            setNameError("name require")
        }
        else {
            setNameError(" ")
        }
    }

    const validateEmail = () => {

        if (userEmail == '') {
            setEmailError("email require")
        }
        else {
            setEmailError('')
        }
    }


    const validatePassword = () => {

        if (userPassword == '') {
            setPasswordError("password require")
        }
        else {
            setPasswordError('')
        }
    }

    const validateRePassword = () => {
        if (userRePassword == '') {
            setRePasswordError("re-password require")
        }
        else {
            setRePasswordError('')
        }
    }

    const submitData = async () => {

        validateName();
        validateEmail();
        validatePassword();
        validateRePassword();

        if (userPassword != userRePassword) {
            // alert("password miss matched")
        }

        else if (userName != '' && userEmail != '' && userPassword != '' && userGender != '' && userDate != '') {

            try {
                const url = 'http://localhost:4000/post-data'
                const postData = await fetch(url, {
                    method: "POST",
                    credentials: 'include',
                    body: JSON.stringify({
                        userName: userName,
                        email: userEmail,
                        password: userPassword,
                        gender: userGender,
                        date: userDate
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',

                    }
                })
                const realData = await postData.json();

                setuserOriginal(realData);

            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            // alert("missing data")
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
                                id="username"
                                label="Username"
                                variant="outlined"
                                color="secondary"
                                className="username"
                                fullWidth={true}
                                onChange={getUserName}
                            />

                            <div style={{ color: 'red' }}>{nameError}</div>


                            <TextField
                                id="password"
                                label="E-mail"
                                variant="outlined"
                                color="secondary"
                                className="username"
                                fullWidth={true}
                                onChange={getEmai} />
                            <div style={{ color: 'red' }}>{emailError}</div>

                            <TextField
                                id="password"
                                label="password"
                                variant="outlined"
                                color="secondary"
                                className="username"
                                fullWidth={true}
                                onChange={getPassword} />
                            <div style={{ color: 'red' }}>{passwordError}</div>

                            <TextField
                                id="password"
                                label="Repassword"
                                variant="outlined"
                                color="secondary"
                                className="username"
                                fullWidth={true}
                                onChange={getRePassword} />
                            <div style={{ color: 'red' }}>{rePasswordError}</div>

                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue="2017-05-24"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth={true}
                                onChange={toDatayDate}
                            />

                            <div>
                                <div className="person-gen">GENDER</div>
                                <div>
                                    <span>Male</span>
                                    <input type="radio"
                                        value="gen"
                                        name="check1"
                                          checked={userGender === 'male' ? true : false}
                                        onChange={checkOne} />

                                    <span>Fe-male</span>
                                    <input type="radio"
                                        value="gen"
                                        name="check1"
                                          checked={userGender === 'male' ? false : true}
                                        onChange={checkTwo} />

                                </div>
                            </div>

                            <Grid className="action-bar" container spacing={3}>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" onClick={submitData} type="button">
                                        Sing UP
                            </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}


export default Register;