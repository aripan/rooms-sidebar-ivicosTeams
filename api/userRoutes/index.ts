import "isomorphic-fetch";
import { Context, HttpRequest } from "@azure/functions";
import { getGraphClient } from '../utils/graphClient'
import { createResponse, getAccessToken } from '../utils/utils'

interface Response {
  status: number;
  body: { [key: string]: any };
}

type TeamsfxContext = { [key: string]: any };

export default async function run(
  context: Context,
  req: HttpRequest,
  teamsfxContext: TeamsfxContext
): Promise<Response> {
  context.log("HTTP trigger function processed a request.");

  // Initialize response.
  const res: Response = {
    status: 200,
    body: {},
  };

  // dynamic endpoint request
  const endpoint = req.params.endpoint;
  context.log("Requested endpoint:", endpoint);


  try {
    // Get the access token first
    const accessToken = getAccessToken(teamsfxContext);

    // Get user info
    // const userInfo = await getUserInfo(accessToken);
    const graphClient = getGraphClient(accessToken);


    let result: any;

    switch (endpoint) {
      case "me":
        result = await graphClient.api("/me").get();
        break;
      case "photo":
        const response = await graphClient.api("/me/photo/$value").get();

        // create the buffer from the Blob object
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // convert it to base64 and then to imageUrl
        const base64String = buffer.toString('base64');
        const imageUrl = 'data:image/jpeg;base64,' + base64String;

        // sending it to frontend
        result = imageUrl
        break;
      case "messages":
        result = await graphClient.api("/me/messages").get();
        break;
      // Add more cases as needed
      default:
        context.res = {
          status: 400,
          body: "Unsupported endpoint"
        };
    }
    res.body = result;

  } catch (error) {
    context.log.error(error);
    return createResponse(500, { error: error.message || 'Internal Server Error' });
  }

  return res;
}
// export default async function run(
//   context: Context,
//   req: HttpRequest,
//   teamsfxContext: TeamsfxContext
// ): Promise<Response> {
//   context.log("HTTP trigger function processed a request.");

//   // Initialize response.
//   const res: Response = {
//     status: 200,
//     body: {},
//   };

//   // dynamic endpoint request
//   const endpoint = req.params.endpoint;
//   context.log("Requested endpoint:", endpoint);

//   // Put an echo into response body.
//   res.body.receivedHTTPRequestBody = req.body || "";

//   // Prepare access token.
//   const accessToken: string = teamsfxContext["AccessToken"];
//   if (!accessToken) {
//     return {
//       status: 400,
//       body: {
//         error: "No access token was found in request header.",
//       },
//     };
//   }

//   const oboAuthConfig: OnBehalfOfCredentialAuthConfig = {
//     authorityHost: config.authorityHost,
//     clientId: config.clientId,
//     tenantId: config.tenantId,
//     clientSecret: config.clientSecret,
//   };

//   let oboCredential: OnBehalfOfUserCredential;
//   try {
//     oboCredential = new OnBehalfOfUserCredential(accessToken, oboAuthConfig);
//   } catch (e) {
//     context.log.error(e);
//     return {
//       status: 500,
//       body: {
//         error:
//           "Failed to construct OnBehalfOfUserCredential using your accessToken. " +
//           "Ensure your function app is configured with the right Azure AD App registration.",
//       },
//     };
//   }

//   // Query user's information from the access token.
//   try {
//     const currentUser: UserInfo = await oboCredential.getUserInfo();
//     if (currentUser && currentUser.displayName) {
//       res.body.userInfoMessage = `User display name is ${currentUser.displayName}.`;
//     } else {
//       res.body.userInfoMessage = "No user information was found in access token.";
//     }
//   } catch (e) {
//     context.log.error(e);
//     return {
//       status: 400,
//       body: {
//         error: "Access token is invalid.",
//       },
//     };
//   }

//   // Create a graph client with default scope to access user's Microsoft 365 data after user has consented.
//   try {
//     // Create an instance of the TokenCredentialAuthenticationProvider by passing the tokenCredential instance and options to the constructor
//     const authProvider = new TokenCredentialAuthenticationProvider(oboCredential, {
//       scopes: ["https://graph.microsoft.com/.default"],
//     });

//     // Initialize Graph client instance with authProvider
//     const graphClient = Client.initWithMiddleware({
//       authProvider: authProvider,
//     });

//     let profile: any;

//     switch (endpoint) {
//       case "me":
//         profile = await graphClient.api("/me").get();
//         break;
//       case "photo":
//         profile = await graphClient.api("/me/photo/$value").get();
//         break;
//       case "messages":
//         profile = await graphClient.api("/me/messages").get();
//         break;
//       // Add more cases as needed
//       default:
//         context.res = {
//           status: 400,
//           body: "Unsupported endpoint"
//         };
//     }
//     res.body.graphClientMessage = profile;

//   } catch (e) {
//     context.log.error(e);
//     return {
//       status: 500,
//       body: {
//         error:
//           "Failed to retrieve user profile from Microsoft Graph. The application may not be authorized.",
//       },
//     };
//   }

//   return res;
// }
