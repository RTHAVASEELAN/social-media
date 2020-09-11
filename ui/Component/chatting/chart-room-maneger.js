import React, { useState } from 'react';
import * as _ from 'lodash';
import './chartting.scss';
import DisplayAllRoomUsers from './user-chat-room';

function RoomUser({ usersDetail, getRoomUsers }) {

    const groupedByRoomId = _.groupBy(usersDetail, f => f.room_id);

    const groupedMebersKey = Object.keys(groupedByRoomId);


    return (
        < div >

            {
                groupedMebersKey && groupedMebersKey.map((item, index) => {
                    return <DisplayAllRoomUsers key={index} chartMembers={groupedByRoomId[item]} getRoomUsers={getRoomUsers} />
                })
            }

        </div >

    )
};

export default RoomUser;
