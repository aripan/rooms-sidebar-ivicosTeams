import { useState } from "react";
import { Button } from "@fluentui/react-components";
import "../WelcomePage.css";
import { Agenda, PeoplePicker } from "@microsoft/mgt-react";
import { Stack } from "@fluentui/react";

export function PeoplePickerMgt() {
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
        <PeoplePicker />
      </Stack>
    </div>
  );
}
