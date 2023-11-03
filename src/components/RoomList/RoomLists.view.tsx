import { Stack } from "@fluentui/react";
import { DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import React from "react";

const RoomListView: React.FC<{}> = () => {
  return (
    <Stack style={{ maxHeight: "100%", height: "100%" }}>
      <Stack style={{ maxHeight: "100%", height: "100%" }}>
        <DividerBox mode="vertical" style={{ height: "80vh" }}>
          <Stack
            style={{
              border: "1px solid black",
              padding: 10,
            }}
          >
            <h3>Show personal rooms</h3>
            {/* <PersonalRoomList /> */}
          </Stack>

          <Stack
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: 10,
              border: "1px solid purple",
            }}
          >
            <h3>Show common rooms</h3>
            {/* <CommonRoomList /> */}
          </Stack>
        </DividerBox>
      </Stack>
    </Stack>
  );
};

export default RoomListView;
