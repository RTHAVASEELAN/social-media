const loginCheckData = require('./login');

async function loginService(req, res){
    try {
        const loginData = await loginCheckData(req.body.email, req.body.password)
        let response = '';

        if (!loginData || loginData === 'failed') {
            response = 'failed';
        } else {
            const oneDayToSeconds = 24 * 60 * 60 * 1000;

            res.cookie('userSessionId', loginData,
                { maxAge: oneDayToSeconds, httpOnly: true });
            response = 'success';
        }

        res.send({
            status: response,
            userData: {}
        });

    }
    catch (e) {
        console.log(e)
    }
}

module.exports = loginService;
