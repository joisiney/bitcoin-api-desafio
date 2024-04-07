import type { Config } from 'drizzle-kit'
import { env } from './src/infra/config/env'

export default {
  schema: './src/infra/database/drizzle/schema/index.ts',
  out: './src/infra/database/drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.dbUrl,
  },
} satisfies Config
