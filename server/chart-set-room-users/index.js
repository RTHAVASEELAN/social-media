const setAllRoomUsers = require('./set-room-users');

async function setRoomUsers(req, res)  {
    try {
       const sessionId = req.cookies.userSessionId;
        const setRoomUsers = await setAllRoomUsers(sessionId, req.body.firstEmail, req.body.secondEmail, req.body.thirdEmail);
        
        res.send({
            status: setRoomUsers
        });
    }
    catch (e) {
        console.log(e);
    }
}

module.exports= setRoomUsers;