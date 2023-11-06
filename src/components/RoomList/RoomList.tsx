import React from "react";
import RoomListView from "./RoomLists.view";

const RoomList: React.FC<any> = (props) => {
  return <RoomListView handleAddUser={props.handleAddUser} />;
};
export default RoomList;
