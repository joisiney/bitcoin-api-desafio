export interface IBitcoinDto {
  id: string
  customerId: string
  type: string
  totalInCents: number
  balanceTotalInCents: number
  btcInCents: number
  balanceBtcInCents: number
  createdAt: Date
}
