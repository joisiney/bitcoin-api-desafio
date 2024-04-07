import { env as processEnv } from 'process'
import { z } from 'zod'

const envVariables = z
  .object({
    PORT: z.string(),
    DB_URL: z.string(),
    JWT_SECRET: z.string(),
    EXPIRATION_SECONDS_ACCESS_TOKEN: z.string().optional(),
    EXPIRATION_SECONDS_REFRESH_TOKEN: z.string().optional(),
  })
  .transform((data) => ({
    port: parseInt(data.PORT),
    dbUrl: data.DB_URL,
    jwtSecret: data.JWT_SECRET,
    expirationSecondsAccessToken: parseInt(
      data.EXPIRATION_SECONDS_ACCESS_TOKEN ?? '30000',
    ),
    expirationSecondsRefreshToken: parseInt(
      data.EXPIRATION_SECONDS_REFRESH_TOKEN ?? '172800',
    ),
  }))

export const env = envVariables.parse(processEnv)
