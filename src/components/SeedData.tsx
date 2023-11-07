import { DefaultButton, PrimaryButton, Stack } from "@fluentui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateFakeUsers, generateCommonRooms } from "../db/data";
import { Room, User } from "../db/dbTypes";
import { addRoom, addUser, loadDatabase, saveDatabase } from "../db/db";
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

  const handleAddFakeUsers = (fakeUsers: User[]) => {
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

  return (
    <Stack>
      <Stack
        style={{
          width: 150,
          height: "auto",
          margin: 10,
        }}
      >
        <DefaultButton
          text="Go Back"
          onClick={() => {
            routeHistory("/tab");
          }}
        />
      </Stack>

      <h1>SeedData</h1>
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
    </Stack>
  );
};

export default SeedData;
