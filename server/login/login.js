var crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

async function loginDatas(email, password) {
    try {
        var hashPassword = crypto.createHash('md5').update(password).digest('hex');
        const sql = `select email, password from users where email=:emailEle `;
        const [rows, filed] = await dbConnection.execute(sql, {
            emailEle: email
        });
        
        if (rows[0].password == hashPassword) {
            const sessionid = uuidv4();
            const sqlInsert = `UPDATE Users SET sessionid = :seionidEle WHERE email = :emailEle`;
            const [rows1, filed1] = await dbConnection.execute(sqlInsert, {
                seionidEle: sessionid,
                emailEle: email
            });

            if (rows1.affectedRows == 1) {
                return sessionid;
            } else {
                return "failed"
            }

        }
        else {
            console.log("error")
        }
    }
    catch (e) {
        console.log(e)
    }

}

module.exports = loginDatas;