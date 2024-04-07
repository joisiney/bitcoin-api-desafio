import { env } from '@/infra/config/env'
import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { BadRequestException } from '@olympus/lib-hera'
import { ISecurityService } from '@olympus/lib-hera/src/application/services/security/index.dto'
import { IAuthSignInUseCase } from './index.dto'

@Injectable({ dep: ['USER_REPOSITORY', 'SECURITY_SERVICE'] })
export class AuthSignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository.Implements,
    private readonly securityService: ISecurityService.Implements,
  ) {}
  async execute(props: IAuthSignInUseCase) {
    const user = await this.userRepository.findByEmail(props.username)
    if (user.isError) {
      user.launchError()
    }

    const isAuthenticated = await this.securityService.compare(
      props.password,
      user.value.password,
    )

    if (!isAuthenticated) {
      throw new BadRequestException('Usuário e/ou senha inválidos')
    }

    const accessToken = this.securityService.accessToken({
      payload: { id: user.value.id, type: 'ACCESS_TOKEN' },
      secret: env.jwtSecret,
      expiresIn: env.expirationSecondsAccessToken,
    })

    const refreshToken = this.securityService.accessToken({
      payload: { id: user.value.id, type: 'REFRESH_TOKEN' },
      secret: env.jwtSecret,
      expiresIn: env.expirationSecondsAccessToken,
    })

    return { accessToken, refreshToken }
  }
}
