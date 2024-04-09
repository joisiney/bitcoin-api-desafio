export interface IBuyUseCase {
  customerId: string
  type: string
  totalInCents: number
  btc?: number
}
