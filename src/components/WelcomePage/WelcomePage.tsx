import { useContext } from "react";
import { Button } from "@fluentui/react-components";
import "./WelcomePage.css";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";

export function WelcomePage() {
  const { teamsUserCredential } = useContext(TeamsFxContext);
  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    "userRoutes/messages"
  );

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        {!loading && (
          <Button appearance="primary" disabled={loading} onClick={reload}>
            Authorize and call Azure Function
          </Button>
        )}

        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}
