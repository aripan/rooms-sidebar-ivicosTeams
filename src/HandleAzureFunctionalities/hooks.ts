// useAzureFunctionData.js
import { useState } from "react";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { CallAzureFunction, PostToAzureFunction } from "./CallAzureFunction";

export function useAzureFunctionData(teamsUserCredential: TeamsUserCredential, functionName: any) {
    const [needConsent, setNeedConsent] = useState(false);

    const { loading, data, error, reload } = useData(async () => {
        if (!teamsUserCredential) {
            throw new Error("TeamsFx SDK is not initialized.");
        }
        if (needConsent) {
            await teamsUserCredential!.login(["User.Read"]);
            setNeedConsent(false);
        }
        try {
            const functionRes = await CallAzureFunction(teamsUserCredential, functionName);
            return functionRes;
        } catch (error: any) {
            if (error.message.includes("The application may not be authorized.")) {
                setNeedConsent(true);
            }
            throw error;
        }
    });

    return { loading, data, error, reload };
}
export function useAzureFunctionToPostData(teamsUserCredential: TeamsUserCredential, functionName: any, payload:any) {
    const [needConsent, setNeedConsent] = useState(false);

    const { loading, data, error, reload } = useData(async () => {
        if (!teamsUserCredential) {
            throw new Error("TeamsFx SDK is not initialized.");
        }
        if (needConsent) {
            await teamsUserCredential!.login(["User.Read"]);
            setNeedConsent(false);
        }
        try {
            const functionRes = await PostToAzureFunction(teamsUserCredential, functionName, payload);
            return functionRes;
        } catch (error: any) {
            if (error.message.includes("The application may not be authorized.")) {
                setNeedConsent(true);
            }
            throw error;
        }
    });

    return { loading, data, error, reload };
}


