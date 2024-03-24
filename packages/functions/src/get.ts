import { ApiHandler } from "sst/node/api";
import { getEvent } from "@events-app-backend/core/src/getEvent";

export const handler = ApiHandler(async (apiEvent) => {
  const id = parseInt(apiEvent.pathParameters?.id ?? "");

  console.dir({ id }, { depth: null, colors: true });

  if (isNaN(id)) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Event not found" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const event = await getEvent(id);

  if (!event) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Event not found" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };
});
