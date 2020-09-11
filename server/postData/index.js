const postResDta = require('./postData');
async function registerUsers(req, res)  {
    try {

        const postUserData = await postResDta(req.body.userName, req.body.email, req.body.password, req.body.gender, req.body.date);

        res.send({
            status: postUserData
        });
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = registerUsers;