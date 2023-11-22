import "isomorphic-fetch";
import { Context, HttpRequest } from "@azure/functions";
import { getGraphClient } from "../utils/graphClient";
import {
  convertBlobToBinaryData,
  createResponse,
  getAccessToken,
} from "../utils/utils";
import pool from "../utils/db";
import { faker } from "@faker-js/faker";
import { daysAfter, daysBefore } from "../utils/dates";

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
        // const data = await pool.query("SELECT * FROM users");
        const meResponse = await graphClient.api("/me").get();

        const userExist = await pool.query(`SELECT * FROM users WHERE id=$1`, [
          meResponse.id,
        ]);
        if (userExist.rows.length === 0) {
          await pool.query(
            `INSERT INTO users (id, org_id, tabs, archived, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              meResponse.id,
              faker.string.uuid(),
              [],
              false,
              daysBefore(3),
              daysAfter(3),
            ]
          );
        } else {
          console.warn("User already exists");
        }
        result = meResponse;
        break;
      case "photo":
        const response = await graphClient.api("/me/photo/$value").get();
        result = await convertBlobToBinaryData(response);
        break;
      case "photo-presence":
        const presenceInfo = await graphClient
          .api("/me/presence")
          .version("beta")
          .get();
        const imageRes = await graphClient.api("/me/photo/$value").get();
        const image = await convertBlobToBinaryData(imageRes);
        result = { image, presenceInfo };
        break;
      case "messages":
        result = await graphClient.api("/me/messages").get();
        break;
      // Add more cases as needed
      default:
        context.res = {
          status: 400,
          body: "Unsupported endpoint",
        };
    }
    res.body = result;
  } catch (error) {
    context.log.error(error);
    return createResponse(500, {
      error: error.message || "Internal Server Error",
    });
  }

  return res;
}
