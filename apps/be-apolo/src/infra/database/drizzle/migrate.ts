import { env } from '@/infra/config/env'
import chalk from 'chalk'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { join } from 'path'
import postgres from 'postgres'

const migrationsFolder = join(__dirname, 'migrations')
const connection = postgres(env.dbUrl, { max: 1 })
const main = async () => {
  const db = drizzle(connection)
  console.log(chalk.gray('Migrations started...'))
  await migrate(db, { migrationsFolder })
  console.log(chalk.greenBright('Migrations completed!'))

  await connection.end()
  console.log(chalk.gray('Connection closed!'))

  process.exit()
}
main().catch((error) => {
  console.error(chalk.redBright('Error:'), error)
})
