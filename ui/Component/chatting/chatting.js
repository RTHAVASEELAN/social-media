import React, { useState, useEffect } from 'react';
import {  TextField, Button } from '@material-ui/core';
import './chartting.scss';


// import same folter js files

import RoomUsers from './chart-room-maneger';


function Chatting() {
    const [firstEmail, setFristEmail] = useState('');
    const [secondEmail, setSecondEmail] = useState('');
    const [thirdEmail, setThirdEmail] = useState('');
    const [getRoomUsersDetail, setGetRoomUsersDetail] = useState([]);

    const fristGetEmail = (e) => {
        setFristEmail(e.target.value);
    }

    const secondGetEmail = (e) => {
        setSecondEmail(e.target.value);
    }

    const thirdGetEmail = (e) => {
        setThirdEmail(e.target.value);
    }

    const getEmailValue = async () => {

        const url = 'http://localhost:4000/set-room-users';
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                firstEmail,
                secondEmail,
                thirdEmail
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        const postEmailStatus = await response.json();
        
        if (postEmailStatus.status === 'success') {
             getRoomUsers();
            
        } else {
            console.log("invalid data");
        }
    }

    const getRoomUsers = async () => {
        return new Promise(async (reject, resolve) => {
            const url = 'http://localhost:4000/get-room-users-id';
            const response = await fetch(url, {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });

            const getRoomUsers = await response.json();

            if (getRoomUsers.status && getRoomUsers.status.length || getRoomUsers.status.length == 0 ) {   
                resolve(getRoomUsers.status); 
                setGetRoomUsersDetail(getRoomUsers.status);

            }

        });
    }

    useEffect(() => {
        getRoomUsers();
    }, []);


    return (

        <div>

            <div className="main-container">
                <div className="serch-container">
                    <div>
                        <TextField
                            id="password"
                            label="serch-email"
                            variant="outlined"
                            color="secondary"
                            className="username"
                            width='100%'
                            onChange={fristGetEmail}
                        />
                    </div>

                    <div>
                        <TextField
                            id="password"
                            label="serch-email"
                            variant="outlined"
                            color="secondary"
                            className="username"
                            width='100%'
                            onChange={secondGetEmail}
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            label="serch-email"
                            variant="outlined"
                            color="secondary"
                            className="username"
                            width='100%'
                            onChange={thirdGetEmail}
                        />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={getEmailValue}
                        >send
                    </Button>
                    </div>

                </div>
                <RoomUsers usersDetail={getRoomUsersDetail} getRoomUsers={getRoomUsers}/>
            </div>
        </div>
    )
}


export default Chatting;
