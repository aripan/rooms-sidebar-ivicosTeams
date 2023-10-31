import { useState } from "react";
import { Button } from "@fluentui/react-components";
import "../WelcomePage.css";
import { Agenda, PeoplePicker, Tasks } from "@microsoft/mgt-react";
import { Stack } from "@fluentui/react";

export function TasksMgt() {
  const [showInfo, setShowInfo] = useState(false);

  const now = new Date();

  return (
    <div className="welcome page">
      <Stack
        className="page-padding"
        style={{
          width: 450,
        }}
      >
        <Tasks />
      </Stack>
    </div>
  );
}
