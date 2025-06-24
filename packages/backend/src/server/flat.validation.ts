import { z } from "zod";

export const addFlatSchema = z.object({
  propertyName: z.string(),
  ownerName: z.string(),
  ownerPhone: z.string(),
  ownerType: z.string(),
  rentAmount: z.coerce.number(),
  depositAmount: z.coerce.number(),
  brokerageFee: z.coerce.number(),
  location: z.string(),
  mapsLocationLink: z.string(),
  address: z.string(),
  description: z.string(),
  imageURL: z.array(z.string()).optional().default([]),
});

export type AddFlat = z.input<typeof addFlatSchema>;
