import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import { and, eq } from "drizzle-orm";

export const getUserEvent = async (id: number, userId: string) => {
  const results = await db
    .select()
    .from(events)
    .where(and(eq(events.id, id), eq(events.userId, userId)));

  return results[0];
};
