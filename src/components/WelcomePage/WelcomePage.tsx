import { useContext, useEffect, useState } from "react";
import { Button, PresenceBadge } from "@fluentui/react-components";
import "./WelcomePage.css";
import { TeamsFxContext } from "../Context";
import {
  useAzureFunctionData,
  useAzureFunctionDataForMultipleEndpoints,
} from "../HandleAzureFunctionalities/hooks";
import { Person, PersonCard, PersonViewType } from "@microsoft/mgt-react";
import { UserPhoto } from "./UserPhoto";
import { UserInfo } from "./UserInfo";

export function WelcomePage() {
  return (
    <div className="welcome page">
      <UserPhoto endpoint="userRoutes/photo" />
      <UserInfo endpoint="userRoutes/me" />

      {/* <div className="page-padding">
        <div>
          <Button
            appearance="primary"
            disabled={loading}
            onClick={() => {
              reload();
              setFunctionEndPoints((prev) => [...prev, "userRoutes/photo"]);
            }}
          >
            Show Photo
          </Button>
        </div>
        <br />
        <br />
        <div>
          <Button
            appearance="primary"
            disabled={loading}
            onClick={() => {
              reload();
              setFunctionEndPoints((prev) => [...prev, "userRoutes/me"]);
            }}
          >
            Show Info
          </Button>
        </div>

      </div> */}

      <div className="narrow page-padding">
        {/* {!loading && (
          <Button appearance="primary" disabled={loading} onClick={reload}>
            Authorize and call Azure Function
          </Button>
        )} */}

        {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}

        {/* <img
          src={data}
          alt="avatar"
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
          }}
        /> */}

        {/* <Person
          personQuery={data?.mail}
          view={PersonViewType.twolines}
          avatarSize="large"
        /> */}

        {/* <PersonCard personQuery="me" /> */}
      </div>
    </div>
  );
}
