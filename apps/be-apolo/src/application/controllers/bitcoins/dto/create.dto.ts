import { z } from 'zod'

export const transactionCreateDto = z.object({
  totalInCents: z
    .string({
      required_error: 'Total da transação é obrigatório',
    })
    .transform((val) => Number(val.trim())),
  type: z
    .enum(['income', 'charge'], {
      required_error: 'Defina se a transação é de entrada ou saída',
    })
    .transform((val) => val.trim()),
})
export type ITransactionCreateDto = z.output<typeof transactionCreateDto>
