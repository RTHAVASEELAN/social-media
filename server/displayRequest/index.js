const checkStatus = require("./displayRequest");

async function displayFriends(req, res) {
    try {
        const sessionId = req.cookies.userSessionId;
        const displayReauest = await checkStatus(sessionId)
        res.send({
            status: displayReauest
        })
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = displayFriends;
