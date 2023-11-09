import { Stack } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { User } from "../../../db/dbTypes";
import { UserPersona } from "../UserPersona";
import { useUsersInCommonRoom } from "../../../shared-state/users/hooks";
// Define the Props interface
export interface ICommonRoomUsersProps {
  usersInsideTheRoom?: User[];
}

const CommonRoomUsers: React.FunctionComponent<ICommonRoomUsersProps> = (
  props
) => {
  const { usersInsideTheRoom } = props;
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
        backgroundColor: "#f9f9f9",
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
