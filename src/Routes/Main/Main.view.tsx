import { Stack, PrimaryButton, DefaultButton } from "@fluentui/react";
import { DividerBox } from "rc-dock";
import "rc-dock/dist/rc-dock.css";
import { default as React, useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import RoomList from "../../components/RoomList/RoomList";
import { MainState } from "./Main.state";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@fluentui/react-components";
import RoomView from "../../components/RoomView/RoomView";

const MainView: React.FC<MainState> = (props) => {
  const routeHistory = useNavigate();
  const { users, rooms } = props;
  const [showStructure, setShowStructure] = useState(false);

  const sideBarContainerStyles = {
    width: "30%",
    height: "80vh",
    display: "block",
  };

  const mainViewContainerStyles = {
    width: "70%",
    height: "80vh",
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
        height: "100vh",
        padding: 20,
      }}
    >
      <Stack
        horizontal
        tokens={{ childrenGap: 10 }}
        style={{
          width: "auto",
          height: "auto",
          marginBottom: 10,
        }}
      >
        <DefaultButton
          onClick={() => {
            routeHistory("/tab");
          }}
        >
          Go Back to Areas
        </DefaultButton>

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
            <RoomView users={users} rooms={rooms} />
          </Stack>
        </DividerBox>
      ) : (
        <Spinner style={{ margin: 100 }} />
      )}
    </Stack>
  );
};

export default MainView;
