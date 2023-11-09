import { DefaultButton, Image, Stack, Text } from "@fluentui/react";
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
      <h2>{currentUser?.name}</h2>

      <Stack
        style={{
          margin: "180px auto auto auto",
        }}
      >
        {currentUser ? (
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
        ) : (
          <Text variant="xLargePlus">Loading...</Text>
        )}
      </Stack>
    </Stack>
  );
};
export default DashboardView;
