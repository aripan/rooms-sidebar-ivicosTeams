import { useEffect, useState } from "react";
import { Room, User } from "../../db/dbTypes";
import { addUser, getRooms, getUsers } from "../../db/db";

export interface MainState {
  users: User[];
  rooms: Room[];
  handleAddUser: (joinedUser: User) => void;
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

  const handleAddUser = (joinedUser: User) => {
    const newUser: User = {
      id: String(Date.now()),
      name: joinedUser.name,
      email: joinedUser.email,
      image: joinedUser.image,
      presence: joinedUser.presence,
      isOutOfOffice: joinedUser.isOutOfOffice,
    };
    addUser(newUser);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return {
    users,
    rooms,
    handleAddUser,
  };
};

export default useMainState;
