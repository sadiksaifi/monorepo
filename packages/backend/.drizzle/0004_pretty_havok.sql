CREATE TABLE "flat" (
	"id" text PRIMARY KEY NOT NULL,
	"propertyName" text,
	"ownerName" text,
	"ownerPhone" text,
	"rentAmount" integer,
	"depositAmount" integer,
	"brokerageFee" integer,
	"mapsLocationLink" text,
	"address" text,
	"description" text,
	"imageURL" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
