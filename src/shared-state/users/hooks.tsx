import { useRecoilState } from "recoil";
import { aCurrentUserInfo } from "./atom";

export const useCurrentUserInfo = () => {
  return useRecoilState(aCurrentUserInfo);
};
