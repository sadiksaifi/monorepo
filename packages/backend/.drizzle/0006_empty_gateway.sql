ALTER TABLE "flat" ADD COLUMN "userId" text;--> statement-breakpoint
ALTER TABLE "flat" ADD COLUMN "starred" json DEFAULT '[]'::json;--> statement-breakpoint
CREATE INDEX "userId" ON "flat" USING btree ("userId");