import { Stack, Text } from "@fluentui/react";
import React from "react";
import { Room } from "./Room";
import { useParams } from "react-router-dom";

const RoomsView: React.FC<any> = (props) => {
  const { rooms } = props;
  const { roomId } = useParams();

  const roomToShow = rooms.find((room: any) => room.id.includes(roomId));
  return (
    <Stack>
      <Room roomToShow={roomToShow} />
    </Stack>
  );
};

export default RoomsView;
