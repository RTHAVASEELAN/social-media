async function insertMessage(sessionid, roomid, messages) {
    try {
        const sql = `select id from users where sessionid=:sessionidEle`;

        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });
        const messagesUserId = rows[0].id;

        if (messagesUserId > 0) {
            const sql = `insert into chart_message(message_user_id, message_room_id, messages) 
        values(:message_user_idEle, :message_room_idEle, :messageEle)`;

            const [rows, fileds] = await dbConnection.execute(sql, {
                message_user_idEle: messagesUserId,
                message_room_idEle: roomid,
                messageEle: messages
            });

            if (rows.affectedRows == 1) {
                return "success";
            }
            else {
                return "failed";
            }
        }
        else {
            console.log("id is not there");
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = insertMessage;