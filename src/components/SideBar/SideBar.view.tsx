import { Stack } from "@fluentui/react";
import React from "react";
import { ISideBarProps } from "./SideBar";

const SideBarView: React.FC<ISideBarProps> = (props) => {
  const { children } = props;

  return (
    <Stack
      key="sb-content"
      grow
      style={{
        display: "flex",
        overflowY: "hidden",
        paddingRight: 10,
      }}
    >
      {children}
    </Stack>
  );
};
export default SideBarView;
