import { Stack } from "@fluentui/react";
import React from "react";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Stack
      horizontalAlign="center"
      style={{
        backgroundColor: "#212121",
        color: "#fff",
      }}
    >
      <h3>{title}</h3>
    </Stack>
  );
};

export default SectionHeader;
