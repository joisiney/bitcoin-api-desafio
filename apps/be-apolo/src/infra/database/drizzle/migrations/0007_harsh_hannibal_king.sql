ALTER TABLE "bitcoins" ADD COLUMN "btc" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "bitcoins" DROP COLUMN IF EXISTS "btc_in_cents";