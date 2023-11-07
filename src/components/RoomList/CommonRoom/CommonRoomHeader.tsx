import { Stack, Text } from "@fluentui/react";
import React, { useState } from "react";
import { Room } from "../../../db/dbTypes";

export interface ICommonRoomHeaderProps {
  room: Room;
}

const CommonRoomHeader: React.FunctionComponent<ICommonRoomHeaderProps> = ({
  room,
}) => {
  return (
    <Stack
      style={{
        width: "100%",
        height: "auto",
        padding: "8px 10px",
        margin: "5px 0",
        backgroundColor: "#fff",
        borderRadius: "5px",
      }}
    >
      <Stack>
        <Text title={room.name}>{room.name}</Text>
      </Stack>
    </Stack>
  );
};
export default CommonRoomHeader;
