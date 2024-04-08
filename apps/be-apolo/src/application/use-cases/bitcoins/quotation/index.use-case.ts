import { Injectable } from '@olympus/be-di-ilitia'
import { IBitcoinGateway } from '@olympus/lib-hera'

@Injectable({ dep: ['BITCOIN_GATEWAY'] })
export class BitcoinQuotationUseCase {
  constructor(private readonly bitcoinGateway: IBitcoinGateway.Implements) {}

  async execute() {
    const bitcoinResponse = await this.bitcoinGateway.quotation()
    if (bitcoinResponse.isError) {
      bitcoinResponse.launchError()
    }

    return bitcoinResponse.value
  }
}
