import React from "react";
import RoomListView from "./RoomLists.view";
import useRoomListState from "./RoomList.state";

const RoomList: React.FC<any> = (props) => {
  const state = useRoomListState();
  return <RoomListView {...{ ...state, ...props }} />;
};
export default RoomList;
