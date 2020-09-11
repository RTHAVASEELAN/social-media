async function logout(sessionid, email) {
    try {
        const sql = `UPDATE users SET sessionid =:setsessionidEle
        WHERE email =:emailEle`;
        const [rows, filed] = await dbConnection.execute(sql, {
            setsessionidEle: '',
            emailEle: email
        })

        if (rows.affectedRows == 1) {
            return "success"
        }
        else {
            return "failed"
        }
    }
    catch (e) {
        console.log(e)
    }

}

module.exports = logout;