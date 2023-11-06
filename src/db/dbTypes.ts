// dbTypes.ts

export interface User {
    id: string;
    name: string;
    // ... other user properties
  }

  export interface Room {
    id: string;
    name: string;
    // ... other room properties
  }

  export interface Database {
    users: User[];
    rooms: Room[];
  }
