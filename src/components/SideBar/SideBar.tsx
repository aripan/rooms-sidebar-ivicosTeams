import React from "react";
import SideBarView from "./SideBar.view";

export interface ISideBarProps {
  children?: React.ReactNode;
}

const SideBar: React.FC<ISideBarProps> = (props) => {
  return <SideBarView {...props} />;
};
export default SideBar;
