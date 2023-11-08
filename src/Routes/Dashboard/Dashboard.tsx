import React from "react";
import DashboardView from "./Dashboard.view";
import useDashboardState from "./Dashboard.state";

const Dashboard: React.FC<{}> = () => {
  const state = useDashboardState();
  return <DashboardView {...state}></DashboardView>;
};

export default Dashboard;
