async function getUsersPost (req, res)  {
    try {
        const sql = `SELECT users.username, userspost.text, userspost.created_at
        FROM users
        INNER JOIN userspost
        ON users.id = userspost.userid `;

        const [rows, fileds] = await dbConnection.execute(sql);

        if (rows.affectedRows != '') {
            res.send(rows);
        }
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = getUsersPost;