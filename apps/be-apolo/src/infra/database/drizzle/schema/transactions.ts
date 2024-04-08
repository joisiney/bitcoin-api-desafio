import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const transactionTypeEnum = pgEnum('transaction_type', [
  'income',
  'charge',
])

export const transactions = pgTable('transactions', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  customerId: text('customer_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  type: transactionTypeEnum('type').default('income').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  balanceInCents: integer('balance_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  customer: one(users, {
    fields: [transactions.customerId],
    references: [users.id],
  }),
}))
