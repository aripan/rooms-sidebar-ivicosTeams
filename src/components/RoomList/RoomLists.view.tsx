import { Stack } from "@fluentui/react";
import { DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import React from "react";
import { PersonalRoom } from "./PersonalRoom/PersonalRoom";
import { IRoom, IUser } from "../../db/dbTypes";
import CommonRoom from "./CommonRoom/CommonRoom";
import { useUsersInCommonRoom } from "../../shared-state/users/hooks";

const RoomListView: React.FC<any> = (props) => {
  const { users, rooms } = props;
  const personalRooms = rooms.filter((room: IRoom) =>
    room.id.includes("Personal")
  );
  const commonRooms = rooms.filter(
    (room: IRoom) => !room.id.includes("Personal")
  );
  const [usersInCommonRoom] = useUsersInCommonRoom();

  return (
    <Stack style={{ maxHeight: "100%", height: "100%" }}>
      <Stack style={{ maxHeight: "100%", height: "100%" }}>
        <DividerBox mode="vertical" style={{ height: "80vh" }}>
          <h3
            style={{
              paddingLeft: 10,
            }}
          >
            Personal Rooms
          </h3>
          <Stack
            style={{
              padding: "0 10px 10px 10px",
              height: 500,
              overflowY: "auto",
              marginBottom: 10,
            }}
          >
            {users
              .filter(
                (user: IUser) =>
                  !usersInCommonRoom.some(
                    (commonUser) => commonUser.id === user.id
                  )
              )
              .map((user: IUser) => (
                <Stack
                  key={user.id}
                  style={{
                    margin: "5px 0",
                  }}
                >
                  {personalRooms.map((room: IRoom) => {
                    if (room.id.includes(user.id)) {
                      return <PersonalRoom user={user} room={room} />;
                    }
                  })}
                </Stack>
              ))}
          </Stack>
          <h3
            style={{
              paddingLeft: 10,
            }}
          >
            Common rooms
          </h3>
          <Stack
            style={{
              height: 500,
              overflowY: "auto",
              padding: "0 10px 10px 10px",
              marginBottom: 10,
            }}
          >
            {commonRooms.map((room: IRoom) => (
              <CommonRoom room={room} key={room.id} />
            ))}
          </Stack>
        </DividerBox>
      </Stack>
    </Stack>
  );
};

export default RoomListView;
