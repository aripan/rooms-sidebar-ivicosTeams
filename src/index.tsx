import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProviderState, Providers } from "@microsoft/mgt-element";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import {
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from "@microsoft/teamsfx";
import { RecoilRoot } from "recoil";

const authConfig: TeamsUserCredentialAuthConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID!,
  initiateLoginEndpoint: process.env.REACT_APP_FUNC_ENDPOINT!,
};
const scope = ["User.Read"];
const credential = new TeamsUserCredential(authConfig);
const provider = new TeamsFxProvider(credential, scope);
Providers.globalProvider = provider;

const AppWrapper = () => {
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = await credential.getToken(scope);
        if (token) {
          Providers.globalProvider.setState(ProviderState.SignedIn);
        } else {
          await credential.login(scope);
          Providers.globalProvider.setState(ProviderState.SignedIn);
        }
      } catch (error) {
        console.error("Error during authentication", error);
        Providers.globalProvider.setState(ProviderState.SignedOut);
      }
    };

    initialize();
  }, []);

  return <App />;
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <RecoilRoot>
    <AppWrapper />
  </RecoilRoot>
);
