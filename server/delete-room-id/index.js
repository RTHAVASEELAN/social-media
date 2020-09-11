const deleteUsers = require('./delete-room-id');

async function deleteUserRoomIds(req, res) {
    try {
        const sessionId = req.cookies.userSessionId;
        const deleteResult = await deleteUsers(sessionId, req.body.roomid);
        res.send({
            status: deleteResult
        });
    }
    catch{
        console.log(e);
    }
}

module.exports = deleteUserRoomIds;