import {
  DefaultButton,
  Icon,
  PrimaryButton,
  Stack,
  Text,
} from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import {
  generateFakeUsers,
  generateCommonRooms,
  generateFakePersonalRooms,
} from "../db/data";
import { IRoom, IUser } from "../db/dbTypes";
import { addRoom, addUser, loadDatabase, saveDatabase } from "../db/db";
import {
  useFakeRoomsAdded,
  useFakeUsersAdded,
} from "../shared-state/seed-data/hooks";

const SeedData = () => {
  const routeHistory = useNavigate();
  const fakeUsers = generateFakeUsers(6);
  const fakePersonalRooms = generateFakePersonalRooms(fakeUsers);
  const fakeRooms = generateCommonRooms(6);

  const [fakeUsersAdded, setFakeUsersAdded] = useFakeUsersAdded();
  const [fakeRoomsAdded, setFakeRoomsAdded] = useFakeRoomsAdded();

  // Users
  const handleAddFakeUser = (joinedUser: IUser) => {
    const newUser: IUser = {
      id: joinedUser.id,
      org_id: "",
      name: joinedUser.name,
      language: "en",
      email: joinedUser.email,
      image: joinedUser.image,
      status: {
        presence: joinedUser.status.presence,
        isOutOfOffice: joinedUser.status.isOutOfOffice,
      },
      tabs: [],
      archived: joinedUser.archived,
      created_at: joinedUser.created_at,
      updated_at: joinedUser.updated_at,
    };
    addUser(newUser);
  };

  const handleAddFakeUsers = (
    fakeUsers: IUser[],
    fakePersonalRooms: IRoom[]
  ) => {
    fakeUsers.forEach((fakeUser) => {
      const user = {
        id: fakeUser.id,
        org_id: "",
        name: fakeUser.name,
        language: "en",
        email: fakeUser.email,
        image: fakeUser.image,
        status: {
          presence: fakeUser.status.presence,
          isOutOfOffice: fakeUser.status.isOutOfOffice,
        },
        tabs: [],
        archived: fakeUser.archived,
        created_at: fakeUser.created_at,
        updated_at: fakeUser.updated_at,
      };
      handleAddFakeUser(user);
    });
    fakePersonalRooms.forEach((fakePersonalRoom) => {
      const fakeRoom = {
        id: fakePersonalRoom.id,
        name: fakePersonalRoom.name,
        area_id: fakePersonalRoom.area_id,
        team_id: fakePersonalRoom.team_id,
        channel_id: fakePersonalRoom.channel_id,
        isPersonal: fakePersonalRoom.isPersonal,
        attributes: {
          icon: fakePersonalRoom.attributes.icon,
          roomImg: fakePersonalRoom.attributes.roomImg,
        },
        archived: fakePersonalRoom.archived,
        created_at: fakePersonalRoom.created_at,
        updated_at: fakePersonalRoom.updated_at,
      };
      handleAddFakeRoom(fakeRoom);
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
      name: room.name,
      area_id: room.area_id,
      team_id: room.team_id,
      channel_id: room.channel_id,
      isPersonal: room.isPersonal,
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
        name: fakeRoom.name,
        area_id: fakeRoom.area_id,
        team_id: fakeRoom.team_id,
        channel_id: fakeRoom.channel_id,
        isPersonal: fakeRoom.isPersonal,
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
    const db = loadDatabase();
    db.users = [];
    db.rooms = [];
    saveDatabase(db);
    setFakeUsersAdded(false);
    setFakeRoomsAdded(false);
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
              onClick={() => handleAddFakeUsers(fakeUsers, fakePersonalRooms)}
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
