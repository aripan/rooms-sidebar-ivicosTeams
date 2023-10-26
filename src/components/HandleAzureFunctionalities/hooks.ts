// useAzureFunctionData.js
import { useState } from "react";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { CallAzureFunction } from "./CallAzureFunction";

export function useAzureFunctionData(teamsUserCredential: TeamsUserCredential, functionName: any) {
    console.log("🚀 ~ file: hooks.ts:34 ~ useAzureFunctionDataForMultipleEndpoints ~ functionNames:", functionName)
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


export function useAzureFunctionDataForMultipleEndpoints(teamsUserCredential: TeamsUserCredential, functionNames: string[]) {

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
            const functionResponses = await Promise.all(functionNames.map(async (functionName) => {
                return CallAzureFunction(teamsUserCredential, functionName);
            }));
            console.log("🚀 ~ file: hooks.ts:49 ~ functionResponses ~ functionResponses:", functionResponses)
            return functionResponses;
        } catch (error: any) {
            if (error.message.includes("The application may not be authorized.")) {
                setNeedConsent(true);
            }
            throw error;
        }
    });

    return { loading, data, error, reload };
}