import { DefaultButton, Stack } from "@fluentui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserInfo } from "../../shared-state/users/hooks";
import { IArea, IUser } from "../../db/dbTypes";
import { Spinner } from "@fluentui/react-components";

export interface IAreasViewProps {
  currentUser: IUser | undefined;
  areas: IArea[];
}

const AreasView: React.FunctionComponent<IAreasViewProps> = (props) => {
  const { currentUser, areas } = props;
  const routeHistory = useNavigate();
  const [, setCurrentUserInfo] = useCurrentUserInfo();

  useEffect(() => {
    currentUser && setCurrentUserInfo(currentUser);
  }, [currentUser, setCurrentUserInfo]);

  return (
    <Stack
      horizontalAlign="center"
      style={{
        height: "100vh",
      }}
    >
      <h1>Areas</h1>
      <h2>{currentUser?.name}</h2>

      <Stack
        horizontal
        horizontalAlign="center"
        wrap
        tokens={{
          childrenGap: 15,
        }}
        style={{
          margin: "50px auto 0 auto",
        }}
      >
        {currentUser && areas.length > 0 ? (
          <>
            {areas.map((area: IArea) => (
              <DefaultButton
                key={area.id}
                text={area.name}
                style={{
                  width: 250,
                  height: 200,
                  fontSize: 18,
                }}
                onClick={() => {
                  routeHistory(`/areas/${area.id}/rooms/${currentUser?.id}`);
                }}
              />
            ))}
          </>
        ) : (
          <Spinner style={{ margin: 100 }} />
        )}
      </Stack>
    </Stack>
  );
};
export default AreasView;
