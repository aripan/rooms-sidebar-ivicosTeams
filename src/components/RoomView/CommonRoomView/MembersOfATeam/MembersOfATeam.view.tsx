import React, { useContext, useEffect, useState } from "react";
import { CallAzureFunction } from "../../../../HandleAzureFunctionalities/CallAzureFunction";
import { TeamsFxContext } from "../../../../Context";
import { Stack, Text } from "@fluentui/react";
import { Person, PersonCard, PersonViewType } from "@microsoft/mgt-react";
import { Spinner } from "@fluentui/react-components";

const MembersOfATeamView: React.FC<any> = (props) => {
  const { currentTeamRoom } = props;
  const [teamMembers, setTeamMembers] = useState<any>([]);

  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const functionRes = await CallAzureFunction(
          teamsUserCredential,
          `teamsRoutes/teamMembers=${currentTeamRoom.id}`
        );
        const teamMembers = await functionRes.value;
        setTeamMembers(teamMembers);
      } catch (error: any) {
        throw error;
      }
    };

    fetchTeamMembers();
  }, [currentTeamRoom.id, teamsUserCredential]);

  //   console.log(
  //     "🚀 ~ file: MembersOfATeam.view.tsx:8 ~ teamMembers:",
  //     teamMembers[0].displayName
  //   );

  return (
    <Stack
      style={{
        height: 600,
        overflowY: "auto",
        padding: 10,
      }}
    >
      {teamMembers?.map((teamMember: any) => {
        return (
          <Stack
            key={teamMember?.email}
            style={{
              padding: 5,
            }}
          >
            <PersonCard personQuery={teamMember?.email} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default MembersOfATeamView;
