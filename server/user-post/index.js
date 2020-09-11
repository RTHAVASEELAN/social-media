const usersPostData = require("./user-post");

async function usersPosts(req, res)  {
    try {
        const sessionId = req.cookies.userSessionId;
        const postData = await usersPostData(req.body.text, sessionId);
        res.send({
            status: postData
        })
    }
    catch (e) {
        console.log(e)
    }

}

module.exports = usersPosts;