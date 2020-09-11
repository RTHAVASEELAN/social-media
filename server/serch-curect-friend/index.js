const serchCurectFriends = require("./serch-friend");

async function serchFriends (req, res) {
    try {
        const serchFriends = await serchCurectFriends(req.body.emailid);
        res.send({
            status: serchFriends
        })
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = serchFriends;