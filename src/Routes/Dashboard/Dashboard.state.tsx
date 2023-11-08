import { useContext, useEffect, useState } from "react";
import { User } from "../../db/dbTypes";
import { addUser, getUsers } from "../../db/db";
import { TeamsFxContext } from "../../Context";
import { useAzureFunctionData } from "../../HandleAzureFunctionalities/hooks";

export interface IDashboardState {
  currentUser: User | undefined;
}

const useDashboardState: () => IDashboardState = () => {
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

  return {
    currentUser,
  };
};

export default useDashboardState;
