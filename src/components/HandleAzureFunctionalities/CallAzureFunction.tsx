// apiUtils.js
import {
  createApiClient,
  BearerTokenAuthProvider,
  TeamsUserCredential,
} from "@microsoft/teamsfx";
import config from "../config/config";

export async function CallAzureFunction(
  teamsUserCredential: TeamsUserCredential,
  functionName: any
) {
  try {
    const apiBaseUrl = config.apiEndpoint + "/api/";
    const apiClient = createApiClient(
      apiBaseUrl,
      new BearerTokenAuthProvider(
        async () => (await teamsUserCredential.getToken(""))!.token
      )
    );
    const response = await apiClient.get(functionName);
    return response.data;
  } catch (err) {
    // Handle errors
    console.error("Error calling Azure Function:", err);
    throw err;
  }
}
