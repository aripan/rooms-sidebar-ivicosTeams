import { faker } from '@faker-js/faker';
import { daysBefore } from './dates';
import { IArea, IOrganization, IRoom, IUser } from './dbTypes';

const presenceStatus = ["unknown", "offline", "busy", "out-of-office", "away", "available", "do-not-disturb", "blocked"]
const roomIcons = ['Cafe', 'Class', 'Desk', 'Meeting', 'Room', 'Lounge', 'Lobby', 'Bar', 'Lunch', 'Podcast', 'Gym'];

export const generateFakeOrg = (name = 'Main Org', tenant_id: string, archived = false,): IOrganization => ({
    id: faker.string.uuid(),
    tenant_id,
    name,
    archived,
    created_at: daysBefore(3),
    updated_at: daysBefore(1)
});

export const generateFakeAreas = (organization_id: string, amountOfAreas: number): IArea[] => {
    return [...Array(amountOfAreas).keys()].map((key) => ({
        id: faker.string.uuid(),
        organization_id,
        name: key === 0 ? 'Main Area' : `Area ${key + 1}`,
        icon: '',
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1)
    }));
};

// export const generateFakePersonalRooms = (fakeUsers: any[]): IRoom[] => {
//     return fakeUsers.map((fakeUser) => ({
//         id: `Personal-${fakeUser.id}`,
//         area_id: '',
//         team_id: '',
//         channel_id: '',
//         attributes: {
//             icon: '',
//             roomImg: fakeUser.image
//         },
//         archived: false,
//         created_at: daysBefore(3),
//         updated_at: daysBefore(1)
//     }));
// };

export const generateCommonRooms = (amountOfRooms: number): IRoom[] => {
    return [...Array(amountOfRooms).keys()].map((key) => ({
        id: faker.string.uuid(),
        area_id: '',
        team_id: faker.string.uuid(),
        channel_id: faker.string.uuid(),
        attributes: {
            icon: roomIcons[Math.floor(Math.random() * roomIcons.length)],
            roomImg: faker.image.urlLoremFlickr({ 'category': 'nature' })
        },
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1)
    }));
};

export const generateFakeUsers = (amountOfUsers: number): IUser[] => {
    return [...Array(amountOfUsers).keys()].map((key) => ({
        id: faker.string.uuid(),
        org_id: '',
        name: faker.internet.userName(),
        language: 'en',
        email: faker.internet.email(),
        tabs: [],
        archived: false,
        created_at: daysBefore(3),
        updated_at: daysBefore(1)
    }));
};

