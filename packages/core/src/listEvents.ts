import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";

export const listEvents = async () => {
  return db.select().from(events);
};
