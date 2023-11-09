import { Stack, Text } from "@fluentui/react";
import React, { useState } from "react";
import { Room } from "../../../db/dbTypes";

export interface ICommonRoomHeaderProps {
  room: Room;
  isUserInsideTheRoom?: boolean;
}

const CommonRoomHeader: React.FunctionComponent<ICommonRoomHeaderProps> = ({
  room,
  isUserInsideTheRoom,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Stack
      style={{
        width: "100%",
        height: "auto",
        padding: "8px 10px",
        margin: "5px 0",
        backgroundColor:
          hover || isUserInsideTheRoom ? "rgba(145, 234, 228, 0.9)" : "#fff",
        borderRadius: isUserInsideTheRoom ? "5px 5px 0 0" : "5px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Stack>
        <Text title={room.name}>{room.name}</Text>
      </Stack>
    </Stack>
  );
};
export default CommonRoomHeader;
