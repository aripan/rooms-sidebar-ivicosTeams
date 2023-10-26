import { useContext, useEffect, useState } from "react";
import { Button, PresenceBadge } from "@fluentui/react-components";
import "./WelcomePage.css";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";

export function UserPhoto({ endpoint }: any) {
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
            Show Photo
          </Button>
        </div>
        <br />
        <br />

        <img
          src={data}
          alt="avatar"
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
}
