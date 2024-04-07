import { UserMockList } from '@olympus/test-kairos'
import chalk from 'chalk'
import { db } from './connection'
import { users } from './schema'

const main = async () => {
  /**
   * Reset the database
   */
  await db.delete(users)
  console.log(chalk.bold.red('Database reset! 🙈'))

  /**
   * Insert users
   */
  const usersMock = UserMockList(50)
  await db.insert(users).values(usersMock)

  console.log(chalk.dim('\t✔ Created user!'))
  console.log(chalk.bold.green('Database seeded! 😇'))
  process.exit()
}
main().catch((error) => {
  console.error(chalk.redBright('Error:'), error)
})
