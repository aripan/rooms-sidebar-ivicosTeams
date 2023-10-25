import { useContext } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import config from "./lib/config";
import { WelcomePage } from "./WelcomePage/WelcomePage";

const showFunction = Boolean(config.apiName);

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
      {/* <Welcome showFunction={showFunction} /> */}
    </div>
  );
}
