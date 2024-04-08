import { compare, genSaltSync, hashSync } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { ISecurityService } from './index.dto'

export class SecurityService implements ISecurityService.Implements {
  public async compare(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    const isValid = await compare(password, passwordHash)
    return isValid
  }
  public encrypt(value: string): string {
    const salt = genSaltSync(10)
    const encrypted = hashSync(value, salt)
    return encrypted
  }
  public accessToken<T>({
    payload,
    secret,
    expiresIn,
  }: ISecurityService.AccessTokenProps<T>): string {
    const accessToken = sign(payload, secret, {
      expiresIn,
    })
    return accessToken
  }

  public bearerToken<T>({
    auth,
    secret,
  }: ISecurityService.BearerTokenProps): T {
    if (!auth || auth.length < 10) {
      throw new Error('Autenticação inválida')
    }
    const [type, token] = auth.split(' ')
    if (type.toLowerCase() === 'bearer') {
      try {
        const salt = verify(token, secret) as T & {
          id: string
        }

        if (!salt || typeof salt.id === 'undefined') {
          throw new Error('Sessão expirada. Favor faça login novamente')
        }
        return salt
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
    throw new Error('Dados de acesso inválidos [code bearer]')
  }
}
