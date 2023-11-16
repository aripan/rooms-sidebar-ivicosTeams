import React from "react";
import { IRoom } from "../../../db/dbTypes";
import { CommonRoomViewView } from "./CommonRoomView.view";

interface ICommonRoomViewProps {
  roomToShow: IRoom;
  currentAreaId: string;
}
const CommonRoomView: React.FC<ICommonRoomViewProps> = (props) => {
  return <CommonRoomViewView {...props} />;
};

export default CommonRoomView;
