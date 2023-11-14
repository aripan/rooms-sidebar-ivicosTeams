import React from "react";
import { PersonalRoomViewView } from "./PersonalRoomView.view";
import { IUser } from "../../../db/dbTypes";
import usePersonalRoomViewState from "./PersonalRoomView.state";

interface IPersonalRoomViewProps {
  personalRoomToShow: IUser;
}
const PersonalRoomView: React.FC<IPersonalRoomViewProps> = (props) => {
  const state = usePersonalRoomViewState(props.personalRoomToShow);
  return <PersonalRoomViewView {...{ ...state, ...props }} />;
};

export default PersonalRoomView;
