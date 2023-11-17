import * as React from "react";
import { Icon, Image, Stack, Text } from "@fluentui/react";

import { useNavigate } from "react-router-dom";
import {
  useCurrentUserInfo,
  useUsersInCommonRoom,
} from "../../../shared-state/users/hooks";
import { useTeamRooms } from "../../../shared-state/rooms/hooks";
import MembersOfATeam from "./MembersOfATeam/MembersOfATeam";

export const CommonRoomViewView: React.FC<any> = (props) => {
  const { roomToShow, currentAreaId } = props;
  const routeHistory = useNavigate();
  const [currentUserInfo] = useCurrentUserInfo();
  const [usersInCommonRoom, setUsersInCommonRoom] = useUsersInCommonRoom();
  const [teamRooms] = useTeamRooms();
  const currentTeamRoom = teamRooms.find(
    (teamRoom: any) => teamRoom.id === roomToShow.id
  );

  const handleGoBackToPersonalRoom = () => {
    const userToGoBack = usersInCommonRoom.find(
      (user) => user.id === currentUserInfo?.id
    );
    if (userToGoBack) {
      setUsersInCommonRoom(
        usersInCommonRoom.filter((user) => user.id !== userToGoBack.id)
      );
      routeHistory(`/areas/${currentAreaId}/rooms/${currentUserInfo?.id}`);
    }
  };

  return (
    <Stack
      style={{
        height: "100%",
      }}
    >
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        style={{
          height: "10%",
          backgroundColor: "rgba(145, 234, 228, 0.9)",
          padding: 10,
          borderRadius: "8px 8px 0 0",
          color: "#000",
        }}
      >
        <Text>{currentTeamRoom?.displayName}</Text>
        {!roomToShow?.id.includes(currentUserInfo?.id) && (
          <Icon
            iconName="OutOfOffice"
            style={{
              cursor: "pointer",
              color: "#000",
              fontSize: 20,
            }}
            onClick={handleGoBackToPersonalRoom}
          />
        )}
      </Stack>
      <Stack
        style={{
          height: "90%",
          backgroundImage: `url(${roomToShow?.attributes?.roomImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.5,
        }}
      >
        {/* <Stack
          horizontalAlign="center"
          verticalAlign="center"
          style={{
            marginTop: 120,
          }}
        >
          <Image
            src={roomToShow?.attributes?.roomImg}
            width={350}
            height={350}
            style={{
              borderRadius: "50%",
            }}
          />
        </Stack> */}

        {/* <MembersOfATeam currentTeamRoom={currentTeamRoom} /> */}
      </Stack>
    </Stack>
  );
};
