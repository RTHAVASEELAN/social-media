const logoutDelite = require("./logout");

async function logoutUser (req, res) {
    const sessionId = req.cookies.userSessionId;
    const logoutData = await logoutDelite(sessionId, req.body.email);
    try {
        res.cookie('userSessionId', null,
            { maxAge: 0, httpOnly: true });

        res.send({
            status: logoutData
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports = logoutUser;