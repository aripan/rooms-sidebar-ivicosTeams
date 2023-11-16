import { Label, Stack } from "@fluentui/react";
import { UserPersona } from "../UserPersona";
import { useCurrentUserInfo } from "../../../shared-state/users/hooks";
import { IUser } from "../../../db/dbTypes";

export interface IPersonalRoom {
  user: IUser;
  userImage: string;
  userPresenceInfo: any;
}
export const PersonalRoom: React.FC<IPersonalRoom> = ({
  user,
  userImage,
  userPresenceInfo,
}) => {
  const [currentUserInfo] = useCurrentUserInfo();
  const isCurrentUser = currentUserInfo?.id === user.id;

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
      <UserPersona
        name={user.name}
        imageUrl={userImage}
        presenceStatus={userPresenceInfo?.activity.toLowerCase()}
        outOfOfficeStatus={userPresenceInfo?.outOfOfficeSettings.isOutOfOffice}
      />
    </Stack>
  );
};
