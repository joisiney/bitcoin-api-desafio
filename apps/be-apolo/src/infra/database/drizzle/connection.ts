import { env } from '@/infra/config/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

export const connection = postgres(env.dbUrl)
export const db = drizzle(connection, { schema })
