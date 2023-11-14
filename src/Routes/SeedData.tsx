import {
  DefaultButton,
  Icon,
  PrimaryButton,
  Stack,
  Text,
} from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { generateFakeUsers, generateCommonRooms } from "../db/data";
import { IRoom, IUser } from "../db/dbTypes";
import {
  DATABASE_KEY,
  addRoom,
  addUser,
  loadDatabase,
  saveDatabase,
} from "../db/db";
import {
  useFakeRoomsAdded,
  useFakeUsersAdded,
} from "../shared-state/seed-data/hooks";

const SeedData = () => {
  const routeHistory = useNavigate();
  const fakeUsers = generateFakeUsers(6);
  const fakeRooms = generateCommonRooms(6);
  const [fakeUsersAdded, setFakeUsersAdded] = useFakeUsersAdded();
  const [fakeRoomsAdded, setFakeRoomsAdded] = useFakeRoomsAdded();

  // Users
  const handleAddFakeUser = (joinedUser: IUser) => {
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

  const handleAddFakeUsers = (fakeUsers: IUser[]) => {
    fakeUsers.forEach((fakeUser) => {
      const user = {
        id: fakeUser.id,
        org_id: fakeUser.org_id,
        name: fakeUser.name,
        language: fakeUser.language,
        email: fakeUser.email,
        tabs: fakeUser.tabs,
        archived: fakeUser.archived,
        created_at: fakeUser.created_at,
        updated_at: fakeUser.updated_at,
      };
      handleAddFakeUser(user);
    });

    setFakeUsersAdded(true);
  };

  const handleRemoveFakeUsers = () => {
    const db = loadDatabase();
    db.users = [];
    saveDatabase(db);
    setFakeUsersAdded(false);
  };

  // Rooms
  const handleAddFakeRoom = (room: IRoom) => {
    const newRoom: IRoom = {
      id: room.id,
      area_id: room.area_id,
      team_id: room.team_id,
      channel_id: room.channel_id,
      attributes: {
        icon: room.attributes.icon,
        roomImg: room.attributes.roomImg,
      },
      archived: room.archived,
      created_at: room.created_at,
      updated_at: room.updated_at,
    };
    addRoom(newRoom);
  };

  const handleAddFakeRooms = (fakeRooms: IRoom[]) => {
    fakeRooms.forEach((fakeRoom) => {
      const room = {
        id: fakeRoom.id,
        area_id: fakeRoom.area_id,
        team_id: fakeRoom.team_id,
        channel_id: fakeRoom.channel_id,
        attributes: {
          icon: fakeRoom.attributes.icon,
          roomImg: fakeRoom.attributes.roomImg,
        },
        archived: fakeRoom.archived,
        created_at: fakeRoom.created_at,
        updated_at: fakeRoom.updated_at,
      };
      handleAddFakeRoom(room);
    });
    setFakeRoomsAdded(true);
  };

  const handleRemoveFakeRooms = () => {
    const db = loadDatabase();
    db.rooms = [];
    saveDatabase(db);
    setFakeRoomsAdded(false);
  };

  const handleClearDB = () => {
    localStorage.removeItem(DATABASE_KEY);
  };

  return (
    <Stack
      style={{
        height: "100vh",
      }}
    >
      <Stack
        horizontal
        style={{
          margin: "10px auto",
        }}
      >
        <Text variant="xLargePlus">SeedData</Text>
      </Stack>

      <DefaultButton
        text="Go Back"
        onClick={() => {
          routeHistory("/tab");
        }}
        style={{
          margin: 10,
          width: 150,
        }}
      />

      <Stack horizontal horizontalAlign="center">
        <Stack
          style={{
            width: 150,
            height: 30,
            margin: 10,
          }}
        >
          {fakeUsersAdded ? (
            <DefaultButton
              text="Remove fake users"
              onClick={handleRemoveFakeUsers}
              style={{
                padding: 5,
              }}
            />
          ) : (
            <PrimaryButton
              text="Add fake users"
              onClick={() => handleAddFakeUsers(fakeUsers)}
              style={{
                padding: 5,
              }}
            />
          )}
        </Stack>
        <Stack
          style={{
            width: 150,
            height: 30,
            margin: 10,
          }}
        >
          {fakeRoomsAdded ? (
            <DefaultButton
              text="Remove fake rooms"
              onClick={handleRemoveFakeRooms}
              style={{
                padding: 5,
              }}
            />
          ) : (
            <PrimaryButton
              text="Add fake rooms"
              onClick={() => handleAddFakeRooms(fakeRooms)}
              style={{
                padding: 5,
              }}
            />
          )}
        </Stack>
        <Stack
          horizontal
          tokens={{ childrenGap: 5 }}
          style={{
            margin: "14px 10px 0 10px",
            cursor: "pointer",
          }}
          onClick={handleClearDB}
        >
          <Icon
            iconName="Cancel"
            style={{
              cursor: "pointer",
              color: "red",
              fontSize: 25,
              fontWeight: 700,
            }}
          />
          <Text
            variant="large"
            style={{
              fontWeight: 700,
            }}
          >
            Clear DB
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SeedData;
