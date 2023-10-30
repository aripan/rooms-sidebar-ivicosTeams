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
      case "users":
        const allUsers = await graphClient.api("/users").get();
        result = await allUsers.value
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
