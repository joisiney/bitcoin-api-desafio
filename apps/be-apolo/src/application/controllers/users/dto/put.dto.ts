import { z } from 'zod'

export const userUpdateDto = z
  .object({
    id: z.string({
      required_error: 'Id da notícia é obrigatório',
    }),
    name: z
      .string()
      .optional()
      .transform((val) => (val ? val.trim() : val)),
    email: z
      .string()
      .email({
        message: 'E-mail inválido',
      })
      .optional(),
  })
  .refine(
    (data) => {
      return Object.keys(data).length > 1
    },
    {
      message: 'É necessário informar pelo menos um campo para atualização',
    },
  )
export type IUserUpdateDto = z.output<typeof userUpdateDto>
