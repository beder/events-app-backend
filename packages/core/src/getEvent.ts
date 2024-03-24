import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getEvent = async (id: number) => {
  const results = await db.select().from(events).where(eq(events.id, id));

  return results[0];
};
