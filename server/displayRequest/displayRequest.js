async function displayRequest(sessionid) {
    try {
        const sql3 = `select users.username, users.email,
                      friend_request.created_at, friend_request.from_user_id, 
                      friend_request.to_user_id,
                      friend_request.status from friend_request  inner join  users
                      on users.id = friend_request.from_user_id
                      where friend_request.status='pending' and  friend_request.to_user_id = (select id from users where sessionid =:sessionidEle)`

        const [rows, fileds] = await dbConnection.execute(sql3, {
            sessionidEle: sessionid,
        })
        const request_send_data = rows
        if (request_send_data != '') {
            return request_send_data
        }
        else {
            return "failed"
        }
    }

    catch (e) {
        console.log(e)
    }
}
module.exports = displayRequest;