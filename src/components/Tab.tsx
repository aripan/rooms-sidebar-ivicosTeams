import { useContext } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { NewWelcomePage } from "./sample/NewWelcomePage";

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
      <NewWelcomePage showFunction={showFunction} />
      {/* <Welcome showFunction={showFunction} /> */}
    </div>
  );
}
