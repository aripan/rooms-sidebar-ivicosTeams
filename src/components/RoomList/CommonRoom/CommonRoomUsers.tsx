import { Stack } from "@fluentui/react";
import React, { useEffect } from "react";
import { User } from "../../../db/dbTypes";
import { UserPersona } from "../UserPersona";
import { useUsersInCommonRoom } from "../../../shared-state/users/hooks";
// Define the Props interface
export interface ICommonRoomUsersProps {
  usersInsideTheRoom?: User[];
  isUserInsideTheRoom?: boolean;
}

const CommonRoomUsers: React.FunctionComponent<ICommonRoomUsersProps> = (
  props
) => {
  const { usersInsideTheRoom, isUserInsideTheRoom } = props;
  const [usersInCommonRoom, setUsersInCommonRoom] = useUsersInCommonRoom();

  useEffect(() => {
    const uniqueUsersInsideTheRoom = [...new Set(usersInsideTheRoom)];
    setUsersInCommonRoom(uniqueUsersInsideTheRoom);
  }, [setUsersInCommonRoom, usersInsideTheRoom]);

  return (
    <Stack
      style={{
        marginTop: -5,
        marginBottom: 5,
        height: 60,
        borderRadius: "0 0 5px 5px",
        backgroundColor: isUserInsideTheRoom
          ? "rgba(145, 234, 228, 0.3)"
          : "rgba(249, 249, 249, 0.7)",
      }}
    >
      {usersInCommonRoom?.map((user) => (
        <UserPersona
          name={user.name}
          imageUrl={user.image}
          presenceStatus={user.presence}
          outOfOfficeStatus={user.isOutOfOffice}
        />
      ))}
    </Stack>
  );
};
export default CommonRoomUsers;
