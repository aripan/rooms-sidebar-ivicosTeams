import { Stack } from "@fluentui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { IRoom, IUser } from "../../db/dbTypes";
import CommonRoomView from "./CommonRoomView/CommonRoomView";
import PersonalRoomView from "./PersonalRoomView/PersonalRoomView";

interface IRoomViewViewProps {
  users: IUser[];
  rooms: IRoom[];
}

const RoomViewView: React.FC<IRoomViewViewProps> = (props) => {
  const { users, rooms } = props;
  const { roomId } = useParams();
  const roomToShow = rooms.find((room: IRoom) => room.id === roomId);
  const personalRoomToShow = users.find((user: IUser) => user.id === roomId);
  return (
    <Stack
      style={{
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "10px 10px 0 0",
      }}
    >
      {roomToShow && !personalRoomToShow && (
        <CommonRoomView roomToShow={roomToShow} />
      )}
      {!roomToShow && personalRoomToShow && (
        <PersonalRoomView personalRoomToShow={personalRoomToShow} />
      )}
    </Stack>
  );
};

export default RoomViewView;
