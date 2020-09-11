const express = require('express');
const mysql2 = require('mysql2/promise');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// my-folders requirement
const registerUser = require('./postData');
const loginCheckDataEvent = require("./login");
const logoutUsers = require("./logout");
const usersPost = require("./user-post");
const requireUserFrientReq = require("./frient-request");
const serchCurectFriendsEvent = require("./serch-curect-friend");
const checkStatus = require("./displayRequest");
const acceptOrRemoveEvent = require("./requestType");
const showAllUsers = require("./display-all-friends");
const unfriendUserEvent = require("./un-friend");
const getUsersPost = require('./get-user-post');
const showCurentUser = require('./show-which-user-access')
const totalFrientsList = require('./total-friends/total-friends')
const showMyToUser = require('./show-my-to-friends/show-my-to-friends');


//----chartting ------//

const setAllRoomUsersDetail = require('./chart-set-room-users');
const selectAllRoomUsersDetail = require('./get-room-users-id');
const deleteRoomUsers = require('./delete-room-id');
const insertCurentUserMessageDetail = require('./insert-message');
const userGetMessage = require('./user-get-message');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cookieParser());


(async function () {
    try {
        const con = await mysql2.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "my_facebook_app",
        })
        global.dbConnection = con;

        dbConnection.config.namedPlaceholders = true;
        console.log("connection success..!");
    }
    catch (e) {
        console.log(e);
    }
})()

app.get('/', (req, res) => {
    res.send({
        response: 'thavasee'
    });
})

//midleware

app.use((req, res, next) => {
    const sessionId = req.cookies.userSessionId;
    const unAuthedServices = ['/login-data', '/post-data',  '/user-chartting','/user-get-message'];

    if (unAuthedServices.includes(req.path)) {
        next();
    }
    else {
        if (!sessionId) {
            res.status(500).json("UN_AUTHED");
        }
        else {
            next();
        }
    }
})

//Register data
app.post('/post-data', registerUser);

//login data

app.post('/login-data', loginCheckDataEvent)

//who is login and his name
app.get('/get-user-name', showCurentUser)

//logout data
app.post('/logout-data', logoutUsers)


// Userpost-data
app.post('/users-post', usersPost);

//get-users-post
app.get('/get-users-post', getUsersPost)

// frient_request----for users
app.post('/frient-request', requireUserFrientReq)

// serch-friends
app.post('/serch-frients', serchCurectFriendsEvent);


//get-checking-status-in user // display request
app.get('/display-request', checkStatus);

// set accept or reject
app.post('/set-friend-request', acceptOrRemoveEvent);

// show-all-friends
app.get('/show-all-friends', showAllUsers);

//un-friend 
app.post('/un-friend', unfriendUserEvent);


// how many friends

app.get('/total-friends', async (req, res) => {
    try {
        const sessionId = req.cookies.userSessionId;
        const totalFrients = await totalFrientsList(sessionId)
        res.send({
            status: totalFrients
        })
    }
    catch (e) {
        console.log(e)
    }
});


app.get('/my-frient-list-from-to-user', async (req, res) => {
    try {
        const sessionId = req.cookies.userSessionId;
        const showMyFriendListIntoUser = await showMyToUser(sessionId);
        res.send({
            status: showMyFriendListIntoUser
        });
    }
    catch (e) {
        console.log(e);
    }

});

// first chartting service set ----->userid from user_room <------and ------>create-room-id from table room <------

app.post('/set-room-users', setAllRoomUsersDetail);

// second-chart-service ***** ----> get-users <------****//

app.get('/get-room-users-id', selectAllRoomUsersDetail);

// delete-room-id's

app.delete('/delete-room-user-id', deleteRoomUsers);

// set-messages in chart-message table

app.post('/user-chartting', insertCurentUserMessageDetail);

// get-message from chart-messages table

app.post('/user-get-message', userGetMessage);

app.listen(4000, () => {
    console.log('app listen in 4000');
});