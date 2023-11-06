import { useEffect, useState } from "react";
import { Room, User } from "../../db/dbTypes";
import { getRooms, getUsers } from "../../db/db";

export interface MainState {
  users: User[];
  rooms: Room[];
}
const useMainState: () => MainState = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // Load users from the "database" when the component mounts
    setUsers(getUsers());

    // Load users from the "database" when the component mounts
    setRooms(getRooms());
  }, []);
  return {
    users,
    rooms,
  };
};

export default useMainState;
