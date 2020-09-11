async function requestFrients(sessionid, email, reqStatus) {
    try {

        const sql1 = `select id from users where sessionid=:sessionidEle`;
        const [rows, fileds] = await dbConnection.execute(sql1, {
            sessionidEle: sessionid
        });

        const to_user_id = rows[0].id;
        if (to_user_id != '') {
            const sql2 = `select id from users where email=:emailEle`;
            const [rows, fileds] = await dbConnection.execute(sql2, {
                emailEle: email
            });
            const from_user_id = rows[0].id;
            if (from_user_id != '') {
                const sql3 = ` select status from friend_request where from_user_id=:from_useridEle and to_user_id=:to_user_idEle`;

                const [rows, fileds] = await dbConnection.execute(sql3, {
                    from_useridEle: from_user_id,
                    to_user_idEle: to_user_id
                })
                const status = rows[0].status;
                if (status == 'pending') {
                    const sql4 = `update friend_request set status=:statusEle 
                where from_user_id =:from_user_idEle and to_user_id =:to_user_idEle `;
                    const [rows, fileds] = await dbConnection.execute(sql4, {
                        statusEle: reqStatus,
                        from_user_idEle: from_user_id,
                        to_user_idEle: to_user_id
                    })

                    if (rows.affectedRows == 1) {
                        return "success";
                    }
                    else {
                        return "failed"
                    }
                }
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}
module.exports = requestFrients;