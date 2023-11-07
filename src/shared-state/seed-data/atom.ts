import { atom } from "recoil";

export const aFakeUsersAdded = atom<boolean>({ key: 'aFakeUsersAdded', default: false });
export const aFakeRoomsAdded = atom<boolean>({ key: 'aFakeRoomsAdded', default: false });