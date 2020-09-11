async function deleteRoomId(sessionid, roomid) {
    try {

        const sql = `delete  from user_room where room_id =:room_idEle`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            room_idEle: roomid
        });

        if (rows.affectedRows >= 1) {
            const sql = `delete from room where id=:roomidEle`;

            const [rows, fileds] = await dbConnection.execute(sql, {
                roomidEle: roomid
            });

            if (rows.affectedRows == 1) {
                return "success";
            }
            else {
                return "faied";
            }
        }
    }

    catch (e) {
        console.log(e);
    }
}

module.exports = deleteRoomId;