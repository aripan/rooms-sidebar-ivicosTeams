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
import { Room, User } from "../db/dbTypes";
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
  const handleAddFakeUser = (joinedUser: User) => {
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

  const handleAddFakeUsers = (fakeUsers: User[], fakePersonalRooms: Room[]) => {
    fakeUsers.forEach((fakeUser) => {
      const user = {
        id: fakeUser.id,
        name: fakeUser.name,
        email: fakeUser.email,
        image: fakeUser.image,
        presence: fakeUser.presence,
        isOutOfOffice: fakeUser.isOutOfOffice,
      };
      handleAddFakeUser(user);
    });
    fakePersonalRooms.forEach((fakePersonalRoom) => {
      const fakeRoom = {
        id: fakePersonalRoom.id,
        name: fakePersonalRoom.name,
        isPersonal: fakePersonalRoom.isPersonal,
        attributes: fakePersonalRoom.attributes,
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
  const handleAddFakeRoom = (room: Room) => {
    const newRoom: Room = {
      id: room.id,
      name: room.name,
      isPersonal: room.isPersonal,
      attributes: room.attributes,
    };
    addRoom(newRoom);
  };

  const handleAddFakeRooms = (fakeRooms: Room[]) => {
    fakeRooms.forEach((fakeRoom) => {
      const room = {
        id: fakeRoom.id,
        name: fakeRoom.name,
        isPersonal: fakeRoom.isPersonal,
        attributes: fakeRoom.attributes,
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
