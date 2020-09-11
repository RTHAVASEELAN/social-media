async function showAllFriends(sessionid) {
    try {
        const sql = ` select users.username, users.email from users inner join friend_request 
    on users.id = friend_request.from_user_id where friend_request.status='accept' and
    friend_request.to_user_id = 
    (select id from users where sessionid =:sessionidEle)`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });

        if (rows.affectedRows !== '') {
            return rows
        }
        else {
            return "failed"
        }
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = showAllFriends;