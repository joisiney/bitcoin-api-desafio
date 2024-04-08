import { IUserDto } from '@olympus/domain-ceos'
import { z } from 'zod'

export const customerIdDto = z.object({
  auth: z.unknown(),
})
export type ICustomerIdDto = Omit<z.output<typeof customerIdDto>, 'auth'> & {
  auth: IUserDto
}
