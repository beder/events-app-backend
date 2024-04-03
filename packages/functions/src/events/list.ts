import { json } from "@events-app-backend/core/src/utils/json";
import { listEvents } from "@events-app-backend/core/src/listEvents";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async () => {
  const events = await listEvents();

  return json({
    body: events,
    statusCode: 200,
  });
});
