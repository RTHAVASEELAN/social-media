async function frientRequest(sessionid, emailid, status) {
    try {
        const sql = `select  id from users where sessionid=:sessionidEle`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });
        const from_user_id = rows[0].id;

        if (from_user_id != '') {

            const sql = 'select id from users where email= :emailEle';
            const [rows1, fileds] = await dbConnection.execute(sql, {
                emailEle: emailid
            })
            const to_user_id = rows1[0].id
            if (to_user_id != '') {

                const sql = `insert into friend_request (from_user_id, to_user_id, status)
                 values(:from_user_idEle, :to_user_idEle, :statusEle)`;

                const [rows, fileds] = await dbConnection.execute(sql, {
                    from_user_idEle: from_user_id,
                    to_user_idEle: to_user_id,
                    statusEle: status
                });

                if (rows.affectedRows == 1) {
                    return "success";
                }
                else {
                    return "faild";
                }
            }
        }

    }
    catch (e) {
        console.log(e)
    }

}
module.exports = frientRequest;