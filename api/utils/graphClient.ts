import "isomorphic-fetch";
import { Context, HttpRequest } from "@azure/functions";
import {
    OnBehalfOfCredentialAuthConfig,
    OnBehalfOfUserCredential,
    UserInfo,
} from "@microsoft/teamsfx";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import config from "../config";

export function getGraphClient(accessToken) {
    const oboCredential = new OnBehalfOfUserCredential(accessToken, {
        authorityHost: config.authorityHost,
        clientId: config.clientId,
        tenantId: config.tenantId,
        clientSecret: config.clientSecret,
    });
    const authProvider = new TokenCredentialAuthenticationProvider(oboCredential, {
        scopes: ['https://graph.microsoft.com/.default'],
    });
    return Client.initWithMiddleware({ authProvider });
}

// async function getUserInfo(accessToken) {
//     // Logic to get user info
// }

// async function getProfile(graphClient, endpoint) {
//     // Switch case to handle different endpoints
// }

