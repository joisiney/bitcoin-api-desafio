export interface IBitcoinDto {
  id: string
  customerId: string
  type: string
  totalInCents: number
  btc: number
  balanceBtc: number
  createdAt: Date
}
