import React, { useEffect, useState } from "react";
import CommonRoomHeader from "./CommonRoomHeader";
import { Stack } from "@fluentui/react";
import { useNavigate, useParams } from "react-router-dom";
import CommonRoomUsers from "./CommonRoomUsers";
import { useCurrentUserInfo } from "../../../shared-state/users/hooks";
import { IRoom, IUser } from "../../../db/dbTypes";
import { useRoomActions } from "../helpers/roomHooks";

export interface ICommonRoomProps {
  room: IRoom;
  currentAreaId: string;
  userImage: string;
  userPresenceInfo: any;
}

const CommonRoom: React.FunctionComponent<ICommonRoomProps> = (props) => {
  const { room, currentAreaId, userImage, userPresenceInfo } = props;
  const routeHistory = useNavigate();
  const { roomId } = useParams();
  const [isUserInsideTheRoom, setIsUserInsideTheRoom] = useState(false);
  const [currentUserInfo] = useCurrentUserInfo();
  const [usersInsideTheRoom, setUsersInsideTheRoom] = useState<IUser[]>([]);
  const { knockOnRoomAction } = useRoomActions(room.id);

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
        routeHistory(`/areas/${currentAreaId}/rooms/${room?.id}`);
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
          knockOnRoomAction={knockOnRoomAction}
          userImage={userImage}
          userPresenceInfo={userPresenceInfo}
        />
      )}
    </Stack>
  );
};
export default CommonRoom;
