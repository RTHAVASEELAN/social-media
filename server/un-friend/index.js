const unfriendUser = require("./unFriend");

  async function unFrient(req, res) {
    try {
        const sessionId = req.cookies.userSessionId;
        const unfiend = await unfriendUser(sessionId, req.body.email,
            req.body.status)
        res.json({
            status: unfiend
        })
    }
    catch (e) {
        console.log(e)
    }


}
module.exports = unFrient;