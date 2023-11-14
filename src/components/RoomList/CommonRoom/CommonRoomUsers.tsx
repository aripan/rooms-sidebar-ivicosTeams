import { Stack } from "@fluentui/react";
import React, { useEffect } from "react";
import { IUser } from "../../../db/dbTypes";
import { UserPersona } from "../UserPersona";
import { useUsersInCommonRoom } from "../../../shared-state/users/hooks";
import { IRoomAction } from "../helpers/roomHooks";
import { IC } from "../../../Kits/SVGIcon";
// Define the Props interface
export interface ICommonRoomUsersProps {
  usersInsideTheRoom?: IUser[];
  isUserInsideTheRoom?: boolean;
  knockOnRoomAction: IRoomAction;
}

const CommonRoomUsers: React.FunctionComponent<ICommonRoomUsersProps> = (
  props
) => {
  const { usersInsideTheRoom, isUserInsideTheRoom, knockOnRoomAction } = props;
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
        <Stack horizontal horizontalAlign="space-between">
          <UserPersona
            name={user.name}
            imageUrl={""}
            presenceStatus={"available"}
            outOfOfficeStatus={false}
          />

          <Stack
            verticalAlign="center"
            horizontalAlign="center"
            style={{
              height: 40,
              width: 40,
              marginTop: 8,
              marginRight: 10,
              borderRadius: "50%",
              backgroundColor: "#479ef5",
              cursor: "pointer",
            }}
          >
            <IC size={24} variant="light">
              {knockOnRoomAction.getSymbol && knockOnRoomAction.getSymbol()}
            </IC>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
export default CommonRoomUsers;
