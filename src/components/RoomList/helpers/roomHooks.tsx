import { ReactElement } from "react";
import { HandKnock } from "../../../SVGIcons";

export interface IRoomAction {
  key: string;
  title: string;
  hasPriority?: boolean;
  isDisabled?: boolean;
  getSymbol?: () => ReactElement;
  action: Function;
}

export const useRoomActions = (roomId: string) => {
  const knockOnRoomAction: IRoomAction = {
    key: "knock",
    title: "Knock on door",
    getSymbol: () => <HandKnock />,
    action: () => {
      console.log("Knock on door");
    },
  };

  return [knockOnRoomAction];
};
