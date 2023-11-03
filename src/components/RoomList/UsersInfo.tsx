import { useContext, useEffect, useState } from "react";

import { Person, PersonViewType } from "@microsoft/mgt-react";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";
import { Stack } from "@fluentui/react";
import { Persona } from "@fluentui/react-components";
import { UserPersona } from "./UserPersona";

export function UsersInfo({ endpoint }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    endpoint
  );

  return (
    <Stack
      tokens={{
        childrenGap: 10,
      }}
      style={{
        height: 500,
        overflowY: "auto",
      }}
    >
      {data &&
        data.map((user: any) => (
          <Stack>
            <UserPersona
              name={user.displayName}
              imageUrl="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png"
              presenceStatus={"available"}
            />
          </Stack>
        ))}
    </Stack>
  );
}
