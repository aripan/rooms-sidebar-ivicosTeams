import { Stack } from "@fluentui/react";
import { DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import React from "react";
import { PersonalRoom } from "./PersonalRoom/PersonalRoom";
import { IRoom, IUser } from "../../db/dbTypes";
import CommonRoom from "./CommonRoom/CommonRoom";
import { useUsersInCommonRoom } from "../../shared-state/users/hooks";
import { useLocation } from "react-router-dom";

const RoomListView: React.FC<any> = (props) => {
  const { users, rooms, userImage, userPresenceInfo } = props;
  const [usersInCommonRoom] = useUsersInCommonRoom();
  const { pathname } = useLocation();
  const currentAreaId = pathname?.split("/rooms/")[0].split("/areas/")[1];
  const usersNotInCommonRoom = users.filter(
    (user: IUser) =>
      !usersInCommonRoom.some((commonUser) => commonUser.id === user.id)
  );

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
              height: usersNotInCommonRoom.length > 0 ? 500 : 0,
              overflowY: "auto",
              marginBottom: 10,
            }}
          >
            {usersNotInCommonRoom.map((user: IUser) => (
              <Stack
                key={user.id}
                style={{
                  margin: "5px 0",
                }}
              >
                <PersonalRoom
                  user={user}
                  userImage={userImage}
                  userPresenceInfo={userPresenceInfo}
                />
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
              height: users.length > 0 ? 500 : "100%",
              overflowY: "auto",
              padding: "0 10px 10px 10px",
              marginBottom: 10,
            }}
          >
            {rooms
              .filter((room: IRoom) => room.area_id === currentAreaId)
              .map((room: IRoom) => (
                <CommonRoom
                  room={room}
                  key={room.id}
                  currentAreaId={currentAreaId}
                  userImage={userImage}
                  userPresenceInfo={userPresenceInfo}
                />
              ))}
          </Stack>
        </DividerBox>
      </Stack>
    </Stack>
  );
};

export default RoomListView;
