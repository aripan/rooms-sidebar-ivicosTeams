import { Stack } from "@fluentui/react";
import { Persona, Text } from "@fluentui/react-components";
import React from "react";

export const UserPersona: React.FC<any> = ({
  name,
  imageUrl,
  presenceStatus,
  outOfOfficeStatus,
}) => {
  console.log(
    "🚀 ~ file: UserPersona.tsx:10 ~ presenceStatus:",
    presenceStatus,
    outOfOfficeStatus
  );
  return (
    <Stack horizontal>
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
