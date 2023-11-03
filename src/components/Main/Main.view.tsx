import { Stack } from "@fluentui/react";

import { DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import { default as React } from "react";
import SideBar from "../SideBar/SideBar";
import RoomView from "../RoomView/RoomView";
import RoomList from "../RoomList/RoomList";

const MainView: React.FC<{}> = () => {
  const sideBarContainerStyles = {
    width: "30%",
    height: "80vh",
    display: "block",
    border: "2px solid red",
  };

  const mainViewContainerStyles = {
    width: "70%",
    height: "80vh",
    border: "2px solid blue",
  };

  return (
    <Stack
      verticalAlign="stretch"
      style={{
        maxWidth: "100%",
        overflow: "hidden",
        height: "100%",
        margin: 20,
      }}
    >
      <DividerBox mode={"horizontal"} style={{ width: "100%", height: "100%" }}>
        <Stack style={sideBarContainerStyles}>
          <SideBar>
            <RoomList />
          </SideBar>
        </Stack>

        <Stack style={mainViewContainerStyles}>
          <RoomView />
        </Stack>
      </DividerBox>
    </Stack>
  );
};

export default MainView;
