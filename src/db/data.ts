import { faker } from '@faker-js/faker';

const presenceStatus = ["unknown", "offline", "busy", "out-of-office", "away", "available", "do-not-disturb", "blocked"]
const roomIcons = ['Cafe', 'Class', 'Desk', 'Meeting', 'Room', 'Lounge', 'Lobby', 'Bar', 'Lunch', 'Podcast', 'Gym'];

export const generateFakeUsers = (amountOfUsers: number): any[] => {
    return [...Array(amountOfUsers).keys()].map((key) => ({
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: presenceStatus[Math.floor(Math.random() * presenceStatus.length)],
        isOutOfOffice: false
    }));
};

export const generateFakePersonalRooms = (fakeUsers: any[]): any[] => {
    return fakeUsers.map((fakeUser) => ({
        id: `Personal-${fakeUser.id}`,
        name: `${fakeUser.name}'s personal room`,
        isPersonal: true,
        attributes: {
            iconKey: '',
            roomImg: fakeUser.image
        }
    }));
};

export const generateCommonRooms = (amountOfRooms: number): any[] => {
    return [...Array(amountOfRooms).keys()].map((key) => ({
        id: faker.string.uuid(),
        name: `Room ${key + 1}`,
        isPersonal: false,
        attributes: {
            iconKey: roomIcons[Math.floor(Math.random() * roomIcons.length)],
            roomImg: faker.image.urlLoremFlickr({'category': 'nature'})
        }
    }));
};