import { Stack } from "@fluentui/react";
import Areas from "./Areas/Areas";
import { getAreas, getOrg } from "../db/db";
import { IArea } from "../db/dbTypes";
import { useEffect, useState } from "react";
import { Spinner } from "@fluentui/react-components";
export interface IOrgInfo {
  id: string;
  name: string;
  archived: boolean;
}
export default function Tab() {
  const [fakeAreas, setFakeAreas] = useState<IArea[]>([]);
  const [orgInfo, setOrgInfo] = useState<IOrgInfo>({
    id: "",
    name: "",
    archived: false,
  });

  const getFakeAreas = async () => {
    try {
      const org = await getOrg();
      if (org) {
        const { id, name, archived } = org;
        const areas = await getAreas();
        setOrgInfo({ id, name, archived });
        setFakeAreas(areas);
      } else {
        // Handle the case where no organization is returned
        console.log("No organization found");
      }
    } catch (error) {
      // Handle or log the error
      console.error("An error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getFakeAreas();
  }, []);

  return !orgInfo.archived && fakeAreas.length > 0 ? (
    <Stack>
      <Areas orgInfo={orgInfo} areas={fakeAreas} />
    </Stack>
  ) : (
    <Spinner style={{ margin: 100 }} />
  );
}
