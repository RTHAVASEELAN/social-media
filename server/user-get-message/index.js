const userGetMessageDetail = require('./user-get-message');

async function getUserMessage(req, res)  {
    try {
        const sessionId = req.cookies.userSessionId;
        const userGetMessage = await userGetMessageDetail( sessionId, req.body.roomid);
        res.send({
            status: userGetMessage
        });
    }
    catch (e) {
        console.log(e);
    }

}

module.exports = getUserMessage;