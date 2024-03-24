import { ApiHandler } from "sst/node/api";
import {
  createEvent,
  insertEventSchema,
} from "@events-app-backend/core/src/createEvent";

export const handler = ApiHandler(async (event) => {
  const result = insertEventSchema.safeParse(JSON.parse(event.body ?? "{}"));

  if (!result.success) {
    return {
      statusCode: 400,
      body: JSON.stringify(result.error.issues),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const newEvent = await createEvent(result.data);

  return {
    body: JSON.stringify(newEvent),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };
});
