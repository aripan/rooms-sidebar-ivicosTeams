import { Stack } from "@fluentui/react";
import { Persona, Text } from "@fluentui/react-components";
import React from "react";

export const UserPersona: React.FC<any> = ({
  name,
  imageUrl,
  presenceStatus,
  outOfOfficeStatus,
}) => {

  return (
    <Stack
      horizontal
      style={{
        paddingTop: 10,
        paddingLeft: 10,
      }}
    >
      <Persona
        presence={{ status: presenceStatus, outOfOffice: outOfOfficeStatus }}
        avatar={{
          image: {
            src: imageUrl,
          },
        }}
        size="large"
      />
      <Stack verticalAlign="center">
        <Text>{name}</Text>
      </Stack>
    </Stack>
  );
};
