import { env as processEnv } from 'process'
import { z } from 'zod'

const envVariables = z
  .object({
    PORT: z.string(),
    DB_URL: z.string(),
  })
  .transform((data) => ({
    port: parseInt(data.PORT),
    dbUrl: data.DB_URL,
  }))

export const env = envVariables.parse(processEnv)
