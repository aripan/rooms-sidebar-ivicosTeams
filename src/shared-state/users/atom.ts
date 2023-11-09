import { atom } from "recoil";
import { User } from "../../db/dbTypes";

export const aCurrentUserInfo = atom<User | undefined>({ key: 'aCurrentUserInfo', default: undefined });
export const aUsersInCommonRoom = atom<User[]>({ key: 'aUsersInCommonRoom', default: [] });