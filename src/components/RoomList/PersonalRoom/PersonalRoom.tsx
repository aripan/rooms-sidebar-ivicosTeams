import { Label, Stack, Text } from "@fluentui/react";
import { UserPersona } from "../UserPersona";
import { useCurrentUserInfo } from "../../../shared-state/users/hooks";
import { IUser } from "../../../db/dbTypes";
import { useAzureFunctionData } from "../../../HandleAzureFunctionalities/hooks";
import { TeamsFxContext } from "../../../Context";
import { useContext } from "react";

export interface IPersonalRoom {
  user: IUser;
}
export const PersonalRoom: React.FC<IPersonalRoom> = ({ user }) => {
  const [currentUserInfo] = useCurrentUserInfo();
  const isCurrentUser = currentUserInfo?.id === user.id;

  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential!,
    "userRoutes/photo-presence"
  );

  const { image, presenceInfo } = data ?? {};

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
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <UserPersona
          name={user.name}
          imageUrl={image}
          presenceStatus={presenceInfo.activity.toLowerCase()}
          outOfOfficeStatus={presenceInfo.outOfOfficeSettings.isOutOfOffice}
        />
      )}
    </Stack>
  );
};
