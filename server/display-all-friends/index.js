const showAllFriends = require("./displayAllFriends");

async function displayAllFriends(req, res) {
    try {
        const sessionId = req.cookies.userSessionId;
        const allfriends = await showAllFriends(sessionId);
        res.send({
            status: allfriends
        })
    }
    catch (e) {
        console.log(e)
    }

}

module.exports = displayAllFriends;