import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Box, Button, TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux';
import CloseImage from '../../images/like.png';

import './home.scss'

function Home(props) {
    const { sessionid, isUserAuthenticated } = props;
    const [userPostFinalData, setUserPostFinalData] = useState([]);

    // like-count
    const initialState = 0;
    const [count, setCount] = useState(initialState);
    const [secondCount, setSecondCount] = ('');
    const userData = async () => {
        const url = "http://localhost:4000/get-users-post";

        const userPost = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        })

        const realUserPost = await userPost.json();

        if (realUserPost !== "UN_AUTHED") {
            setUserPostFinalData(realUserPost);
        }

    }

    useEffect(() => {
        if (isUserAuthenticated) {
            userData();
        } else {
            setUserPostFinalData([]);
        }
    }, [isUserAuthenticated]);


    // const userLikeEvent = () => {
    //     if (count = initialState + 1) {
    //         setSecondCount(count - 1);
    //     }
    //     setCount(prevCount => prevCount + 1);
       
    // }

    
    return (
        <div className="main-container">
            <h1>home page</h1>

            {
                userPostFinalData && userPostFinalData.map((items, index) => {

                    return (
                        <tr className="table-container" key={index}>
                            <td><b>{index}</b></td>
                            <th>NAME:</th><td>{items.username}</td>

                            <th>MESSAGE:</th><td>{items.text}</td>
                            <th>DATE:</th><td>{items.created_at}</td>

                        </tr>

                    )
                })
            }
            <div className="btn-conntainer">

                {/* <Button variant="contained" color="primary" className="like-btn" onClick={userLikeEvent}> like {count}{secondCount}
                    <img src={CloseImage} alt="" className="imagesOne" style={{ width: '20px', paddingLeft: '10px' }} />
                </Button>
                <Button variant="contained" color="primary" className="share-btn">share</Button>
                <Button variant="contained" color="primary" className="command-btn">command</Button> */}
            </div>

        </div >
    )
}

const mapToStateProps = (state) => {
    return ({
        sessionid: state.authReducer.sessionId,
        isUserAuthenticated: state.authReducer.isUserAuthenticated
    })
}
export default connect(mapToStateProps, null)(Home);







