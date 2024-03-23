import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";

export const createEvent = async (event: { name: string }) => {
  const newEvent = await db
    .insert(events)
    .values(event)
    .returning({ id: events.id });

  return newEvent?.[0];
};
