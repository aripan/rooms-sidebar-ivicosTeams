import { useContext, useEffect, useState } from "react";
import { Button, PresenceBadge } from "@fluentui/react-components";
import "./WelcomePage.css";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";

export function UserInfo({ endpoint }: any) {
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
      <div className="page-padding">
        <div>
          <Button
            appearance="primary"
            // disabled={loading}
            onClick={() => {
              reload();
              setShowInfo(!showInfo);
            }}
          >
            Show Info
          </Button>
        </div>
        <br />
        <br />

        {showInfo && (
          <>
            <h4>Name: {data?.displayName}</h4>
            <h4>Email: {data?.mail}</h4>
          </>
        )}
      </div>
    </div>
  );
}
