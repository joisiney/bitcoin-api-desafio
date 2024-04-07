import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class UserFindByIdUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id)
    if (user.isError) return user.launchError()
    return user.value
  }
}
