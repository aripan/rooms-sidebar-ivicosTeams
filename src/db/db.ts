import config from '../config/config';
import { generateFakeAreas, generateFakeOrg } from './data';
import { Database, IArea, IOrganization, IRoom, IUser, } from './dbTypes';

export const DATABASE_KEY = 'myDatabase';

export const loadDatabase = (): Database => {
    const dbJson = localStorage.getItem(DATABASE_KEY);
    return dbJson ? JSON.parse(dbJson) : { org: {}, areas: [], rooms: [], users: [], };
};

export const saveDatabase = (db: Database): void => {
    localStorage.setItem(DATABASE_KEY, JSON.stringify(db));
};

// organization
export const getOrg = (): IOrganization => {
    const db = loadDatabase();
    let org = db.org
    if (Object.keys(org).length !== 0) {
        return org;
    } else {
        org = generateFakeOrg(undefined, config.tId!);
        db.org = org
        saveDatabase(db);
        return org;
    }
};

export const updateOrg = (orgId: string, updatedProps: any) => {
    const db = loadDatabase();
    if (db.org && db.org.id === orgId) {
        db.org = { ...db.org, ...updatedProps };
        saveDatabase(db);
    }
};

export const archiveOrg = (orgId: string) => {
    const db = loadDatabase();
    if (db.org && db.org.id === orgId) {
        db.org.archived = true;
        saveDatabase(db);
    }
};

// areas
export const getAreas = (): IArea[] => {
    const db = loadDatabase();
    if (db.areas.length > 0) {
        return db.areas;
    } else {
        const org = getOrg()
        const createdAreas = generateFakeAreas(org?.id, 2)
        db.areas = createdAreas;
        saveDatabase(db);
        return db.areas;
    }
};

export const addArea = (newArea: IArea): void => {
    const db = loadDatabase();
    const areaExist = db.areas.find(area => area.id === newArea.id)
    if (!areaExist) {
        db.areas.push(newArea);
        saveDatabase(db);
    }
};

export const updateArea = (areaId: string, updatedProps: any) => {
    const db = loadDatabase();
    const areas = db.areas;
    const areaIndex = areas.findIndex(area => area.id === areaId);
    if (areaIndex > -1) {
        areas[areaIndex] = { ...areas[areaIndex], ...updatedProps };
        saveDatabase(db);
    }
};

export const removeArea = (areaId: string) => {
    const db = loadDatabase();
    db.areas = db.areas.filter(area => area.id !== areaId);
    saveDatabase(db);
};

// rooms
export const getRooms = (): IRoom[] => {
    const db = loadDatabase();
    return db.rooms;
};

export const addRoom = (newRoom: IRoom): void => {
    const db = loadDatabase();
    const roomExist = db.rooms.find(room => room.id === newRoom.id)
    if (!roomExist) {
        db.rooms.push(newRoom);
        saveDatabase(db);
    }
};

export const updateRoom = (roomId: string, updatedProps: any) => {
    const db = loadDatabase();
    const rooms = db.rooms;
    const roomIndex = rooms.findIndex(room => room.id === roomId);
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

// users
export const getUsers = (): IUser[] => {
    const db = loadDatabase();
    return db.users;
};

export const addUser = (newUser: IUser): void => {
    const db = loadDatabase();
    const userExist = db.users.find(user => user.id === newUser.id)
    if (!userExist) {
        db.users.push(newUser);
        saveDatabase(db);
    }

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




// Add more functions for updating and removing users and rooms as needed
