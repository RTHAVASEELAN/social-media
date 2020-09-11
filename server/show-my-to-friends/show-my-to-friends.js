async function showMyToFriends(sessionid) {
    try {
        const sql = `select username, email from users where id in(
            select to_user_id from 
            friend_request where status='accept' and 
            from_user_id =
            (select id from users where sessionid=:sessionidEle)) `;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        })


        if (rows.affectedRows !== '') {
            return rows;
        }
        else {
            return "failed"
        }
    } 
    catch (e) {
    console.log(e)
}
}

module.exports = showMyToFriends;