import { index, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const messageTable = pgTable(
  "message",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    text: varchar("text", { length: 191 }),
    roomId: text("room_id"),
    senderId: text("sender_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("room_idx").on(table.roomId)],
);
