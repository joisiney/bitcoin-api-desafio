export namespace ISecurityService {
  export interface AccessTokenProps<T> {
    payload: string | any | Buffer | T
    secret: string
    expiresIn: number
  }
  export interface Implements {
    compare(password: string, passwordHash: string): Promise<boolean>
    encrypt(value: string): string
    accessToken<T>(props: AccessTokenProps<T>): string
    bearer<T>(authorization: string): T
  }
}
