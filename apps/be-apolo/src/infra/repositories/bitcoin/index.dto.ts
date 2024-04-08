import { BitcoinEntity, IBitcoinDto } from '@olympus/domain-ceos'
import {
  Either,
  InternalServerException,
  NotFoundException,
} from '@olympus/lib-hera'

export namespace IBitcoinRepository {
  export interface Implements {
    buy(
      props: Omit<Omit<IBitcoinDto, 'id'>, 'createdAt'>,
    ): Promise<Either<boolean, InternalServerException>>
    balance(
      customerId: string,
    ): Promise<Either<BitcoinEntity, NotFoundException>>
  }
}
