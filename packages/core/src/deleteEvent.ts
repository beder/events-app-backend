import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const deleteEvent = async (id: number) => {
  await db.delete(events).where(eq(events.id, id));

  return { id };
};
