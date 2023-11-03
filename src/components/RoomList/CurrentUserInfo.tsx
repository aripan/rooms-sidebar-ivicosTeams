import { useContext } from "react";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";
import { Stack } from "@fluentui/react";
import { UserPersona } from "./UserPersona";

export function CurrentUsersInfo({ endpoint }: any) {
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

  return (
    <Stack>
      {meInfo && myPresenceInfo && imgUrl && (
        <UserPersona
          name={meInfo.displayName}
          imageUrl={imgUrl}
          presenceStatus={myPresenceInfo.availability.toLowerCase()}
          outOfOfficeStatus={myPresenceInfo.outOfOfficeSettings.isOutOfOffice}
        />
      )}
    </Stack>
  );
}
