import React, { useState } from "react";
import { Room } from "../../../db/dbTypes";
import CommonRoomHeader from "./CommonRoomHeader";
import { Stack } from "@fluentui/react";

export interface ICommonRoomProps {
  room: Room;
}

const CommonRoom: React.FunctionComponent<ICommonRoomProps> = (props) => {
  const { room } = props;

  return (
    <Stack
      onClick={() => {
        console.log("🚀 ~ file: CommonRoom.tsx:12 ~ room:", room);
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
