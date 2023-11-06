import { Stack, Text } from "@fluentui/react";
import React from "react";
import { Room } from "./Room";

const RoomsView: React.FC<{}> = () => {
  return (
    <Stack>
      <Room />
    </Stack>
  );
};

export default RoomsView;
