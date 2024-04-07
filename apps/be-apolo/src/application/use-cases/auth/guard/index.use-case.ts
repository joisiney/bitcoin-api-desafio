import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { IAuthSignInUseCase } from '../sign-in/index.dto'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class AuthGuardUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}
  async execute(props: IAuthSignInUseCase) {
    const user = await this.userRepository.findByEmail(props.username)
    if (user.isError) {
      user.launchError()
    }
    console.log('ola', props)
    return true
  }
}