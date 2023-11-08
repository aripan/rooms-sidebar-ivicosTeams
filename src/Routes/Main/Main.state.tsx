import { useEffect, useState } from "react";
import { Room, User } from "../../db/dbTypes";
import { addRoom, addUser, getRooms, getUsers } from "../../db/db";
import { useCurrentUserInfo } from "../../shared-state/users/hooks";

export interface MainState {
  users: User[];
  rooms: Room[];
}

const useMainState: () => MainState = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
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

      const personalRoom = {
        id: `Personal-${currentUserInfo.id}`,
        name: `${currentUserInfo.name}'s personal room`,
        isPersonal: true,
        attributes: {
          iconKey: "",
          roomImg: currentUserInfo.image,
        },
      };

      handleAddRoom(personalRoom);
      setTimeout(() => {
        setUsers(getUsers());
        setRooms(getRooms());
      }, 500);
    }
  }, [currentUserInfo]);

  const handleAddUser = (joinedUser: User) => {
    const newUser: User = {
      id: joinedUser.id,
      name: joinedUser.name,
      email: joinedUser.email,
      image: joinedUser.image,
      presence: joinedUser.presence,
      isOutOfOffice: joinedUser.isOutOfOffice,
    };
    addUser(newUser);
  };

  const handleAddRoom = (addedRoom: Room) => {
    const newRoom: Room = {
      id: addedRoom.id,
      name: addedRoom.name,
      isPersonal: addedRoom.isPersonal,
      attributes: {
        iconKey: addedRoom.attributes.iconKey,
        roomImg: addedRoom.attributes.roomImg,
      },
    };
    addRoom(newRoom);
  };

  return {
    users,
    rooms,
  };
};

export default useMainState;
