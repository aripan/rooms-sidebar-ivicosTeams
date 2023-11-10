// dbTypes.ts

export interface Organization {
  id: string;
  name: string;
  tenant_id: string;
  archived: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface Area {
  id: string;
  name: string;
  organization_id: string;
  icon: string;
  archived: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface Room {
  id: string;
  name: string;
  area_id: string;
  team_id: string;
  channel_id: string;
  isPersonal: boolean;
  attributes: {
    icon: string;
    roomImg: string;
    // ... other room properties
  },
  archived: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface User {
  id: string;
  org_id: string;
  name: string;
  language: string;
  email: string;
  image: string;
  status: {
    presence: string;
    isOutOfOffice: boolean;
  };
  tabs: string[];
  archived: boolean;
  created_at: Date;
  updated_at: Date;
  // ... other user properties
}

export interface Database {
  org: Organization;
  areas: Area[];
  rooms: Room[];
  users: User[];
}
