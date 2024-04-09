import { type IOptional } from '@olympus/lib-hera'
import { IBitcoinDto } from '../dto/bitcoin.dto'

export class BitcoinEntity {
  protected data: IBitcoinDto
  constructor(_data: IOptional<IBitcoinDto, 'id' | 'createdAt'>) {
    this.data = {
      ..._data,
      createdAt: _data.createdAt || new Date(),
    } as IBitcoinDto
  }

  get id() {
    return this.data.id
  }

  get balanceTotalInCents() {
    return this.data.balanceTotalInCents
  }

  get balanceBtc() {
    return this.data.balanceBtc
  }

  get db() {
    return this.data
  }

  toJSON() {
    const { ...data } = this.data
    return data
  }
}
