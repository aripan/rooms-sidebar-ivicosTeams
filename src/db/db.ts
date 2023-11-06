import { Database, User, Room } from './dbTypes';

const DATABASE_KEY = 'myDatabase';

export const loadDatabase = (): Database => {
    const dbJson = localStorage.getItem(DATABASE_KEY);
    return dbJson ? JSON.parse(dbJson) : { users: [], rooms: [] };
};

export const saveDatabase = (db: Database): void => {
    localStorage.setItem(DATABASE_KEY, JSON.stringify(db));
};

export const getUsers = (): User[] => {
    const db = loadDatabase();
    return db.users;
};

export const getRooms = (): Room[] => {
    const db = loadDatabase();
    return db.rooms;
};

export const addUser = (user: User): void => {
    const db = loadDatabase();
    db.users.push(user);
    saveDatabase(db);
};

export const updateUser = (userId: string, updatedProps: any) => {
    const db = loadDatabase();
    const users = db.users;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...updatedProps };
        saveDatabase(db);
    }
};

export const removeUser = (userId: string) => {
    const db = loadDatabase();
    db.users = db.users.filter(user => user.id !== userId);
    saveDatabase(db);
};

export const addRoom = (room: Room): void => {
    const db = loadDatabase();
    db.rooms.push(room);
    saveDatabase(db);
};

export const updateRoom = (roomId: string, updatedProps: any) => {
    const db = loadDatabase();
    const rooms = db.rooms;
    const roomIndex = rooms.findIndex(user => user.id === roomId);
    if (roomIndex > -1) {
        rooms[roomIndex] = { ...rooms[roomIndex], ...updatedProps };
        saveDatabase(db);
    }
};

export const removeRoom = (roomId: string) => {
    const db = loadDatabase();
    db.rooms = db.rooms.filter(room => room.id !== roomId);
    saveDatabase(db);
};

// Add more functions for updating and removing users and rooms as needed