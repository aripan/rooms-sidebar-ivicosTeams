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
    if (endpoint) {
      if (endpoint === 'users') {
        const allUsers = await graphClient.api("/users").get();
        result = await allUsers.value
      } else if (endpoint.includes('user-photo-id')) {
        const userId = endpoint.split('=')[1]
        const userPhoto = await graphClient.api(`/users/${userId}/photo/$value`).get();
        // create the buffer from the Blob object
        const imageArrayBuffer = await userPhoto.arrayBuffer();
        const imageBuffer = Buffer.from(imageArrayBuffer);
        // convert it to base64 and then to imageUrl
        const imageBase64String = imageBuffer.toString('base64');
        const image = 'data:image/jpeg;base64,' + imageBase64String;
        result = image
      } else if (endpoint === 'message') {
        result = await graphClient.api("/me/messages").get();
      } else {
        context.res = {
          status: 400,
          body: "Unsupported endpoint"
        };
      }
    }

    // switch (endpoint) {
    //   case "users":
    //     const allUsers = await graphClient.api("/users").get();
    //     result = await allUsers.value
    //     break;
    //   case endpoint.includes('user-photo-id'):
    //     const allUsers = await graphClient.api("/users").get();
    //     result = await allUsers.value
    //     break;
    //   case "messages":
    //     result = await graphClient.api("/me/messages").get();
    //     break;
    //   // Add more cases as needed
    //   default:
    //     context.res = {
    //       status: 400,
    //       body: "Unsupported endpoint"
    //     };
    // }
    res.body = result;

  } catch (error) {
    context.log.error(error);
    return createResponse(500, { error: error.message || 'Internal Server Error' });
  }

  return res;
}
