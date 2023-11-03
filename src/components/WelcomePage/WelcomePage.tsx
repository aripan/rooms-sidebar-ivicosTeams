import "./WelcomePage.css";
import { UserPhoto } from "./NON-MGT/UserPhoto";
import { UserInfo } from "./NON-MGT/UserInfo";
import { Stack } from "@fluentui/react";
import { AllUsersInfo } from "./MIXED/AllUsersInfo";
import { SearchUserByEmail } from "./MIXED/SearchUserByEmail";
import { CalendarEvents } from "./NON-MGT/CalendarEvents";
import { CalendarEventsMgt } from "./MGT/CalendarEventsMgt";
import { PeoplePickerMgt } from "./MGT/PeoplePickerMGT";
import SectionHeader from "./SectionHeader";
import { TodoListsMgt } from "./MGT/TodoListsMGT";

export function WelcomePage() {
  return (
    <div className="welcome page">
      {/* Non MGT */}
      <SectionHeader title="Non MGT" />
      <Stack horizontal>
        <UserPhoto endpoint="userRoutes/photo" />
        <UserInfo endpoint="userRoutes/me" />
      </Stack>

      {/* Mixed */}
      <SectionHeader title="Mixed" />
      <Stack horizontal>
        <AllUsersInfo endpoint="usersRoutes/users" />
        <SearchUserByEmail endpoint="usersRoutes/users" />
      </Stack>

      {/* JSON format */}
      <SectionHeader title="JSON format" />
      <CalendarEvents />

      {/* Pure MGT */}
      <SectionHeader title="Pure MGT" />
      <Stack horizontal>
        <CalendarEventsMgt />
        <PeoplePickerMgt />
        {/* <TasksMgt /> */}
        <TodoListsMgt />
      </Stack>
    </div>
  );
}
