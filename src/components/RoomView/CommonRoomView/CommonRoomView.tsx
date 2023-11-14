import React from "react";
import { IRoom } from "../../../db/dbTypes";
import { CommonRoomViewView } from "./CommonRoomView.view";

interface ICommonRoomViewProps {
  roomToShow: IRoom;
}
const CommonRoomView: React.FC<ICommonRoomViewProps> = (props) => {
  return <CommonRoomViewView />;
};

export default CommonRoomView;
