import { useContext, useEffect, useState } from "react";
import { TeamsFxContext } from "../../Context";
import { CallAzureFunction } from "../../HandleAzureFunctionalities/CallAzureFunction";

export interface IRoomListState {
  userImage: string;
  userPresenceInfo: any;
}

const useRoomListState: () => IRoomListState = () => {
  const [userImage, setUserImage] = useState("");
  const [userPresenceInfo, setUserPresenceInfo] = useState(null);
  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }

  useEffect(() => {
    const fetchUserPhotoWithPresenceStatus = async () => {
      try {
        const functionRes = await CallAzureFunction(
          teamsUserCredential,
          "userRoutes/photo-presence"
        );
        setUserImage(functionRes.image);
        setUserPresenceInfo(functionRes.presenceInfo);
      } catch (error: any) {
        throw error;
      }
    };

    fetchUserPhotoWithPresenceStatus();
  }, []);

  return { userImage, userPresenceInfo };
};

export default useRoomListState;
