import * as React from "react";
import { Image, Stack, Text } from "@fluentui/react";
import { IUser } from "../../../db/dbTypes";

interface IPersonalRoomViewProps {
  personalRoomToShow: IUser;
  userImage: string;
}

export const PersonalRoomViewView: React.FC<IPersonalRoomViewProps> = (
  props
) => {
  const { personalRoomToShow, userImage } = props;
  return (
    <Stack>
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        style={{
          height: 40,
          backgroundColor: "rgba(145, 234, 228, 0.9)",
          padding: 10,
          borderRadius: "8px 8px 0 0",
          color: "#000",
        }}
      >
        <Text>{personalRoomToShow?.name}'s personal room</Text>
      </Stack>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        style={{
          marginTop: 120,
        }}
      >
        <Image
          src={userImage}
          width={350}
          height={350}
          style={{
            borderRadius: "50%",
          }}
        />
      </Stack>
    </Stack>
  );
};
