import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { IAuthGuardUseCase } from './index.dto'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class AuthGuardUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}
  async execute(props: IAuthGuardUseCase) {
    const user = await this.userRepository.findById(props.id)
    if (user.isError) {
      user.launchError()
    }
    return user.value.db
  }
}
