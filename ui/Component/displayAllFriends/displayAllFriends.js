import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import './displayFriends.scss';

const DisplayAllFriends = (props) => {
    const { isUserAuthenticated, sessionId, sendEmail,
        romeAuthenticatedUser } = props
    const [allfriends, setAllFriends] = useState([]);

    const [displayUserTotalFriends, setDisplayUserTotalFriends] =
        useState('');

    const [unFriendValue, setUnFriendValue] = useState('');

    const [displayMyToUserFriends, setDisplayMyToUserFriends] = useState([]);

    const showMyAllFriend = async () => {
        const url = 'http://localhost:4000/show-all-friends';
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
        const getAllFriends = await response.json();

        if (getAllFriends !== 'faild') {
            if (getAllFriends !== "UN_AUTHED") {
                setAllFriends(getAllFriends.status);
            }
        }
        else {
            setAllFriends([]);
        }

    }

    useEffect(() => {
        showMyAllFriend();
    }, []);

    const updateUnFriendRequest = (index, status) => {

        return async function () {
            const email = allfriends[index].email
            await unFriend(email, status);
            await showMyAllFriend();
        }
    }

    const unFriend = async (email, status) => {

        const url = 'http://localhost:4000/un-friend';
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',

            body: JSON.stringify({
                email: email,
                status: status
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })
        const unFriendRes = await response.json();
        setUnFriendValue(unFriendRes);

    }
    // show-my-to-user-friends
    const showMyToUserFriends = async () => {
        debugger;
        const url = 'http://localhost:4000/my-frient-list-from-to-user';
        const response = await fetch(url, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }

        })
        const myToUserFriends = await response.json();
        if (myToUserFriends !== 'faild') {
            if (myToUserFriends !== "UN_AUTHED") {
                setDisplayMyToUserFriends(myToUserFriends.status)
                debugger
            }
        }
        else {
            setDisplayMyToUserFriends([])
        }

    }

    useEffect(() => {
        showMyToUserFriends();
    }, [unFriendValue])

    const totalFriends = async () => {
        if (isUserAuthenticated) {
            const url = 'http://localhost:4000/total-friends';
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            })
            const getTotalUsers = await response.json();
            setDisplayUserTotalFriends(getTotalUsers.status);
        }
        else {
            setDisplayUserTotalFriends('');
        }
    }

    useEffect(() => {
        totalFriends();
    }, [unFriendValue]);

    return (
        <div className="main-display-container">
            <h3>all friends</h3>
            <h3 className="total-friends">Total Friends:{displayUserTotalFriends}</h3>
            {
                allfriends && allfriends.map((item, index) => {
                    return (
                        <div key={index} className="all-friends-container">
                            <span>{item.username}</span>
                            <Button
                                className="accept-btn" variant="contained" color="primary" onClick={updateUnFriendRequest(index, 'unfriend')}
                            >un friend</Button>

                        </div>
                    )
                })
            }

            {
                displayMyToUserFriends && displayMyToUserFriends.map((item, index) => {
                    return (
                        <div key={index}>
                            <span>{item.username}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}

export default connect(mapStateToProps, null)(DisplayAllFriends);
