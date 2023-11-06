import { useContext, useEffect } from "react";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";
import { Label, Stack } from "@fluentui/react";
import { UserPersona } from "./UserPersona";

export function CurrentUsersInfo(props: any) {
  const { endpoint, handleAddUser } = props;
  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    endpoint
  );

  const { meInfo, myPresenceInfo, imgUrl } = data ?? {};

  useEffect(() => {
    if (meInfo && myPresenceInfo && imgUrl) {
      const user = {
        name: meInfo.displayName,
        email: meInfo.mail,
        image: imgUrl,
        presence: myPresenceInfo.availability.toLowerCase(),
        isOutOfOffice: myPresenceInfo.outOfOfficeSettings.isOutOfOffice,
      };
      handleAddUser(user);
    }
  }, [meInfo, myPresenceInfo, imgUrl]);

  return (
    <Stack
      style={{
        backgroundColor: "rgba(145, 234, 228, 0.4)",
        padding: "0 0 10px 0",
        borderRadius: 10,
      }}
    >
      {meInfo && myPresenceInfo && imgUrl && (
        <>
          <Label
            style={{
              backgroundColor: "rgba(145, 234, 228, 0.9)",
              borderRadius: "10px 10px 0 0",
              padding: "5px 5px 5px 10px",
            }}
          >
            {meInfo.displayName}'s room
          </Label>
          <UserPersona
            name={meInfo.displayName}
            imageUrl={imgUrl}
            presenceStatus={myPresenceInfo.availability.toLowerCase()}
            outOfOfficeStatus={myPresenceInfo.outOfOfficeSettings.isOutOfOffice}
          />
        </>
      )}
    </Stack>
  );
}
