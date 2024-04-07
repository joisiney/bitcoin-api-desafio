import { z } from 'zod'

export const userCreateDto = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .transform((val) => val.trim()),
  email: z
    .string({
      required_error: 'E-mail é obrigatória',
    })
    .email({
      message: 'E-mail inválido',
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(6, {
      message: 'Senha deve ter no mínimo 6 caracteres',
    }),
})
export type IUserCreateDto = z.output<typeof userCreateDto>
