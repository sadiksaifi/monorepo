CREATE TABLE "message" (
	"id" varchar(191) PRIMARY KEY DEFAULT '533523bf-1c4a-4908-8be4-61cc63db21b7' NOT NULL,
	"text" varchar(191),
	"room_id" text,
	"sender_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
