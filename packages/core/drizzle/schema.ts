import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id"),
  name: text("name"),
});
