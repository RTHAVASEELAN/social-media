import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { TextareaAutosize } from '@material-ui/core';
import CloseImage from '../../images/close.jpg';
import { connect } from 'react-redux';

function DisplayAllRoomUsers(props) {
    const { chartMembers, getRoomUsers } = props;
    const [chartRoomMembers, setChartRoomMembers] = useState('');
    const [roomUserDetail, setRoomUserDetail] = useState([]);

    //user messages
    const [message, setMessage] = useState('');
    const [chartMessage, setChartMessage] = useState([]);

    const getTextValue = (e) => {
        setMessage(e.target.value);
    }
    // room-id
    const roomid = chartMembers[0].room_id;

    // send-message to db --->ajaxs
    const sendMessage = async () => {
        const url = `http://localhost:4000/user-chartting`;
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                roomid: roomid,
                messages: message
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });

        const getMessageStatus = await res.json();
        if (getMessageStatus.status === 'success') {
            getUserMessage();
        } else {

        }

    }

    useEffect(() => {
        const chartUsers = chartMembers && chartMembers.map(x => x.username);
        const chartRoomUsers = chartUsers.join(',');
        setChartRoomMembers(chartRoomUsers);
        setInterval(function () {
            getUserMessage();
        }, 300);
    }, []);

    const getUserMessage = async () => {
        const url = 'http://localhost:4000/user-get-message';
        const res = await fetch(url, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({
                roomid: roomid
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        const getChartMessage = await res.json();
        if (getChartMessage.status !== 'no message') {
        
            setChartMessage(getChartMessage.status)

        }
    }


    const closeUserTab = async () => {

        const getRoomId = chartMembers && chartMembers.map(a => a.room_id);
        const roomid = getRoomId[0]
        const url = 'http://localhost:4000/delete-room-user-id';
        const response = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify({
                roomid: roomid
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        });
        const deleteStatus = await response.json();

        if (deleteStatus.status === 'success') {
            getRoomUsers();
            getUserMessage();
        }
    }



    return (
        <div >
            <div className="chat-container">
                <div className="main-message-container">
                    <div className="message-component-one">
                        <div className="message-one-header">
                            {chartRoomMembers}
                            <Button style={{ width: '50px' }}><img src={CloseImage} alt="" className="imagesOne"
                                style={{ width: '40px' }}
                                onClick={closeUserTab}
                            /></Button>
                        </div>
                        <div className="message-one-body">

                            <div className="to-user">
                                <span style={{ marginRight: '150px' }}>{
                                    chartMessage && chartMessage.map((item, index) => {
                                        return <div key={index}><span style={{ color: 'red' }}>{item.username}</span>:{item.messages} : {item.created_at}</div>
                                    })
                                }</span>
                            </div>

                            <div className="from-user">

                            </div>

                        </div>


                        <div className="message-one-type">
                            <TextareaAutosize
                                aria-label="minimum 
                                 height" rowsMin={3}
                                placeholder="post message"
                                width='100%'
                                style={{ width: '99%', height: '100%' }}
                                onChange={getTextValue}

                            />
                        </div>
                        <div className="message-one-footer">

                            <Button variant="contained" color="secondary" style={{ height: '40px', marginTop: '20px', marginLeft: '150px' }}>close</Button>

                            <Button
                                variant="contained"
                                color="primary"
                                style={{ height: '40px', marginTop: '20px', marginLeft: '150px' }}
                                onClick={sendMessage}
                            >send</Button>

                        </div>
                    </div>
                </div>

            </div>

            {
                roomUserDetail && roomUserDetail.map((item, index) => {
                    return <div key={index}>{item.username}</div>
                })

            }
        </div>


    )

}

const mapToStateProps = (state) => {
    return ({
        sessionid: state.authReducer.sessionId,
        isUserAuthenticated: state.authReducer.isUserAuthenticated
    })
}
export default connect(mapToStateProps, null)(DisplayAllRoomUsers);

// export default DisplayAllRoomUsers;
