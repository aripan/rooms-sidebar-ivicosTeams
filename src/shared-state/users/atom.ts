import { atom } from "recoil";
import { IUser } from "../../db/dbTypes";

export const aCurrentUserInfo = atom<IUser | undefined>({ key: 'aCurrentUserInfo', default: undefined });
export const aUsersInCommonRoom = atom<IUser[]>({ key: 'aUsersInCommonRoom', default: [] });