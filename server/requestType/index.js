const acceptOrRemove = require("./requestType");

async function acceptRequest(req, res) {
    const sessionId = req.cookies.userSessionId;
    const setFriendRequest = await acceptOrRemove(sessionId, req.body.email, req.body.reqStatus)
    res.send({
        status: setFriendRequest
    })
}

module.exports = acceptRequest;