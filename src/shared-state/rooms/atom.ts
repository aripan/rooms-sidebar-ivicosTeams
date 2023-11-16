import { atom } from "recoil";

export const aOpenPanelToCreateNewCommonRoom = atom<boolean>({ key: 'aOpenPanelToCreateNewCommonRoom', default: false });
export const aTeamRooms = atom<any>({ key: 'aTeamRooms', default: [] });