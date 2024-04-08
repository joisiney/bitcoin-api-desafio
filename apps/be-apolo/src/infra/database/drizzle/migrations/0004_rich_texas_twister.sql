DO $$ BEGIN
 CREATE TYPE "bitcoin_type" AS ENUM('income', 'charge');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bitcoins" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"type" "bitcoin_type" DEFAULT 'income' NOT NULL,
	"total_in_cents" integer NOT NULL,
	"balance_total_in_cents" integer NOT NULL,
	"btc_in_cents" integer NOT NULL,
	"balance_btc_in_cents" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bitcoins" ADD CONSTRAINT "bitcoins_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
