async function userDetails(sessionid) {
    try {

        const sql = `select username, email from users where sessionid=:sessionidEle`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        })
        if (rows.affectedRows !== '') {
            return rows
        }
        else {
            return "failed";
        }
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = userDetails;