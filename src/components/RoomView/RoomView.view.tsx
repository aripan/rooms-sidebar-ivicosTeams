import { Stack, Text } from "@fluentui/react";
import React from "react";

const RoomViewView: React.FC<{}> = () => {
  return (
    <Stack
      horizontal={true}
      style={{
        marginTop: 16,
        marginBottom: 8,
        display: "flex",
        flexDirection: "row",
        padding: "0px 26px",
      }}
    >
      <Text variant={"large"}>Room name</Text>
    </Stack>
  );
};

export default RoomViewView;
