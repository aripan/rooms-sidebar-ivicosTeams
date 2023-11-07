import { Label, Stack } from "@fluentui/react";
import { UserPersona } from "./UserPersona";

export const PersonalRoom: React.FC<any> = ({ user }) => {
  return (
    <Stack
      style={{
        backgroundColor: "rgba(145, 234, 228, 0.4)",
        padding: "0 0 10px 0",
        borderRadius: 10,
      }}
    >
      <Label
        style={{
          backgroundColor: "rgba(145, 234, 228, 0.9)",
          borderRadius: "10px 10px 0 0",
          padding: "5px 5px 5px 10px",
        }}
      >
        {user.name}'s room
      </Label>
      <UserPersona
        name={user.name}
        imageUrl={user.image}
        presenceStatus={user.presence}
        outOfOfficeStatus={user.isOutOfOffice}
      />
    </Stack>
  );
};
