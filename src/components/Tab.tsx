import { useContext } from "react";
import { TeamsFxContext } from "./Context";
import { WelcomePage } from "./WelcomePage/WelcomePage";

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  return (
    <div
      className={
        themeString === "default"
          ? "light"
          : themeString === "dark"
          ? "dark"
          : "contrast"
      }
    >
      <WelcomePage />
    </div>
  );
}
