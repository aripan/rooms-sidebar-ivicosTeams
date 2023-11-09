import { useContext, useEffect, useState } from "react";
import { User } from "../../db/dbTypes";
import { addUser, getUsers } from "../../db/db";
import { TeamsFxContext } from "../../Context";
import { useAzureFunctionData } from "../../HandleAzureFunctionalities/hooks";
import { useLocation } from "react-router-dom";
import { useUsersInCommonRoom } from "../../shared-state/users/hooks";

export interface IDashboardState {
  currentUser: User | undefined;
}

const useDashboardState: () => IDashboardState = () => {
  const [usersInCommonRoom, setUsersInCommonRoom] = useUsersInCommonRoom();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

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
      setCurrentUser(user);
    }
  }, [meInfo, myPresenceInfo, imgUrl]);

  useEffect(() => {
    if (!pathname.includes("/rooms/")) {
      const userToGoBack = usersInCommonRoom.find(
        (user) => user.id === currentUser?.id
      );
      if (userToGoBack) {
        setUsersInCommonRoom(
          usersInCommonRoom.filter((user) => user.id !== userToGoBack.id)
        );
      }
    }
  }, [currentUser?.id, pathname, setUsersInCommonRoom, usersInCommonRoom]);

  return {
    currentUser,
  };
};

export default useDashboardState;
