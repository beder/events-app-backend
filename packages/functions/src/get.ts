import { ApiHandler } from "sst/node/api";
import { getEvent } from "@events-app-backend/core/src/getEvent";
import { json } from "@events-app-backend/core/src/utils/json";

export const handler = ApiHandler(async (apiEvent) => {
  const id = parseInt(apiEvent.pathParameters?.id ?? "");

  if (isNaN(id)) {
    return json({
      body: { error: "Event not found" },
      statusCode: 404,
    });
  }

  const event = await getEvent(id);

  if (!event) {
    return json({
      body: { error: "Event not found" },
      statusCode: 404,
    });
  }

  return json({
    body: event,
    statusCode: 200,
  });
});
