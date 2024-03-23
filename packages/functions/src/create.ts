import { ApiHandler } from "sst/node/api";
import { createEvent } from "@events-app-backend/core/src/createEvent";

export const handler = ApiHandler(async (event) => {
  const { name, description } = JSON.parse(event.body ?? "{}");

  if (!name) {
    return {
      statusCode: 400,
      body: "Missing event name",
    };
  }

  const newEvent = await createEvent({ name, description });

  return {
    body: JSON.stringify(newEvent),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };
});
