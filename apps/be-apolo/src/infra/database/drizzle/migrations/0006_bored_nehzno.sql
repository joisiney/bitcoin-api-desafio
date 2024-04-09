ALTER TABLE "bitcoins" ADD COLUMN "balance_btc" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "bitcoins" DROP COLUMN IF EXISTS "balance_btc_in_cents";