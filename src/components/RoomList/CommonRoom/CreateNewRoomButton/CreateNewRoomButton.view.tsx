import { DefaultButton, Stack } from "@fluentui/react";
import React from "react";
import { useOpenPanelToCreateNewCommonRoom } from "../../../../shared-state/rooms/hooks";

const CreateNewRoomButtonView: React.FC<{}> = () => {
  const [, setOpenPanelToCreateNewCommonRoom] =
    useOpenPanelToCreateNewCommonRoom();

  const handleClick = () => {
    setOpenPanelToCreateNewCommonRoom(true);
  };
  return (
    <Stack horizontalAlign="center">
      <DefaultButton onClick={handleClick}>
        <span
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingRight: 5,
            marginTop: -3,
          }}
        >
          +
        </span>{" "}
        Create New Room{" "}
      </DefaultButton>
    </Stack>
  );
};

export default CreateNewRoomButtonView;
