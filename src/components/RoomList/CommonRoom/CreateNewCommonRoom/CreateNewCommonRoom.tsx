import React from "react";
import CreateNewCommonRoomView from "./CreateNewCommonRoom.view";
import useCreateNewCommonRoomState from "./CreateNewCommonRoom.state";

const CreateNewCommonRoom = () => {
  const state = useCreateNewCommonRoomState();
  return <CreateNewCommonRoomView {...state} />;
};

export default CreateNewCommonRoom;
