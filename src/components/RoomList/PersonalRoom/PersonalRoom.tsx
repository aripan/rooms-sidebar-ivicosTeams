import { Label, Stack } from "@fluentui/react";
import { UserPersona } from "../UserPersona";
import { useCurrentUserInfo } from "../../../shared-state/users/hooks";
import { IRoom, IUser } from "../../../db/dbTypes";
import { useRoomActions } from "../helpers/roomHooks";
import { IC } from "../../../Kits/SVGIcon";

export interface IPersonalRoom {
  user: IUser;
  room: IRoom;
}
export const PersonalRoom: React.FC<IPersonalRoom> = ({ user, room }) => {
  const [currentUserInfo] = useCurrentUserInfo();
  const isCurrentUser = currentUserInfo?.id === user.id;
  const { knockOnRoomAction } = useRoomActions(room.id);

  return (
    <Stack
      style={{
        backgroundColor: isCurrentUser
          ? "rgba(145, 234, 228, 0.3)"
          : "rgba(249, 249, 249, 0.7)",
        padding: "0 0 10px 0",
        borderRadius: 10,
      }}
    >
      <Label
        style={{
          backgroundColor: isCurrentUser ? "rgba(145, 234, 228, 0.9)" : "#fff",
          borderRadius: "10px 10px 0 0",
          padding: "5px 5px 5px 10px",
        }}
      >
        {user.name}'s personal room
      </Label>
      <Stack horizontal horizontalAlign="space-between">
        <UserPersona
          name={user.name}
          imageUrl={user.image}
          presenceStatus={user.status.presence}
          outOfOfficeStatus={user.status.isOutOfOffice}
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
    </Stack>
  );
};
