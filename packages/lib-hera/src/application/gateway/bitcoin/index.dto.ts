import { Either, InternalServerException } from '../../shared'

export namespace IBitcoinGateway {
  export interface QuotationResponse {
    buy: number
    sell: number
    date: Date
  }
  export interface Implements {
    quotation(): Promise<Either<QuotationResponse, InternalServerException>>
  }
}
