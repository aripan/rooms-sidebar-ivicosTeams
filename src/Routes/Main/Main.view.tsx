import { Stack, PrimaryButton } from "@fluentui/react";
import { DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import { default as React, useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import RoomList from "../../components/RoomList/RoomList";
import Rooms from "../../components/RoomView/Rooms";
import { MainState } from "./Main.state";
import { useNavigate } from "react-router-dom";

const MainView: React.FC<MainState> = (props) => {
  const routeHistory = useNavigate();
  const { users, rooms } = props;
  const [showStructure, setShowStructure] = useState(false);

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

  useEffect(() => {
    setShowStructure(users.length > 0);
  }, [users, rooms]);

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
      <Stack
        style={{
          width: 150,
          height: "auto",
          marginBottom: 10,
        }}
      >
        <PrimaryButton
          onClick={() => {
            routeHistory("/seedData");
          }}
        >
          Seed Data
        </PrimaryButton>
      </Stack>

      {showStructure ? (
        <DividerBox
          mode={"horizontal"}
          style={{ width: "100%", height: "100%" }}
        >
          <Stack style={sideBarContainerStyles}>
            <SideBar>
              <RoomList users={users} rooms={rooms} />
            </SideBar>
          </Stack>

          <Stack style={mainViewContainerStyles}>
            <Rooms />
          </Stack>
        </DividerBox>
      ) : (
        "Loading..."
      )}
    </Stack>
  );
};

export default MainView;