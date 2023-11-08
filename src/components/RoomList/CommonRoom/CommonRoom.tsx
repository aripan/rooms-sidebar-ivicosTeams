import React from "react";
import { Room } from "../../../db/dbTypes";
import CommonRoomHeader from "./CommonRoomHeader";
import { Stack } from "@fluentui/react";
import { useNavigate } from "react-router-dom";

export interface ICommonRoomProps {
  room: Room;
}

const CommonRoom: React.FunctionComponent<ICommonRoomProps> = (props) => {
  const { room } = props;
  const routeHistory = useNavigate();

  return (
    <Stack
      onClick={() => {
        routeHistory(`/rooms/${room?.id}`);
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <CommonRoomHeader room={room} />
    </Stack>
  );
};
export default CommonRoom;
