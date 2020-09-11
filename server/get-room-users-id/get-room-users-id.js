async function getAllRoomUsersId(sessionid) {
    try {

        const sql = `select  username, a.user_id, a.room_id from users inner join
        (select user_id, room_id from user_room where room_id in(
       select  user_room.room_id from user_room inner join users on user_room.user_id = users.id
       where sessionid=:sessionidEle)) as a on a.user_id=users.id`;

        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });


        if (rows && rows !== null) {
            return rows;
        } else {
            return "no values";
        }
    }

    catch (e) {
        console.log(e);
    }
}

module.exports = getAllRoomUsersId;