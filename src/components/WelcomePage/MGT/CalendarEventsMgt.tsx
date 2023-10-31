import { useState } from "react";
import { Button } from "@fluentui/react-components";
import "../WelcomePage.css";
import { Agenda } from "@microsoft/mgt-react";
import { Stack } from "@fluentui/react";

export function CalendarEventsMgt() {
  const [showInfo, setShowInfo] = useState(false);

  const now = new Date();

  return (
    <div className="welcome page">
      <Stack className="page-padding">
        <Stack
          style={{
            width: 350,
          }}
        >
          <Button
            appearance="primary"
            onClick={() => {
              setShowInfo(!showInfo);
            }}
          >
            {showInfo
              ? "Hide my events for next week"
              : "Show my events for next week"}
          </Button>
        </Stack>
        <br />
        <br />
        <Stack
          style={{
            width: 350,
            height: 600,
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {showInfo && (
            <Agenda date={now.toISOString()} days={4} groupByDay showMax={5} />
          )}
        </Stack>
      </Stack>
    </div>
  );
}
