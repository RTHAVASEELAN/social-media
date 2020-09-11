const selectAllRoomUsersId = require('./get-room-users-id.js');

async function getAllUserRoomDetail(req, res) {
    try {
         const sessionId = req.cookies.userSessionId;
        const getRoomUsersId = await selectAllRoomUsersId(sessionId);
        res.send({
            status: getRoomUsersId
        });
    }
    catch (e) {
        console.log(e);
    };
};

module.exports = getAllUserRoomDetail;