const usersInformation = require('./which-user')

async function displayCurentUser (req, res) {
    try {
        const sessionId = req.cookies.userSessionId;
        const displayUsersDetail = await usersInformation(sessionId)
        res.send({
            status: displayUsersDetail
        })
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = displayCurentUser;