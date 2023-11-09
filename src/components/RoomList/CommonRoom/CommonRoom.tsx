import React, { useEffect, useState } from "react";
import { Room, User } from "../../../db/dbTypes";
import CommonRoomHeader from "./CommonRoomHeader";
import { Stack } from "@fluentui/react";
import { useNavigate, useParams } from "react-router-dom";
import CommonRoomUsers from "./CommonRoomUsers";
import { useCurrentUserInfo } from "../../../shared-state/users/hooks";

export interface ICommonRoomProps {
  room: Room;
}

const CommonRoom: React.FunctionComponent<ICommonRoomProps> = (props) => {
  const { room } = props;
  const routeHistory = useNavigate();
  const { roomId } = useParams();
  const [isUserInsideTheRoom, setIsUserInsideTheRoom] = useState(false);
  const [currentUserInfo] = useCurrentUserInfo();
  const [usersInsideTheRoom, setUsersInsideTheRoom] = useState<User[]>([]);

  useEffect(() => {
    if (room && roomId && room.id === roomId && currentUserInfo) {
      setUsersInsideTheRoom((prev) => [...prev, currentUserInfo]);
      setIsUserInsideTheRoom(true);
    } else {
      setIsUserInsideTheRoom(false);
    }
  }, [currentUserInfo, room, roomId]);

  return (
    <Stack
      onClick={() => {
        routeHistory(`/rooms/${room?.id}`);
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <CommonRoomHeader room={room} isUserInsideTheRoom={isUserInsideTheRoom} />
      {isUserInsideTheRoom && (
        <CommonRoomUsers
          usersInsideTheRoom={usersInsideTheRoom}
          isUserInsideTheRoom={isUserInsideTheRoom}
        />
      )}
    </Stack>
  );
};
export default CommonRoom;
