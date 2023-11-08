import { DefaultButton, Stack } from "@fluentui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface IDashboardViewProps {
  //   prop1: string;
  //   prop2: string;
  //   prop3: string;
}

const DashboardView: React.FunctionComponent<IDashboardViewProps> = (props) => {
  const routeHistory = useNavigate();
  return (
    <Stack
      horizontalAlign="center"
      style={{
        height: "100vh",
      }}
    >
      <h1>Dashboard</h1>
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
            routeHistory("/rooms/123");
          }}
        />
      </Stack>
    </Stack>
  );
};
export default DashboardView;
