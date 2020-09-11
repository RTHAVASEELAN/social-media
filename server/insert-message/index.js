const insertUserMessageDetail = require('./insert-message');

async function insertUserMessage(req, res) {
     const sessionId = req.cookies.userSessionId;
    const insertMessage = await insertUserMessageDetail(sessionId, req.body.roomid, req.body.messages);

    res.send({
        status: insertMessage
    });
}

module.exports = insertUserMessage;