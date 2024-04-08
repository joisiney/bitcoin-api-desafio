import { Either, InternalServerException, Left, Right } from '../../shared'
import { IBitcoinGateway } from './index.dto'

export class BitcoinGateway implements IBitcoinGateway.Implements {
  public async quotation(): Promise<
    Either<IBitcoinGateway.QuotationResponse, InternalServerException>
  > {
    try {
      const response = await fetch(
        'https://www.mercadobitcoin.net/api/BTC/ticker/',
      )
      if (!response.ok) {
        return new Left(
          new InternalServerException(`HTTP error! Status: ${response.status}`),
        )
      }
      const { ticker } = await response.json()
      if (ticker.date) {
        const timestampInMilliseconds = +ticker.date * 1000
        ticker.date = new Date(timestampInMilliseconds)
      }
      return new Right({
        buy: Number(ticker.buy),
        sell: Number(ticker.sell),
        date: ticker.date,
      })
    } catch (error) {
      return new Left(
        new InternalServerException(`Error fetching BTC data: ${error}`),
      )
    }
  }
}
