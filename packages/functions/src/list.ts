import { listEvents } from "@events-app-backend/core/src/listEvents";

export async function handler() {
  const events = await listEvents();

  return {
    body: JSON.stringify(events),
    headers: {
      "Content-Type": "application/json",
    },
    statusCode: 200,
  };
}
