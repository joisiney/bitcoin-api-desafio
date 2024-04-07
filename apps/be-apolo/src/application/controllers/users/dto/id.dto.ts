import { z } from 'zod'

export const userIdDto = z.object({
  id: z.string({
    required_error: 'ID é obrigatório',
  }),
})
export type IUserIdDto = z.output<typeof userIdDto>
