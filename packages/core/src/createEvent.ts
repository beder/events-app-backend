import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import type { InferInsertModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import * as Zod from "zod";

export const insertEventSchema = Zod.preprocess((data: any) => {
  if (typeof data !== "object" || data === null) {
    return {};
  }

  return {
    ...data,
    ...(data.date && { date: new Date(data.date) }),
  };
}, createInsertSchema(events));

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
