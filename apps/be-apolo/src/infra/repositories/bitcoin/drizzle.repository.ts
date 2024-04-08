import { db } from '@/infra/database/drizzle/connection'
import { Injectable } from '@olympus/be-di-ilitia'
import { BitcoinEntity, IBitcoinDto } from '@olympus/domain-ceos'
import {
  Either,
  InternalServerException,
  Left,
  NotFoundException,
  Right,
} from '@olympus/lib-hera'
import { bitcoins as bitcoinsEntity } from '../../database/drizzle/schema'
import { IBitcoinRepository } from './index.dto'

@Injectable({ name: 'BITCOIN_REPOSITORY' })
export class BitcoinRepositoryTypeDrizzle
  implements IBitcoinRepository.Implements
{
  async buy(
    props: Omit<Omit<IBitcoinDto, 'id'>, 'createdAt'>,
  ): Promise<Either<boolean, InternalServerException>> {
    const bitcoin = await db.insert(bitcoinsEntity).values({
      customerId: props.customerId,
      type: props.type == 'income' ? 'income' : 'charge',
      totalInCents: props.totalInCents,
      balanceTotalInCents: props.balanceTotalInCents,
      btcInCents: props.btcInCents,
      balanceBtcInCents: props.balanceBtcInCents,
    })

    if (!bitcoin) {
      return new Left(new InternalServerException('Bitcoin not buyed'))
    }
    return new Right(true)
  }

  async balance(
    customerId: string,
  ): Promise<Either<BitcoinEntity, NotFoundException>> {
    const bitcoin = await db.query.bitcoins.findFirst({
      where(fields, { eq }) {
        return eq(fields.customerId, customerId)
      },
      orderBy(fields, { desc }) {
        return desc(fields.createdAt)
      },
    })

    if (!bitcoin) {
      return new Left(new NotFoundException('Balance customer not found'))
    }

    const bitcoinMapper = new BitcoinEntity(bitcoin)
    return new Right(bitcoinMapper)
  }
}
