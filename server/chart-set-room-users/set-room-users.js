async function setUserId(sessionid, firstEmail, secondEmail, thirdEmail) {
    try {

        const sql = `select id from users where sessionid=:sessionidEle `;
        const [rows, fileds] = await dbConnection.execute(sql, {
            sessionidEle: sessionid
        });

        // insert and get a room id

        const created_id = rows[0].id;
        if (created_id && created_id !== null && created_id !== undefined) {
            const sql = `insert into room(created_id) values ( :created_idEle)`;

            const [rows, fileds] = await dbConnection.execute(sql, {
                created_idEle: created_id
            });

            const room_id = rows.insertId;


            if (room_id && room_id !== null && room_id !== undefined) {
                const sql = `select id from users where email=:firstEmailEle
                or email=:secondEmailEle or email=:thirdEmailEle 
                or sessionid=:sessionidEle`;

                const [rows, fileds] = await dbConnection.execute(sql, {
                    firstEmailEle: firstEmail,
                    secondEmailEle: secondEmail,
                    thirdEmailEle: thirdEmail,
                    sessionidEle: sessionid
                });

                if (rows && rows.length) {
                    //const roomUserId = rows;

                    const insertingRows = rows.map(f => f.id);

                    const sql = `insert into user_room (room_id, user_id) values ?`;


                    const valuesEle = [
                        ...insertingRows.map(f => {
                            return [room_id, f];
                        })
                    ];


                    const [rows1, fileds] = await dbConnection.query(sql,
                        [valuesEle]
                    );

                    if (rows1.affectedRows > 0) {
                        return "success";
                    }
                    else {
                        return "no user given";
                    }

                }
            }

        }

    }
    catch (e) {
        console.log(e);
    }
}

module.exports = setUserId;