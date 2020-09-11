async function postData(text, sessionid) {
    try {
        const sql = `select id from users where sessionid= :sessionidEle;`;
        const [rows, filed] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });
        
        if (rows[0].id != '') {
            const id = rows[0].id;
            const sql = `insert into userspost (text, userid) values (:textEle, :useridEle)`;
            const [rows1, filed] = await dbConnection.execute(sql, {
                textEle: text,
                useridEle: id
            });

            if (rows1.affectedRows == 1) {
                return 'success';
            }
        }
        else {
            return "faild";
        }
    }
    catch (e) {
        console.log(e)
    }

}

module.exports = postData;