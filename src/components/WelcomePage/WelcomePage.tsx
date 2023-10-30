import "./WelcomePage.css";
import { UserPhoto } from "./UserPhoto";
import { UserInfo } from "./UserInfo";
import { Stack } from "@fluentui/react";
import { AllUsersInfo } from "./AllUsersInfo";

export function WelcomePage() {
  return (
    <div className="welcome page">
      <Stack horizontal>
        <UserPhoto endpoint="userRoutes/photo" />
        <UserInfo endpoint="userRoutes/me" />
        <AllUsersInfo endpoint="usersRoutes/users" />
      </Stack>

      {/* <Person
          personQuery={data?.mail}
          view={PersonViewType.twolines}
          avatarSize="large"
        /> */}

      {/* <PersonCard personQuery="me" /> */}
    </div>
  );
}
