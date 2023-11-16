import { useContext, useEffect, useState } from "react";
import { IRoom, IUser } from "../../db/dbTypes";
import { addRoom, addUser, getRooms, getUsers } from "../../db/db";
import { useCurrentUserInfo } from "../../shared-state/users/hooks";
import { useTeamRooms } from "../../shared-state/rooms/hooks";
import { CallAzureFunction } from "../../HandleAzureFunctionalities/CallAzureFunction";
import { TeamsFxContext } from "../../Context";
import { useLocation } from "react-router-dom";
import { daysBefore } from "../../db/dates";

export interface MainState {
  users: IUser[];
  rooms: IRoom[];
}

const useMainState: () => MainState = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [currentUserInfo] = useCurrentUserInfo();
  const [teamRooms, setTeamRooms] = useTeamRooms();
  const { pathname } = useLocation();
  const currentAreaId = pathname?.split("/rooms/")[0].split("/areas/")[1];

  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }

  useEffect(() => {
    // Load users from the "database" when the component mounts
    setUsers(getUsers());
    fetchTeamRooms();

    // Load users from the "database" when the component mounts
    setRooms(getRooms());
  }, []);

  useEffect(() => {
    if (currentUserInfo) {
      handleAddUser(currentUserInfo);
      setTimeout(() => {
        setUsers(getUsers());
      }, 500);
    }
  }, [currentUserInfo]);

  useEffect(() => {
    if (teamRooms.length > 0) {
      teamRooms.forEach((teamRoom: any) => {
        handleAddRoom(teamRoom);
      });

      setTimeout(() => {
        setRooms(getRooms());
      }, 500);
    }
  }, [teamRooms]);

  const handleAddUser = (joinedUser: IUser) => {
    const newUser: IUser = {
      id: joinedUser.id,
      org_id: joinedUser.org_id,
      name: joinedUser.name,
      language: joinedUser.language,
      email: joinedUser.email,
      tabs: joinedUser.tabs,
      archived: joinedUser.archived,
      created_at: joinedUser.created_at,
      updated_at: joinedUser.updated_at,
    };
    addUser(newUser);
  };

  const fetchTeamRooms = async () => {
    try {
      const functionRes = await CallAzureFunction(
        teamsUserCredential,
        "teamsRoutes/joinedTeams"
      );
      const teams = await functionRes.value;
      setTeamRooms(teams);
    } catch (error: any) {
      throw error;
    }
  };

  const handleAddRoom = (addedRoom: any) => {
    const newRoom: IRoom = {
      id: addedRoom.id,
      area_id: currentAreaId,
      team_id: addedRoom.id,
      channel_id: "",
      attributes: {
        icon: "",
        roomImg: "",
        // ... other room properties
      },
      archived: addedRoom.isArchived,
      created_at: daysBefore(3),
      updated_at: daysBefore(1),
    };
    addRoom(newRoom);
  };

  return {
    users,
    rooms,
  };
};

export default useMainState;
