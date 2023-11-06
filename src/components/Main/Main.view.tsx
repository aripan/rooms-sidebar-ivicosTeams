import { Stack } from "@fluentui/react";

import { DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import { default as React } from "react";
import SideBar from "../SideBar/SideBar";
import RoomList from "../RoomList/RoomList";
import Rooms from "../RoomView/Rooms";
import { MainState } from "./Main.state";

const MainView: React.FC<MainState> = (props) => {
  console.log("🚀 ~ file: Main.view.tsx:12 ~ props:", props);
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
            <RoomList handleAddUser={props.handleAddUser} />
          </SideBar>
        </Stack>

        <Stack style={mainViewContainerStyles}>
          <Rooms />
        </Stack>
      </DividerBox>
    </Stack>
  );
};

export default MainView;
