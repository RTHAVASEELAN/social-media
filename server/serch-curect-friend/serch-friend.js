async function serchFriends(emailid) {
    try {
        const sql = `select * from users where email= :emailEle`;
        const [rows, fileds] = await dbConnection.execute(sql, {
            emailEle: emailid
        })
        
        const requestFriend = rows[0];
        if (requestFriend != '') {
            return requestFriend;
        }
        else {
            return "error";
        }
    }
    catch (e) {
        console.log(e)
    }

}
module.exports = serchFriends;