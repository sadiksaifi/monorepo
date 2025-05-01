import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

// Table for tracking friend requests
export const friendRequest = pgTable(
  "friend_request",
  {
    // Who sent the request
    senderId: text("sender_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Who is receiving the request
    receiverId: text("receiver_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // When the request was sent
    createdAt: timestamp("created_at").notNull().defaultNow(),

    // Status could be added if you want to track rejected requests
    // status: text("status").notNull().default("pending"),
  },
  (table) => [
    // Composite primary key to ensure uniqueness
    primaryKey({ columns: [table.senderId, table.receiverId] }),
  ],
);

// Table for established friendships
export const friendship = pgTable(
  "friendship",
  {
    // One user in the friendship
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // The other user in the friendship
    friendId: text("friend_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // When the friendship was established
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    // Composite primary key to ensure uniqueness
    primaryKey({ columns: [table.userId, table.friendId] }),
  ],
);
