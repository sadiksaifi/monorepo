import { seed } from "drizzle-seed";
import { db } from "./db";
import { flatTable } from "../lib/schema";

const imageURL = [
  "https://images.unsplash.com/photo-1710609942195-b9dab8f48fc6?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561816544-21ecbffa09a3?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1617243876873-6cea4ea0b4eb?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1585020430145-2a6b034f7729?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

console.log("Seeding db url: ", process.env.DATABASE_URL);
await seed(db, { flatTable: flatTable }).refine((f) => ({
  flatTable: {
    columns: {
      imageURL: f.valuesFromArray({
        values: imageURL,
      }),
      ownerPhone: f.phoneNumber(),
      ownerName: f.fullName(),
      address: f.streetAddress(),
      description: f.loremIpsum(),
      id: f.uuid(),
    },
    count: 20,
  },
}));
