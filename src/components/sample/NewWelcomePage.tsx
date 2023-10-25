import { useContext, useState } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
  Button,
} from "@fluentui/react-components";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { AzureFunctions } from "./AzureFunctions";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { TeamsFxContext } from "../Context";
import { app } from "@microsoft/teams-js";
import { useAzureFunctionData } from "./HandleAzureFunctionalities/hooks";

export function NewWelcomePage(props: {
  showFunction?: boolean;
  environment?: string;
}) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };

  const { teamsUserCredential } = useContext(TeamsFxContext);
  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    "userRoutes"
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

        {/* {showFunction && <AzureFunctions />} */}
      </div>
    </div>
  );
}
