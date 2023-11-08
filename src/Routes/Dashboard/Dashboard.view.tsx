import { DefaultButton, Stack } from "@fluentui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserInfo } from "../../shared-state/users/hooks";
import { IDashboardState } from "./Dashboard.state";

const DashboardView: React.FunctionComponent<IDashboardState> = (props) => {
  const { currentUser } = props;
  const routeHistory = useNavigate();
  const [, setCurrentUserInfo] = useCurrentUserInfo();

  useEffect(() => {
    currentUser && setCurrentUserInfo(currentUser);
  }, [currentUser, setCurrentUserInfo]);

  return (
    <Stack
      horizontalAlign="center"
      style={{
        height: "100vh",
      }}
    >
      <h1>Dashboard</h1>
      <h3>{currentUser?.name}</h3>
      <Stack
        style={{
          margin: "200px auto auto auto",
        }}
      >
        <DefaultButton
          text="Enter to the Area"
          style={{
            width: 250,
            height: 200,
            fontSize: 18,
          }}
          onClick={() => {
            routeHistory(`/rooms/${currentUser?.id}`);
          }}
        />
      </Stack>
    </Stack>
  );
};
export default DashboardView;
