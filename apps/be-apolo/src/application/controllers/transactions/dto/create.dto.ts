import { IUserDto } from '@olympus/domain-ceos'
import { z } from 'zod'

export const transactionCreateDto = z.object({
  totalInCents: z.coerce.number({
    required_error: 'Total da transação é obrigatório',
  }),
  type: z
    .enum(['income', 'charge'], {
      required_error: 'Defina se a transação é de entrada ou saída',
    })
    .transform((val) => val.trim()),
  auth: z.unknown(),
})
export type ITransactionCreateDto = Omit<
  z.output<typeof transactionCreateDto>,
  'auth'
> & {
  auth: IUserDto
}
