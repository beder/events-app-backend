import { ApiHandler } from "sst/node/api";
import { deleteEvent } from "@events-app-backend/core/src/deleteEvent";

export const handler = ApiHandler(async (apiEvent) => {
  const id = parseInt(apiEvent.pathParameters?.id ?? "");

  const deletedEvent = await deleteEvent(id);

  return {
    body: JSON.stringify(deletedEvent),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };
});
