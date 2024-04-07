import { z } from 'zod'
const decodeBasicAuth = (auth: string) => {
  const parts = auth.split(' ')
  if (parts.length !== 2) {
    return null
  }
  const [scheme, base64Credentials] = parts
  if (scheme.toLowerCase() !== 'basic') {
    return null
  }
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8')
  const partsDecrypted = credentials.split(':')
  if (partsDecrypted.length !== 2) {
    return null
  }
  const [username, password] = partsDecrypted

  return { username, password }
}

export const authDto = z
  .object({
    authorization: z
      .string({
        required_error: 'Não foi possível encontrar o campo authorization',
      })
      .refine(
        (value) => {
          const decoded = decodeBasicAuth(value)
          return !!decoded
        },
        { message: 'O campo authorization está inválido' },
      ),
  })
  .transform(({ authorization }) => {
    const decoded = decodeBasicAuth(authorization)
    return decoded as { username: string; password: string }
  })
export type IAuthDto = z.output<typeof authDto>
