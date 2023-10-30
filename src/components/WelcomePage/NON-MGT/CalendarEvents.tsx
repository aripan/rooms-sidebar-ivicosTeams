import { useContext, useState } from "react";
import { Button } from "@fluentui/react-components";
import "../WelcomePage.css";
import { TeamsFxContext } from "../../Context";
import { useAzureFunctionData } from "../../HandleAzureFunctionalities/hooks";

export function CalendarEvents() {
  const [showInfo, setShowInfo] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState("");

  const now = new Date();
  const startDate = new Date(now); // I did that in two steps so that i can change the start date by simply providing a different parameter instead of now.
  const endDate = new Date(now);

  endDate.setDate(now.getDate() + 7); // 7 days from now

  const startDateTime = startDate.toISOString();

  const endDateTime = endDate.toISOString();

  const calendarUrl = `calendarRoutes/calendarview=${startDateTime}=${endDateTime}`;

  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    customEndpoint
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
              setCustomEndpoint(calendarUrl);
              setShowInfo(!showInfo);
            }}
          >
            {showInfo
              ? "Hide my events for next week in JSON format"
              : "Show my events for next week in JSON format"}
          </Button>
        </div>
        <br />
        <br />
        {showInfo && (
          <pre className="fixed">{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
