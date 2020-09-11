import React, { useState } from 'react';
import { Container, Grid, TextField, Box, Button, TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux';
import './user-post.scss'
import { useHistory } from 'react-router-dom';
const UsersPost = (props) => {
   
    const { sessionId } = props;
    const history = useHistory();
    const [text, setText] = useState('');
    const [textErrorMsg, setTextErrorMsg] = useState('');

    const changeText = (e) => {
        setText(e.target.value)
    }

    const usersPostClick = async () => {
        if (text == '') {
            setTextErrorMsg("pleace enter your post");
        }
        else {
            setTextErrorMsg('');
        }
        try {
            if (text != '') {
                const url = 'http://localhost:4000/users-post'
                const userPost = await fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({
                        text: text
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                })

  
                if (userPost.status == '200') {
                    history.push('/')
                }
            }

        }
        catch (e) {
            console.log(e)
        }


    }
    return (
        <div>
            <h1>USER POST</h1>
            <Container maxWidth="sm">
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}

                >

                    <Grid item xs={10}>
                        <Box boxShadow={3} className="form-root">

                            <TextareaAutosize
                                aria-label="minimum 
                                height" rowsMin={5}
                                placeholder="post message"
                                fullWidth={true}
                                color="secondary"
                                type="button"
                                variant="outlined"
                                style={{ width: '100%' }}
                                onChange={changeText}
                            />
                            <div style={{ color: 'red' }}>{textErrorMsg}</div>
                            <Button variant="contained" color="primary" onClick={usersPostClick}>
                                submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
        sessionId: state.authReducer.sessionId
    }
}

export default connect(mapStateToProps, null)(UsersPost);