import { faker } from '@faker-js/faker';


export const fakeUsers = [
    {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: 'available',
        isOutOfOffice: false
    },
    {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: 'available',
        isOutOfOffice: false
    },
    {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: 'available',
        isOutOfOffice: false
    },
    {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: 'available',
        isOutOfOffice: false
    },
    {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: 'available',
        isOutOfOffice: false
    },
    {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: 'available',
        isOutOfOffice: false
    },
    {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        image: faker.internet.avatar(),
        presence: 'available',
        isOutOfOffice: false
    },
]

export const fakeRooms = [
    {
        id: faker.string.uuid(),
        name: 'Coffee and Tea corner',
        isPersonal: false,
        attributes: {}
    },
    {
        id: faker.string.uuid(),
        name: 'Discussion room',
        isPersonal: false,
        attributes: {}
    },
    {
        id: faker.string.uuid(),
        name: 'meeting room',
        isPersonal: false,
        attributes: {}
    },
]