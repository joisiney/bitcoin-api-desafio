import { AuthSignInUseCase } from '@/application/use-cases/auth/sign-in/index.use-case'
import { Injectable } from '@olympus/be-di-ilitia'
import { Controller, Route } from '@olympus/be-router-angelo'
import { IAuthSignInDto, authSignInDto } from './dto/sign-in.dto'

@Controller('/olympus/auth')
@Injectable({
  dep: ['AuthSignInUseCase'],
})
export class AuthController {
  constructor(private authSignInUseCase: AuthSignInUseCase) {}

  @Route({ method: 'GET', url: '/sign-in', dto: authSignInDto })
  async session(data: IAuthSignInDto) {
    return this.authSignInUseCase.execute(data)
  }
}
