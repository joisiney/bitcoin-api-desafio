import { Controller, Route } from '@olympus/be-router-angelo'

@Controller('/olympus')
export class BitcoinController {
  constructor() {}

  @Route({
    method: 'GET',
    url: '/bitcoin/quotation',
  })
  async quotation() {
    try {
      const response = await fetch(
        'https://www.mercadobitcoin.net/api/BTC/ticker/',
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const { ticker } = await response.json()
      if (ticker.date) {
        const timestampInMilliseconds = +ticker.date * 1000
        ticker.date = new Date(timestampInMilliseconds)
      }
      return {
        buy: Number(ticker.buy),
        sell: Number(ticker.sell),
        date: ticker.date,
      }
    } catch (error) {
      throw new Error(`Error fetching BTC data: ${error}`)
    }
  }
}
