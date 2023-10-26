import { useContext } from "react";
import { Button, PresenceBadge } from "@fluentui/react-components";
import "./WelcomePage.css";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";
import { Person, PersonCard, PersonViewType } from "@microsoft/mgt-react";

export function WelcomePage() {
  const { teamsUserCredential } = useContext(TeamsFxContext);
  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    "userRoutes/photo"
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

        <img
          src={data}
          alt="avatar"
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
          }}
        />

        {/* <Person
          personQuery={data?.mail}
          view={PersonViewType.twolines}
          avatarSize="large"
        /> */}

        {/* <PersonCard personQuery="me" /> */}
      </div>
    </div>
  );
}
