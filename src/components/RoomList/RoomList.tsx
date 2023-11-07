import React from "react";
import RoomListView from "./RoomLists.view";

const RoomList: React.FC<any> = (props) => {
  return <RoomListView users={props.users} rooms={props.rooms} />;
};
export default RoomList;
