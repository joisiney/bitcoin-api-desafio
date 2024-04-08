import { z } from 'zod'

export const customerIdDto = z.object({
  customerId: z.string({
    required_error: 'customerId é obrigatório',
  }),
})
export type ICustomerIdDto = z.output<typeof customerIdDto>
