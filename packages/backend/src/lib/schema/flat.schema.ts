import { pgTable, text, timestamp, integer, json, index } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const flatTable = pgTable(
  "flat",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    propertyName: text("propertyName"),
    ownerName: text("ownerName"),
    ownerPhone: text("ownerPhone"),
    rentAmount: integer("rentAmount"),
    depositAmount: integer("depositAmount"),
    brokerageFee: integer("brokerageFee"),
    location: text("location"),
    mapsLocationLink: text("mapsLocationLink"),
    address: text("address"),
    description: text("description"),
    userId: text("userId"),
    imageURL: json("imageURL").$type<string[]>(),
    starred: json("starred").$type<string[]>().default([]),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
  },
  (table) => [index("userId").on(table.userId)],
);
