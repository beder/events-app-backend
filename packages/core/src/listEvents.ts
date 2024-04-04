import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";
import { ilike, or } from "drizzle-orm";

export const listEvents = async (q?: string) => {
  const query = db.select().from(events);

  if (!q) {
    return query;
  }

  return query.where(
    or(ilike(events.name, `%${q}%`), ilike(events.description, `%${q}%`))
  );
};
