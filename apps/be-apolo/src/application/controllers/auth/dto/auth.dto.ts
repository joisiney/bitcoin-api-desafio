import { env } from '@/infra/config/env'
import { SecurityService } from '@olympus/lib-hera'
import { z } from 'zod'

const security = new SecurityService()

export const authDto = z
  .object({
    authorization: z
      .string({
        required_error: 'Não foi possível encontrar o campo authorization',
      })
      .refine(
        (auth) => {
          const decoded = security.bearerToken({ auth, secret: env.jwtSecret })
          return decoded
        },
        { message: 'O campo authorization está inválido' },
      ),
  })
  .transform(({ authorization: auth }) => {
    const decoded = security.bearerToken<{
      id: string
      type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN'
    }>({ auth, secret: env.jwtSecret })
    return {
      id: decoded.id,
      type: decoded.type,
    }
  })
export type IAuthDto = z.output<typeof authDto>
