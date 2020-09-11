const requireUserFrientReqData = require("./frient-request");

async function friendRequest (req, res)  {
    try {
        const sessionId = req.cookies.userSessionId;
        const userFrientReqData = await requireUserFrientReqData(sessionId, req.body.emailid, req.body.status)

        res.send({
            status: userFrientReqData
        })
    }

    catch (e) {
        console.log(e)
    }
}

module.exports = friendRequest;