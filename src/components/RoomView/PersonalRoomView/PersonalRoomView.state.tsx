import { useContext, useEffect, useState } from "react";
import { TeamsFxContext } from "../../../Context";
import { useAzureFunctionData } from "../../../HandleAzureFunctionalities/hooks";
import { IUser } from "../../../db/dbTypes";

export interface IPersonalRoomViewState {
  userImage: string;
}

const usePersonalRoomViewState: (
  personalRoomToShow: IUser
) => IPersonalRoomViewState = (personalRoomToShow) => {
  const [userImage, setUserImage] = useState("");
  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    `usersRoutes/user-photo-id=${personalRoomToShow.id}`
  );

  useEffect(() => {
    data && setUserImage(data);
  }, [data]);

  console.log("🚀 ~ file: PersonalRoomView.state.tsx:18 ~ data:", typeof data);

  return { userImage };
};

export default usePersonalRoomViewState;
