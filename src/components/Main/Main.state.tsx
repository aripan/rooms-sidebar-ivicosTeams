import { useContext, useEffect, useState } from "react";
import { Room, User } from "../../db/dbTypes";
import { addUser, getRooms, getUsers } from "../../db/db";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";

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

  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    "userRoutes/currentUserInfo"
  );

  const { meInfo, myPresenceInfo, imgUrl } = data ?? {};

  useEffect(() => {
    if (meInfo && myPresenceInfo && imgUrl) {
      const user = {
        id: meInfo.id,
        name: meInfo.displayName,
        email: meInfo.mail,
        image: imgUrl,
        presence: myPresenceInfo.availability.toLowerCase(),
        isOutOfOffice: myPresenceInfo.outOfOfficeSettings.isOutOfOffice,
      };
      handleAddUser(user);
      setTimeout(() => {
        setUsers(getUsers());
      }, 500);
    }
  }, [meInfo, myPresenceInfo, imgUrl]);

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

  return {
    users,
    rooms,
  };
};

export default useMainState;
