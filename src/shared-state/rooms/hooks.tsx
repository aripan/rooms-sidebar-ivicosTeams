import { useRecoilState } from "recoil";
import { aOpenPanelToCreateNewCommonRoom, aTeamRooms } from "./atom";

export const useOpenPanelToCreateNewCommonRoom = () => {
  return useRecoilState(aOpenPanelToCreateNewCommonRoom);
};
export const useTeamRooms = () => {
  return useRecoilState(aTeamRooms);
};
