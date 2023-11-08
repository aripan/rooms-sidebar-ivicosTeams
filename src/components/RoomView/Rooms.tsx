import React from "react";
import RoomsView from "./Rooms.view";

const Rooms: React.FC<any> = (props) => {
  return <RoomsView rooms={props.rooms}></RoomsView>;
};
export default Rooms;
