import { useEffect, useState } from "react";
import { IRoom, IUser } from "../../db/dbTypes";
import { addRoom, addUser, getRooms, getUsers } from "../../db/db";
import { useCurrentUserInfo } from "../../shared-state/users/hooks";
import { daysBefore } from "../../db/dates";

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

      const personalRoom = {
        id: `Personal-${currentUserInfo.id}`,
        name: `${currentUserInfo.name}'s personal room`,
        area_id: "",
        team_id: "",
        channel_id: "",
        isPersonal: true,
        attributes: {
          icon: "",
          roomImg: currentUserInfo.image,
        },
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1),
      };

      handleAddRoom(personalRoom);
      setTimeout(() => {
        setUsers(getUsers());
        setRooms(getRooms());
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
      image: joinedUser.image,
      status: {
        presence: joinedUser.status.presence,
        isOutOfOffice: joinedUser.status.isOutOfOffice,
      },
      tabs: joinedUser.tabs,
      archived: joinedUser.archived,
      created_at: joinedUser.created_at,
      updated_at: joinedUser.updated_at,
    };
    addUser(newUser);
  };

  const handleAddRoom = (addedRoom: IRoom) => {
    const newRoom: IRoom = {
      id: addedRoom.id,
      name: addedRoom.name,
      area_id: addedRoom.area_id,
      team_id: addedRoom.team_id,
      channel_id: addedRoom.channel_id,
      isPersonal: addedRoom.isPersonal,
      attributes: {
        icon: addedRoom.attributes.icon,
        roomImg: addedRoom.attributes.roomImg,
      },
      archived: addedRoom.archived,
      created_at: addedRoom.created_at,
      updated_at: addedRoom.updated_at,
    };
    addRoom(newRoom);
  };

  return {
    users,
    rooms,
  };
};

export default useMainState;
