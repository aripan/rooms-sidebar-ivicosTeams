import "./WelcomePage.css";
import { UserPhoto } from "./NON-MGT/UserPhoto";
import { UserInfo } from "./NON-MGT/UserInfo";
import { Stack } from "@fluentui/react";
import { AllUsersInfo } from "./MIXED/AllUsersInfo";
import { SearchUserByEmail } from "./MIXED/SearchUserByEmail";
import { CalendarEvents } from "./NON-MGT/CalendarEvents";
import { CalendarEventsMgt } from "./MGT/CalendarEventsMgt";

export function WelcomePage() {
  return (
    <div className="welcome page">
      <Stack horizontal>
        <UserPhoto endpoint="userRoutes/photo" />
        <UserInfo endpoint="userRoutes/me" />
        <AllUsersInfo endpoint="usersRoutes/users" />
        <SearchUserByEmail endpoint="usersRoutes/users" />
      </Stack>
      <CalendarEvents />
      <CalendarEventsMgt />

      {/* <Person
          personQuery={data?.mail}
          view={PersonViewType.twolines}
          avatarSize="large"
        /> */}

      {/* <PersonCard personQuery="me" /> */}
    </div>
  );
}
