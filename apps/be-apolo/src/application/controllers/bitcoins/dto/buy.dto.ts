import { IUserDto } from '@olympus/domain-ceos'
import { z } from 'zod'

export const bitcoinBuyDto = z.object({
  totalInCents: z
    .string({
      required_error: 'Total da transação é obrigatório',
    })
    .transform((val) => Number(val.trim())),
  auth: z.unknown(),
})
export type IBitcoinBuyDto = Omit<z.output<typeof bitcoinBuyDto>, 'auth'> & {
  auth: IUserDto
}
