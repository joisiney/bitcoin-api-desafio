import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import {
  decimal,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
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
  btc: decimal('btc').notNull(),
  balanceBtc: decimal('balance_btc').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const bitcoinsRelations = relations(bitcoins, ({ one }) => ({
  customer: one(users, {
    fields: [bitcoins.customerId],
    references: [users.id],
  }),
}))
