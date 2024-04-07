import { AuthSignInUseCase } from '@/application/use-cases/auth/sign-in/index.use-case'
import { Injectable } from '@olympus/be-di-ilitia'
import { Controller, Guard, Route } from '@olympus/be-router-angelo'
import { authDto } from './dto/auth.dto'
import { IAuthSignInDto, authSignInDto } from './dto/sign-in.dto'

@Controller('/olympus/auth')
@Injectable({
  dep: ['AuthSignInUseCase'],
})
export class AuthController {
  constructor(private authSignInUseCase: AuthSignInUseCase) {}

  @Guard({ dep: 'AuthGuardUseCase', dto: authDto })
  @Route({ method: 'GET', url: '/sign-in', dto: authSignInDto })
  async session(data: IAuthSignInDto) {
    return this.authSignInUseCase.execute(data)
  }
}
