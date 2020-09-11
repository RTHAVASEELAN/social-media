import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
// import Cookies from 'universal-cookie';

import './navBar.scss';

import { useHistory } from 'react-router-dom';

import { USER_AUTHENTICATED_REMOVE } from '../../react-redux/ActionType/Action';

const cookies = new Cookies();

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

function NavBar(props) {
    const [frients, setFrients] = useState(false);

    const { isUserAuthenticated, sessionId, sendEmail,
        romeAuthenticatedUser } = props

    const history = useHistory();
    const classes = useStyles();

    // display-which user
    const [displayUserDetail, setDisplayUserDetail] = useState([]);

    if (isUserAuthenticated === false && sendEmail === "") {
        history.push('/');
    } else {

    }

    const clickLogOut = async () => {

        try {
            const url = "http://localhost:4000/logout-data";

            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: sendEmail
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });

            const resLogoutData = await response.json()

            if (resLogoutData.status == 'success') {
                romeAuthenticatedUser();
            }

            cookies.remove("isUserLoggedIn");
            cookies.remove("email");

        }
        catch (e) {
            console.log(e);
        }

    }


    const showLoginUser = async () => {
        if (isUserAuthenticated) {
            const url = 'http://localhost:4000/get-user-name';
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
            const loginUserResult = await response.json();
            setDisplayUserDetail(loginUserResult.status);

        }
        else {
            setDisplayUserDetail([]);
        }
    }


    useEffect(() => {
        showLoginUser();
    }, [isUserAuthenticated]);


    const homeToLogin = () => {
        history.push('/login');
    }

    const userPost = () => {
        history.push('/userPost');
    }

    const addFrients = () => {
        setFrients(true);
        history.push('/frient-request');

    }

    const userRegister = () => {
        history.push('/register');
    }

    const requestMeassage = () => {
        history.push('/request-message')
    }

    const displayAllFriends = () => {
        history.push('/display-all-friends');
    }

    const chattingEvent = () => {
        history.push('/Chatting');
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        MY FB APP
        </Typography>
                    <Typography variant="h6" className={classes.title}>
                    </Typography>

                    {
                        displayUserDetail && displayUserDetail.map((item, index) => {
                            return <div key={index} className="display-user-detail">
                                <span>{item.username}</span>
                                <span>{item.email}</span>
                            </div>
                        })
                    }

                    {
                        isUserAuthenticated ? null : <Button color="inherit" onClick={userRegister} type="button">Register</Button>
                    }

                    {
                        isUserAuthenticated ? <Button color="inherit" onClick={addFrients} type="button">Add frient</Button> : null
                    }


                    {
                        isUserAuthenticated ? <Button color="inherit" onClick={userPost}>Newpost</Button>
                            : null
                    }

                    {
                        isUserAuthenticated ? <Button color="inherit" onClick={requestMeassage}>Request friends</Button> : null
                    }

                    {
                        isUserAuthenticated ? <Button color="inherit" onClick={displayAllFriends}>All friends</Button> : null
                    }

                    {
                        isUserAuthenticated ? <Button color="inherit" onClick={chattingEvent}>charting</Button> : null
                    }
                    {
                        isUserAuthenticated ? <Button color="inherit" onClick={clickLogOut}>Logout</Button>
                            : <Button color="inherit" onClick={homeToLogin}>Login</Button>
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}

const mapDispatchToState = (dispatch) => {

    return {
        romeAuthenticatedUser: () => dispatch({
            type: USER_AUTHENTICATED_REMOVE,
        })
    }

}


export default connect(mapStateToProps, mapDispatchToState)(NavBar);