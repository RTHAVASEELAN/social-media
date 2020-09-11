var crypto = require('crypto');

async function postData(userName, email, password, gender, date) {
    try {
        const sql = `insert into users (username,  email, password, gender, date)
        values(:userNameEle,  :emailEle, :passwordEle, :genderEle, :dateEle)`

        var hashPassword = crypto.createHash('md5').update(password).digest('hex');

        const [rows, filed] = await dbConnection.execute(sql, {
            userNameEle: userName,
            emailEle: email,
            passwordEle: hashPassword,
            genderEle: gender,
            dateEle: date
        })

        if (rows.affectedRows == 1) {
            return "success";
        }
        else {
            return "failed"
        }
    }
    catch{
        console.log(e);
    }

}

module.exports = postData;