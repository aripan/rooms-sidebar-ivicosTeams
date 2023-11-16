import { SetterOrUpdater } from "recoil";
import { useOpenPanelToCreateNewCommonRoom } from "../../../../shared-state/rooms/hooks";

export interface ICreateNewCommonRoomState {
  openPanelToCreateNewCommonRoom: boolean;
  setOpenPanelToCreateNewCommonRoom: SetterOrUpdater<boolean>;
}

const useCreateNewCommonRoomState: () => ICreateNewCommonRoomState = () => {
  const [openPanelToCreateNewCommonRoom, setOpenPanelToCreateNewCommonRoom] =
    useOpenPanelToCreateNewCommonRoom();
  return { openPanelToCreateNewCommonRoom, setOpenPanelToCreateNewCommonRoom };
};

export default useCreateNewCommonRoomState;
