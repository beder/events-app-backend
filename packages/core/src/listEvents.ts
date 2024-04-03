import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import { like, or } from "drizzle-orm";

export const listEvents = async (q?: string) => {
  const query = db.select().from(events);

  if (!q) {
    return query;
  }

  return query.where(
    or(like(events.name, `%${q}%`), like(events.description, `%${q}%`))
  );
};
