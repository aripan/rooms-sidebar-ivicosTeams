import { faker } from '@faker-js/faker';
import { daysBefore } from './dates';
import { Area, Organization, Room, User } from './dbTypes';

const presenceStatus = ["unknown", "offline", "busy", "out-of-office", "away", "available", "do-not-disturb", "blocked"]
const roomIcons = ['Cafe', 'Class', 'Desk', 'Meeting', 'Room', 'Lounge', 'Lobby', 'Bar', 'Lunch', 'Podcast', 'Gym'];

export const generateFakeOrg = (name = 'Main Org', tenant_id: string, archived = false,): Organization => ({
    id: faker.string.uuid(),
    name,
    tenant_id,
    archived,
    created_at: daysBefore(3),
    updated_at: daysBefore(1)
});

export const generateFakeAreas = (organization_id: string, amountOfAreas: number): Area[] => {
    return [...Array(amountOfAreas).keys()].map((key) => ({
        id: faker.string.uuid(),
        name: key === 0 ? 'Main Area' : `Area ${key + 1}`,
        organization_id,
        icon: '',
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1)
    }));
};

export const generateFakeUsers = (amountOfUsers: number): User[] => {
    return [...Array(amountOfUsers).keys()].map((key) => ({
        id: faker.string.uuid(),
        org_id: '',
        name: faker.internet.userName(),
        language: 'en',
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        status: {
            presence: presenceStatus[Math.floor(Math.random() * presenceStatus.length)],
            isOutOfOffice: false
        },
        tabs: [],
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1)
    }));
};

export const generateFakePersonalRooms = (fakeUsers: any[]): Room[] => {
    return fakeUsers.map((fakeUser) => ({
        id: `Personal-${fakeUser.id}`,
        name: `${fakeUser.name}'s personal room`,
        area_id: '',
        team_id: '',
        channel_id: '',
        isPersonal: true,
        attributes: {
            icon: '',
            roomImg: fakeUser.image
        },
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1)
    }));
};

export const generateCommonRooms = (amountOfRooms: number): Room[] => {
    return [...Array(amountOfRooms).keys()].map((key) => ({
        id: faker.string.uuid(),
        name: `Room ${key + 1}`,
        area_id: '',
        team_id: '',
        channel_id: '',
        isPersonal: false,
        attributes: {
            icon: roomIcons[Math.floor(Math.random() * roomIcons.length)],
            roomImg: faker.image.urlLoremFlickr({ 'category': 'nature' })
        },
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1)
    }));
};