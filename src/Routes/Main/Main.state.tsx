import { useEffect, useState } from "react";
import { IRoom, IUser } from "../../db/dbTypes";
import { addUser, getRooms, getUsers } from "../../db/db";
import { useCurrentUserInfo } from "../../shared-state/users/hooks";

export interface MainState {
  users: IUser[];
  rooms: IRoom[];
}

const useMainState: () => MainState = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [currentUserInfo] = useCurrentUserInfo();

  useEffect(() => {
    // Load users from the "database" when the component mounts
    setUsers(getUsers());

    // Load users from the "database" when the component mounts
    setRooms(getRooms());
  }, []);

  useEffect(() => {
    if (currentUserInfo) {
      handleAddUser(currentUserInfo);
      setTimeout(() => {
        setUsers(getUsers());
      }, 500);
    }
  }, [currentUserInfo]);

  const handleAddUser = (joinedUser: IUser) => {
    const newUser: IUser = {
      id: joinedUser.id,
      org_id: joinedUser.org_id,
      name: joinedUser.name,
      language: joinedUser.language,
      email: joinedUser.email,
      tabs: joinedUser.tabs,
      archived: joinedUser.archived,
      created_at: joinedUser.created_at,
      updated_at: joinedUser.updated_at,
    };
    addUser(newUser);
  };

  return {
    users,
    rooms,
  };
};

export default useMainState;
