import { useContext, useEffect, useState } from "react";
import { IUser } from "../../db/dbTypes";
import { TeamsFxContext } from "../../Context";
import { useAzureFunctionData } from "../../HandleAzureFunctionalities/hooks";
import { useLocation } from "react-router-dom";
import { useUsersInCommonRoom } from "../../shared-state/users/hooks";
import { daysBefore } from "../../db/dates";

export interface IAreasState {
  currentUser: IUser | undefined;
}

const useAreasState: () => IAreasState = () => {
  const [usersInCommonRoom, setUsersInCommonRoom] = useUsersInCommonRoom();
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

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
        org_id: "",
        name: meInfo.displayName,
        language: "",
        email: meInfo.mail,
        image: imgUrl,
        status: {
          presence: myPresenceInfo.availability.toLowerCase(),
          isOutOfOffice: myPresenceInfo.outOfOfficeSettings.isOutOfOffice,
        },
        tabs: [],
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1),
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

export default useAreasState;
