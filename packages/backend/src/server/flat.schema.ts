import { z } from "zod";

export const addFlatSchema = z.object({
  propertyName: z.string(),
  ownerName: z.string().optional(),
  ownerPhone: z.string(),
  ownerType: z.string(),
  rentAmount: z.coerce.number(),
  depositAmount: z.coerce.number(),
  brokerageFee: z.coerce.number().optional(),
  location: z.string(),
  mapsLocationLink: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  imageURL: z.array(z.string()).optional().default([]),
});

export type AddFlat = z.input<typeof addFlatSchema>;
