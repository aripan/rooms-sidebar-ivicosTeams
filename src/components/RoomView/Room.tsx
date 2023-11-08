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
          backgroundColor: "rgba(145, 234, 228, 0.4)",
          padding: 10,
        }}
      >
        <Text>{roomToShow?.name}</Text>
      </Stack>
      <Stack
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        style={{ marginTop: 100 }}
      >
        <Image
          src={roomToShow?.attributes?.roomImg}
          width={300}
          height={300}
          style={{
            borderRadius: "50%",
          }}
        />
      </Stack>
    </Stack>
  );
};
