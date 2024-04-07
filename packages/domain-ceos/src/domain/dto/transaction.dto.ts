export interface ITransactionDto {
  id: string
  customerId: string
  type: string
  totalInCents: number
  balanceInCents: number
  createdAt: Date
}
