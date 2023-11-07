import { DefaultButton, Stack } from "@fluentui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SeedData = () => {
  const routeHistory = useNavigate();

  return (
    <Stack>
      <Stack
        style={{
          width: 150,
          height: "auto",
          margin: 10,
        }}
      >
        <DefaultButton
          text="Go Back"
          onClick={() => {
            routeHistory("/tab");
          }}
        />
      </Stack>

      <h1>SeedData</h1>
    </Stack>
  );
};

export default SeedData;
