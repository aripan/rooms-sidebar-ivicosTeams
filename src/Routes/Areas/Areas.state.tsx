import { useContext, useEffect, useState } from "react";
import { IUser } from "../../db/dbTypes";
import { TeamsFxContext } from "../../Context";
import { useAzureFunctionData } from "../../HandleAzureFunctionalities/hooks";
import { useLocation } from "react-router-dom";
import { useUsersInCommonRoom } from "../../shared-state/users/hooks";
import { daysBefore } from "../../db/dates";
import { IOrgInfo } from "../Tab";

export interface IAreasState {
  currentUser: IUser | undefined;
}

const useAreasState: (orgInfo: IOrgInfo) => IAreasState = (orgInfo) => {
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
    "userRoutes/me"
  );

  useEffect(() => {
    if (data && orgInfo.id) {
      const user = {
        id: data.id,
        org_id: orgInfo.id,
        name: data.displayName,
        language: "en",
        email: data.mail,
        tabs: [],
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1),
      };
      setCurrentUser(user);
    }
  }, [data, orgInfo.id]);

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
