import { events } from "@events-app-backend/core/events";

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify(events),
  };
}
