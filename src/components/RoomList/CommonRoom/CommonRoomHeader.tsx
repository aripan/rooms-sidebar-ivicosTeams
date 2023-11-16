import { Image, Stack, Text } from "@fluentui/react";
import React, { useContext, useEffect, useState } from "react";
import { IRoom } from "../../../db/dbTypes";
import { useTeamRooms } from "../../../shared-state/rooms/hooks";
import { TeamsFxContext } from "../../../Context";
import { CallAzureFunction } from "../../../HandleAzureFunctionalities/CallAzureFunction";

export interface ICommonRoomHeaderProps {
  room: IRoom;
  isUserInsideTheRoom?: boolean;
}

const CommonRoomHeader: React.FunctionComponent<ICommonRoomHeaderProps> = ({
  room,
  isUserInsideTheRoom,
}) => {
  const [hover, setHover] = useState(false);
  const [teamRoomImage, setTeamRoomImage] = useState("");
  const [teamRooms] = useTeamRooms();

  const currentTeamRoom = teamRooms.find(
    (teamRoom: any) => teamRoom.id === room.id
  );

  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }

  useEffect(() => {
    const fetchCurrentTeamRoomPhoto = async (id: any) => {
      try {
        const functionRes = await CallAzureFunction(
          teamsUserCredential,
          `teamsRoutes/teamPhoto=${id}`
        );
        setTeamRoomImage(functionRes);
      } catch (error: any) {
        throw error;
      }
    };
    fetchCurrentTeamRoomPhoto(room.id);
  }, [room, teamsUserCredential]);

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
      <Stack
        horizontal
        tokens={{
          childrenGap: 8,
        }}
      >
        <Image
          src={teamRoomImage}
          alt="team-room-image"
          width={20}
          height={20}
        />
        <Text>{currentTeamRoom?.displayName}</Text>
      </Stack>
    </Stack>
  );
};
export default CommonRoomHeader;
