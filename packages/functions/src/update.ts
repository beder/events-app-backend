import { ApiHandler } from "sst/node/api";
import {
  updateEvent,
  updateEventSchema,
} from "@events-app-backend/core/src/updateEvent";

export const handler = ApiHandler(async (apiEvent) => {
  const id = parseInt(apiEvent.pathParameters?.id ?? "");

  const result = updateEventSchema.safeParse(JSON.parse(apiEvent.body ?? "{}"));

  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify(result.error.issues),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const updatedEvent = await updateEvent(id, result.data);

  return {
    body: JSON.stringify(updatedEvent),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };
});
