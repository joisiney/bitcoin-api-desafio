import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const bitcoinTypeEnum = pgEnum('bitcoin_type', ['income', 'charge'])

export const bitcoins = pgTable('bitcoins', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  customerId: text('customer_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  type: bitcoinTypeEnum('type').default('income').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  balanceTotalInCents: integer('balance_total_in_cents').notNull(),
  btcInCents: integer('btc_in_cents').notNull(),
  balanceBtcInCents: integer('balance_btc_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const bitcoinsRelations = relations(bitcoins, ({ one }) => ({
  customer: one(users, {
    fields: [bitcoins.customerId],
    references: [users.id],
  }),
}))
