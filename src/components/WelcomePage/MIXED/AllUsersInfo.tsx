import { useContext, useState } from "react";
import { Button } from "@fluentui/react-components";
import "../WelcomePage.css";
import { TeamsFxContext } from "../../Context";
import { useAzureFunctionData } from "../../HandleAzureFunctionalities/hooks";
import { Person, PersonViewType } from "@microsoft/mgt-react";
import { Stack } from "@fluentui/react";

export function AllUsersInfo({ endpoint }: any) {
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
    <div className="welcome page">
      <Stack className="page-padding">
        <div>
          <Button
            appearance="primary"
            onClick={() => {
              reload();
              setShowInfo(!showInfo);
            }}
          >
            {showInfo ? "Hide All Users" : "Show All Users"}
          </Button>
        </div>

        <Stack
          style={{
            width: 250,
            maxHeight: 350,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {showInfo &&
            data &&
            data.map((user: { mail: string | undefined }) => (
              <Stack key={user?.mail}>
                <Person
                  personQuery={user?.mail}
                  view={PersonViewType.twolines}
                  avatarSize="large"
                />
              </Stack>
            ))}
        </Stack>
      </Stack>
    </div>
  );
}
