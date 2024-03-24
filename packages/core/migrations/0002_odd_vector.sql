ALTER TABLE "events" ALTER COLUMN "name" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "date" date;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" varchar;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "price" integer;