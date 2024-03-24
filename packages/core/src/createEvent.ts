import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import type { InferInsertModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const insertEventSchema = createInsertSchema(events);

export const createEvent = async (event: InferInsertModel<typeof events>) => {
  const newEvent = await db
    .insert(events)
    .values(event)
    .returning({ id: events.id });

  return {
    ...event,
    id: newEvent?.[0].id,
  };
};
