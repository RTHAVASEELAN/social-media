import React, { useState } from 'react';
import { Container, Grid, TextField, Box, Button, TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux';
import './frient-request.scss'

function FrientRequest(props) {
    const { sessionid } = props;
    const [requestEmail, setRequestEmail] = useState('');
    const [errorMessageSerch, setErrorMessage] = useState('');
    const [userData, setUserData] = useState('');

    // const [unFrient, setUnFrient] = useState('');
    // const [reject, setReject] = useState('');
    const [panding, setPanding] = useState('');

    const friendsSerchEmail = (e) => {
        setRequestEmail(e.target.value);
    }

    const typeOfRequest = async () => {
        if (requestEmail == '') {
            setErrorMessage('require email');
        }
        else {
            setErrorMessage('');
        }
        try {
            const url = 'http://localhost:4000/serch-frients';

            const serchRequest = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    emailid: requestEmail
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })

            const conformSerchData = await serchRequest.json();
            setUserData(conformSerchData.status);
        }
        catch (e) {
            console.log(e);
        }
    }

    if (panding == '') {
        setPanding('panding');
    }
    else{
        console.log("no permition")
   
    }

    // frientSerchRequest -------- post-ajax

    const frientSerchRequest = async () => {
        const url = 'http://localhost:4000/frient-request';
        const requestFriends = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                emailid: requestEmail,
                status: panding
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
        const responseData = await requestFriends.json();
    }

 
    return (
        <div className="serch-frients">
            <TextField
                id="password"
                label="Serch-friends"
                variant="outlined"
                color="secondary"
                className="username"
                style={{ width: '30%' }}
                onChange={friendsSerchEmail}
            />
            <Button className="serch-btn" variant="contained" color="primary" onClick={typeOfRequest}
                style={{ marginTop: '12px', marginLeft: '12px' }}>serch</Button>

            <div style={{ color: 'red' }}>{errorMessageSerch}</div>

            <div className="serch-container">
                <h3 className="serch-frn-name">{userData.username}</h3>

                {
                    userData.username ? <Button className="frn-req-btn" variant="contained" color="primary"
                        onClick={frientSerchRequest}
                        style={{ marginRight: '900px', display: 'inline-block', width: '20%', marginTop: '50px' }}>Friend Request</Button> : null
                }

            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        sessionid: state.authReducer.sessionId
    })
}

export default connect(mapStateToProps, null)(FrientRequest);
