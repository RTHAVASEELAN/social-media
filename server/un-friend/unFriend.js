async function unFriend(sessionid, email, status) {
    try {
        const sql = `select id from users where sessionid=:sessionidEle`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });

        const to_user_id = rows[0].id;

        if (to_user_id !== '') {
            const sql = `select id from users where email=:emailEle`;
            const [rows, filed] = await dbConnection.execute(sql, {
                emailEle: email
            })
            const from_user_id = rows[0].id;

            if (from_user_id !== '') {
                const sql = `update friend_request set status=:statusEle  where from_user_id=:from_user_idEle and to_user_id=:to_user_idEle`;
                const [rows, fileds] = await dbConnection.execute(sql, {
                    statusEle: status,
                    from_user_idEle: from_user_id,
                    to_user_idEle: to_user_id
                })
                if (rows.affectedRows == 1) {
                    return "success";
                }
                else {
                    return "failed";
                }
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = unFriend;