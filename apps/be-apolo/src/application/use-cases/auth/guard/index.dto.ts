export interface IAuthGuardUseCase {
  id: string
  type: 'ACCESS_TOKEN' | 'REFRESH_TOKEN'
}
