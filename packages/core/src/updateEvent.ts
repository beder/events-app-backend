import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import { eq, type InferInsertModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import * as Zod from "zod";

export const updateEventSchema = Zod.preprocess((data: any) => {
  if (typeof data !== "object" || data === null) {
    return {};
  }

  return {
    ...data,
    ...(data.date && { date: new Date(data.date) }),
  };
}, createInsertSchema(events));

export const updateEvent = async (
  id: number,
  event: InferInsertModel<typeof events>
) => {
  await db.update(events).set(event).where(eq(events.id, id));

  return {
    ...event,
    id,
  };
};
