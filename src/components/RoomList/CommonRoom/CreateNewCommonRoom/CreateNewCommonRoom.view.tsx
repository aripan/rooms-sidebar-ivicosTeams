import { Panel, PrimaryButton, Stack, TextField } from "@fluentui/react";
import React, { useContext, useState } from "react";
import { ICreateNewCommonRoomState } from "./CreateNewCommonRoom.state";
import { TeamsFxContext } from "../../../../Context";
import { PostToAzureFunction } from "../../../../HandleAzureFunctionalities/CallAzureFunction";
import { useTeamRooms } from "../../../../shared-state/rooms/hooks";

const CreateNewCommonRoomView: React.FunctionComponent<
  ICreateNewCommonRoomState
> = (props) => {
  const { openPanelToCreateNewCommonRoom, setOpenPanelToCreateNewCommonRoom } =
    props;

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [, setTeamRooms] = useTeamRooms();
  const [needConsent, setNeedConsent] = useState(false);

  const updateTeamName = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: string
  ) => {
    setTeamName(data);
  };

  const updateDescription = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: string
  ) => {
    setDescription(data);
  };

  const { teamsUserCredential } = useContext(TeamsFxContext);

  if (!teamsUserCredential) {
    throw new Error("TeamsFx SDK is not initialized.");
  }

  const handleSubmit = async () => {
    const teamData = {
      "template@odata.bind":
        "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      displayName: teamName,
      description: description,
      // ... other team properties
    };
    if (needConsent) {
      await teamsUserCredential!.login(["User.Read"]);
      setNeedConsent(false);
    }
    try {
      const functionRes = await PostToAzureFunction(
        teamsUserCredential,
        "teamsRoutes/createTeam",
        teamData
      );
      const teams = await functionRes.value;
      setTeamRooms(teams);
      setTeamName("");
      setDescription("");
      setOpenPanelToCreateNewCommonRoom(false);
    } catch (error: any) {
      if (error.message.includes("The application may not be authorized.")) {
        setNeedConsent(true);
      }
      throw error;
    }
  };

  return (
    <Stack>
      <Panel
        headerText="Room Setup"
        isOpen={openPanelToCreateNewCommonRoom}
        onDismiss={() =>
          setOpenPanelToCreateNewCommonRoom(!openPanelToCreateNewCommonRoom)
        }
        closeButtonAriaLabel="Close"
      >
        <Stack
          tokens={{
            childrenGap: 10,
          }}
          style={{
            marginTop: 20,
          }}
        >
          <TextField
            label="Room name"
            value={teamName}
            onChange={(event, newValue) =>
              typeof newValue == "string" && updateTeamName(event, newValue)
            }
          />
          <TextField
            label="Description"
            value={description}
            onChange={(event, newValue) =>
              typeof newValue == "string" && updateDescription(event, newValue)
            }
          />
          <Stack
            style={{
              width: 150,
              margin: "15px auto 0 auto",
            }}
          >
            <PrimaryButton text="Create Room" onClick={handleSubmit} />
          </Stack>
        </Stack>
      </Panel>
    </Stack>
  );
};
export default CreateNewCommonRoomView;
