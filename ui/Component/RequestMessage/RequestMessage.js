import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
//etenal imports

import './request-friend.scss';

function RequestMessage(props) {
    const history = useHistory();
    const { sessionid } = props;
    const [displayValue, setDisplayValue] = useState([])

    const [accept, setAccept] = useState('');
    const [sccRes, setSccRes] = useState('');
    const [isFriendReqProcessing, setIsFriendReqProcessing] = useState('false');

    const displayReqMes = async () => {
        if (sessionid != '') {
            const url = 'http://localhost:4000/display-request';
            try {
                const displayMsg = await fetch(url, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                });

                const displayReqMsgValue = await displayMsg.json();

                if (displayReqMsgValue.status !== "failed") {
                    if (displayReqMsgValue !== "UN_AUTHED") {
                        setDisplayValue(displayReqMsgValue.status);
                    }
                }
                else {
                    setDisplayValue([]);
                }

            } catch (e) {
                console.log(e);
            }
        }
    }

    if (accept == '') {
        setAccept('accept');
    }
    else {
        console.log("");

    }

    const updateFriendRequest = (index, status) => {
        return async function () {
            const email = displayValue[index].email;
            await acceptRequest(email, status);
            await displayReqMes();
        }
    }

    const acceptRequest = async (email, status) => {

        const url = 'http://localhost:4000/set-friend-request';
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                reqStatus: status
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });

        const resValue = await response.json();

        if (resValue !== "UN_AUTHED") {
            setSccRes(resValue);
        }

    }

    useEffect(() => {
        displayReqMes();
    }, []);


    return (

        <div className="main-container">
           
            {
                displayValue && displayValue.map((item, index) => {
                    return (
                        <div key={index} className="elemant-container">
                            <span>{item.username}</span>
                            <span>{item.created_at}</span>

                            <Button
                                className="accept-btn" variant="contained" color="primary"
                                onClick={updateFriendRequest(index, 'accept')}>Accept</Button>

                            <Button
                                onClick={updateFriendRequest(index, 'reject')} className="remove-btn" variant="contained" color="secondary" >Remove</Button>
                        </div>
                    )
                })
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        sessionid: state.authReducer.sessionId
    })
}
export default connect(mapStateToProps, null)(RequestMessage);
