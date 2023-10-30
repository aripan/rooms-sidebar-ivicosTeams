import { useContext, useEffect, useState } from "react";
import { Button, PresenceBadge } from "@fluentui/react-components";
import "./WelcomePage.css";
import { TeamsFxContext } from "../Context";
import { useAzureFunctionData } from "../HandleAzureFunctionalities/hooks";
import { Person, PersonCard, PersonViewType } from "@microsoft/mgt-react";
import { Stack, TextField } from "@fluentui/react";

export function SearchUserByEmail({ endpoint }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>({});
  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }
  const { loading, data, error, reload } = useAzureFunctionData(
    teamsUserCredential,
    endpoint
  );

  const handleInputChange = (e: any) => {
    console.log(e.target.value);
    reload();
    setEmailAddress(e.target.value);
  };

  const handleOnClick = (e: any, user: { mail: string | undefined }) => {
    reload();
    console.log(user);
    setSelectedUser(user);
  };

  return (
    <div className="welcome page">
      <Stack className="page-padding">
        <TextField
          style={{
            width: 250,
          }}
          label="Search User By Email"
          value={emailAddress}
          onChange={(e) => handleInputChange(e)}
        />
        <br />
        <Stack
          tokens={{
            childrenGap: 10,
          }}
          style={{
            maxHeight: 350,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {data &&
            emailAddress.length > 0 &&
            data
              .filter((user: { mail: string | undefined }) =>
                user.mail?.includes(emailAddress)
              )
              .map((user: { mail: string | undefined }) => (
                <Stack key={user?.mail} onClick={(e) => handleOnClick(e, user)}>
                  <Person
                    personQuery={user?.mail}
                    view={PersonViewType.twolines}
                    avatarSize="large"
                  />
                </Stack>
              ))}
        </Stack>
      </Stack>
    </div>
  );
}
