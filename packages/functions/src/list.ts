import { listEvents } from "@events-app-backend/core/src/listEvents";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async () => {
  const events = await listEvents();

  return {
    body: JSON.stringify(events),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };
});
