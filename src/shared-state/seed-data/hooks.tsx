import { useRecoilState } from "recoil";
import { aFakeRoomsAdded, aFakeUsersAdded } from "./atom";

export const useFakeUsersAdded = () => {
  return useRecoilState(aFakeUsersAdded);
};

export const useFakeRoomsAdded = () => {
  return useRecoilState(aFakeRoomsAdded);
};
