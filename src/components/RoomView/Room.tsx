import * as React from "react";

import { Image, Stack, Text } from "@fluentui/react";

export const Room: React.FC<any> = (props) => {
  const { roomToShow } = props;

  return (
    <Stack>
      <Stack
        verticalAlign="center"
        style={{
          height: 40,
          backgroundColor: "rgba(145, 234, 228, 0.9)",
          padding: 10,
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Text>{roomToShow?.name}</Text>
      </Stack>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        style={{
          marginTop: 120,
        }}
      >
        <Image
          src={roomToShow?.attributes?.roomImg}
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
