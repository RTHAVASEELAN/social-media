async function totalFriends(sessionId) {
    try {
        const sql = `select COUNT(from_user_id) as total from friend_request 
        where status='accept' and to_user_id =
        (select id from users where sessionid=:sessionidEle)`;
        const [rows, filed] = await dbConnection.execute(sql, {
            sessionidEle: sessionId
        });
      var total = rows[0].total;
        if (rows.affectedRows !== '') {
            return total;
        }
        else {
            return "failed"
        }
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = totalFriends;
