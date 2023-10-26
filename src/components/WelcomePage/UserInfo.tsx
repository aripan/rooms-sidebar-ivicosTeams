import { useContext, useEffect, useState } from "react";
import { Button, PresenceBadge } from "@fluentui/react-components";
import "./WelcomePage.css";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";

export function UserInfo({ endpoint }: any) {
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
          <Button appearance="primary" disabled={loading} onClick={reload}>
            Show Info
          </Button>
        </div>
        <br />
        <br />

        <h1>Name: {data?.displayName}</h1>
        <h1>Email: {data?.mail}</h1>
      </div>
    </div>
  );
}
