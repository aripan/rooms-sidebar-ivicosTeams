// dbTypes.ts

export interface IOrganization {
  id: string;
  tenant_id: string;
  name: string;
  archived: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface IArea {
  id: string;
  organization_id: string;
  name: string;
  icon: string;
  archived: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface IRoom {
  id: string;
  area_id: string;
  team_id: string;
  channel_id: string;
  attributes: {
    icon: string;
    roomImg: string;
    // ... other room properties
  },
  archived: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface IUser {
  id: string;
  org_id: string;
  name: string;
  language: string;
  email: string;
  tabs: string[];
  archived: boolean;
  created_at: Date;
  updated_at: Date;
  // ... other user properties
}

export interface Database {
  org: IOrganization;
  areas: IArea[];
  rooms: IRoom[];
  users: IUser[];
}
