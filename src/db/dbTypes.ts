// dbTypes.ts

export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    presence:string;
    isOutOfOffice: boolean;
    // ... other user properties
  }

  export interface Room {
    id: string;
    name: string;
    isPersonal: boolean;
    attributes: any
    // ... other room properties
  }

  export interface Database {
    users: User[];
    rooms: Room[];
  }
