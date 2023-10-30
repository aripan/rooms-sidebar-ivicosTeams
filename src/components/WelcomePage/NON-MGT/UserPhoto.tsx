import { useContext, useState } from "react";
import { Button } from "@fluentui/react-components";
import "../WelcomePage.css";
import { TeamsFxContext } from "../../Context";
import { useAzureFunctionData } from "../../HandleAzureFunctionalities/hooks";

export function UserPhoto({ endpoint }: any) {
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
            {showInfo ? "Hide Photo" : "Show Photo"}
          </Button>
        </div>
        <br />
        <br />
        {showInfo && (
          <img
            src={data}
            alt="avatar"
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
            }}
          />
        )}
      </div>
    </div>
  );
}
