import {
  pgTable,
  serial,
  text,
  date,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id"),
  name: varchar("name"),
  date: date("date", { mode: "date" }),
  location: varchar("location", {
    enum: [
      "paris",
      "new-york",
      "london",
      "tokyo",
      "berlin",
      "beijing",
      "online",
    ],
  }),
  description: text("description"),
  price: integer("price"),
  userId: varchar("user_id"),
  imageUrl: varchar("image_url"),
});
