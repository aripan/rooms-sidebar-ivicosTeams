import { useRecoilState } from "recoil";
import { aCurrentUserInfo, aUsersInCommonRoom } from "./atom";

export const useCurrentUserInfo = () => {
  return useRecoilState(aCurrentUserInfo);
};

export const useUsersInCommonRoom = () => {
  return useRecoilState(aUsersInCommonRoom);
};
