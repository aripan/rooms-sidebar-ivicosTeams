import React from "react";
import RoomViewView from "./RoomView.view";
import { IRoom, IUser } from "../../db/dbTypes";

interface IRoomViewProps {
  users: IUser[];
  rooms: IRoom[];
}
const RoomView: React.FC<IRoomViewProps> = (props) => {
  return <RoomViewView {...props}></RoomViewView>;
};
export default RoomView;
