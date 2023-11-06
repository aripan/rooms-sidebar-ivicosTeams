import React from "react";
import MainView from "./Main.view";
import useMainState from "./Main.state";

const Main: React.FC<{}> = () => {
  const state = useMainState();
  return <MainView {...state} />;
};

export default Main;
