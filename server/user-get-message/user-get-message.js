async function userGetMessage(sessionid, roomid) {
    try {
        const sql = `select users.username, chart_message.message_user_id, chart_message.message_room_id,
        chart_message.messages, chart_message.created_at from users inner join chart_message on
        users.id = chart_message.message_user_id where message_room_id=:room_idEle order by  created_at desc `;

        const [rows, fileds] = await dbConnection.execute(sql, {
            room_idEle: roomid
        })

        if (rows.length >= 0) {
            return rows;
        }
        else {
            return "no message";
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = userGetMessage;