import { DefaultButton, Stack } from "@fluentui/react";
import React from "react";

const CreateNewRoomButtonView: React.FC<{}> = () => {
  return (
    <Stack horizontalAlign="center">
      <DefaultButton>
        Create New Room{" "}
        <span
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingLeft: 2,
            marginTop: -3,
          }}
        >
          +
        </span>
      </DefaultButton>
    </Stack>
  );
};

export default CreateNewRoomButtonView;
